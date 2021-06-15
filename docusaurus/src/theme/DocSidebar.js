import React, { useMemo } from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';

const WEB_LINKS = [
  ['Contact Support', 'https://getstream.io/contact/support/'],
  ['Maker Account', 'https://getstream.io/maker-account/'],
  ['Mobile Chat Kit', 'https://getstream.io/chat/ux-kit/'],
  [
    <>
      © Stream.IO, Inc. <br /> All Rights Reserved.
    </>,
    '/',
  ],
];

// TODO: Remove it once
// https://github.com/facebook/docusaurus/issues/3372#issuecomment-857931379 its released
const addTrailingSlash = (sidebarItems) => {
  return sidebarItems.map(({ href, ...props }) => {
    if (props.items) {
      return { ...props, items: addTrailingSlash(props.items), href };
    }

    if (href[href.lenght - 1] !== '/') {
      href = href + '/';
    }

    return { href, ...props };
  });
};

const addTitle = (sidebarItems) => {
  return sidebarItems.map(({ label, items, ...props }) => ({
    ...props,
    ...(items && { items: addTitle(items) }),
    label: <span title={label}>{label}</span>,
  }));
};

export default function DocSidebar({ sidebar, ...props }) {
  const sidebarItems = useMemo(
    () =>
      addTitle(
        addTrailingSlash([
          ...sidebar.map((category) => ({ ...category, collapsed: false })),
          ...WEB_LINKS.map(([label, href]) => ({
            type: 'link',
            label,
            href,
          })),
        ])
      ),
    [sidebar]
  );

  return <OriginalDocSidebar {...props} sidebar={sidebarItems} />;
}
