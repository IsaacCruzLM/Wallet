import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

import Header from '../../Components/Header';
import TagPieChart from '../../Components/TagPieChart';
import MethodPieChart from '../../Components/MethodPieChart';

class Charts extends React.Component {
  render() {
    return (
      <main className="chartsPage">
        <Header />
        <TagPieChart />
        <MethodPieChart />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Charts);
