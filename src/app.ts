import express, { type Application, type Request, type Response } from "express"
import pool from "./config/db.js";
import { userRouter } from "./modules/user/user.route.js";
import { profileRouter } from "./modules/profile/profile.route.js";


export const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server running good"
    })
});


app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);


app.delete("/user/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
        //find user 
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            `,[id]);
        console.log(result)
    
        
        res.status(200).json({
            success: true,
            message: "User DELETE successfully",
            data: result.rows[0]
        })


    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})