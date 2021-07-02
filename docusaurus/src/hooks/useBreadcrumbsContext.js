import { useContext } from 'react';
import { BreadcrumbsContext } from '../contexts/BreadcrumbsContext';

export const useBreadcrumbsContext = () => {
  return useContext(BreadcrumbsContext);
};
