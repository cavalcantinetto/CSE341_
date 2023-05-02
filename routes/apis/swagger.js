const express = require('express');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const cors = require('cors');

router.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;