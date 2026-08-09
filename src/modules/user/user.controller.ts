import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import type { IUser } from "./user.interface.js";

const createUser = async (req: Request, res: Response) => {
    const data: IUser = req.body;
    try {
        const result = await userService.createUserIntoDB(data)
        console.log(result);
        res.status(201).json({
            success: true,
            data: result,
            message: "User created successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message
        })
    }
};

//Get all users
const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            data: result,
            message: "All user fetched successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//Get single user
const getSingleUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUserFromDb(id);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };
        res.status(200).json({
            success: true,
            data: result[0],
            message: "User found this id"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await userService.updateUserToDB(id, data);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        res.status(200).json({
            success: true,
            data: result[0],
            message: "User data update successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const deleteUser = async (req: Request<{id:string}>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        res.status(200).json({
            success: true,
            message: "User Deleted successfully"
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}