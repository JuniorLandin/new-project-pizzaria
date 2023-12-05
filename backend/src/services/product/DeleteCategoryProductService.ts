import prismaClient from "../../prisma";


interface ProductRequest{
  product_id: string;
}

class DeleteBtCategoryProductService{
    async execute({product_id}: ProductRequest){
        
        const product = await prismaClient.product.delete({
            where:{
                id: product_id,
            }
        })
        return product;
    }
}


export { DeleteBtCategoryProductService }