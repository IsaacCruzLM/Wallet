import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

class MethodPieChart extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
    this.totalMethodExpenses = this.totalMethodExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    if (expenses !== []) {
      return expenses.reduce((accumulator, currentValue) => {
        const { currency } = currentValue;
        const currentExchange = parseFloat(currentValue.exchangeRates[currency].ask);
        return (accumulator + (parseFloat(currentValue.value) * currentExchange));
      }, 0);
    }
    return 1;
  }

  totalMethodExpenses(method) {
    const { expenses } = this.props;
    if (expenses !== []) {
      const methodExpenses = expenses.filter((expense) => expense.method === method);
      return methodExpenses.reduce((accumulator, currentExpense) => {
        const { currency } = currentExpense;
        const currentExchange = parseFloat(currentExpense.exchangeRates[currency].ask);
        return accumulator + (parseFloat(currentExpense.value) * currentExchange);
      }, 0);
    }
    return 0;
  }

  render() {
    const options = {
      chart: {
        styledMode: true,
        type: 'pie',
      },
      title: { text: 'Despesas por Método de Pagamento' },
      tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
      accessibility: { point: { valueSuffix: '%' } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Dinheiro',
          y: (this.totalMethodExpenses('Dinheiro') / this.totalExpenses()) * 100,
        }, {
          name: 'Cartão de crédito',
          y: (this.totalMethodExpenses('Cartão de crédito') / this.totalExpenses()) * 100,
        }, {
          name: 'Cartão de débito',
          y: (this.totalMethodExpenses('Cartão de débito') / this.totalExpenses()) * 100,
        }],
      }],
    };
    return (
      <div className="methodChart">
        <HighchartsReact highcharts={ Highcharts } options={ options } />
      </div>
    );
  }
}

MethodPieChart.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(MethodPieChart);
