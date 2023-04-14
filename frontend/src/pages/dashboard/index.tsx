import { useState } from 'react'
import { canSSRAUTH } from "@/utils/canSSRAUTH"
import Head from "next/head"
import { Header } from '../../components/Header'
import { ModalOrder } from '@/components/ModalOrder'

import Modal from 'react-modal'

import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "@/services/api";



type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps{
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}



export default function Dashoard({orders}: HomeProps){

    const [orderList, setOrderList] = useState( orders || [])

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setmodalVisible] = useState(false);

    function handleCloseModal(){
      setmodalVisible(false)
    }

    async function handleFinishItem(id: string){

      const apiClient = setupAPIClient();
      
      await apiClient.put('/order/finished', {
        order_id: id,
      })

      const response = await apiClient.get('/orders');

      setOrderList(response.data);
      setmodalVisible(false)

    }

    async function handleOpen(id: string){
      const apiClient = setupAPIClient();
      const response = await apiClient.get('/order/detail', {
        params:{
          order_id: id,
        }
      })

      setModalItem(response.data)
      setmodalVisible(true);

    }

    Modal.setAppElement('#__next')

    async function handleRefreshOrders(){
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/orders')
      setOrderList(response.data)
      
    }

    return(
       <>
        <Head>
            <title>Painel - Sujeito Pizzaria</title>
        </Head>
        <div>
            <Header />

        <main className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>Ultimos Pedidos</h1>
                <button onClick={handleRefreshOrders}>
                    <FiRefreshCcw color="#3fffa3" className={styles.fig}/>
                </button>
            </div>

            <article className={styles.ListOrder}>

              {orderList.length === 0 &&(
                <span className={styles.emptyList}>
                  Nenhum pedido aberto foi encontrado...
                </span>
              )}

              {orderList.map( item => (
                    
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpen(item.id)}>
                      <div className={styles.tag}></div>
                      <span>Mesa {item.table}</span>
                  </button>
                </section>
              ))}

            </article>

        </main>
        {modalVisible && (
          <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={ handleFinishItem }
          />
        )}
        </div>
       </>
    )
}

export const getServerSideProps = canSSRAUTH(async(ctx) => {


  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/orders")

  

    return {
        props:{
          orders: response.data
        }
    }
})

