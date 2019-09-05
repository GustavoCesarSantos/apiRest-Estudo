const PagamentosDao = require('../components/Pagamentos/PagamentosDao');

const pagamentosDao = new PagamentosDao();

module.exports = (routes) => {
  routes.get('/pagamentos', (req,res) => res.json({ teste: 'ok' }));

  routes.post('/pagamentos/pagamento', async (req, res) => {
    try{
      const pagamento = req.body;
      console.log('Processando uma requisicao: Cadastrar novo pagamento');
  
      pagamento.data = new Date();
      
      await pagamentosDao.setPagamento(pagamento);
  
      console.log('Status: Pagamento cadastrado');
      res.status(200).json({ status: 'Pagamento cadastrado' });
    }catch(error){
      console.error('ERROR: ', error);
    }
  });
}