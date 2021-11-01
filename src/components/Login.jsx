import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imagem from '../img/trivia.png';
import '../css/Login.css';

export default class Login extends Component {
  render() {
    const {
      state: { name, email },
      disabled,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <form>
        <img className="imagemLogin" src={ imagem } alt="" width="230px" />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <input
              className="form-control name"
              data-testid="input-player-name"
              type="text"
              id="name"
              placeholder="Digite o seu nome"
              value={ name }
              onChange={ handleChange }
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            {/* Email: */}
            <input
              className="form-control"
              data-testid="input-gravatar-email"
              type="email"
              id="email"
              placeholder="email@email.com"
              value={ email }
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          className="btn btn-secondary"
          data-testid="btn-play"
          disabled={ disabled }
          type="button"
          onClick={ handleSubmit }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  state: PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
