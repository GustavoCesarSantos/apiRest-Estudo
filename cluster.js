//Aprendendo cluster
const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();
console.log('executando thread');

if(cluster.isMaster){
  console.log('Thread principal');
  
  for(let cpu of cpus){
    cluster.fork();
  }

  cluster.on('listening', (worker) => {
    console.log(`cluster conectado: ${worker.process.pid}`);
  });

  cluster.on('exit', (worker) => {
    console.log(`cluster desconectado: ${worker.process.pid}`);
    cluster.fork();
  })
}else{
  console.log('Thread slave');
  require('./index');
}