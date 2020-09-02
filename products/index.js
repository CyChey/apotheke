const express = require('express');
const routes = require('./routes');

const app = express();
// console.log(routes);

app.use(routes);

module.exports = app;