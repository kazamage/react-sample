export const APP_KEY = 'react-sample';

export const WORKSPACE_INFO_KEY = `${APP_KEY}.workspace-info`;

export const MAX_WORKSPACE = 8;

export const loadLocalStorage = key => {
  if (key == null) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key));
};

export const saveLocalStorage = (key, supplier) => {
  if (key == null) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(supplier()));
};

export const removeLocalStorage = key => {
  if (key == null) {
    return;
  }
  localStorage.removeItem(key);
};

export const delayRun = (func, args = [], wait = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(func(...args));
    }, wait);
  });
};
