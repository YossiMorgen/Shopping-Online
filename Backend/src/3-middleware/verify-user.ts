import { ValidationErrorModel } from '../4-models/error-models';
import {Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

async function verifyUser(req: Request, res: Response, next: NextFunction){
    try {
        const decodeUser = await cyber.getDecodeToken(req);
        console.log(decodeUser);

        console.log(decodeUser.userID);
        console.log(+req.body.userID);
        
        
        console.log( decodeUser.userID !== +req.body.userID);
        
        if( decodeUser.userID !== +req.body.userID){
            throw new ValidationErrorModel('you are not allowed to access this resource');
        } 
        
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyUser;