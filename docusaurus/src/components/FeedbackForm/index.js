import React, { useCallback, useContext, useState, useMemo } from 'react';
import clsx from 'clsx';
import uuid from 'uuid';

import ConfusedIcon from './confused-icon.svg';
import { LoadingSpinner } from '../LoadingSpinner';
import { InputField } from '../InputField';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import { useToast } from '../../hooks/useToast';

import './styles.scss';

const FeedbackFormContext = React.createContext();

export const FeedbackFormProvider = ({ children, title }) => {
  const [openDialog, setOpenDialog] = useState(null);
  // We need to keep the title in the context provider because
  // Not all elements invoking the feedback form have access
  // to the page title.
  const value = useMemo(() => ({
    openDialog,
    setOpenDialog,
    title,
  }));
  return (
    <FeedbackFormContext.Provider value={value}>
      {children}
    </FeedbackFormContext.Provider>
  );
};

const useFeedbackFormContext = () => {
  // small hack to give an unique id to each component using the hook
  // so we can keep only one dialog open
  const [id] = useState(uuid());
  const {
    openDialog: openDialogFromContext,
    setOpenDialog: setOpenDialogFromContext,
    title,
  } = useContext(FeedbackFormContext);

  const openDialog = openDialogFromContext === id;

  const setOpenDialog = useCallback(() => {
    if (openDialog) {
      return setOpenDialogFromContext(null);
    }

    return setOpenDialogFromContext(id);
  }, [id, setOpenDialogFromContext, openDialog]);

  return { openDialog, setOpenDialog, title };
};

export const FeedbackForm = () => {
  const { openDialog, setOpenDialog, title } = useFeedbackFormContext();
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
        onClick={setOpenDialog}
      >
        <ConfusedIcon />
        Feedback
      </button>
    </div>
  );
};
