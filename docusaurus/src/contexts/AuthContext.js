import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { apiGetUser, apiGetPublicUserToken } from '../api';

const isBrowser = typeof window !== `undefined`;

export const setUser = (user = {}) => {
  if (!isBrowser) return;
  window.localStorage.setItem('stream_user', JSON.stringify(user));
};

const getUser = () => {
  if (!isBrowser) return {};
  return JSON.parse(window.localStorage.getItem('stream_user') || '{}');
};

export const AuthContext = React.createContext({ email: '', username: '' });

// TODO: rename this to User Context
export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(getUser());
  const [publicAppToken, setPublicAppToken] = useState();

  const isLoggedIn = !!state.email;

  const setLogin = useCallback((user = {}) => {
    setUser({ ...user, organizations: undefined });
    setState((prevState) => ({ ...prevState, ...user }));
  }, []);

  const setLogout = useCallback(() => {
    setUser({});
    setState({});
  }, []);

  const getUserData = useCallback(async () => {
    try {
      const user = await apiGetUser();
      setLogin(user);
      return user;
    } catch (err) {
      setLogout();
    }
  }, [setLogin, setLogout]);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip async for SSR

    if (isLoggedIn) {
      getUserData();
    }
    apiGetPublicUserToken()
      .then((data) => {
        if (data) {
          setPublicAppToken({
            ...data,
            user_name: data && data.user_id.split('-')[0],
          });
        }
      })
      .catch((e) => {
        throw e;
      });
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const getSelectedOrg = useCallback(
    (firstOrg = false) => {
      if (!isLoggedIn) return null;
      const orgs = state.organizations || [];
      if (firstOrg) return orgs[orgs.length - 1]; // last org in the array is the first create org
      return orgs.find((o) => o.is_selected) || orgs[0];
    },
    [isLoggedIn, state]
  );

  const getSelectedApp = useCallback(
    (firstApp = false) => {
      const selectedOrg = getSelectedOrg(firstApp);
      if (!isLoggedIn || !selectedOrg) return null;
      const { apps } = selectedOrg;

      if (firstApp) return apps[apps.length - 1]; // last app in the array is the first create app
      return apps.find((o) => o.isSelected) || apps[0];
    },
    [isLoggedIn, getSelectedOrg]
  );

  const value = useMemo(
    () => ({
      ...state,
      publicAppToken,
      isLoggedIn,
      setLogin,
      setLogout,
      getSelectedOrg,
      getSelectedApp,
      getUserData,
    }),
    [
      state,
      publicAppToken,
      isLoggedIn,
      setLogin,
      setLogout,
      getSelectedOrg,
      getSelectedApp,
      getUserData,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
