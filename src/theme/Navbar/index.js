import React, { useMemo } from "react"

import clsx from "clsx"

import { Link, useLocation } from "@docusaurus/router"
import OriginalNavbar from "@theme-original/Navbar"

import { folderMapping } from "../../../constants"
import { docs, website } from "../../../urls"
import URLS from "../../../urls"
import { useBreadcrumbsContext } from "../../hooks/useBreadcrumbsContext"
import productVariables from "../../product-variables"
import "./styles.scss"

const PRODUCT = process.env.PRODUCT
const { productTitle } = productVariables[PRODUCT]

export default function Navbar(props) {
  return (
    <>
      <OriginalNavbar {...props} />
      <SiteNavbar />
    </>
  )
}

const SiteNavbar = () => {
  const { breadcrumbs } = useBreadcrumbsContext()

  const location = useLocation()
  const locationPlatform = useMemo(() => {
    const [urlPlatform] = location.pathname
      .replace(URLS.docs.root, "")
      .split("/")
    return urlPlatform
  }, [location.pathname])

  const platform = folderMapping[locationPlatform]

  const breadcrumbsWithSeparators = useMemo(
    () =>
      breadcrumbs.flatMap((value, index, array) =>
        array.length - 1 !== index && value.type !== "category"
          ? [value, { type: "separator" }]
          : value
      ),
    [breadcrumbs]
  )

  const breadcrumbItems = useMemo(
    () =>
      breadcrumbsWithSeparators.map((item, i) => {
        if (item.type === "separator") {
          return (
            <li key={i} className="separator">
              »
            </li>
          )
        } else if (item.type === "category") {
          return (
            <li key={i} className="category">
              {item.label}:
            </li>
          )
        }

        return <li key={i}>{item.label}</li>
      }),
    [breadcrumbsWithSeparators]
  )

  return (
    <nav className="site-navbar">
      <div className="site-navbar__inner">
        <ul className="site-navbar__breadcrumbs">
          <li>
            <a href={`${website.root}/${PRODUCT}/`}>{productTitle}</a>
          </li>
          <li className="separator">»</li>
          <li>
            <Link to={docs.root}>Docs</Link>
          </li>
          {platform && (
            <>
              <li className="separator">»</li>
              <li>
                <Link to={`${docs.root}${locationPlatform}/`}>
                  {platform} UI Components
                </Link>
              </li>
              <li className="separator">»</li>
              {breadcrumbItems.map(item => item)}
            </>
          )}
        </ul>
        <ul className="site-navbar__secondary">
          {URLS.website.secondary.map(({ contact, label, href }, i) => (
            <li
              className={clsx("site-navbar__item", {
                "site-navbar__item--contact": contact,
              })}
              key={i}
            >
              <a href={href} target="_blank">
                {contact && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="#000"
                  >
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
  )
}
