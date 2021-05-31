import React, { useMemo } from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';

const WEB_LINKS = [
  ['Contact Support', 'https://getstream.io/contact/support/'],
  ['Maker Account', 'https://getstream.io/maker-account/'],
  ['Mobile Chat Kit', 'https://getstream.io/chat/ux-kit/']
]

export default function DocSidebar({ sidebar, ...props }) {
  const sidebarItems = useMemo(() => sidebar.map(category => ({ ...category, collapsed: false  })), [sidebar]);

  return <>
    <OriginalDocSidebar {...props} sidebar={sidebarItems}/>
    <div className='menu-footer'>
      <ul className='menu-footer__links'>
        {
          WEB_LINKS.map(([label, link]) => (
            <li key={link} className='menu-footer__links__item'>
              <a href={link}>{label}</a>
            </li>
          ))
        }
      </ul>
      <p className='menu-footer__disclaimer'>
        <span>© Stream.IO, Inc.</span>{' '}
        <span>All Rights Reserved.</span>
      </p>
    </div>
  </>
}