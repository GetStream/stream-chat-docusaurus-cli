import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export const LoadingSpinner = ({
  className = '',
  color = 'white',
  size = 36,
}) => {
  return (
    <span
      className={`spinner ${color} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOf(['white', 'blue']),
};
