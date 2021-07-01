import React from 'react';
import ToastContext from '../contexts/ToastContext';

const useToast = () => React.useContext(ToastContext);

export default useToast;