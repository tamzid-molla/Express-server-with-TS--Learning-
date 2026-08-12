import type { Request, Response } from "express";
import type { IAuth } from "./auth.interface.js";
import { authService } from "./auth.service.js";

const loginUser = async(req: Request, res: Response) => {
    const data:IAuth = req.body;
    try {
        const result = await authService.loginUserIntoDB(data);
        const { refreshToken } = result;

        res.cookie('refreshToken', refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        });

        res.status(200).json({
            success: true,
            message: "User login successfully",
            data : result
        })
    } catch (error:any) {
         res.status(500).json({
            success: false,
             message: error.message,
            error : error
        })
    }
};

export const authController = {
    loginUser,
};