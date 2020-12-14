// import { defaultPagingQuery, EQUERY_STORAGE } from 'containers/ProductsPage/constants';
// import { ETheme } from '../styles/theme/themes';
// import { IOrderQuery, IPagingQuery, IWhereQuery } from '../components/Model/Product';
// import { ELocale } from '../locales';

export function getAuthToken() {
  return window.localStorage.getItem('access_token');
}

export async function setAuthToken(access_token) {
  await window.localStorage.setItem('access_token', access_token);
}

export function getLocalStorage(name) {
  const value = window.localStorage.getItem(name);
  if (value === 'null') {
    return null;
  }
  return value;
}

export async function setLocalStorage(name, value, stringify = true) {
  await window.localStorage.setItem(name, stringify ? JSON.stringify(value) : value);
}

export async function removeLocalStorage(name) {
  await window.localStorage.removeItem(name);
}

export async function clearAllLocalStorage() {
  await window.localStorage.clear();
}


export async function setCookieChangeWhereQuery(whereQuery) {
  return setLocalStorage(EQUERY_STORAGE.whereQuery, whereQuery);
}

export async function getCookieChangeWhereQuery() {
  const data = getLocalStorage(EQUERY_STORAGE.whereQuery);
  return data ? JSON.parse(data) : {};
}

export async function setCookieChangePagingQuery(pagingQuery) {
  return setLocalStorage(EQUERY_STORAGE.pagingQuery, pagingQuery);
}

export async function getCookieChangePagingQuery() {
  const data = getLocalStorage(EQUERY_STORAGE.pagingQuery);
  return data ? JSON.parse(data) : defaultPagingQuery;
}

export async function setCookieChangeOrderQuery(orderQuery) {
  return setLocalStorage(EQUERY_STORAGE.orderQuery, orderQuery);
}

export async function getCookieChangeOrderQuery() {
  const data = getLocalStorage(EQUERY_STORAGE.orderQuery);
  return data ? JSON.parse(data) : {};
}








