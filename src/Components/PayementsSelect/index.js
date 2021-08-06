import React from 'react';
import PropTypes from 'prop-types';

class PayementsSelect extends React.Component {
  render() {
    const { func, value } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          data-testid="method-input"
          onChange={ func }
          value={ value }
          id="method"
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PayementsSelect.propTypes = {
  func: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PayementsSelect;
