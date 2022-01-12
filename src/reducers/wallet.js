import { ADD_EXPENSE, DELETE_EXPENSE, GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };

  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
