import { createElement } from 'react';

function getPropertyByPath(object, path) {
  if (!path) return object;
  const parts = path.split('.');

  return parts.reduce((current, key) => current && current[key], object);
}

export function Snippet({ hit, attribute, tagName = 'span', ...rest }) {
  return createElement(tagName, {
    ...rest,
    dangerouslySetInnerHTML: {
      __html:
        getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
        getPropertyByPath(hit, attribute),
    },
  });
}
