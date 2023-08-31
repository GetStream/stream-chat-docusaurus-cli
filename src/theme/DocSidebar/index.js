import React, { useEffect, useMemo } from "react"

import { useLocation } from "@docusaurus/router"
import OriginalDocSidebar from "@theme-original/DocSidebar"

import { useBreadcrumbsContext } from "../../hooks/useBreadcrumbsContext"
import productVariables from "../../product-variables"

const gitLink = () => {
  const location = useLocation()
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, "")
      .split("/")
    return urlPlatform
  }, [location.pathname])
  return (
    productVariables[process.env.PRODUCT]?.gitHub?.[locationPlatform] ||
    "https://github.com/GetStream/"
  )
}

const WEB_LINKS = [
  ["Contact Support", "https://getstream.io/contact/support/"],
  ["Maker Account", "https://getstream.io/maker-account/"],
  ["Mobile Chat Kit", "https://getstream.io/chat/ux-kit/"], // activity feeds ux kit ???
  ["Install from GitHub", gitLink()],
  [
    <>
      © Stream.IO, Inc. <br /> All Rights Reserved.
    </>,
    "/",
  ],
]

const addTitle = sidebarItems => {
  return sidebarItems.map(({ label, items, ...props }) => ({
    ...props,
    ...(items && { items: addTitle(items) }),
    label: <span title={label}>{label}</span>,
  }))
}

export default function DocSidebar({ sidebar, ...props }) {
  const { setSidebar } = useBreadcrumbsContext()

  useEffect(() => {
    setSidebar(sidebar)
  }, [sidebar])

  const sidebarItems = useMemo(
    () =>
      addTitle([
        ...sidebar.map(category => ({ ...category, collapsed: false })),
        ...WEB_LINKS.map(([label, href]) => ({
          type: "link",
          label,
          href,
        })),
      ]),
    [sidebar]
  )

  return <OriginalDocSidebar {...props} sidebar={sidebarItems} />
}
