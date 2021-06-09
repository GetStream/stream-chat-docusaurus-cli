import React, { useMemo } from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';

const WEB_LINKS = [
  ['Contact Support', 'https://getstream.io/contact/support/'],
  ['Maker Account', 'https://getstream.io/maker-account/'],
  ['Mobile Chat Kit', 'https://getstream.io/chat/ux-kit/'],
  [<>© Stream.IO, Inc. <br/> All Rights Reserved.</>, '/']
]

export default function DocSidebar({ sidebar, ...props }) {
  const sidebarItems = useMemo(() => ([
    ...sidebar.map(category => ({ ...category, collapsed: false  })),
    ...WEB_LINKS.map(([label, href]) => ({
      type: 'link',
      label,
      href
    }))
  ]), [sidebar]);

  return <OriginalDocSidebar {...props} sidebar={sidebarItems}/>;
}