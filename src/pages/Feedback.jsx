import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name, score, avatar) {
    const { history } = this.props;
    const exist = JSON.parse(localStorage.getItem('ranking')) || [];
    const playerResult = {
      name,
      score,
      picture: avatar,
    };
    exist.push(playerResult);
    localStorage.setItem('ranking', JSON.stringify(exist));
    history.push('/ranking');
  }

  render() {
    const three = 3;
    const { avatar, name, history } = this.props;
    const { assertions, score } = JSON.parse(
      localStorage.getItem('state'),
    ).player;
    return (
      <div className="feedback">
        <header className="header-feedback">
          <img data-testid="header-profile-picture" src={ avatar } alt="" />
          <span data-testid="header-player-name">{name}</span>
          Pontos:
          <span data-testid="header-score" className="h1">{score}</span>
        </header>
        <div data-testid="feedback-text" className="h5">
          {assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
        </div>
        Placar final:
        <div data-testid="feedback-total-score" className="negrito">{score}</div>
        Total de acertos:
        <div data-testid="feedback-total-question" className="negrito">{assertions}</div>
        <button
          className="btn btn-outline-secondary"
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Jogar novamente
        </button>
        <button
          className="btn btn-outline-secondary"
          data-testid="btn-ranking"
          type="button"
          onClick={ () => this.handleClick(name, score, avatar) }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  avatar: state.user.avatar,
  isGameReady: state.game.isGameReady,
});
Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(mapStateToProps)(Feedback);
