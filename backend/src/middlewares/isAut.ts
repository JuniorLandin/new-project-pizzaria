import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAut(
    req: Request,
    res: Response, 
    next: NextFunction
    ){

    //RECEBER O TOKEN
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();

    }

    const [, token] = authToken.split(" ")

    try{
        //VALIDAR O TOKEN
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload;

        //Recuperar o id do token e colocar dentro de uma variável user_id dentro do Req
        req.user_id = sub;

        return next();

    } catch(err){
        return res.status(401).end();
    }

}