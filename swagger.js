const swaggerAutogen = require('swagger-autogen')();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Description',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

//run swagger while project
swaggerAutogen(outputFile, endpointsFiles, doc);

//to run swagger before the project
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });