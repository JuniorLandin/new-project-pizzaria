import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import LogoUnitri from '../../assets/LogoUnitriReto.png'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'

export function Header(){

    const {signOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link legacyBehavior href='/dashboard'>
                    <img src={LogoUnitri.src} width={190} height={160}/>
                </Link>

                <nav className={styles.menuNav}>
                    <Link legacyBehavior href='/category'>
                        <a>New Category</a>
                    </Link>

                    <Link legacyBehavior href='/product'>
                        <a>Cardapio</a>
                    </Link>

                    <Link legacyBehavior href='/products'>
                        <a>Produtos</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24}/>
                    </button>

                </nav>

            </div>
        </header>
    )
}
