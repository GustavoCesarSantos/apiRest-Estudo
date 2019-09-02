const express = require('express');
const bodyParser = require('body-parser');
//const routes = require('../routes/pagamentos');
const consign = require('consign');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Outra maneira de chamar as rotas no app
//routes(app);
consign()
  .include('routes')
  .then('persistencia')
  .into(app);

module.exports = app;