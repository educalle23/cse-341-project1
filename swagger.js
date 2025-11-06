const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'users API',
        description: 'users Api'
    },
    host: 'localhost:3001',
    schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; 
swaggerAutogen(outputFile, endpointsFiles, doc);

