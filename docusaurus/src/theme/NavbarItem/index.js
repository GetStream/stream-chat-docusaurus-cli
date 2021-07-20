import React, { useMemo } from 'react';
import { useLocation, Link } from '@docusaurus/router';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import { useActiveVersion } from '@theme/hooks/useDocs';

import { useAuthContext } from '../../hooks/useAuthContext';

import './styles.scss';

const baseUrl = '/chat/docs/sdk';

function GithubReleaseLink(props) {
  const activeVersion = useActiveVersion(props.platform);

  return (
    activeVersion.name !== 'current' && (
      <OriginalNavbarItem
        {...props}
        href={`${props.href}releases/tag/${activeVersion.label}`}
        className="navbar__link__github__release"
        label={activeVersion.label}
      />
    )
  );
}

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
      <div className="navbar__link__github__info">
        <OriginalNavbarItem {...props} label="" />
        <GithubReleaseLink {...props} />
      </div>
    );
  }

  const { isLoggedIn } = useAuthContext();

  if (label === 'Sign Up') {
    if (isLoggedIn) {
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
