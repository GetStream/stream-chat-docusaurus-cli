import React from 'react';

import styles from './styles.scss';

/**
 * Component for showing more than one image in a responsive flex container (with optional captions)
 * @param {Object[]} items
 * @param {string} items[].image
 * @param {string} [items[].alt]
 * @param {string} [items[].caption]
 */
const ImageShowcase = ({ items }) => (
  <div className='image-showcase-wrapper'>
    <div className='image-showcase'>
      {items.map(({ image, alt, caption }, key) => (
        <figure key={key}>
          <img src={image} alt={alt} loading='lazy' />
          { caption && (<figcaption>{caption}</figcaption>) }
        </figure>
      ))}
    </div>
  </div>
);

export default ImageShowcase;

