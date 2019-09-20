const express = require('express');
const bodyParser = require('body-parser');
const routesPagamentos = require('../routes/Pagamentos/Pagamentos');
const routesImagens = require('../routes/Imagens/Imagens');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routesPagamentos(app);
routesImagens(app);

//Outra maneira de chamar as rotas no app
// const consign = require('consign');
// consign()
//   .include('routes')
//   .then('persistencia')
//   .into(app);

module.exports = app;