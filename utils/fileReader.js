//Aprendendo Buffer.
const fs = require('fs');

//Utilizando buffer.
fs.readFile('blas.jpg', (error, buffer) => { 
  console.log('Arquivo lido');

  fs.writeFile('./utils/blasBuffer.jpg', buffer, () => console.log('Arquivo escrito'));
})