module.exports = (routes) => {
  routes.get('/pagamentos', (req,res) => res.json({ teste: 'ok' }));

  routes.post('/pagamentos/pagamento', (req, res) => {
    const pagamento = req.body;
    console.log('Processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    //const connection = app.persistencia.connectionFactory();
    //const pagamentoDao = app.persistencia.

    res.status(200).json(pagamento)
  });
}