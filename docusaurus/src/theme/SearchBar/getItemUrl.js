import url from 'url';

import { website } from '../../../urls';
import { CMS_INDEX } from '../../../constants';

export const getItemUrl = ({ item, platform, cmsPlatform, locationQuery }) => {
  const headerId = item.header_id.replace('_', '-');
  if (item.index === CMS_INDEX) {
    return `${website.cms_docs}${url.format({
      pathname: `${cmsPlatform}/${item.slug}/`,
      query: locationQuery,
    })}${!!headerId ? `#${headerId}` : ''}`;
  }

  return `/chat/docs/sdk${url.format({
    pathname: item.slug === '' ? `/${platform}/` : `/${platform}/${item.slug}/`,
    query: locationQuery,
  })}${!!headerId ? `#${headerId}` : ''}`;
};
