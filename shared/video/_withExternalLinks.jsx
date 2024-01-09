import React from "react"

/**
 * Until we upgrade to Docusaurus 3 that support props in MDX,
 * we need to use this workaround to update the tutorial links.
 */
export default class WithExternalLinks extends React.Component {
  /**
   * Replace all the links in the page with the new links.
   *
   * Format:
   * {
   *   '/tutorials/video-calling/':'https://getstream.io/video/sdk/react/tutorial/video-calling/',
   *   '/tutorials/audio-room/': 'https://getstream.io/video/sdk/react/tutorial/audio-room/',
   *   '/tutorials/livestream/': 'https://getstream.io/video/sdk/react/tutorial/livestreaming/',
   * }
   */
  componentDidMount() {
    const mapping = this.props.mapping
    const links = document.querySelectorAll("article a")
    links.forEach(link => {
      const href = link.getAttribute("href")
      for (const key in mapping) {
        if (href.endsWith(key)) {
          link.setAttribute("target", "_blank")
          link.setAttribute("href", mapping[key])
          // docusaurus ignores target="_blank" so we need to add this
          // most likely, docusaurus does something similar internally as well.
          link.addEventListener("click", e => {
            e.preventDefault()
            window.open(mapping[key], "_blank")
          })
        }
      }
    })
  }

  render() {
    return null
  }
}
