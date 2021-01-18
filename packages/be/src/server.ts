import express from 'express'
import bodyParser from'body-parser';
import helmet from'helmet';
import generatorAPI from'./routes/api/generator';
import hpp from'hpp';

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

const app = express();

// Middleware
app.use(
    helmet({
        hidePoweredBy: 'PHP/7.4.0',
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(hpp());

//import generator routes
generatorAPI(app);

// default -- fallback
const notFound = {
    msg: 'not found',
    success: false
};
app.get('*', function(req, res) {
    res.status(404).json(notFound);
});

app.post('*', function(req, res) {
    res.status(404).json(notFound);
});


process.on('SIGINT', function() {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    process.exit();
});

export default app
