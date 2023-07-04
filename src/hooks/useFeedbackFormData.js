import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { useHistory } from "@docusaurus/router"

const FeedbackFormContext = React.createContext()

export const FeedbackFormProvider = ({ children, title }) => {
  const [clickedButtonHeader, setClickedButtonHeader] = useState(title)
  // We need to keep the clickedButtonHeader in the context provider because
  // once user clicks on the feedback button it will lose reference to the
  // current page header

  const value = useMemo(
    () => ({
      clickedButtonHeader,
      setClickedButtonHeader,
    }),
    [clickedButtonHeader]
  )

  return (
    <FeedbackFormContext.Provider value={value}>
      {children}
    </FeedbackFormContext.Provider>
  )
}

const extractTitle = element =>
  element && element.innerText.replace("#", "").replace("\n", "")

export const useFeedbackFormData = lastHeaderTitle => {
  const history = useHistory()
  const { clickedButtonHeader, setClickedButtonHeader } =
    useContext(FeedbackFormContext)
  const [headers, setHeaders] = useState([
    {
      value: clickedButtonHeader,
      isPageHeader: true,
    },
  ])

  const [currentHeader, setCurrentHeader] = useState({
    value: clickedButtonHeader,
    isPageHeader: true,
  })

  const header = useMemo(() => {
    return headers.find(item => item.value === clickedButtonHeader)
  }, [headers, clickedButtonHeader])

  const goToFeedbackForm = useCallback(() => {
    history.push(
      `${history.location.pathname}${history.location.search}#feedback-form`
    )
    setClickedButtonHeader(currentHeader.value)
  }, [currentHeader])

  return {
    header,
    setHeader: setClickedButtonHeader,
    headers,
    goToFeedbackForm,
  }
}
