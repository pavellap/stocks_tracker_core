import cookieParser from 'cookie-parser';
// simple logger
// todo: find out how logger works
import morgan from 'morgan';
// express middleware helping to handle with security stuff
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import BaseRouter from './routes';
import logger from '@shared/Logger';
const app = express();

const { BAD_REQUEST } = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);
app.get("/", (res, req, next) => {
    req.send("TEST ECHO")
})

// Print API errors
app.use((err: Error, req: Request, res: Response) => {
    logger.err(err, false);
   /* return res.status(BAD_REQUEST).json({
        error: err.message,
    });*/
});

// Export express instance
export default app;
