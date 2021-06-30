import React, { useEffect, useState } from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../contexts/AuthContext';

const isProdBuild = process.env.NODE_ENV === 'production';

export default function Layout(props) {
  const isRootPath = window.location.pathname === '/chat/docs/sdk/';
  const [canRender, setCanRender] = useState(!isProdBuild || !isRootPath);
  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  useEffect(() => {
    if (isProdBuild && isRootPath) {
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
