import React from 'react';

import OriginalDocItem from '@theme-original/DocItem';

import { FeedbackFormProvider } from '../../hooks/useFeedbackFormData';

export default function DocItem(props) {
  return (
    <FeedbackFormProvider title={props.content.metadata.title}>
      <OriginalDocItem {...props} />
    </FeedbackFormProvider>
  );
}
