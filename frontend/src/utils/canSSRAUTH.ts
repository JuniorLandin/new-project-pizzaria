import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenErrors } from '@/services/errors/AuthTokenErrors';


//Função para somente user logados
export function canSSRAUTH<P>(fn:GetServerSideProps<P>){
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@sujeitopizza.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }
        try{
            return await fn(ctx);
        } catch(err){
            if(err instanceof AuthTokenErrors){
                destroyCookie(ctx, '@sujeitopizza.token')


                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }

    }
}
