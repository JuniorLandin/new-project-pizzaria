import { Request, Response } from "express";
import { DeleteBtCategoryProductService } from "../../services/product/DeleteCategoryProductService";


class DeleteBtCategoryProductController{
    async handle(req: Request, res: Response){
        const product_id = req.params.product_id as string;

        const removeOrderService = new DeleteBtCategoryProductService();

        const order = await removeOrderService.execute({
          product_id
        })

        return res.json(order)
    }
}

export { DeleteBtCategoryProductController };