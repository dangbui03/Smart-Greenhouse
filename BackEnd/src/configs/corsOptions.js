const allowedOrigins = require('./allowedOrigins.js');
const allowedHeaders = require('./allowedHeaders')

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    allowedHeaders: allowedHeaders,
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
}

module.exports = corsOptions;