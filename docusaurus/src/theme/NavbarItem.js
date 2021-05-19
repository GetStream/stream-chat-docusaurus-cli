import React from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavBarItem from '@theme-original/NavbarItem';

const baseUrl = '/chat/docs/sdk';

export default function NavbarItem(props) {
  const { docsPluginId, items, label, type } = props;
  const { pathname } = useLocation();

  if (
    type === 'docsVersionDropdown' &&
    pathname
      .replace(' ', '')
      .search(new RegExp(`${baseUrl}/${docsPluginId}/.*`, 'g')) === -1
  ) {
    return null;
  }

  if (
    label === 'SDK' &&
    items.length > 0 &&
    items.some((item) => pathname.includes(`${baseUrl}/${item.to}/`))
  ) {
    const SDK = items.find(
      (item) =>
        pathname.search(new RegExp(`${baseUrl}/${item.to}/.*`, 'g')) !== -1
    );

    return (
      <>
        <OriginalNavBarItem {...props} label={SDK.label} />
      </>
    );
  }

  return (
    <>
      <OriginalNavBarItem {...props} />
    </>
  );
}
