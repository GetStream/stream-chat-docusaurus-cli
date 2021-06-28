import React from 'react';

import Link from '@docusaurus/Link';

import { Snippet } from './Snippet';
import { SourceIcon } from './icons/SourceIcon';
import { GoToExternal } from './icons/GoToExternal';
import { getItemUrl } from './getItemUrl';

import { CMS_INDEX, languageMapping } from '../../../constants';

import './hits.scss';

export function Hits(props) {
  if (!props.collections) {
    return null;
  }

  return props.collections.map((collection) => (
    <section className="DocSearch-Hits" key={collection.source.sourceId}>
      <div className="DocSearch-Hit-source">
        {collection.items[0].section_name}{' '}
        {collection.items[0].index === CMS_INDEX && '(old website)'}
      </div>

      <ul {...props.getListProps()}>
        {collection.items.map((item, index) => {
          return (
            <Result
              key={`${item.objectID}${item.slug}`}
              item={item}
              index={index}
              collection={collection}
              platform={props.platform}
              cmsPlatform={props.cmsPlatform}
              locationQuery={props.locationQuery}
              getItemProps={props.getItemProps}
              closeSearchModal={props.closeSearchModal}
            />
          );
        })}
      </ul>
    </section>
  ));
}

export function Hit({
  hit,
  platform,
  cmsPlatform,
  locationQuery,
  closeSearchModal,
  children,
}) {
  const url = getItemUrl({ item: hit, platform, cmsPlatform, locationQuery });

  if (hit.index === CMS_INDEX) {
    return (
      <a target="_blank" href={url} style={{ textDecoration: 'none' }}>
        {children}
      </a>
    );
  }
  return (
    <Link
      to={url}
      onClick={closeSearchModal}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
}

function Result({
  item,
  index,
  getItemProps,
  collection,
  platform,
  cmsPlatform,
  locationQuery,
  closeSearchModal,
}) {
  const action = React.useRef(null);
  const title = item._highlightResult.name;
  const snippetResult = item._snippetResult;
  const path = snippetResult && snippetResult.content_serialized_text;
  const codeSnippet =
    snippetResult &&
    (snippetResult[`code_sample_${languageMapping[platform]}`] ||
      snippetResult.code_sample);

  const istLastItemOnSlug = item.slug !== collection.items[index + 1]?.slug;

  const shouldHavePath = item.includes_slug_parent && !!item.header_id;

  return (
    <li
      className={[
        'DocSearch-Hit',
        item.parent_section_id && 'DocSearch-Hit--Child',
      ]
        .filter(Boolean)
        .join(' ')}
      onTransitionEnd={() => {
        if (action.current) {
          action.current();
        }
      }}
      {...getItemProps({
        item,
        source: collection.source,
      })}
    >
      <Hit
        hit={item}
        platform={platform}
        cmsPlatform={cmsPlatform}
        locationQuery={locationQuery}
        closeSearchModal={closeSearchModal}
      >
        <div className="DocSearch-Hit-Container">
          <>
            {shouldHavePath && (
              <svg className="DocSearch-Hit-Tree" viewBox="0 0 24 54">
                <g
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {istLastItemOnSlug ? (
                    <path d="M8 6v21M20 27H8.3" />
                  ) : (
                    <path d="M8 6v42M20 27H8.3" />
                  )}
                </g>
              </svg>
            )}

            <div
              className={
                !shouldHavePath
                  ? 'DocSearch-Hit-type-icon'
                  : 'DocSearch-Hit-icon'
              }
            >
              <SourceIcon type={!item.header_id ? 'section' : undefined} />
            </div>
          </>
          <div className="DocSearch-Hit-content-wrapper">
            <Snippet
              className="DocSearch-Hit-title"
              hit={title}
              attribute="value"
            />
            <Snippet
              className="DocSearch-Hit-path"
              hit={path}
              attribute="value"
            />
            {codeSnippet && codeSnippet.matchLevel !== 'none' && (
              <Snippet
                className="DocSearch-Hit-code"
                hit={codeSnippet}
                attribute="value"
              />
            )}
          </div>
          <div className="DocSearch-Hit-external-icon">
            <GoToExternal />
          </div>
        </div>
      </Hit>
    </li>
  );
}
