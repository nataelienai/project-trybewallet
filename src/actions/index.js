export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const START_EDITING_EXPENSE = 'START_EDITING_EXPENSE';
export const FINISH_EDITING_EXPENSE = 'FINISH_EDITING_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const login = (emailAddress) => ({
  type: LOGIN,
  payload: emailAddress,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const startEditingExpense = (expense) => ({
  type: START_EDITING_EXPENSE,
  payload: expense,
});

export const finishEditingExpense = (editedExpense) => ({
  type: FINISH_EDITING_EXPENSE,
  payload: editedExpense,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

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
