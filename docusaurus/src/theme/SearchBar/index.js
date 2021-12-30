/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import Head from '@docusaurus/Head';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';

import { DocSearchModal } from './DocSearchModal';

import('@docsearch/react/style');
import('./styles.css');

import URLS from '../../../urls';

function DocSearch({ contextualSearch, ...props }) {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, '')
      .split('/');
    return urlPlatform;
  }, [location.pathname]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(() => {}, []);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  const globalData = useGlobalData();
  const SDKS = globalData['docusaurus-plugin-content-docs'];

  if (!SDKS[locationPlatform]) return null;

  const translatedSearchLabel = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      {locationPlatform && (
        <DocSearchButton
          onClick={onOpen}
          ref={searchButtonRef}
          translations={{
            buttonText: translatedSearchLabel,
            buttonAriaLabel: translatedSearchLabel,
          }}
        />
      )}

      {isOpen && (
        <DocSearchModal onClose={onClose} locationPlatform={locationPlatform} />
      )}
    </>
  );
}

function SearchBar() {
  const { siteConfig } = useDocusaurusContext();
  return <DocSearch {...siteConfig.themeConfig.algolia} />;
}

export default SearchBar;
