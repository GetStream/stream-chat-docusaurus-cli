import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useHistory } from '@docusaurus/router';

import { LoadingSpinner } from '../LoadingSpinner';
import { InputField } from '../InputField';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import { useToast } from '../../hooks/useToast';

import './styles.scss';

const FeedbackFormContext = React.createContext();

export const FeedbackFormProvider = ({ children, title }) => {
  const [clickedButtonHeader, setClickedButtonHeader] = useState(title);
  // We need to keep the title in the context provider because
  // Not all elements invoking the feedback form have access
  // to the page title.
  const value = useMemo(() => ({
    clickedButtonHeader,
    setClickedButtonHeader,
  }));
  return (
    <FeedbackFormContext.Provider value={value}>
      {children}
    </FeedbackFormContext.Provider>
  );
};

export const useFeedbackFormData = (lastHeaderTitle) => {
  const history = useHistory();
  const { clickedButtonHeader, setClickedButtonHeader, title } =
    useContext(FeedbackFormContext);

  const [data, setData] = useState({
    currentHeaderTitle: title,
    headers: [title],
    isPageHeader: true,
  });

  useEffect(() => {
    const pageHeader = document.querySelector('h1');
    const headersAnchors = Array.from(document.querySelectorAll('h2.heading'));
    const headers = headersAnchors.map((item) =>
      item.innerText.substring(0, item.innerText.indexOf('#'))
    );
    if (pageHeader) {
      headers.unshift(pageHeader.innerText);
    }
    const headerIndex = headers.findIndex((item) => item === lastHeaderTitle);
    const prevHeader = lastHeaderTitle
      ? headers[headerIndex - 1]
      : headers[headers.length - 1];

    setData({
      currentHeaderTitle: prevHeader,
      headers,
      isPageHeader: pageHeader && headerIndex - 1 === 0,
    });
  }, []);

  const goToFeedbackForm = useCallback(() => {
    console.log(history);
    history.push(
      `${history.location.pathname}${history.location.search}#feedback-form`
    );
    setClickedButtonHeader(data.currentHeaderTitle);
  }, [data.currentHeaderTitle]);

  return {
    goToFeedbackForm,
    title: clickedButtonHeader,
    setTitle: setClickedButtonHeader,
    headers: data.headers,
    isPageHeader: data.isPageHeader,
  };
};

export const FeedbackForm = () => {
  const { title, setTitle, headers, isPageHeader } = useFeedbackFormData();
  const section = isPageHeader ? null : title;
  const { submitHandler, loading, success, error, data, fieldChangeHandler } =
    useFeedbackForm({ email: '', feedback: '' }, section);

  useToast(
    error && error.detail,
    success ? 'Thanks for helping us to get better!' : '',
    'feedback-form'
  );

  return (
    <div className="docFeedback" id="feedback-form">
      <h5>Confused about “{title}“?</h5>
      <p>Let us know how we can improve:</p>
      <form onSubmit={submitHandler}>
        <InputField
          name="email"
          className="input"
          type="email"
          placeholder="Email"
          required
          onChange={fieldChangeHandler}
          value={data.email}
          error={error && error.email}
        />
        <select
          name="sections"
          value={title}
          onChange={(a) => setTitle(a.target.value)}
        >
          {headers.map((header) => (
            <option value={header}>{header}</option>
          ))}
        </select>
        <textarea
          name="feedback"
          className="input"
          placeholder="Let us know what we can do"
          onChange={fieldChangeHandler}
          value={data.feedback}
          rows="4"
          required
        />
        <button className="button button--primary" type="submit">
          {loading ? <LoadingSpinner size={18} /> : 'SEND'}
        </button>
      </form>
    </div>
  );
};
