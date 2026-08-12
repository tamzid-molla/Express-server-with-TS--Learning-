import express, { type Application, type Request, type Response } from "express"
import { userRouter } from "./modules/user/user.route.js";
import { profileRouter } from "./modules/profile/profile.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import logger from "./middleware/logger.js";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";


export const app: Application = express();
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5001/'
}));


// await pool.query(`
//     CREATE TABLE IF NOT EXISTS users(
//     id SERIAL PRIMARY KEY,
//     name varchar(20),
//     email varchar(20) UNIQUE NOT NULL,
//     password varchar(255) NOT NULL,
//     is_active BOOLEAN DEFAULT true,
//     age INT,
//     role VARCHAR(10) DEFAULT 'user',
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
//     )
//     `)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server running good"
    })
});


app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);

app.use(globalErrorHandler)