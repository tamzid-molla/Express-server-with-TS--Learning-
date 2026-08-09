import express, { type Application, type Request, type Response } from "express"
import pool from "./config/db.js";
import { userRouter } from "./modules/user/user.route.js";
import { profileRouter } from "./modules/profile/profile.route.js";
import { authRouter } from "./modules/auth/auth.route.js";


export const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server running good"
    })
});


app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);

