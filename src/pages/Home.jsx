import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, fetchToken } from '../redux/actions/actions';
import Login from '../components/Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchToSettings = this.switchToSettings.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit() {
    const { history, setLogin, getToken } = this.props;
    const { name, email } = this.state;
    setLogin({ name, email });
    const object = {
      player:
      { name,
        assertions: 0,
        score: 0,
        gravatarEmail: email },
    };
    localStorage.setItem('state', JSON.stringify(object));
    getToken();
    history.push('/game');
  }

  switchToSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email } = this.state;
    const disabled = !(name && email);

    return (
      <div className="mainLogin">
        <main className="border border-3 login">
          <Login
            state={ this.state }
            disabled={ disabled }
            handleChange={ this.handleChange }
            handleSubmit={ this.handleSubmit }
          />
          <button
            className="btn btn-secondary"
            data-testid="btn-settings"
            type="button"
            onClick={ this.switchToSettings }
          >
            Configurações
          </button>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setLogin: (state) => dispatch(login(state)),
});

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setLogin: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Home);
