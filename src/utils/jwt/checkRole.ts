import "dotenv/config";

import { Request, Response, NextFunction, RequestHandler } from "express"

import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { sendErrorResponse } from "../../responses"
import { AppError } from "../types/AppError"
import { UserModel, UserRole } from "../../entities/user/model";

export default async function checkRole(requiredRole: UserRole): Promise<RequestHandler> {
    return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")

    const jwt_secret = process.env.JWT_SECRET

    if(!token){ return sendErrorResponse(res, new AppError('Authorization header is required'), 401)}
    if(!jwt_secret){ return sendErrorResponse(res, new AppError('Services with Auth is unavaible', 503))}

    try {
        const decoded = jwt.verify(token, jwt_secret)

        if(!decoded || typeof decoded !== 'object'){
            throw new AppError("Invalid jwt body", 401)
        }

        const user = await UserModel.findOne({email: decoded.email}).lean().exec()

        if(user === null){
            throw new AppError("Email was not founded.")
        }

        res.locals.user = user

        next()
    } catch (e: unknown) {
        if(e instanceof JsonWebTokenError){
            throw new AppError("Invalid token", 401)
        } else if (e instanceof AppError){
            throw new AppError(e.message, e.statusCode)
        } else {
            throw new AppError("Unkown error")
        }
    }
}
}