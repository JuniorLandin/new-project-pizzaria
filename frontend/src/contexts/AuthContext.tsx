import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '@/services/apiClient';

import { toast } from 'react-toastify'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { type } from 'os';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void
  signUp: (credentials: SignUpProps) => void
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps ={
  email: string;
  name: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, `@sujeitopizza.token`)
    Router.push('/')
  }catch{
    console.log("Erro ao deslogar")
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    
    //Tentar pegar algo no cookie
    const {'@sujeitopizza.token': token}  = parseCookies();

    if(token){
      api.get('/me').then(response=>{
        const {id, name, email} = response.data;

        setUser({
          id,
          name,
          email
        })
      })
      .catch(() => {
        //se deu erro deslogamos o user
        signOut();
      })
    }


  }, [])

  //Logando usuários.

  async function signIn({ email, password}: SignInProps){

    try{
      const response = await api.post('/session', {
        email,
        password
      })
      
      const { id, name, token} = response.data;

      setCookie(undefined, '@sujeitopizza.token', token, {
        maxAge: 60 * 60 * 24 * 30, // expirar em 1 mês
        path: "/" //Quais caminhos terá acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para a próximas requisições o token.
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Logado com sucesso")

      //Redirecionar o user para /dashboard
      Router.push('/dashboard')


    } catch(err)
    {
      //console.log("erro ao acessar", err)
      toast.error("Erro ao acessar!")
      console.log("Erro ao acessar.")
    }

  }

  //Cadastrando usuários.
  async function signUp({email, name, password}: SignUpProps) {

    try{

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success("Conta criada com sucesso")

      Router.push('/')

    }catch(err){
      //Erro ao cadastrar
      toast.error("Erro ao cadastrar")
      console.log("Erro ao cadastrar", err)
    }

  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}