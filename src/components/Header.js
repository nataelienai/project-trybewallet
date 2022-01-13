import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function sumExpenses(expenses) {
  return expenses.reduce((total, { value, exchangeRates, currency }) => (
    total + Number(value) * Number(exchangeRates[currency].ask)
  ), 0);
}

function Header(props) {
  const { email, expenses } = props;
  const totalExpenses = sumExpenses(expenses);
  return (
    <header>
      <span data-testid="email-field">{email}</span>
      <span data-testid="total-field">
        Despesa Total:
        {totalExpenses.toFixed(2)}
        <span data-testid="header-currency-field">BRL</span>
      </span>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      ask: PropTypes.string,
    })),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
