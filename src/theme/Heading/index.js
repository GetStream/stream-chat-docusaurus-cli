import React, { useEffect, useRef, useState } from "react"

import clsx from "clsx"

import { useThemeConfig } from "@docusaurus/theme-common"
import { translate } from "@docusaurus/Translate"

import { FeedbackFormButton } from "../../components/FeedbackFormButton"
import "./styles.scss"

export default function Heading({ as: As, id, ...props }) {
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig()
  const [title, setTitle] = useState()
  const headingRef = useRef(null)

  const copyLink = e => {
    navigator?.clipboard?.writeText(e.target.href)
  }

  useEffect(() => {
    if (As === "h2") {
      setTitle(headingRef.current)
    }
  }, [])

  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === "h1" || !id) {
    return <As {...props} id={undefined} />
  }

  return (
    <>
      {As === "h2" && title && <FeedbackFormButton lastHeaderTitle={title} />}
      <As
        {...props}
        ref={headingRef}
        className={clsx(
          "anchor",
          hideOnScroll
            ? "anchorWithHideOnScrollNavbar"
            : "anchorWithStickyNavbar"
        )}
        id={id}
      >
        {props.children}
        <a
          className="hash-link"
          href={`#${id}`}
          onClick={copyLink}
          title={translate({
            id: "theme.common.headingLinkTitle",
            message: "Direct link to heading",
            description: "Title for link to heading",
          })}
        >
          &#8203;
        </a>
      </As>
    </>
  )
}
