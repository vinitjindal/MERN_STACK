import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import LoginModal from './LoginModal';
import { useState } from 'react';
import { useAuthContext } from '../context/Auth';
import toast from '../toast/index';


const NavBar = () =>{


  const {handleRole, handleToken, isAuthenticated, role} = useAuthContext();
  const router = useRouter();
  const [loginModal, setLoginModal] = useState(false);
  const path = router.pathname;
  
  const favourites = path === '/favourites' ? true : false;
  
  const handleLogin = () =>{
    setLoginModal(true);
  }
  const handleLogout = () =>{
    toast.success('successfully Loged Out')
    handleRole(null);
    handleToken(null)
    router.push('/')
  }

  return(
    <>
        {loginModal && <LoginModal setLoginModal={setLoginModal}/>}
        <div className={styles.navContainer}>
          <ul className={styles.navItems}>
            <li className={styles.navItem1}> 
              <Link href={'/'}>
                  <a>Tourist</a>
              </Link>
            </li>
            
            {isAuthenticated && role && role === 'ADMIN' && <li className={styles.navItem3} 
              style={path === '/add-places' ? {borderBottom: '1px solid'} : {}}>
            <Link href={'/add-places'}><a>Add Places</a></Link> 
            </li>}
            {isAuthenticated && role && role === 'CLIENT' && <li className={styles.navItem2} style={favourites ? {borderBottom: '1px solid'} : {}} >
              <Link href={'/favourites'}> 
                <a>Favourites</a> 
              </Link>
            </li>
            }


            { isAuthenticated && <li className={styles.navItem3} onClick={handleLogout}>Logout</li>}           
            { !isAuthenticated && <li className={styles.navItem3} onClick={handleLogin}>Login</li>} 
          </ul>
        </div>
    </> 
  )
}

export default NavBar;