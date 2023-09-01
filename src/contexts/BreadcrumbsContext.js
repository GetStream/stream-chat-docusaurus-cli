import React, { useCallback, useEffect, useMemo, useState } from "react"

import { useLocation } from "@docusaurus/router"

import URLS from "../../urls"

export const BreadcrumbsContext = React.createContext()

const removeTrailingSlash = string => {
  return string && string[string.length - 1] === "/"
    ? string.substring(0, string.length - 1)
    : string
}

const extractPathObjects = (sidebar, pathname) => {
  const path = []

  const recursiveDeepFind = (sidebar, pathAcc) => {
    return sidebar.find(sidebarItem => {
      let item
      if (sidebarItem.items) {
        item = recursiveDeepFind(sidebarItem.items, pathAcc)
      } else {
        if (
          removeTrailingSlash(sidebarItem.href) ===
          removeTrailingSlash(pathname)
        ) {
          item = sidebarItem
        }
      }

      if (item) {
        pathAcc.unshift(sidebarItem)
      }

      return item
    })
  }
  recursiveDeepFind(sidebar, path)
  return path
}

export const BreadcrumbsContextProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [sidebar, setSidebar] = useState([])
  const { pathname } = useLocation()
  const [urlPlatform] = pathname.replace(URLS.docs.root, "").split("/")

  const extarctBreadcrumbs = useCallback((localSidebar, localPathname) => {
    const pathObjects = extractPathObjects(localSidebar, localPathname)
    return setBreadcrumbs(pathObjects)
  }, [])

  useEffect(() => {
    extarctBreadcrumbs(sidebar, pathname)
  }, [sidebar, pathname])

  const value = useMemo(
    () => ({
      breadcrumbs,
      setSidebar,
      urlPlatform,
    }),
    [breadcrumbs, setSidebar, urlPlatform]
  )

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}
