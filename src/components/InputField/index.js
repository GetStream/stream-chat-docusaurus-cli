import React, { forwardRef } from 'react';
import clsx from 'clsx';

import './styles.scss';

const InputFieldComponent = (
  {
    id,
    name,
    type = 'text',
    value,
    placeholder,
    label,
    style,
    onChange,
    error,
    required = false,
    autoFocus,
    help,
    disabled,
  },
  ref
) => {
  return (
    <div className="inputField" style={style}>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
        className={clsx('input', error && 'inputField-error')}
        onChange={onChange}
        ref={ref}
        autoFocus={autoFocus}
        disabled={disabled}
        {...(value === undefined ? {} : { value })}
      />
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      {error && <span className="errorMessage">{error}</span>}
      {help && !error && <span className="helpMessage">{help}</span>}
    </div>
  );
};

export const InputField = forwardRef(InputFieldComponent);
