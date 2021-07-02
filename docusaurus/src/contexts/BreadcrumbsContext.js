import React, { useState, useCallback, useMemo } from 'react';

export const BreadcrumbsContext = React.createContext();

const findActiveItem = (sidebarItem) => {
  return sidebarItem.href === window.location.pathname;
};

const removeTrailingSlash = (string) => {
  return string && string[string.length - 1] === '/'
    ? string.substring(0, string.length - 1)
    : string;
};

const extractPathObjects = (sidebar) => {
  const path = [];

  const recursiveDeepFind = (sidebar, pathAcc) => {
    return sidebar.find((sidebarItem) => {
      let item;
      if (sidebarItem.items) {
        item = recursiveDeepFind(sidebarItem.items, pathAcc);
      } else {
        if (
          removeTrailingSlash(sidebarItem.href) ===
          removeTrailingSlash(window.location.pathname)
        ) {
          item = sidebarItem;
        }
      }

      if (item) {
        pathAcc.unshift(sidebarItem);
      }

      return item;
    });
  };
  recursiveDeepFind(sidebar, path);
  return path;
};

export const BreadcrumbsContextProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const setSidebar = useCallback((sidebar) => {
    const pathObjects = extractPathObjects(sidebar);
    return setBreadcrumbs(pathObjects);
  }, []);

  const value = useMemo(
    () => ({
      breadcrumbs,
      setSidebar,
    }),
    [breadcrumbs, setSidebar]
  );

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};
