/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useThemeConfig } from '@docusaurus/theme-common';

import { FeedbackForm } from '../../components/FeedbackForm';

import './styles.scss';

const Heading = (Tag) =>
  function TargetComponent({ id, ...props }) {
    const copyLink = (e) => {
      navigator?.clipboard?.writeText(e.target.href);
    };

    const {
      navbar: { hideOnScroll },
    } = useThemeConfig();

    if (!id) {
      return <Tag {...props} />;
    }

    return (
      <>
        {Tag === 'h2' && <FeedbackForm />}
        <Tag className="heading" {...props}>
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
