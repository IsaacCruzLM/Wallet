// Coloque aqui suas actions
export const addUserToState = (email) => ({ type: 'ADD_USER_EMAIL', email });

export const getCurrencies = (currencies) => ({ type: 'REQUEST_CURRENCIES', currencies });

export const addExpenses = (newExpense, ID) => ({ type: 'ADD_EXPENSE', newExpense, ID });

export const removeExpenses = (ID) => ({ type: 'REMOVE_EXPENSE', ID });

export const showEditModal = () => ({ type: 'SHOW_EDIT_MODAL' });

export const hideEditModal = () => ({ type: 'HIDE_EDIT_MODAL' });

export const editItem = (ID) => ({ type: 'EDIT_ITEM', ID });

export const changeEditItem = (expenses) => ({ type: 'CHANGE_EDIT_ITEM', expenses });

export const fetchCurrencies = () => (dispatch) => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json())
    .then((response) => {
      const currencies = Object.keys(response);
      const newcurrencies = currencies.filter((curr) => curr !== 'USDT');
      dispatch(getCurrencies(newcurrencies));
    })
);
