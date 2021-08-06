import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class CategoriesSelect extends React.Component {
  render() {
    const { func, value } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          onChange={ func }
          value={ value }
          id="tag"
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

CategoriesSelect.propTypes = {
  func: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CategoriesSelect;
