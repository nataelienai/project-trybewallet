import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { finishEditingExpense, saveExpense, fetchCurrencies } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
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

  componentDidUpdate(prevProps) {
    const { expenseInEditing } = this.props;
    const expenseInEditingExists = Object.keys(expenseInEditing).length > 0;
    if (expenseInEditingExists && expenseInEditing !== prevProps.expenseInEditing) {
      console.log('igual');
    }
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, inEditMode } = this.props;
    const expense = { ...this.state };

    if (inEditMode) dispatch(finishEditingExpense(expense));
    else dispatch(saveExpense(expense));

    this.setState(INITIAL_STATE);
  }

  render() {
    const { currencies, inEditMode } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
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
          {inEditMode ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  inEditMode: PropTypes.bool.isRequired,
  expenseInEditing: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  inEditMode: state.wallet.inEditMode,
  expenseInEditing: state.wallet.expenseInEditing,
});

export default connect(mapStateToProps)(ExpenseForm);
