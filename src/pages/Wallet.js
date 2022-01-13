import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense, saveExpense, fetchCurrencies } from '../actions';
import Header from '../components/Header';

const INITIAL_STATE = {
  expense: {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
  editMode: false,
};

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.updateExpenseId = this.updateExpenseId.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activateEditMode = this.activateEditMode.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.updateExpenseId();
    dispatch(fetchCurrencies());
  }

  updateExpenseId() {
    const { expenses } = this.props;

    this.setState((state) => ({
      expense: { ...state.expense, id: expenses.length },
    }));
  }

  handleInputChange({ target: { name, value } }) {
    this.setState((state) => ({
      expense: { ...state.expense, [name]: value },
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { expense, editMode } = this.state;

    if (editMode) dispatch(editExpense(expense));
    else dispatch(saveExpense(expense));

    const initialState = INITIAL_STATE;
    initialState.expense.id = expense.id + 1;

    this.setState(initialState);
  }

  activateEditMode(expense) {
    this.setState({ expense, editMode: true });
  }

  render() {
    const { expenses, currencies, dispatch } = this.props;
    const {
      expense: { value, description, currency, method, tag },
      editMode,
    } = this.state;
    return (
      <div>
        <Header />
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
          <button type="submit">
            {editMode ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
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
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.activateEditMode(expense) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpense(expense.id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.string,
    })),
  })).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
