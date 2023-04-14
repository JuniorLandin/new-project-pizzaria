import Head from "next/head";
import { Header } from '../../components/Header'
import { useState, FormEvent } from "react"
import styles from './styles.module.scss'
import { toast } from "react-toastify";

//api
import { setupAPIClient } from "@/services/api";
import { canSSRAUTH } from "@/utils/canSSRAUTH";


export default function Category(){

    const [categoria, setCategoria] = useState("");

    async function handleRegistrer(event: FormEvent){
        event.preventDefault();

        if(categoria === ''){
          return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
          name: categoria
        })

        toast.success('Categoria cadastrada com sucesso.')
        setCategoria('')
    }

    return(
        <>
          <Head>
            <title>Nova categoria - Sujeito Pizzaria</title>
          </Head>
            
          <div>
            <Header/>

              <main className={styles.container}>
                <h1>Cadastrar categoria</h1>

                <form className={styles.form} onSubmit={handleRegistrer}>

                  <input
                    placeholder="Digite o nome das categorias"
                    type="text"
                    value={categoria}
                    className={styles.input}
                    onChange={(e) => setCategoria(e.target.value)}
                    />

                  <button className={styles.button}>
                      Cadastrar
                  </button>

                </form>

              </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAUTH(async(ctx) => {
  return {
      props:{}
  }
})
