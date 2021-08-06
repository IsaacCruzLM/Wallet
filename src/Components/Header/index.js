import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  totalExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((accumulator, currentValue) => {
      const { currency } = currentValue;
      const currentExchange = parseFloat(currentValue.exchangeRates[currency].ask);
      return accumulator + (parseFloat(currentValue.value) * currentExchange);
    }, 0);
  }

  render() {
    const { userState, expenses } = this.props;
    const { email } = userState;
    return (
      <header className="header">
        <div className="Logo">
          Logo
        </div>
        <div className="Title">
          <h1>TrybeWallet</h1>
        </div>
        <div className="userInfoContainer">
          <div className="userEmail">
            <h3>Email:</h3>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="userExpenses">
            <h3>Despesas Totais:</h3>
            <p data-testid="total-field">
              { expenses.length > 0 ? this.totalExpenses() : 0 }
            </p>
          </div>
          <div className="userExchange">
            <h3>Câmbio Utilizado:</h3>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
