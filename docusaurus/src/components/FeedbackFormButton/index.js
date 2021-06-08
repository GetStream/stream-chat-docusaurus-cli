import React from 'react';

import { useFeedbackFormData } from '../../hooks/useFeedbackFormData';

import ConfusedIcon from './confused-icon.svg';

import './styles.scss';

export const FeedbackFormButton = ({ lastHeaderTitle }) => {
  const { goToFeedbackForm } = useFeedbackFormData(lastHeaderTitle);

  return (
    <button
      type="button"
      aria-label="Feedback button"
      className="docFeedback__button"
      onClick={goToFeedbackForm}
    >
      <ConfusedIcon />
      Feedback
    </button>
  );
};
