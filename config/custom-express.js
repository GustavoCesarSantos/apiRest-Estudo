const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/pagamentos');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

//Outra maneira de chamar as rotas no app
// const consign = require('consign');
// consign()
//   .include('routes')
//   .then('persistencia')
//   .into(app);

module.exports = app;