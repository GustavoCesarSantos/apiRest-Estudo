const Sequelize = require('sequelize');
const connection = require('../persistencia/connectionFactory');

const Pagamentos = connection.define('Pagamentos', {
  formaDePagamento: { type: Sequelize.STRING },
  valor: { type: Sequelize.INTEGER },
  moeda: { type: Sequelize.STRING },
  descricao: { type: Sequelize.STRING }
});

module.exports = Pagamentos