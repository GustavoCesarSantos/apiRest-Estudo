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

  routes.put('/pagamentos/pagamento/:id', async (req,res) => {
    try{
      const id = req.params.id;
      const pagamentoData = req.body;

      pagamentoData.data = new Date();

      await pagamentosDao.updatePagamento(pagamentoData, id);
      res.status(200).json({ status: 'Pagamento atualizado' });
    }catch(error){
      console.error('ERROR: ', error);
    }
  });
}