import { AddItemService } from "../../services/orders/AddItemService";
import { Request, Response } from "express";

class AddItemController{
    async handle(req: Request, res: Response){

        const {order_id, product_id, amount} = req.body

        const addItemService = new AddItemService();

        const order = await addItemService.execute({
            order_id,
            product_id,
            amount
        })
        return res.json(order)
    }
}

export { AddItemController }