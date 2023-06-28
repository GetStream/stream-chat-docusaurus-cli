import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import useGlobalData from '@docusaurus/useGlobalData';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import { useActiveVersion } from '@theme/hooks/useDocs';

import { useAuthContext } from '../../hooks/useAuthContext';
import URLS from '../../../urls';

import './styles.scss';

function GithubReleaseLink({ activeVersion, href }) {
  return (
    activeVersion.name !== 'current' && (
      <OriginalNavbarItem
        {...props}
        docId={activeVersion.mainDocId}
        href={`${href}releases/tag/${activeVersion.label}`}
        className="navbar__link__github__release"
        label={activeVersion.label}
      />
    )
  );
}

function CustomNavbarItem(props) {
  const { docsPluginId, label, type, items } = props;
  const { location, locationPlatform, activeVersion, ...itemProps } = props;
  const { pathname } = location;

  const { isLoggedIn } = useAuthContext();

  const selectedSDK = useMemo(() => {
    if (label === 'SDK' && items.length) {
      return items.find((item) =>
        pathname.includes(`${URLS.docs.root}${item.id}/`)
      );
    }
  }, [items, label, pathname]);

  if (selectedSDK) {
    return (
      <PlatformNavbarItem {...itemProps} label={PlatformLabel(selectedSDK)} />
    );
  }

  if (
    type === 'docsVersionDropdown' &&
    pathname
      .replace(' ', '')
      .search(new RegExp(`${URLS.docs.root}${docsPluginId}/.*`, 'g')) === -1
  ) {
    return null;
  }

  if (label === 'github') {
    return (
      activeVersion && (
        <div className="navbar__link__github__info">
          <OriginalNavbarItem
            {...itemProps}
            href={URLS.github[locationPlatform]}
            docId={activeVersion && activeVersion.mainDocId}
            label=""
          />
          <GithubReleaseLink {...itemProps} activeVersion={activeVersion} />
        </div>
      )
    );
  }

  if (label === 'Sign Up') {
    if (isLoggedIn) {
      return null;
    }
  }

  return (
    <OriginalNavbarItem
      {...itemProps}
      docId={activeVersion && activeVersion.mainDocId}
    />
  );
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
      src={`${URLS.docs.root}icon/${id}.svg`}
      alt={`${label} logo`}
      className="navbar__link__sdk__icon"
    />
    {label}
  </span>
);

function NavbarItemWithActiveVersion(props) {
  const { docsPluginId, locationPlatform } = props;
  const activeVersion = useActiveVersion(docsPluginId || locationPlatform);

  return <CustomNavbarItem {...props} activeVersion={activeVersion} />;
}

export default function NavbarItem(props) {
  const { docsPluginId, label, type, items } = props;
  const location = useLocation();
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, '')
      .split('/');
    return urlPlatform;
  }, [location.pathname]);

  const globalData = useGlobalData();
  const SDKS = globalData['docusaurus-plugin-content-docs'];

  if (docsPluginId === locationPlatform && SDKS[locationPlatform]) {
    return (
      <NavbarItemWithActiveVersion
        {...props}
        location={location}
        locationPlatform={locationPlatform}
      />
    );
  }

  const lastVersion = SDKS[docsPluginId]
    ? SDKS[docsPluginId].versions.find((v) => v.isLast)
    : null;

  return (
    <CustomNavbarItem
      {...props}
      location={location}
      locationPlatform={locationPlatform}
      activeVersion={lastVersion}
    />
  );
}
