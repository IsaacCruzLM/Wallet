import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

class TagPieChart extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
    this.totalTagExpenses = this.totalTagExpenses.bind(this);
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

  totalTagExpenses(tag) {
    const { expenses } = this.props;
    if (expenses !== []) {
      const tagExpenses = expenses.filter((expense) => expense.tag === tag);
      return tagExpenses.reduce((accumulator, currentExpense) => {
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
      title: { text: 'Despesas por Tag' },
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
          name: 'Alimentação',
          y: (this.totalTagExpenses('Alimentação') / this.totalExpenses()) * 100,
        }, {
          name: 'Trabalho',
          y: (this.totalTagExpenses('Trabalho') / this.totalExpenses()) * 100,
        }, {
          name: 'Lazer',
          y: (this.totalTagExpenses('Lazer') / this.totalExpenses()) * 100,
        }, {
          name: 'Transporte',
          y: (this.totalTagExpenses('Transporte') / this.totalExpenses()) * 100,
        }, {
          name: 'Saúde',
          y: (this.totalTagExpenses('Saúde') / this.totalExpenses()) * 100,
        }],
      }],
    };
    return (
      <div className="tagChart">
        <HighchartsReact highcharts={ Highcharts } options={ options } />
      </div>
    );
  }
}

TagPieChart.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TagPieChart);
