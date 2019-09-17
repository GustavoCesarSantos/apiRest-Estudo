const connection = require('../../persistencia/connectionFactory');
const Pagamentos = require('../../models/Pagamentos');

const pagamentos = Pagamentos(connection);

module.exports = class PagamentosDao{
  async getPagamentos(){
    return await pagamentos.findAll();
  }

  async getPagamento(pagamentoId){
    const pagamento = await pagamentos.findOne({ where: { id: pagamentoId } });
    return pagamento;
  }

  async setPagamento(pagamento){
    return await pagamentos.create(pagamento);
  }

  async updatePagamento(pagamentoData, pagamentoId){
    const pagamento =  await pagamentos.update(pagamentoData, { where: { id: pagamentoId } });
    return pagamento
  }
}