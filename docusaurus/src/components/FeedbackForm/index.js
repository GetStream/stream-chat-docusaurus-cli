import React, { useMemo } from 'react';

import { LoadingSpinner } from '../LoadingSpinner';
import { InputField } from '../InputField';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import { useFeedbackFormData } from '../../hooks/useFeedbackFormData';
import { useToast } from '../../hooks/useToast';

import './styles.scss';

export const FeedbackForm = () => {
  const { header, setHeader, headers } = useFeedbackFormData();
  const sections = useMemo(() => {
    return headers.map((headerItem) => ({
      label: headerItem.isPageHeader ? 'Whole page' : headerItem.value,
      value: headerItem.value,
    }));
  }, [headers]);

  const { submitHandler, loading, success, error, data, fieldChangeHandler } =
    useFeedbackForm(
      { email: '', feedback: '' },
      header.isPageHeader && header.value.replace(/\s+/g, '-').toLowerCase()
    );

  useToast(
    error && error.detail,
    success ? 'Thanks for helping us to get better!' : '',
    'feedback-form'
  );

  return (
    <div className="docFeedback" id="feedback-form">
      <h5>Are you confused or have feedback to share?</h5>
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
          value={header.value}
          onChange={(a) => setHeader(a.target.value)}
        >
          {sections.map((sectionItem) => (
            <option key={sectionItem.value} value={sectionItem.value}>
              {sectionItem.label}
            </option>
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
