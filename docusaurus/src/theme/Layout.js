import React, { useEffect, useState } from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../contexts/AuthContext';

const isBrowser = typeof window !== `undefined`;
const isProd = process.env.DEPLOYMENT_ENV === 'production';

export default function Layout(props) {
  const isRootPath =
    isBrowser && window.location.pathname === '/chat/docs/sdk/';
  const [canRender, setCanRender] = useState(!isProd || !isRootPath);
  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  useEffect(() => {
    if (isProd && isRootPath) {
      window.location.replace('https://getstream.io/chat/docs/');
    } else if (!canRender) {
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
