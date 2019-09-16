//Aprendendo Stream.
const fs = require('fs');

fs.createReadStream('./utils/blas.jpg')
  .pipe(fs.createWriteStream('./utils/blasStream.jpg'))
  .on('finish', () => console.log('Arquivo escrito'));