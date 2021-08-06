import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenses, showEditModal, editItem } from '../../Redux/actions/index';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    const { expense } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const currencyObject = exchangeRates[currency];
    const currencyName = (currencyObject.name).split('/')[0];
    const convertedValue = value * currencyObject.ask;

    this.state = {
      id,
      description,
      tag,
      method,
      value,
      currencyName,
      currentChange: currencyObject.ask,
      convertedValue,
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expense } = this.props;
    if (expense !== prevProps.expense) {
      this.updateState(expense);
    }
  }

  updateState(expense) {
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const currencyObject = exchangeRates[currency];
    const currencyName = (currencyObject.name).split('/')[0];
    const convertedValue = value * currencyObject.ask;

    this.setState({
      id,
      description,
      tag,
      method,
      value,
      currencyName,
      currentChange: currencyObject.ask,
      convertedValue,
    });
  }

  render() {
    const { removeExpense, showModal, editItemDispatch } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currencyName,
      currentChange,
      convertedValue } = this.state;

    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyName }</td>
        <td>{ parseFloat(currentChange).toFixed(2) }</td>
        <td>{ parseFloat(convertedValue).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            onClick={ () => {
              editItemDispatch(id);
              showModal();
            } }
            data-testid="edit-btn"
            type="button"
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            onClick={ () => removeExpense(id) }
            type="button"
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  removeExpense: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  editItemDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (ID) => dispatch(removeExpenses(ID)),
  showModal: () => dispatch(showEditModal()),
  editItemDispatch: (ID) => dispatch(editItem(ID)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
