import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import OriginalDocPaginator from '@theme-original/DocPaginator';
import ConfusedIcon from './confused-icon.svg';

import './styles.scss';

export default function DocPaginator(props) {
  return (
    <>
      <Feedback title={props.metadata.title} />
      <OriginalDocPaginator {...props} /> 
    </>
  )
}

const Feedback = ({ title }) => {
  const [ openDialog, setOpenDialog ] = useState(false);
  return (
    <div className='docFeedback'>
      <div className={clsx('docFeedback__dialog', openDialog && 'docFeedback__dialog--open')}>
        <h5>Confused about “{title}“?</h5>
        <p>Let us know how we can improve:</p>
        <form>
          <input className='input' type='email' placeholder='Email' required />
          <textarea className='input' placeholder='Let us know what we can do' rows='4' required />
          <button className='button button--primary' type='submit'>SEND</button>
        </form>
      </div>
      <button
        type='button'
        aria-label='Feedback dialog'
        className='docFeedback__button'
        onClick={() => setOpenDialog(!openDialog)}
      >
        <ConfusedIcon />
        Feedback
      </button>
    </div>
  );

}