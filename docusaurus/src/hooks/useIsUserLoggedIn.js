import { useState, useEffect, useCallback } from 'react';
import { apiGetUser } from '../api';

const isBrowser = typeof window !== `undefined`;

const getUser = () => {
  if (!isBrowser) return {};
  return JSON.parse(window.localStorage.getItem('stream_user') || '{}');
};

export const useIsUserLoggedIn = () => {
  const [state, setState] = useState(getUser());

  const isLoggedIn = !!state.email;

  const refreshUserData = useCallback(async () => {
    try {
      const user = await apiGetUser();
      setState((prevState) => ({ ...prevState, ...user }));
      return user;
    } catch (err) {
      setState({});
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refreshUserData();
    }
  }, [isLoggedIn]);

  return isLoggedIn;
};
