import url from "url"

import { CMS_INDEX } from "../../../constants"
import { docs, website } from "../../../urls"

export const getItemUrl = ({ item, platform, cmsPlatform, locationQuery }) => {
  const headerId = item.header_id.replace("_", "-")
  if (item.index === CMS_INDEX) {
    return `${website.cms_docs}${url.format({
      pathname: `${cmsPlatform}/${item.slug}/`,
      query: locationQuery,
    })}${!!headerId ? `#${headerId}` : ""}`
  }

  return `${docs.root}${url.format({
    pathname: item.slug === "" ? `${platform}/` : `${platform}/${item.slug}/`,
    query: locationQuery,
  })}${!!headerId ? `#${headerId}` : ""}`
}
