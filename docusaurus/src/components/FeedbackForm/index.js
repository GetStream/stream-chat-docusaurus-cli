import React, { useState } from 'react';
import clsx from 'clsx';

import ConfusedIcon from './confused-icon.svg';
import { LoadingSpinner } from '../LoadingSpinner';
import { InputField } from '../InputField';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import { useToast } from '../../hooks/useToast';

import './styles.scss';

export const FeedbackForm = ({ title }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { submitHandler, loading, success, error, data, fieldChangeHandler } =
    useFeedbackForm({ email: '', feedback: '' });

  useToast(
    error && error.detail,
    success ? 'Thanks for helping us to get better!' : '',
    'feedback-form'
  );

  return (
    <div className="docFeedback">
      <div
        className={clsx(
          'docFeedback__dialog',
          openDialog && 'docFeedback__dialog--open'
        )}
      >
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
      <button
        type="button"
        aria-label="Feedback dialog"
        className="docFeedback__button"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <ConfusedIcon />
        Feedback
      </button>
    </div>
  );
};
