import React from "react"

import OriginalRoot from "@theme-original/Root"

import { BreadcrumbsContextProvider } from "../../contexts/BreadcrumbsContext"
import { DocusaurusContextProvider } from "../../contexts/DocusaurusContext"

export default function DocItem(props) {
  return (
    <DocusaurusContextProvider>
      <BreadcrumbsContextProvider>
        <OriginalRoot {...props} />
      </BreadcrumbsContextProvider>
    </DocusaurusContextProvider>
  )
}
