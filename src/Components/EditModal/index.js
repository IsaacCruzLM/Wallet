import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeEditItem, hideEditModal } from '../../Redux/actions/index';

import CategoriesSelect from '../CategoriesSelect';
import PayementsSelect from '../PayementsSelect';
import ValueInput from '../ValueInput';
import DescriptionInput from '../DescriptionInput';

import './styles.css';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    const { expenses, editItemID } = this.props;

    const editItem = expenses.find((expense) => expense.id === editItemID);

    const { value, description, currency, method, tag } = editItem;

    this.state = {
      value,
      description,
      currency,
      method,
      tag,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submit() {
    const { expenses, editItemID, changeItem, hideModal } = this.props;
    const editItem = expenses.find((expense) => expense.id === editItemID);
    const newItem = { ...editItem, ...this.state };
    expenses[editItemID] = newItem;
    changeItem(expenses);
    hideModal();
  }

  closeModal() {
    const { hideModal } = this.props;
    hideModal();
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="modal">
        <div className="modalContent">
          <h2>Editar Item</h2>
          <form>
            <ValueInput func={ this.handleInputChange } value={ value } />
            <DescriptionInput func={ this.handleInputChange } value={ description } />
            <label htmlFor="currency">
              Moeda:
              <select
                onChange={ this.handleInputChange }
                value={ currency }
                id="currency"
                name="currency"
                data-testid="currency-input"
              >
                {currencies.map(
                  (curr) => <option key={ curr } value={ curr }>{curr}</option>,
                )}
              </select>
            </label>
            <PayementsSelect func={ this.handleInputChange } value={ method } />
            <CategoriesSelect func={ this.handleInputChange } value={ tag } />
            <div className="actionButtons">
              <button
                className="editExpense"
                onClick={ this.submit }
                type="button"
              >
                Editar despesa
              </button>
              <button
                className="cancelEdit"
                onClick={ this.closeModal }
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditModal.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  editItemID: PropTypes.number.isRequired,
  changeItem: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeItem: (expenses) => dispatch(changeEditItem(expenses)),
  hideModal: () => dispatch(hideEditModal()),
});

const mapStateToProps = (state) => ({
  editItemID: state.wallet.editID,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
