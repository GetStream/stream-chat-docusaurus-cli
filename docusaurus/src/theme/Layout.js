import React, { useEffect, useState } from 'react';
import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';

import URLS from '../../urls';
import { AuthContextProvider } from '../contexts/AuthContext';

const isBrowser = typeof window !== `undefined`;
const isProd = process.env.DEPLOYMENT_ENV === 'production';

export default function Layout(props) {
  const isRootPath = isBrowser && window.location.pathname === URLS.docs.root;
  const [canRender, setCanRender] = useState(!isProd || !isRootPath);

  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  useEffect(() => {
    if (isProd && isRootPath) {
      window.location.replace(URLS.website.cms_docs);
    } else if (!canRender) {
      setCanRender(true);
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <AuthContextProvider>
      <ToastContainer />
      <OriginalLayout {...props} />
    </AuthContextProvider>
  );
}
