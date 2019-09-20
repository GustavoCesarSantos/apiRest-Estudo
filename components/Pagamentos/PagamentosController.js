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
          cache.expire("pagamentos", 10);
          res.status(200).json(pagamentos);
        }
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
        }else{
          cache.set("pagamentos", reply);
        }
      });
      
      console.log('Status: Pagamento cadastrado');
      res.status(200).json({ status: 'Pagamento cadastrado' });
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
      res.status(200).json({ status: 'Pagamento atualizado', pagamento });
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
    }catch(error){
      console.error('ERROR: ', error);
    }
  };
}