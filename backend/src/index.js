
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

const contactFormRoutes = require('./routes/contactForm');

const usersRoutes = require('./routes/users');

const categoriesRoutes = require('./routes/categories');

const coffee_blendsRoutes = require('./routes/coffee_blends');

const customersRoutes = require('./routes/customers');

const ordersRoutes = require('./routes/orders');

const paymentsRoutes = require('./routes/payments');

const reportsRoutes = require('./routes/reports');

const getBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "dbh",
        description: "dbh Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.enable('trust proxy');

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.use('/api/categories', passport.authenticate('jwt', {session: false}), categoriesRoutes);

app.use('/api/coffee_blends', passport.authenticate('jwt', {session: false}), coffee_blendsRoutes);

app.use('/api/customers', passport.authenticate('jwt', {session: false}), customersRoutes);

app.use('/api/orders', passport.authenticate('jwt', {session: false}), ordersRoutes);

app.use('/api/payments', passport.authenticate('jwt', {session: false}), paymentsRoutes);

app.use('/api/reports', passport.authenticate('jwt', {session: false}), reportsRoutes);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes);

const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
