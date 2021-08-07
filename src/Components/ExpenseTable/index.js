import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExpenseItem from '../ExpenseItem';

import './styles.css';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <main className="expenseTable">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map((expense) => <ExpenseItem key={ expense.id } expense={ expense } />)}
          </tbody>
        </table>

      </main>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  showEditModal: state.wallet.showEditModal,
});

export default connect(mapStateToProps)(ExpenseTable);
