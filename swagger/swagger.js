import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Sistema Escolar',
            version: '1.0.0',
            description: 'API para el manejo de un sistema escolar',
            contact: {
                name: 'Esteban Van-strahlen'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['rutes/rutas/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;