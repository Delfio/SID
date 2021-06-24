import '../styles/globals.css'
import '../styles/login.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-tiny-fab/dist/styles.css';
import {ToastProvider} from '../contexts/ToastContext';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
