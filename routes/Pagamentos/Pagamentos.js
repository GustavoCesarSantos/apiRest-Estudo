const urls = require('../../helpers/constants/url');
const PagamentosController = require('../../components/Pagamentos/PagamentosController');

module.exports = (app) => {
  app.route(urls.PAGAMENTOS)
    .get(PagamentosController.getPagamentos)
    .post(PagamentosController.setPagamentos);
  
  app.route(urls.PAGAMENTOS_ID)
    .get(PagamentosController.getPagamento)
    .put(PagamentosController.updatePagamento)
    .delete(PagamentosController.removePagamento);
}