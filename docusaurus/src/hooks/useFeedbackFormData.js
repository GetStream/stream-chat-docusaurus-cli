import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useHistory } from '@docusaurus/router';

const FeedbackFormContext = React.createContext();

export const FeedbackFormProvider = ({ children, title }) => {
  const [clickedButtonHeader, setClickedButtonHeader] = useState(title);
  // We need to keep the clickedButtonHeader in the context provider because
  // once user clicks on the feedback button it will lose reference to the
  // current page header

  const value = useMemo(
    () => ({
      clickedButtonHeader,
      setClickedButtonHeader,
    }),
    [clickedButtonHeader]
  );

  return (
    <FeedbackFormContext.Provider value={value}>
      {children}
    </FeedbackFormContext.Provider>
  );
};

const extractTitle = (element) =>
  element && element.innerText.replace('#', '').replace('\n', '');

export const useFeedbackFormData = (lastHeaderTitle) => {
  const history = useHistory();
  const { clickedButtonHeader, setClickedButtonHeader } =
    useContext(FeedbackFormContext);
  const [headers, setHeaders] = useState([
    {
      value: clickedButtonHeader,
      isPageHeader: true,
    },
  ]);

  const [currentHeader, setCurrentHeader] = useState({
    value: clickedButtonHeader,
    isPageHeader: true,
  });

  useEffect(() => {
    const pageHeader = document.querySelector('h1');
    const headersAnchors = Array.from(document.querySelectorAll('h2.heading'));
    const headers = headersAnchors.map((item) => ({
      value: extractTitle(item),
      isPageHeader: false,
    }));
    if (pageHeader) {
      headers.unshift({
        value: extractTitle(pageHeader),
        isPageHeader: true,
      });
    }

    const lastHeaderTitleString = extractTitle(lastHeaderTitle);

    const headerIndex = headers.findIndex(
      (item) => item.value === lastHeaderTitleString
    );
    const prevHeader = lastHeaderTitle
      ? headers[headerIndex - 1]
      : headers[headers.length - 1];

    setHeaders(headers);
    setCurrentHeader(prevHeader);
  }, []);

  const header = useMemo(() => {
    return headers.find((item) => item.value === clickedButtonHeader);
  }, [headers, clickedButtonHeader]);

  const goToFeedbackForm = useCallback(() => {
    history.push(
      `${history.location.pathname}${history.location.search}#feedback-form`
    );
    setClickedButtonHeader(currentHeader.value);
  }, [currentHeader]);

  return {
    header,
    setHeader: setClickedButtonHeader,
    headers,
    goToFeedbackForm,
  };
};
