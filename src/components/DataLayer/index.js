import React, { useContext, useEffect, useMemo } from "react"

import { useLocation } from "@docusaurus/router"

import urls from "../../../urls"
import { AuthContext } from "../../contexts/AuthContext"

export const getPlanName = name => {
  let isEnterprise = false
  if (!name) return ["", isEnterprise]
  if (name.toLowerCase().includes("enterprise")) {
    isEnterprise = true
  }
  return [name.replace(/(v)([1-9])(_)/, ""), isEnterprise]
}

export const DataLayer = ({}) => {
  const dataLayer =
    typeof window !== "undefined" ? window?.dataLayer : undefined
  const location = useLocation()
  const { isLoggedIn, username, getSelectedOrg, email } =
    useContext(AuthContext)
  const org = getSelectedOrg()

  const platform = useMemo(() => {
    // splits out the platform from the pathname
    const [urlPlatform] = location.pathname
      .replace(urls.docs.root, "")
      .split("/")

    // exception for React Native
    if (urlPlatform === "reactnative") {
      return "React Native"
    }

    // returns the platform with capitalized first letters
    return urlPlatform
      .split("-")
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ")
  }, [location.pathname])

  useEffect(() => {
    const [chatPlan, isChatEnterprise] = getPlanName(org?.chat_plan?.name)
    const [feedsPlan, isFeedsEnterprise] = getPlanName(org?.plan?.name)
    const dataLayerObject = {
      event: "pageview",
      authenticated: isLoggedIn ? "authenticated" : "anonymous",
      username,
      email,

      pagePath: `${location.pathname}`,
      feedsPlan,
      isFeedsEnterprise,
      chatPlan,
      platform,
      isChatEnterprise,
    }
    dataLayer?.push(dataLayerObject)
  }, [dataLayer, isLoggedIn, location])
  return null
}
