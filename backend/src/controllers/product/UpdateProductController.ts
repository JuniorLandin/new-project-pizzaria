import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";


class UpdateProductController {
  async handle(req: Request, res: Response) {
    const {
      product_name,
      product_price,
      product_description,
      product_created_at,
      product_update_at,
      product_category_id
    } = req.body;

    const { product_id } = req.params;

    const updateProductService = new UpdateProductService();

    const order = await updateProductService.execute({
      product_id,
      product_name,
      product_price,
      product_description,
      product_created_at,
      product_update_at,
      product_category_id
    })

    return res.json(order)
  }
}

export { UpdateProductController };