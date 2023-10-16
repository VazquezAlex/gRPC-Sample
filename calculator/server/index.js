const grpc = require('@grpc/grpc-js');
const { CalculatorServiceService } = require('./../proto/calculator_grpc_pb');
const serviceImpl = require('./serviceImpl');

const addr = 'localhost:50051';

async function cleanup(server) {
    console.log('Cleanup');

    if (server) {
        server.forceShutdown();
    }
}

function main() {
    const server = new grpc.Server();

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        cleanup(server);
    });

    const creds = grpc.ServerCredentials.createInsecure();

    server.addService(CalculatorServiceService, serviceImpl);
    server.bindAsync(addr, creds, (err, _) => {
        if (err) {
            return cleanup(server);
        }

        server.start();
    })

    console.log(`Listening on ${ addr } `);
}

main();