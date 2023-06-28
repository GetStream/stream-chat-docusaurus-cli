import React from 'react';

import OriginalRoot from '@theme-original/Root';

import { DocusaurusContextProvider } from '../../contexts/DocusaurusContext';
import { BreadcrumbsContextProvider } from '../../contexts/BreadcrumbsContext';

export default function DocItem(props) {
  return (
    <DocusaurusContextProvider>
      <BreadcrumbsContextProvider>
        <OriginalRoot {...props} />
      </BreadcrumbsContextProvider>
    </DocusaurusContextProvider>
  );
}
