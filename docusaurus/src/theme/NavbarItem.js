import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavBarItem from '@theme-original/NavbarItem';

const baseUrl = '/chat/docs/sdk';

export default function NavbarItem(props) {
  const { docsPluginId, label, type } = props;
  const { pathname } = useLocation();
  
  if (label === 'SDK' && props.items.length) {
    const selectedSDK = props.items.find(item => pathname.includes(`${baseUrl}/${item.id}`));
    const sdks = useMemo(() => props.items.map(sdk => ({ ...sdk, label: PlatformLabel(sdk)  })), [props.items]);

    return (
      <OriginalNavBarItem
        {...props}
        label={selectedSDK ? PlatformLabel(selectedSDK) : label}
        items={sdks}
      />
    );
  }

  if (
    type === 'docsVersionDropdown' &&
    pathname
      .replace(' ', '')
      .search(new RegExp(`${baseUrl}/${docsPluginId}/.*`, 'g')) === -1
  ) {
    return null;
  }

  return <OriginalNavBarItem {...props} />
}

const PlatformLabel = ({ id, label }) => (
  <span className='navbar__link__sdk'>
    <img src={`${baseUrl}/icon/${id}.svg`} alt={`${label} logo`} className='navbar__link__sdk__icon' />
    {label}
  </span>
)