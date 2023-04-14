import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";

import { signOut } from '../contexts/AuthContext'

import { AuthTokenErrors } from '../services/errors/AuthTokenErrors'

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@sujeitopizza.token']}`,

        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === 401){
            // QUalquer erro 401 não autorizado, devemos deslogar o usuário.
            if(typeof window !== undefined){
                // Chamar a função para deslogar o usuário
                signOut();

            } else {
                return Promise.reject(new AuthTokenErrors())
            }
        }

        return Promise.reject(error);

    })
    
    return api;


}
