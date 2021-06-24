import React from 'react';

import { useFeedbackFormData } from '../../hooks/useFeedbackFormData';

import ConfusedIcon from './confused-icon.svg';

import './styles.scss';

export const FeedbackFormButton = ({ lastHeaderTitle, beforePaginator }) => {
  const { goToFeedbackForm } = useFeedbackFormData(lastHeaderTitle);
  const classNames = ['docFeedback'];

  if (beforePaginator) {
    classNames.push('beforePaginator');
  }

  return (
    <div className={classNames.join(' ')}>
      <button
        type="button"
        aria-label="Feedback button"
        className="docFeedback__button"
        onClick={goToFeedbackForm}
      >
        <ConfusedIcon />
        Feedback
      </button>
    </div>
  );
};
