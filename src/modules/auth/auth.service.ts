import bcrypt from "bcryptjs";
import pool from "../../config/db.js";
import type { IAuth } from "./auth.interface.js";
import jwt from "jsonwebtoken"
import config from "../../config/config.js";


const loginUserIntoDB =async (payload: IAuth) => {
    //1. is user exists ?
    //2. compare password 
    //3. generate access token
    
    const { email, password } = payload;
    //Check user exists or not 
    const userData = await pool.query(`
        SELECT * FROM users 
        WHERE email = $1
        `, [email]);
    
    if (userData.rows.length === 0) {
        throw new Error("Invalid credentials");
    };

    const user = userData.rows[0];

    //Compare password 
    const matchPassword = bcrypt.compare(password, user?.password);
    if (!matchPassword) {
        throw new Error("Invalid credentials");
    };

    //Generate accessToken 
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role : user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '1D' });
    const refreshToken = jwt.sign(jwtPayload, config.refreshToken_secret as string, { expiresIn: '7D' });
    return {
        accessToken,
        refreshToken
    }
};

export const authService = {
    loginUserIntoDB
}