/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DocusaurusContext from '@docusaurus/context';

import { folderMapping } from '../../constants';
import URLS from '../../urls';

// Dynamically overrides docusaurus context
// Used to have unique SEO tags for SDK.
export const DocusaurusContextProvider = ({ children }) => {
  const contextValue = useDocusaurusContext();
  const { siteConfig } = contextValue;

  const location = useLocation();
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, '')
      .split('/');
    return urlPlatform;
  }, [location.pathname]);

  const platform = folderMapping[locationPlatform];
  const metaTitle = platform
    ? `Stream Chat - ${platform} SDK Docs`
    : siteConfig.title;

  return (
    <DocusaurusContext.Provider
      value={{
        ...contextValue,
        siteConfig: { ...siteConfig, title: metaTitle },
      }}
    >
      {children}
    </DocusaurusContext.Provider>
  );
};
