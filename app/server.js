module.exports = (app) => {
    const cluster = require('node:cluster');
    const totalCPUs = require('node:os').cpus().length;
    const process = require('node:process');
    const { SERVER_PORT } = process.env;

    if (cluster.isMaster) {
        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < totalCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            cluster.fork();
        });

    } else {
        app.listen(SERVER_PORT, () => {
            console.log(`Server Started at port ${SERVER_PORT}`)
        })
    }
}