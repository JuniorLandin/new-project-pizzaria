import prismaClient from "../../prisma";

interface FinishedRequest{
    order_id: string;
}

class FinishedOrderService{
    async execute({ order_id }: FinishedRequest){
        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data:{
                status: true,
            }
        })

        return order;
    }
}

export { FinishedOrderService }