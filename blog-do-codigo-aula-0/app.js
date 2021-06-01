const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { estrategiasAutenticacoes } = require('./src/usuarios');

app.use(bodyParser.json());

module.exports = app;
