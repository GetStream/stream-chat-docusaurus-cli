import React, { useContext, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { AuthContext } from '../../contexts/AuthContext';

export const getPlanName = (name) => {
  let isEnterprise = false;
  if (!name) return ['', isEnterprise];
  if (name.toLowerCase().includes('enterprise')) {
    isEnterprise = true;
  }
  return [name.replace(/(v)([1-9])(_)/, ''), isEnterprise];
};

export const DataLayer = ({}) => {
  const dataLayer =
    typeof window !== 'undefined' ? window?.dataLayer : undefined;
  const location = useLocation();
  const { isLoggedIn, username, getSelectedOrg, email } =
    useContext(AuthContext);
  const org = getSelectedOrg();

  useEffect(() => {
    const [chatPlan, isChatEnterprise] = getPlanName(org?.chat_plan?.name);
    const [feedsPlan, isFeedsEnterprise] = getPlanName(org?.plan?.name);
    const dataLayerObject = {
      event: 'pageview',
      authenticated: isLoggedIn ? 'authenticated' : 'anonymous',
      username,
      email,

      pagePath: `${location.pathname}`,
      feedsPlan,
      isFeedsEnterprise,
      chatPlan,
      isChatEnterprise,
    };
    dataLayer?.push(dataLayerObject);
  }, [dataLayer, isLoggedIn, location]);
  return null;
};
