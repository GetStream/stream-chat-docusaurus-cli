import React from 'react';

import OriginalLayout from '@theme-original/Layout';
import { ToastContainer } from 'react-toastify';
import { FeedbackFormProvider } from '../components/FeedbackForm';

export default function Layout(props) {
  return (
    <>
      <ToastContainer />
      <FeedbackFormProvider>
        <OriginalLayout {...props} />
      </FeedbackFormProvider>
    </>
  );
}
