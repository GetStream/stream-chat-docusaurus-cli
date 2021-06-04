import React from 'react';

import OriginalDocPaginator from '@theme-original/DocPaginator';

import { FeedbackForm } from '../../components/FeedbackForm';

export default function DocPaginator(props) {
  return (
    <>
      <FeedbackForm title={props.metadata.title} />
      <OriginalDocPaginator {...props} />
    </>
  );
}
