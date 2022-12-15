import NavBar  from '../components/NavBar';
import store from '../Store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Auth from '../context/Auth';
import {ToastContainer}  from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <Auth>
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer autoClose={1000} pauseOnHover/>
      </Auth>
    </Provider>
  ) 
}

export default MyApp
