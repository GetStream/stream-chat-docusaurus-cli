import React from 'react';

import OriginalRoot from '@theme-original/Root';

import { DocusaurusContextProvider } from '../contexts/DocusaurusContext';

export default function DocItem(props) {
  return (
    <DocusaurusContextProvider>
      <OriginalRoot {...props} />
    </DocusaurusContextProvider>
  );
}
