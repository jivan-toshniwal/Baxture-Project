const cluster = require('cluster');
const os = require('os');
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

if (cluster.isMaster) {
  // Get the number of available CPUs
  const numCPUs = os.cpus().length;

  // Fork workers
  for (let i = 1; i <= numCPUs; i++) {
    const port = 4000 + i;
    cluster.fork({ PORT: port });
    console.log(`Server is running on PORT ${port}`);
  }

  // Handle worker exit, fork a new one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork({ PORT: worker.process.env.PORT }); // Pass PORT as an environment variable
  });

  // Create a simple HTTP server for load balancing
  const server = http.createServer((req, res) => {
    const worker = Object.values(cluster.workers)[0]; // Choose the first worker
    proxy.web(req, res, {
      target: `http://localhost:${worker.process.env.PORT}`,
    });
  });

  server.listen(4000, () => {
    console.log('Load balancer listening on port 4000');
  });
} else {
  // Worker processes
  require('./src/index');
}
