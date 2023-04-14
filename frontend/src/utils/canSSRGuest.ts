import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next'
import { parseCookies } from 'nookies'

//funcao para páginas que só pode ser acessadas por visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        //Se o cliente acessar a página, porém, tendo um login salvo, será redirecionado.
        if(cookies['@sujeitopizza.token']){
            return{
                redirect:{
                    destination:'/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}