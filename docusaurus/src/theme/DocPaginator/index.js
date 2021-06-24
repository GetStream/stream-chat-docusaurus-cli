import React from 'react';

import OriginalDocPaginator from '@theme-original/DocPaginator';

import { FeedbackForm } from '../../components/FeedbackForm';
import { FeedbackFormButton } from '../../components/FeedbackFormButton';

export default function DocPaginator(props) {
  return (
    <>
      <FeedbackFormButton beforePaginator />
      <OriginalDocPaginator {...props} />
      <FeedbackForm />
    </>
  );
}
