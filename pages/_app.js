import '../styles/globals.css'
import '../styles/login.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-tiny-fab/dist/styles.css';
import ContextProvider from '../contexts';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
