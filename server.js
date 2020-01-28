const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./users/users-router');

const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 3000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api', userRouter);


module.exports = server