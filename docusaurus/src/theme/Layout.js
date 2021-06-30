import React, { useEffect, useState } from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../contexts/AuthContext';

export default function Layout(props) {
  const [canRender, setCanRender] = useState(
    process.env.DEPLOYMENT_ENV !== 'production'
  );
  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  useEffect(() => {
    if (
      process.env.DEPLOYMENT_ENV === 'production' &&
      window.location.pathname === '/chat/docs/sdk/'
    ) {
      window.location.replace('https://getstream.io/chat/docs/');
    } else {
      setCanRender(true);
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <OriginalLayout {...props} />
      </AuthContextProvider>
    </>
  );
}
