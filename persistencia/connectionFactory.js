const Sequelize = require('sequelize');

const createDBConnection = new Sequelize('payfast', 'root', '1234!', {
  host: 'localhost',
  dialect: 'mysql'
});

//Teste de conexao com a base
createDBConnection.authenticate()
  .then(() => {
    console.log('Conectado com sucesso');
  })
  .catch((error) => {
    console.error('Falha na conexao: ', error);
  })

module.exports = createDBConnection