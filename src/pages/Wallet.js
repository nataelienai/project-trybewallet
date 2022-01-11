import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpense, fetchCurrencies } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { expenses, dispatch } = this.props;

    dispatch(saveExpense({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    }));
    this.setState(INITIAL_STATE);
  }

  sumExpenses(expenses) {
    return expenses.reduce((total, { value, exchangeRates, currency }) => (
      total + Number(value) * Number(exchangeRates[currency].ask)
    ), 0);
  }

  render() {
    const { email, expenses, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            Despesa Total:
            { this.sumExpenses(expenses) }
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </header>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleInputChange }
            >
              {currencies.map((currencyCode) => (
                <option
                  key={ currencyCode }
                  value={ currencyCode }
                  data-testid={ currencyCode }
                >
                  {currencyCode}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
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
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
