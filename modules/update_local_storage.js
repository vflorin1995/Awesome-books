/* eslint-disable import/prefer-default-export */

export const updateLocalStorage = (obj) => {
  const localdata = JSON.stringify(obj);
  localStorage.setItem('localdata', localdata);
};