import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

const ToastContext = React.createContext();

export const ToastProvider = ({children}) => {
    const [device, setDevice] = React.useState('mobile');

    const showToastMobile = React.useCallback(({type, msg}) => {
        toast[type](msg, {
            position: 'top-center',
            hideProgressBar: false,
        })
    }, []);

    const showToastDesktop = React.useCallback(({type, msg}) => {
        toast[type](msg, {
            hideProgressBar: false,
        })
    }, []);

    const showToast = React.useCallback(({message, type}) => {
        switch(device) {
            case "mobile" :
                showToastMobile({
                    type,
                    msg: message
                });
                break;

            case "desktop":
                showToastDesktop({
                    type,
                    msg: message
                });
                break;
        }
    }, [device, showToastDesktop, showToastMobile]);

    const handleDevide = React.useCallback(({device}) => {
        switch (device) {
            case 1:
              setDevice('mobile');
              break;
            case 0:
                setDevice('desktop');
                break;
            default:
              break;
        }
    }, []);

    return (
        <ToastContext.Provider
            value={{
                showToast,
                handleDevide
            }}
        >
            <ToastContainer closeOnClick />
            {children}
        </ToastContext.Provider>
    )
}

export const ToastConsumer = ToastContext.Consumer;

export default ToastContext;
