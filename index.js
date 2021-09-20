const express = require('express');
const cluster = require('cluster');
const cors = require('cors');
const path = require('path');

const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser')

require('dotenv').config()
var server;
const routerIndex = require('./src/routes')
const GATEKEEPER = require('./src/gatekeeper/gatekeeper')


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
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    app.get("/health", (req, res) => {
        GATEKEEPER.successDataResponse(res, {
            Server: process.env.APP_NAME,
            Port: process.env.APP_PORT,
            Environment: process.env.APP_ENV,
            Version: require("./package.json").version
        });
    });
    app.use(cors());
    const favicon = new Buffer.from('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64'); 
    app.get("/favicon.ico", function(req, res) {
     res.statusCode = 200;
     res.setHeader('Content-Length', favicon.length);
     res.setHeader('Content-Type', 'image/x-icon');
     res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
     res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
     res.end(favicon);
    });
    app.use('/api/v1', routerIndex)



    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(404).send('Unable to find the requested resource!');
    });


}


const init = () => {
    var starter = process.argv[1].split(path.sep).pop();

    if (cluster.isMaster && starter === 'index.js') {
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


      
        server = app.listen(process.env.APP_PORT, () => console.log(" 💻 Server listening on port " + process.env.APP_PORT + " in " + process.env.APP_ENV + " mode version is " + require("./package.json").version));


        app.disable('x-powered-by');
        
    }
    
};

init();

module.exports = server
