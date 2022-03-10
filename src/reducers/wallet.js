import {
  ADD_EXPENSE,
  START_EDITING_EXPENSE,
  FINISH_EDITING_EXPENSE,
  DELETE_EXPENSE,
  GET_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  nextExpenseId: 0,
  expenses: [],
  currencies: [],
  inEditMode: false,
  expenseInEditing: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      nextExpenseId: state.nextExpenseId + 1,
      expenses: [...state.expenses, { ...action.payload, id: state.nextExpenseId }],
    };

  case START_EDITING_EXPENSE:
    return { ...state, inEditMode: true, expenseInEditing: action.payload };

  case FINISH_EDITING_EXPENSE:
    return {
      ...state,
      expenseInEditing: {},
      inEditMode: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.expenseInEditing.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
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
