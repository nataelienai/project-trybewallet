import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isFormValid: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    const { email, password } = this.state;

    const emailValidator = new RegExp([
      /^([!#-'*+/-9=?a-zA-Z^-~-]+(\.[!#-'*+/-9=?a-zA-Z^-~-]+)*)/, // local part
      /@([!#-'*+/-9=?a-zA-Z^-~-]+(\.[!#-'*+/-9=?a-zA-Z^-~-]+)*)/, // second-level domain
      /\.[a-zA-Z]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/, // top-level domain
    ].map((regex) => regex.source).join(''));

    if (password.length >= MIN_PASSWORD_LENGTH && emailValidator.test(email)) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validateForm);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(login(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, isFormValid } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleInputChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleInputChange }
        />
        <button type="submit" disabled={ !isFormValid }>Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
