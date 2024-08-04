const swaggerAutogen = require('swagger-autogen')();
const { BACKEND_BASE_URL } = require('./src/constant.js');
const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: BACKEND_BASE_URL,
  basePath: '/',
};

const outputFile = './assets/swagger-output.json';
const routes = ['./src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);