const Sequelize = require('sequelize');
const Pagamentos = require('../models/Pagamentos');

const createDBConnection = new Sequelize('payfast', 'root', '1234!', {
  host: 'localhost',
  dialect: 'mysql',
  //Desabilita log das chamadas sql no terminal
  logging: false
});

//Teste de conexao com a base e criando tables
createDBConnection.authenticate()
  .then(() => {
    console.log('MySql conectado com sucesso');
    Pagamentos(createDBConnection).sync();
  })
  .catch((error) => {
    console.error('Falha na conexao com a base: ', error);
  })

module.exports = createDBConnection