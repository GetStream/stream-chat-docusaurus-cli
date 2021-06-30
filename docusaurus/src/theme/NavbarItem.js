import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavbarItem from '@theme-original/NavbarItem';

import { useIsUserLoggedIn } from '../hooks/useIsUserLoggedIn';

const baseUrl = '/chat/docs/sdk';

export default function NavbarItem(props) {
  const { docsPluginId, label, type, items } = props;
  const { pathname } = useLocation();
  const selectedSDK = useMemo(() => {
    if (label === 'SDK' && items.length) {
      return items.find((item) => pathname.includes(`${baseUrl}/${item.id}/`));
    }
  }, [items, label, pathname]);

  if (selectedSDK) {
    return <PlatformNavbarItem {...props} label={PlatformLabel(selectedSDK)} />;
  }

  if (
    type === 'docsVersionDropdown' &&
    pathname
      .replace(' ', '')
      .search(new RegExp(`${baseUrl}/${docsPluginId}/.*`, 'g')) === -1
  ) {
    return null;
  }

  if (label === 'github') {
    return !pathname.includes(`/${props.platform}/`) ? null : (
      <OriginalNavbarItem {...props} label="" />
    );
  }

  const isUserLoggedIn = useIsUserLoggedIn();

  if (label === 'Sign Up') {
    if (isUserLoggedIn) {
      return null;
    }
  }

  return <OriginalNavbarItem {...props} />;
}

const PlatformNavbarItem = ({ items, ...props }) => {
  const sdks = useMemo(
    () => items.map((sdk) => ({ ...sdk, label: PlatformLabel(sdk) })),
    [items]
  );
  return <OriginalNavbarItem {...props} items={sdks} />;
};

const PlatformLabel = ({ id, label }) => (
  <span className="navbar__link__sdk">
    <img
      src={`${baseUrl}/icon/${id}.svg`}
      alt={`${label} logo`}
      className="navbar__link__sdk__icon"
    />
    {label}
  </span>
);
