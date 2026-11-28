import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const createUser =  async (req :Request, res : Response) => {
    try {
        const result = await authServices.createUserIntoDB(req.body)
        sendResponse(res, {
            status : 201,
            success : true,
            message : "User registered successfully",
            data : result.rows[0]
        })
    } catch (error : any) {
        sendResponse(res, {
            status : error.status || 500,
            success : false,
            message : error.message || "Something went wrong"
        })
    }
}

const loginUser = async (req :Request, res : Response) => {
    try {
        const result = await authServices.loginUserIntoDB(req.body)
        sendResponse(res, {
            status: 200,
            success: true,
            message: "Login successful",
            data: result
        })

    } catch (error: any) {
        sendResponse(res, {
            status: error.status || 500,
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

const getUser = async (req : Request, res : Response) => {

    try {
        
        const result = await authServices.getUserFromDB()

        if(result.rowCount === 0) {
               return sendResponse(res, {
                status : 404,
                success : false,
                message : "User not Found",
               })}

    sendResponse(res, {
        status : 200,
        success : true,
        message : "User retrieved Successfully",
        data : result.rows
    })
    } catch (error : any) {
        sendResponse(res, {
            status : 500,
            success : false,
            message : error?.message
        })
    }
}

export const authController = {
    createUser,
    loginUser,
    getUser
}