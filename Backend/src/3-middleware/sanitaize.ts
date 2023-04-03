import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

function sanitaize(request: Request, response: Response, next: NextFunction) {

    for (const key in request.body ) {
        if( typeof request.body[key] === 'string'){
            request.body[key] = striptags(request.body[key])
        }
    }

    next();
}

export default sanitaize;
