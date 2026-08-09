import type { NextFunction, Request, Response } from "express";
import fs from 'fs'

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] Method: ${req.method} | URL: ${req.url}\n`;

    fs.appendFile('logger.txt', log, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    next();
};


export default logger