
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CustomersDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const customers = await db.customers.create(
            {
                id: data.id || undefined,

        full_name: data.full_name
        ||
        null
            ,

        email: data.email
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return customers;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const customersData = data.map((item, index) => ({
                id: item.id || undefined,

                full_name: item.full_name
            ||
            null
            ,

                email: item.email
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const customers = await db.customers.bulkCreate(customersData, { transaction });

        return customers;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const customers = await db.customers.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.full_name !== undefined) updatePayload.full_name = data.full_name;

        if (data.email !== undefined) updatePayload.email = data.email;

        updatePayload.updatedById = currentUser.id;

        await customers.update(updatePayload, {transaction});

        return customers;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const customers = await db.customers.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of customers) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of customers) {
                await record.destroy({transaction});
            }
        });

        return customers;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const customers = await db.customers.findByPk(id, options);

        await customers.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await customers.destroy({
            transaction
        });

        return customers;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const customers = await db.customers.findOne(
            { where },
            { transaction },
        );

        if (!customers) {
            return customers;
        }

        const output = customers.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.full_name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'customers',
                            'full_name',
                            filter.full_name,
                        ),
                    };
                }

                if (filter.email) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'customers',
                            'email',
                            filter.email,
                        ),
                    };
                }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.customers.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'customers',
                        'full_name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.customers.findAll({
            attributes: [ 'id', 'full_name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['full_name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.full_name,
        }));
    }

};

