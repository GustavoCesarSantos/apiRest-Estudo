const connection = require('../../persistencia/connectionFactory');
const Pagamentos = require('../../models/Pagamentos');

const pagamentos = Pagamentos(connection);

module.exports = class PagamentosDao{
  async setPagamento(pagamento){
    await pagamentos.create(pagamento);
  }

  async updatePagamento(pagamentoData, pagamentoId){
    const pagamento =  await pagamentos.update(pagamentoData, { where: { id: pagamentoId } });
    return pagamento
  }
}