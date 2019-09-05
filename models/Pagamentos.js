const Sequelize = require('sequelize');

module.exports = (connection) => {
  const Pagamentos = connection.define('Pagamentos', {
    formaDePagamento: { type: Sequelize.STRING },
    moeda: { type: Sequelize.STRING },
    valor: { type: Sequelize.INTEGER },
    status: { type: Sequelize.STRING },
    data: { type: Sequelize.DATE },
    descricao: { type: Sequelize.STRING },
  });

  return Pagamentos;
} 