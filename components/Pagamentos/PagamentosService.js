const PagamentosDao = require('../Pagamentos/PagamentosDao');

pagamentosDao = new PagamentosDao();

module.exports = class PagamentosService {
  async getPagamentos(){
    return await pagamentosDao.getPagamentos();
  }

  async getPagamento(pagamentoId){
    const pagamento = await pagamentosDao.getPagamento(pagamentoId);
    return pagamento;
  }

  async setPagamento(pagamento){
    return await pagamentosDao.setPagamento(pagamento);
  }

  async updatePagamento(pagamentoData, pagamentoId){
    const pagamento = await pagamentosDao.updatePagamento(pagamentoData, pagamentoId);
    return pagamento;
  }

  async removePagamento(pagamentoId){
    await pagamentosDao.removePagamento(pagamentoId);
  }
}