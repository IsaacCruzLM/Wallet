import React from 'react';
import PropTypes from 'prop-types';

class ValueInput extends React.Component {
  render() {
    const { func, value } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          onChange={ func }
          value={ value }
          id="value"
          type="text"
          name="value"
          data-testid="value-input"
        />
      </label>
    );
  }
}

ValueInput.propTypes = {
  func: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ValueInput;
