import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../Components/Header';
import ExpenseForm from '../../Components/ExpenseForm';
import ExpenseTable from '../../Components/ExpenseTable';
import EditModal from '../../Components/EditModal';

class Wallet extends React.Component {
  render() {
    const { showEditModal } = this.props;
    return (
      <div>
        <Header />
        { !showEditModal && <ExpenseForm /> }
        <ExpenseTable />
        { showEditModal && <EditModal /> }
      </div>
    );
  }
}

Wallet.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showEditModal: state.wallet.showEditModal,
});

export default connect(mapStateToProps)(Wallet);
