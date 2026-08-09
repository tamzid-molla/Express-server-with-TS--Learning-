import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/config.js";
import pool from "../config/db.js";


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers?.authorization;

        if (!token) {
            res.status(401).json({
                success: false,
                message:"Unauthorize access!!"
            })
        }

        //decoded token 
        const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;

        //find user 
        const userData = await pool.query(`
            SELECT * FROM users
            WHERE email = $1
            `, [decoded?.email])
        
        if (userData.rows.length === 0) {
            res.status(404).json({
                success: false,
                message:"User not found"
            })
        }

        req.user = decoded;

        next()
        } catch (error) {
            next(error)
        }
    }
};

export default auth