const Helpers = use('Helpers');
const Env = use('Env');

const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const rootFolder = Helpers.appRoot();

class SwaggerController {
  async index({ response }) {
    if (Env.get('SERVE_DOCS') !== 'true') {
      return response.json(403, { status: 'forbidden' });
    }
    const options = {
      // Import swaggerDefinitions
      swaggerDefinition: {
        host: Env.get('PUBLIC_HOST'),
        info: {
          // API informations (required)
          title: 'AUTO RENT API', // Title (required)
          version: '1.0.0', // Version (required)
        },
        produces: ['application/json'],
        consumes: ['application/json'],
        basePath: '/api',
      },
      // Path to the API docs
      apis: [
        path.join(rootFolder, 'start/routes.js'),
        path.join(rootFolder, 'app/Models/*.js'),
        path.join(rootFolder, 'app/Controllers/Http/*.js'),
      ],
    };

    return swaggerJSDoc(options);
  }
}

module.exports = SwaggerController;
