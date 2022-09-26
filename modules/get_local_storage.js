/* eslint-disable import/prefer-default-export */

export const getData = () => {
  const localdata = localStorage.getItem('localdata');
  const dataStored = JSON.parse(localdata);
  return dataStored;
};