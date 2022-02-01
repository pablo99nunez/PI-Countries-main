export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const SEARCH = 'SEARCH';
export const ERROR = 'ERROR';
export const FILTER_COUNTRIES = 'FILTER_COUNTRIES';
export const ORDER_COUNTRIES = 'ORDER_COUNTRIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const TOGGLE_APIS = 'TOGGLE_APIS';

const url = 'https://patriam-back.herokuapp.com'

export function getCountries () {
  return function (dispatch) {
    return fetch(url + '/countries').then((res) =>
      res.json().then((payload) => {
        dispatch({ type: GET_COUNTRIES, payload });
      })
    );
  };
}
export function getCountry (payload) {
  return function (dispatch) {
    if (payload !== undefined) {
      return fetch(`${url}/countries/` + payload).then((res) =>
        res.json()
          .then((payload) => {
            dispatch({ type: GET_COUNTRY, payload });
          })
      )
    }
  };
}
export function search (payload) {
  return function (dispatch) {
    dispatch({ type: SEARCH, payload });
  };
}
export function filterCountries (payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_COUNTRIES, payload });
  };
}

export function orderCountries (payload) {
  return function (dispatch) {
    dispatch({ type: ORDER_COUNTRIES, payload });
  };
}

export function addActivities (payload) {
  return function (dispatch) {
    dispatch({ type: ADD_ACTIVITY, payload });
  };
}

export function toggleApis () {
  return function (dispatch) {
    dispatch({ type: TOGGLE_APIS });
  };
}
