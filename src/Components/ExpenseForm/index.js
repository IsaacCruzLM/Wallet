import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpenses } from '../../Redux/actions/index';

import CategoriesSelect from '../CategoriesSelect';
import PayementsSelect from '../PayementsSelect';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      Valor: '',
      Description: '',
      Moeda: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  addExpense() {
    const { Valor, Description, Moeda, method, tag } = this.state;
    const { nextId, addExpense } = this.props;

    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((data) => data.json())
      .then((response) => {
        const newExpense = {
          id: nextId,
          value: Valor,
          description: Description,
          currency: Moeda,
          method,
          tag,
          exchangeRates: response,
        };
        addExpense(newExpense, nextId);
      });

    this.setState({
      Valor: '',
      Description: '',
      Moeda: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { currencies } = this.props;
    const { Valor, Description, Moeda, method, tag } = this.state;
    return (
      <form className="expenseForm">
        <label htmlFor="Valor">
          Valor:
          <input
            onChange={ this.handleInputChange }
            value={ Valor }
            id="Valor"
            className="small"
            type="text"
            name="Valor"
          />
        </label>
        <label className="descriptionLabel" htmlFor="Description">
          Descrição:
          <input
            onChange={ this.handleInputChange }
            value={ Description }
            id="Description"
            type="text"
            name="Description"
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:
          <select
            onChange={ this.handleInputChange }
            value={ Moeda }
            id="Moeda"
            name="Moeda"
          >
            {currencies.map(
              (curr) => <option key={ curr } value={ curr }>{curr}</option>,
            )}
          </select>
        </label>
        <PayementsSelect func={ this.handleInputChange } value={ method } />
        <CategoriesSelect func={ this.handleInputChange } value={ tag } />
        <button onClick={ this.addExpense } type="button">
          adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  addCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  nextId: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (newExpense, ID) => dispatch(addExpenses(newExpense, ID)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  nextId: state.wallet.nextId,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
