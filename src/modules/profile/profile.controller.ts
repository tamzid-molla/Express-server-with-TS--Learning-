import type { Request, Response } from "express";
import type { IProfile } from "./profile.interface.js";
import { profileService } from "./profile.service.js";

const createProfile = async (req: Request, res: Response) => {
    const data: IProfile = req.body;
    
    try {
        const result = await profileService.createProfileIntoDB(data);

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: result
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
            error : error
        })
    }
}


export const profileController = {
    createProfile,

}