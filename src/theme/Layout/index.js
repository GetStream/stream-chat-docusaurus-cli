import React, { useEffect, useState } from "react"

import { ToastContainer } from "react-toastify"

import Head from "@docusaurus/Head"
import OriginalLayout from "@theme-original/Layout"

import URLS from "../../../urls"
import { DataLayer } from "../../components/DataLayer"
import { AuthContextProvider } from "../../contexts/AuthContext"

const isBrowser = typeof window !== `undefined`
const isProd = process.env.DEPLOYMENT_ENV === "production"
const gtmId = process.env.GOOGLE_TAG_TRACKING_ID

export default function Layout(props) {
  const isRootPath = isBrowser && window.location.pathname === URLS.docs.root
  const shouldRedirect =
    isBrowser && window.location.pathname !== "/video/docs/"
  const [canRender, setCanRender] = useState(!isProd || !isRootPath)

  // whick redirect for home page. this should happen here in order to avoid
  // rendering the layout when redirecting.
  useEffect(() => {
    if (isProd && isRootPath && shouldRedirect) {
      window.location.replace(URLS.website.cms_docs)
    } else if (!canRender) {
      setCanRender(true)
    }
  }, [])

  if (!canRender) {
    return null
  }

  const trackingScript =
    !!gtmId &&
    `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');
`

  return (
    <AuthContextProvider>
      <Head>
        {trackingScript && (
          <script data-cookieconsent="ignore">{trackingScript}</script>
        )}
        {/* <!-- Start of HubSpot Embed Code --> */}
        {isProd && (
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/1854208.js"
          />
        )}
        ,{/* <!-- End of HubSpot Embed Code --> */}
      </Head>
      <DataLayer />
      <ToastContainer />
      <OriginalLayout {...props} />
    </AuthContextProvider>
  )
}
