import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        categoriesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        categoriesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        categoriesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        categoriesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        coffee_blendsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        coffee_blendsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        coffee_blendsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        coffee_blendsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        customersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.full_name)
        },
        customersOneListFormatter(val) {
            if (!val) return ''
            return val.full_name
        },
        customersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.full_name}
            });
        },
        customersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.full_name, id: val.id}
        },

        ordersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.status)
        },
        ordersOneListFormatter(val) {
            if (!val) return ''
            return val.status
        },
        ordersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.status}
            });
        },
        ordersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.status, id: val.id}
        },

}
