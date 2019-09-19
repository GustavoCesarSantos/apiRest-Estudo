const redis = require('redis');
const PagamentosDao = require('../components/Pagamentos/PagamentosDao');

const cache = redis.createClient();
const pagamentosDao = new PagamentosDao();

module.exports = (routes) => {
  routes.get('/pagamentos', async (req,res) => {
    try{
      //cache.del("pagamentos");
      cache.get("pagamentos", async (error,reply) => {
        if(reply){
          console.log('Processando uma requisicao: Retornar todos pagamentos em cache');
          res.status(200).json(JSON.parse(reply));
        }else{
          console.log('Processando uma requisicao: Retornar todos pagamentos na base');
          const pagamentos = await pagamentosDao.getPagamentos();
          cache.set("pagamentos", JSON.stringify(pagamentos));
          cache.expire("pagamentos", 10);
          res.status(200).json(pagamentos);
        }
      });
    }catch(error){
      console.error('ERROR: ', error);
    }
  });

  routes.post('/pagamentos/pagamento', async (req, res) => {
    try{
      console.log('Processando uma requisicao: Cadastrar novo pagamento');
      const pagamento = req.body;
  
      pagamento.status = "CRIADO";
      pagamento.data = new Date();
      
      await pagamentosDao.setPagamento(pagamento);

      cache.get("pagamentos", async (error, reply) => {
        const testee = JSON.parse(reply);
        const teste = { ...testee, ...pagamento,  }
        const carai = JSON.stringify(teste);
        cache.set("pagamentos", carai);
        cache.get("pagamentos", async(error, reply) => console.log('NOVO: ', reply));
      });
      
      console.log('Status: Pagamento cadastrado');
      res.status(200).json({ status: 'Pagamento cadastrado' });
    }catch(error){
      console.error('ERROR: ', error);
    }
  });

  routes.get('/pagamentos/pagamento/:id', async (req, res) => {
    try{
      console.log('Processando uma requisicao: Retornando pagamento especifico');
      const { id } = req.params;

      const pagamento = await pagamentosDao.getPagamento(id);
      res.status(200).json(pagamento);
    }catch(error){
      console.error('ERROR: ', error);
    }
  });

  routes.put('/pagamentos/pagamento/:id', async (req,res) => {
    try{
      console.log('Processando uma requisicao: Atualizar pagamento');
      const { id } = req.params;
      const pagamentoData = req.body;

      pagamentoData.status = "ATUALIZADO";
      pagamentoData.data = new Date();

      await pagamentosDao.updatePagamento(pagamentoData, id);
      const pagamento = await pagamentosDao.getPagamento(id);
      res.status(200).json({ status: 'Pagamento atualizado', pagamento });
    }catch(error){
      console.error('ERROR: ', error);
    }
  });

  routes.delete('/pagamentos/pagamento/:id', async (req, res) => {
    try{
      console.log('Processando uma requisicao: Remover pagamento');
      const { id } = req.params;

      await pagamentosDao.removePagamento(id);
      const pagamento = await pagamentosDao.getPagamentos();
      res.status(200).json({ status: 'Pagamento removido', pagamento });
    }catch(error){
      console.error('ERROR: ', error);
    }
  })
}