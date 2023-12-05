import { Header } from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import { setupAPIClient } from "@/services/api";
import { canSSRAUTH } from '@/utils/canSSRAUTH';
import { useState } from 'react';

type ItemProps = {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface CategoryProps {
  products: ItemProps[];
}

export default function Products({ products }: CategoryProps) {

  const [categories, setCategories] = useState(products || [])

  const handleDelete = async (productId: string) => {
    try {
      // Chame a API para excluir o produto com o ID fornecido
      const apiClient = setupAPIClient();
      await apiClient.delete(`/category/product/${productId}`);

      // Atualize o estado para refletir a exclusão
      setCategories((prevCategories) =>
        prevCategories.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleUpdate = async (productId: string) => {
    try {
      // Chame a API para excluir o produto com o ID fornecido
      const apiClient = setupAPIClient();
      await apiClient.put(`/category/product/${productId}`);
      
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };


  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Produtos</h1>
        </div>
        <div className={styles.Container}>
          {categories.map((item) => {
            return (
              <div className={styles.productCard} key={item.id}>
                <div className={styles.ButtonTitle}>
                  <h3 className={styles.productTitle}>
                    {item.name}
                  </h3>
                  <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                    &#10006; {/* Código HTML para o caractere "X" */}
                  </button>
                </div>
                <span className={styles.productDescription}>
                  {item.description}
                </span>
                <span className={styles.productPrice}>
                  R$ {item.price}
                </span>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAUTH(async (ctx) => {


  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/category/product")


  return {
    props: {
      products: response.data
    }
  }
})