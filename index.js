const express = require('express');
const cluster = require('cluster');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
require('dotenv').config()



const routeInit = (app) => {

    // add all your middlewares here
   
    app.use(function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, On-behalf-of, x-sg-elas-acl");
        response.header("Access-Control-Allow-Credentials", true);
        response.header("access-control-allow-methods", "*");
        next();
    });
    app.use(logger('dev'));

    app.get("/health", (req, res) => {
        GATEKEEPER.successDataResponse(res, {
            Server: process.env.APP_NAME,
            Port: process.env.APP_PORT,
            Environment: process.env.APP_ENV,
            Version: require("./package.json").version
        });
    });
    app.use(cors());




    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });


}


const init = () => {
    if (cluster.isMaster) {
        const numCPUs = require('os').cpus().length;

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });

    } else {
        var app = express();

        routeInit(app);


      
        app.listen(process.env.APP_PORT, () => console.log(" 💻 Server listening on port " + process.env.APP_PORT + " in " + process.env.APP_ENV + " mode version is " + require("./package.json").version));


        app.disable('x-powered-by');
    }
};

init();
