const redis = require('redis');
const PagamentosService = require('../Pagamentos/PagamentosService');

const cache = redis.createClient();
const pagamentosService = new PagamentosService();

module.exports = class PagamentosController {
  static async getPagamentos(req,res){
    try{
      cache.get("pagamentos", async (error,reply) => {
        if(reply){
          console.log('Processando uma requisicao: Retornar todos pagamentos em cache');
          res.status(200).json(JSON.parse(reply));
        }else{
          console.log('Processando uma requisicao: Retornar todos pagamentos na base');
          const pagamentos = await pagamentosService.getPagamentos();
          cache.set("pagamentos", JSON.stringify(pagamentos));
          cache.expire("pagamentos", 120);
          res.status(200).json(pagamentos);
        }
        console.log('Status: Pagamentos retornados');
      });
    }catch(error){
      console.error('ERROR: ', error);
    }
  };

  static async setPagamentos(req, res){
    try{
      console.log('Processando uma requisicao: Cadastrar novo pagamento');
      const pagamento = req.body;
  
      pagamento.status = "CRIADO";
      pagamento.data = new Date();
      
      await pagamentosService.setPagamento(pagamento);
  
      cache.get("pagamentos", async (error, reply) => {
        if(reply){
          const arrayPagamentos = JSON.parse(reply);
          arrayPagamentos.push(pagamento);
          cache.set("pagamentos", JSON.stringify(arrayPagamentos));
          cache.expire("pagamentos", 10);
        }
      });
      
      res.status(200).json({ status: 'Pagamento cadastrado' });
      console.log('Status: Pagamento cadastrado');
    }catch(error){
      console.error('ERROR: ', error);
    }
  };

  static async getPagamento(req, res){
    try{
      console.log('Processando uma requisicao: Retornando pagamento especifico');
      const { id } = req.params;
      const pagamento = await pagamentosService.getPagamento(id);
      
      res.status(200).json(pagamento);
      console.log('Status: Pagamento retornado');
    }catch(error){
      console.error('ERROR: ', error);
    }
  };

  static async updatePagamento(req, res){
    try{
      console.log('Processando uma requisicao: Atualizar pagamento');
      const { id } = req.params;
      const pagamentoData = req.body;
  
      pagamentoData.status = "ATUALIZADO";
      pagamentoData.data = new Date();
  
      await pagamentosService.updatePagamento(pagamentoData, id);
      const pagamento = await pagamentosService.getPagamento(id);

      cache.get("pagamentos", async (error, reply) => {
        if(reply){
          const arrayPagamentos = JSON.parse(reply);
          arrayPagamentos.map((item) => {
            if(item.id == id){
              const position = arrayPagamentos.indexOf(item);
              arrayPagamentos[position] = JSON.parse(JSON.stringify(pagamento));
            }
          });
          cache.set("pagamentos", JSON.stringify(arrayPagamentos));
          cache.expire("pagamentos", 10); 
        }
      });
      
      res.status(200).json({ status: 'Pagamento atualizado', pagamento });
      console.log('Status: Pagamento atualizado');
    }catch(error){
      console.error('ERROR: ', error);
    }
  };

  static async removePagamento(req, res){
    try{
      console.log('Processando uma requisicao: Remover pagamento');
      const { id } = req.params;
      await pagamentosService.removePagamento(id);
      const pagamento = await pagamentosService.getPagamentos();

      res.status(200).json({ status: 'Pagamento removido', pagamento });
      console.log('Status: Pagamento removido');
    }catch(error){
      console.error('ERROR: ', error);
    }
  };
}