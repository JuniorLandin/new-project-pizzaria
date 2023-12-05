import prismaClient from "../../prisma";


interface ProductRequest{
  product_id: string;
  product_name: string;
  product_price: string;
  product_description: string;
  product_created_at: Date;
  product_update_at: Date;
  product_category_id: string
}

class UpdateProductService{
    async execute({
      product_id,
      product_name, 
      product_price, 
      product_description, 
      product_created_at, 
      product_update_at,
      product_category_id
    }: ProductRequest){
        
        const product = await prismaClient.product.update({
            where:{
                id: product_id,                
            },
            data: {
              name: product_name,
              price: product_price,
              description: product_description,
              created_at: product_created_at,
              update_at: product_update_at,
              category_id: product_category_id
              // Adicione outros campos aqui, se necessário
            },
        })
        return product;
    }
}


export { UpdateProductService }