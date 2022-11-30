import { useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = (error, success, id) => {
  useEffect(() => {
    if (error) {
      toast(error, { type: toast.TYPE.ERROR, toastId: id });
    }
    if (success) {
      toast(success, { type: toast.TYPE.SUCCESS, toastId: id });
    }
  }, [success, error, id]);
};
