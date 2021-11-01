// Referência para implementação da Contagem Regressiva: Zhiyue Yi
// src: https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvatar, fetchQuestions } from '../redux/actions/actions';
import GameCard from '../components/GameCard';

class Game extends Component {
  componentDidMount() {
    const { email, token, getAvatar, getQuestions } = this.props;
    getAvatar(email);
    getQuestions(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { questions, isGameReady } = this.props;
    return (
      <main className="main">{!isGameReady && <GameCard question={ questions } />}</main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  token: state.user.token,
  questions: state.game.questions,
  isGameReady: state.game.isGameReady,
  playerScore: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (email) => dispatch(fetchAvatar(email)),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isGameReady: PropTypes.bool.isRequired,
  getAvatar: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
