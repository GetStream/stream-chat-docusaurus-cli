import React from 'react';
import clsx from 'clsx';
import OriginalNavbar from '@theme-original/Navbar';
import URLS from '../../../urls';

import './styles.scss';

export default function Navbar(props) {
  return <>
    <SiteNavbar />
    <OriginalNavbar {...props} />
  </>
};

const SiteNavbar = () => (
  <nav className='site-navbar'>
    <div className='site-navbar__inner'>
      <ul className='site-navbar__main'>
        {URLS.website.main.map(({ returnLink, label, href, items }, i) => (
          <li
            className={clsx(
              'site-navbar__item', {
                'site-navbar__item--return': !!returnLink,
                'dropdown--hoverable': !!items,
              }
            )}
            key={i}
          >
            <a href={href} target='_blank'>{label}</a>
            {items && (
              <ul className='site-navbar__dropdown dropdown__menu'>
                {
                  items.map((item, j) => (
                    <li className='site-navbar__dropdown__item' key={j}>
                      <a href={item.href} target='_blank'>{item.label}</a>
                    </li>
                  ))
                }
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className='site-navbar__secondary'>
        {URLS.website.secondary.map(({ contact, label, href }, i) => (
          <li
          className={clsx('site-navbar__item', {'site-navbar__item--contact': contact})} key={i}
        >
          <a href={href} target='_blank'>
            {contact && (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="#000">
                <path d="M1.3 3.7v-1c0-.4.3-.7.7-.7h12c.4 0 .7.3.7.7v10.6c0 .4-.3.7-.7.7H2a.7.7 0 01-.7-.7v-.6h12V4.9L8 9.7l-6.7-6zM0 6.7h3.3V8H0V6.7zM0 10h5.3v1.3H0V10z" />
              </svg>
            )}
            {label}
          </a>
        </li>
        ))}
      </ul>
    </div>
  </nav>
);
