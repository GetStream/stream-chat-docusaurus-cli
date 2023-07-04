import React, { useMemo } from "react"

import algoliasearch from "algoliasearch/lite"
import url from "url"

import { createAutocomplete } from "@algolia/autocomplete-core"
import {
  useActivePlugin,
  useActiveVersion,
} from "@docusaurus/plugin-content-docs/client"
import { useLocation } from "@docusaurus/router"

import {
  CMS_INDEX,
  DOCUSAURUS_INDEX,
  folderMapping,
  platformMapping,
} from "../../../constants"
import environment from "../../environment"
import productVariables from "../../product-variables"
import { Footer } from "./Footer"
import { getItemUrl } from "./getItemUrl"
import { Hits } from "./Hits"
import { SearchBox } from "./SearchBox"
import { useTouchEvents } from "./useTouchEvents"
import { useTrapFocus } from "./useTrapFocus"

const {
  algolia: {
    parentSection: { slug: parentSectionSlug },
  },
} = productVariables[process.env.PRODUCT]

const algoliaClient = algoliasearch(
  environment.ALGOLIA_APP_ID,
  environment.ALGOLIA_API_KEY
)

const mergeResults = results => {
  const docussaurusHits = results[0].hits.map(item => ({
    ...item,
    index: DOCUSAURUS_INDEX,
  }))
  const docsHits = results[1].hits.map(item => ({
    ...item,
    index: CMS_INDEX,
  }))
  return [...docussaurusHits, ...docsHits]
}

export function DocSearchModal({
  onClose = () => null,
  initialScrollY = 0,
  locationPlatform,
}) {
  const containerRef = React.useRef(null)
  const formElementRef = React.useRef(null)
  const dropdownRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const modalRef = React.useRef(null)
  const snippetLength = React.useRef(10)
  const location = useLocation()
  const locationQuery = useMemo(() => {
    const { query } = url.parse(location.search || "", {
      parseQueryString: true,
    })
    return query
  }, [location.search])
  const [state, setState] = React.useState({
    query: locationQuery.query || "",
  })
  const { pluginId } = useActivePlugin({ failfast: true })

  const activeVersion = useActiveVersion(pluginId)

  React.useEffect(() => {
    document.body.classList.add("DocSearch--active")

    return () => {
      document.body.classList.remove("DocSearch--active")

      // IE11 doesn't support `scrollTo` so we check that the method exists
      // first.
      window.scrollTo?.(0, initialScrollY)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const isMobileMediaQuery = window.matchMedia("(max-width: 750px)")

    if (isMobileMediaQuery.matches) {
      snippetLength.current = 5
    }
  }, [])

  React.useEffect(() => {
    function setFullViewportHeight() {
      if (modalRef.current) {
        const vh = window.innerHeight * 0.01
        modalRef.current.style.setProperty("--docsearch-vh", `${vh}px`)
      }
    }

    setFullViewportHeight()

    window.addEventListener("resize", setFullViewportHeight)

    return () => {
      window.removeEventListener("resize", setFullViewportHeight)
    }
  }, [])

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        id: "search",
        defaultActiveItemId: 0,
        placeholder: "Search Docs",
        onStateChange({ state, setCollections }) {
          if (!state.query && state.collections.length > 0) {
            return setCollections([])
          }
          setState(state)
        },
        getSources({ query }) {
          return algoliaClient
            .multipleQueries([
              {
                indexName: DOCUSAURUS_INDEX,
                type: "default",
                query,
                params: {
                  filters: `parent_section_slug:${parentSectionSlug} AND platform:${platformMapping[locationPlatform]} AND version:${activeVersion.name}`,
                },
              },
              {
                indexName: CMS_INDEX,
                type: "default",
                query,
                params: {
                  filters: `parent_section_slug:${parentSectionSlug} AND platforms:${platformMapping[locationPlatform]}`,
                },
              },
            ])
            .then(({ results }) => {
              const hits = mergeResults(results)

              const grouped = hits.reduce((acc, hit) => {
                // If section slug doesnt exist, initialize
                if (!acc[hit.section_slug]) acc[hit.section_slug] = {}

                // If slug doesnt exist, initialize it with the hit.
                // Needed in order to categorize the response by page.
                // index: "DOCS" is used later in order to redirect to
                // old cms website
                if (!acc[hit.section_slug][hit.slug])
                  acc[hit.section_slug][hit.slug] = [hit]
                else {
                  if (!hit.header_id) {
                    // If no header_id is present, it means that the result is linked
                    // to the page itself and not a header inside the page.
                    // Docusaurus and our design always shows the page first, then a list of headers
                    acc[hit.section_slug][hit.slug].unshift(hit)
                  } else {
                    acc[hit.section_slug][hit.slug].push(hit)
                  }
                }
                return acc
              }, {})

              return Object.entries(grouped).map(([key, group]) => ({
                sourceId: key,
                getItems() {
                  return Object.values(group)
                    .flat()
                    .map(item => ({
                      ...item,
                      // Needed in order to know if it should show the tree icon in search results
                      includes_slug_parent: !group[item.slug][0].header_id,
                    }))
                },
                getItemUrl({ item }) {
                  return getItemUrl({
                    item,
                    platform: locationPlatform,
                    cmsPlatform: platformMapping[locationPlatform],
                    locationQuery,
                  })
                },
              }))
            })
        },
      }),
    [locationPlatform, activeVersion]
  )

  const { getEnvironmentProps, getRootProps } = autocomplete

  React.useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0
    }
  }, [state.query])

  useTouchEvents({
    getEnvironmentProps,
    panelElement: dropdownRef.current,
    formElement: formElementRef.current,
    inputElement: inputRef.current,
  })

  useTrapFocus({ container: containerRef.current })

  return (
    <div
      ref={containerRef}
      {...getRootProps({
        "aria-expanded": true,
      })}
      className={[
        "DocSearch",
        "DocSearch-Container",
        state.status === "stalled" && "DocSearch-Container--Stalled",
        state.status === "error" && "DocSearch-Container--Errored",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseDown={event => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="DocSearch-Modal" ref={modalRef}>
        <header className="DocSearch-SearchBar" ref={formElementRef}>
          <SearchBox
            onClose={onClose}
            platform={folderMapping[locationPlatform]}
            inputRef={inputRef}
            query={state.query}
            {...autocomplete}
          />
        </header>

        <div className="DocSearch-Dropdown" ref={dropdownRef}>
          <Hits
            platform={locationPlatform}
            cmsPlatform={platformMapping[locationPlatform]}
            locationQuery={locationQuery}
            collections={state.collections}
            closeSearchModal={onClose}
            {...autocomplete}
          />
        </div>

        <footer className="DocSearch-Footer">
          <Footer />
        </footer>
      </div>
    </div>
  )
}
