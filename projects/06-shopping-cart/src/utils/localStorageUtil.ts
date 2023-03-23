export const getLocalStorage = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key)!);
};

export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
