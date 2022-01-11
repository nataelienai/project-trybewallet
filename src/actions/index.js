export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const login = (payload) => ({ type: LOGIN, payload });
export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });
export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const saveExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  delete exchangeRates.USDT;
  expense.exchangeRates = exchangeRates;
  dispatch(addExpense(expense));
};

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  delete exchangeRates.USDT;
  dispatch(getCurrencies(Object.keys(exchangeRates)));
};
