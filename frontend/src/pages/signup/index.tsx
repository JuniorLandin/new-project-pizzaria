import { useState, FormEvent, useContext } from 'react'

import Head from "next/head"
import styles from '../../styles/home.module.scss'
import Image from "next/image"

import {Input} from '@/components/ui/Input'
import { Button } from "@/components/ui/Button"

import { AuthContext } from '@/contexts/AuthContext'

import Link from "next/link"

import logoImg from '../../../src/assets/logoUnitri.png'
import { toast } from 'react-toastify'

export default function Signup() {

  const {  signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.warning("Preencha todos os campos.")
    }

    setLoading(true);


    let data={
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }

  

  
  return (
      <>
        <Head>
          <title>Faça seu cadastro agora!</title>
        </Head>
        <div className={styles.containerCenter}>

          <Image src={logoImg} alt="Logo Sujeito Pizzaria" width={600} height={360}/>


          <div className={styles.login}>

            <h1>Criando sua conta</h1>


            <form onSubmit={handleSignUp}>

            <Input 
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input 
                placeholder="Digite seu email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />  

              <Button 
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>

            </form>

            <Link legacyBehavior href="/">
              <a className={styles.text}>Já possui uma conta? Faça seu login</a>
            </Link>
            
          </div>
          
        </div>
      </>
  )
}
