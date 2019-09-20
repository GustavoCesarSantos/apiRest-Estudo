const fs = require('fs');

 module.exports = (routes) => {
  routes.post('/upload/imagem', (req, res) => {
  console.log("Enviando imagem");
  req.pipe(fs.createWriteStream('./utils/blasStream2.jpg'))
    .on('finish', () => {
      console.log("Imagem enviada");
      res.status(201).send('ok');
    });
  });
 }