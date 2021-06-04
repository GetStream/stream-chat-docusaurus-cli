import React from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';

export default function Layout(props) {
  return (
    <>
      <ToastContainer />
      <OriginalLayout {...props} />
    </>
  );
}
