import { Request, Response } from "express";
import { FinishedOrderService } from "../../services/orders/FinishedOrderService";

class FinishedOrderController{
    async handle(req:Request, res: Response){
        //Computador lança a requisição
        const order_id = req.body.order_id as string;

        const finishedOrderService = new FinishedOrderService();

        const order = await finishedOrderService.execute({
            order_id
        })
        //Responde a requisição
        return res.json(order);
    }
}

export { FinishedOrderController }