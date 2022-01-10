import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push('/carteira');
    console.log(history);
  }

  render() {
    const { email, password } = this.state;
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
        <button type="submit">Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
