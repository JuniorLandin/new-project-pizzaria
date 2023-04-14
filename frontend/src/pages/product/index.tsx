import {useState, ChangeEvent, FormEvent} from 'react'

import { toast } from "react-toastify";
import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '@/components/Header'

import { setupAPIClient } from '@/services/api'

import { FiUpload } from 'react-icons/fi'

import { canSSRAUTH } from '@/utils/canSSRAUTH'


type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){

  

  const [imagem, setImage] = useState("");
  const [foto, setFoto] = useState(null);

  const [categories, setCategories] =  useState( categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  const [nomeProduct, setNomeProduct] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")



  function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }

    const images = e.target.files[0];

    if(!images){
      return;
    }

    if(images.type === 'image/jpeg' || images.type === 'image/png' || images.type === 'image/jpg'){
      

      setFoto(images)
      setImage(URL.createObjectURL(e.target.files[0]))

    }
  }

  //Quando você seleciona uma nova categoria na lista
  function handleCategorie(e){
    //console.log("Posição da categoria selecionada", e.target.value)
    //console.log("Categoria selecionada ", categories[e.target.value])

    setCategorySelected(e.target.value)
  }

  async function handleProduct(e: FormEvent){
    e.preventDefault();

    try{
      const data = new FormData();

      if(nomeProduct === '' || price === '' || description === "" || foto === null){
        toast.error("Preencha todos os campos")
        return;
      }

      data.append('name', nomeProduct),
      data.append('price', price)
      data.append('description', description)
      data.append('file', foto);
      data.append('category_id', categories[categorySelected].id)


      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success("Cadastrado com sucesso.")

      setNomeProduct("")
      setPrice("")
      setDescription("")
      setFoto(null)
      setImage(null)

    }catch(err){
      toast.error("Ops, erro ao cadastrar")
    }
  }
  return(
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>

          <h1>Novo Produto</h1>

          <form className={styles.form} onSubmit={handleProduct}>

          <label className={styles.labelAvatar}>
            <span>
                <FiUpload size={30} color="#FFF"/>
            </span>

            
            <input 
              type="file"
              accept='image/png, image/jpeg'
              onChange={handleFile}
            />

              {imagem && (
                <img 
                  className={styles.preview}
                  src={imagem}
                  alt='Foto do produto'
                  width={250}
                  height={250}
                />
              )}

          </label>

          <select value={categorySelected} onChange={handleCategorie}>
                {categories.map((item, index) => {
                  return(
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })}
          </select>

          <input 
            type="text"
            placeholder='Digite o nome do produto'
            className={styles.input}
            value={nomeProduct}
            onChange={(e) => setNomeProduct(e.target.value)}
          />

          <input 
            type="text"
            placeholder='Preço do produto'
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea 
            placeholder='Descreva seu produto'
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className={styles.button} type='submit'>
            Cadastrar
          </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAUTH(async (ctx) => {
    
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/category')


  //onsole.log(response.data)

    return{
      props: {
        categoryList: response.data
      }
    }
})