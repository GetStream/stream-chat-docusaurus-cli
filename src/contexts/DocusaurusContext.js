/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from "react"

import { Context as DocusaurusContext } from "@docusaurus/core/lib/client/docusaurusContext"
import { useLocation } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

import { folderMapping } from "../../constants"
import URLS from "../../urls"
import productVariables from "../product-variables"

const { productTitle } = productVariables[process.env.PRODUCT]

// Dynamically overrides docusaurus context
// Used to have unique SEO tags for SDK.
export const DocusaurusContextProvider = ({ children }) => {
  const contextValue = useDocusaurusContext()
  const { siteConfig } = contextValue

  const location = useLocation()
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, "")
      .split("/")
    return urlPlatform
  }, [location.pathname])

  const platform = folderMapping[locationPlatform]
  const metaTitle = platform
    ? `Stream ${productTitle} - ${platform} SDK Docs`
    : siteConfig.title

  return (
    <DocusaurusContext.Provider
      value={{
        ...contextValue,
        siteConfig: { ...siteConfig, title: metaTitle },
      }}
    >
      {children}
    </DocusaurusContext.Provider>
  )
}
