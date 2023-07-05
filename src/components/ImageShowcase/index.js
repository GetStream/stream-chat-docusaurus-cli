import React from "react"

import clsx from "clsx"

import styles from "./styles.scss"

/**
 * Component for showing more than one image in a responsive flex container (with optional captions)
 * @param {Object[]} items
 * @param {string} items[].image
 * @param {string} [items[].alt]
 * @param {string} [items[].caption]
 * @param {boolean} border
 */
const ImageShowcase = ({ items, border }) => (
  <div className="image-showcase-wrapper">
    <div
      className={clsx(
        "image-showcase",
        border && "image-showcase--with-border"
      )}
    >
      {items.map(({ image, alt, caption }, key) => (
        <figure key={key}>
          <img src={image} alt={alt} loading="lazy" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      ))}
    </div>
  </div>
)

export default ImageShowcase
