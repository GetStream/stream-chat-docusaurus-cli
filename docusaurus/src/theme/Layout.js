import React from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';

export default function Layout(props) {
  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  if (
    process.env.DEPLOYMENT_ENV === 'production' &&
    window.location.pathname === '/chat/docs/sdk/'
  ) {
    window.location.replace('https://getstream.io/chat/docs/');
    return null;
  }
  return (
    <>
      <ToastContainer />
      <OriginalLayout {...props} />
    </>
  );
}
