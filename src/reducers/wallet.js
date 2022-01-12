import { ADD_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE, GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload.id ? action.payload : expense
      )),
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };

  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };

  default:
    return state;
  }
};

export default wallet;
