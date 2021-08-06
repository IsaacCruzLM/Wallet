// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextId: 0,
  showEditModal: false,
  editID: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, currencies: action.currencies };

  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, action.newExpense],
      nextId: action.ID + 1 };

  case 'REMOVE_EXPENSE':
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.ID) };

  case 'SHOW_EDIT_MODAL':
    return { ...state, showEditModal: true };

  case 'HIDE_EDIT_MODAL':
    return { ...state, showEditModal: false };

  case 'EDIT_ITEM':
    return { ...state, editID: action.ID };

  case 'CHANGE_EDIT_ITEM':
    return { ...state, expenses: action.expenses, editID: null };

  default:
    return state;
  }
}

export default wallet;
