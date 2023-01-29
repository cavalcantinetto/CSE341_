const swaggerAutogen = require('swagger-autogen')();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/students.js", "./routes/teachers.js"];

const doc = {
    info: {
        title: 'book Club API',
        description: 'Description',
    },
    host: 'localhost:8080',
    schemes: ['https', 'http'],
};

//run swagger while project
swaggerAutogen(outputFile, endpointsFiles, doc);

//to run swagger before the project
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });