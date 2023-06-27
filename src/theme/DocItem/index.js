import React, { useMemo } from 'react';

import { useLocation, Link } from '@docusaurus/router';
import OriginalDocItem from '@theme-original/DocItem';

import { useBreadcrumbsContext } from '../../hooks/useBreadcrumbsContext';
import { FeedbackFormProvider } from '../../hooks/useFeedbackFormData';

import { folderMapping } from '../../../constants';
import { docs, website } from '../../../urls';

import URLS from '../../../urls';
import productVariables from '../../product-variables';

import './styles.scss';

const PRODUCT = process.env.PRODUCT;
const { productTitle } = productVariables[PRODUCT];

export default function DocItem(props) {
  return (
    <FeedbackFormProvider title={props.content.metadata.title}>
      <SiteNavbar />
      <OriginalDocItem {...props} />
    </FeedbackFormProvider>
  );
}

const SiteNavbar = () => {
  const { breadcrumbs } = useBreadcrumbsContext();

  const location = useLocation();
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, '')
      .split('/');
    return urlPlatform;
  }, [location.pathname]);

  const platform = folderMapping[locationPlatform];

  const breadcrumbsWithSeparators = useMemo(
    () =>
      breadcrumbs.flatMap((value, index, array) =>
        array.length - 1 !== index && value.type !== 'category'
          ? [value, { type: 'separator' }]
          : value
      ),
    [breadcrumbs]
  );

  const breadcrumbItems = useMemo(
    () =>
      breadcrumbsWithSeparators.map((item, i) => {
        if (item.type === 'separator') {
          return (
            <li key={i} className="separator">
              »
            </li>
          );
        } else if (item.type === 'category') {
          return (
            <li key={i} className="category">
              {item.label}:
            </li>
          );
        }

        return <li key={i}>{item.label}</li>;
      }),
    [breadcrumbsWithSeparators]
  );

  return (
    <div className="row">
      <div className="col">
        <ul className="breadcrumbs">
          <li>
            <a href={`${website.root}/${PRODUCT}/`}>{productTitle}</a>
          </li>
          <li className="separator">»</li>
          <li>
            <Link to={docs.root}>Docs</Link>
          </li>
          {platform && (
            <>
              <li className="separator">»</li>
              <li>
                <Link to={`${docs.root}${locationPlatform}/`}>
                  {platform} UI Components
                </Link>
              </li>
              <li className="separator">»</li>
              {breadcrumbItems.map((item) => item)}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
