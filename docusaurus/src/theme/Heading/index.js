/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useThemeConfig } from '@docusaurus/theme-common';

import { FeedbackFormButton } from '../../components/FeedbackFormButton';

import './styles.scss';

export const MainHeading = function MainHeading({ ...props }) {
  return (
    <header>
      <h1
        {...props}
        id={undefined} // h1 headings do not need an id because they don't appear in the TOC
      >
        {props.children}
      </h1>
    </header>
  );
};

export const Heading = (Tag) =>
  function TargetComponent({ id, ...props }) {
    const copyLink = (e) => {
      navigator?.clipboard?.writeText(e.target.href);
    };

    const [title, setTitle] = useState();
    const headingRef = useRef(null);

    useEffect(() => {
      if (Tag === 'h2') {
        setTitle(headingRef.current);
      }
    }, []);

    const {
      navbar: { hideOnScroll },
    } = useThemeConfig();

    if (!id) {
      return <Tag {...props} />;
    }

    return (
      <>
        {Tag === 'h2' && title && (
          <FeedbackFormButton lastHeaderTitle={title} />
        )}
        <Tag className="heading" ref={headingRef} {...props}>
          <a
            aria-hidden="true"
            tabIndex={-1}
            className={clsx('anchor', {
              enhancedAnchor: !hideOnScroll,
            })}
            id={id}
          />
          {props.children}
          <a
            className="hash-link"
            href={`#${id}`}
            onClick={copyLink}
            title={translate({
              id: 'theme.common.headingLinkTitle',
              message: 'Direct link to heading',
              description: 'Title for link to heading',
            })}
          >
            #
          </a>
        </Tag>
      </>
    );
  };

export default Heading;
