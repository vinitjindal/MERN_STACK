import { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import { AxiosApi } from '../config/axios';
import toast from '../toast/index.js'
import { useAuthContext } from '../context/Auth';


const LoginModal = ({setLoginModal}) =>{
    const {handleToken, handleRole} = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCloseModal = () =>{
        setLoginModal(false);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }
    
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handleLogin = () =>{
        const body ={
            email: email,
            password: password
        }
        AxiosApi.post('/authenticate/login', body)
        .then(res => {
            if(res.status === 201)
            {
               toast.success("Successfully loged in");
                handleToken(res.data);
                handleRole(res.role);
                setLoginModal(false);
            }else{
              toast.error('Credentials are not correct !')
            } 
        })
        .catch( err => {
            toast.error('Something went wrong !')
            console.log('erorr ', err)
        })
    }

    return(
        <>
            <div className={styles.modalOverlay}></div>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <span style={{left:'92%', position:'relative', fontSize:'2rem', cursor:'pointer'}} onClick={handleCloseModal}>&times;</span>
                    <h2 style={{margin: 0}}>Login</h2>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.email}><label style={{paddingTop:'12px'}}>Email:</label> 
                    <input type='email' value={email} onChange={handleEmail}/></div>
                    <div className={styles.password}><label style={{paddingTop:'12px'}}>password:</label> 
                    <input type='password' value={password} onChange={handlePassword}/></div>
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={handleLogin}>LogIn</button>
                </div>
            </div>
        </>
    )
}

export default LoginModal;