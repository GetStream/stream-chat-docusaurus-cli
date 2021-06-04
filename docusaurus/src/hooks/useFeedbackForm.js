import { useState, useCallback } from 'react';

import { apiDocFeedback, getAPIErrorMsg } from '../api';

export const useFeedbackForm = (initialState) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(initialState);

  const fieldChangeHandler = useCallback(
    (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value })),
    []
  );

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (success) return;
      if (error) setError(undefined);

      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }

      formData.append('page_url', window.location.href);

      setLoading(true);

      try {
        await apiDocFeedback(formData);

        setSuccess(true);
        resetForm(e.target);
        setTimeout(() => {
          setSuccess(false);
          setData(initialState);
        }, 3000);
      } catch (err) {
        setError(getAPIErrorMsg(err));
      }
      setLoading(false);
    },
    [data, success, error]
  );

  return { submitHandler, fieldChangeHandler, loading, success, error, data };
};
