import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/game.css';
import { connect } from 'react-redux';
import { score } from '../redux/actions/actions';

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctColor: '',
      wrongColor: '',
      assertions: 0,
      scorePlayer: 0,
      timer: 30,
      nextAsk: false,
      changeAsk: 0,
    };
    this.onClickColorCorrect = this.onClickColorCorrect.bind(this);
    this.onClickColorIncorrect = this.onClickColorIncorrect.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.cancelTime = this.cancelTime.bind(this);
    this.showBtnNext = this.showBtnNext.bind(this);
    this.showNextAsk = this.showNextAsk.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  async onClickColorCorrect(difficulty) {
    const { timer } = this.state;
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    await this.calcScore(difficulty, timer);
    this.setLocalStorage();
    this.showBtnNext();
  }

  onClickColorIncorrect() {
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    this.showBtnNext();
  }

  setTimer() {
    const second = 1000;
    const stopWatch = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      this.cancelTime(stopWatch);
    }, second);
  }

  setLocalStorage() {
    const { assertions, scorePlayer } = this.state;
    const { email, name } = this.props;

    const object = {
      player: { name, assertions, score: scorePlayer, gravatarEmail: email },
    };

    localStorage.setItem('state', JSON.stringify(object));
  }

  cancelTime(stopWatch) {
    const { timer } = this.state;
    if (timer === 0) {
      clearTimeout(stopWatch);
      this.onClickColorCorrect();
    }
  }

  calcScore(difficulty, timer) {
    const { scorePlayer } = this.state;
    const { getScore } = this.props;
    const dez = 10;
    let total = 0;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    console.log(timer);
    if (difficulty === 'hard') total = dez + timer * HARD;
    if (difficulty === 'medium') total = dez + timer * MEDIUM;
    if (difficulty === 'easy') total = dez + timer * EASY;
    this.setState((prevState) => ({
      scorePlayer: scorePlayer + total,
      assertions: prevState.assertions + 1,
    }));
    getScore(scorePlayer);
  }

  showBtnNext() {
    this.setState({
      nextAsk: true,
    });
  }

  showNextAsk() {
    const FOUR = 4;
    const { history } = this.props;
    const { changeAsk } = this.state;
    if (changeAsk === FOUR) {
      return history.push('/feedback');
    }
    this.setState((state) => ({
      changeAsk: state.changeAsk + 1,
      nextAsk: false,
      timer: 30,
      correctColor: '',
      wrongColor: '',
    }));
  }

  header(avatar, name, scorePlayer) {
    return (
      <header className="header-gameCard">
        <img data-testid="header-profile-picture" src={ avatar } alt="" width="100px" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score" className="h2">{`Pontos: ${scorePlayer}`}</span>
      </header>
    );
  }

  buttonNext() {
    return (
      <button
        className="btn-sm btn-dark"
        type="button"
        data-testid="btn-next"
        onClick={ this.showNextAsk }
      >
        Próxima
      </button>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { correctColor, wrongColor, timer, scorePlayer,
      nextAsk, changeAsk } = this.state;
    const { question, name, avatar } = this.props;
    const RANDOM = 5;
    const correct = (
      <button
        onClick={ () => this.onClickColorCorrect(question[changeAsk].difficulty) }
        disabled={ timer === 0 }
        data-testid="correct-answer"
        type="button"
        id="correct"
        className={ `${correctColor} btn btn-outline-secondary` }
      >
        {question[changeAsk].correct_answer}
      </button>
    );
    const incorrects = question[changeAsk].incorrect_answers.map(
      (element, index) => (
        <button
          onClick={ this.onClickColorIncorrect }
          data-testid={ `wrong-answer-${index}` }
          disabled={ timer === 0 }
          type="button"
          id="answer"
          key={ element }
          className={ `${wrongColor} btn btn-outline-secondary` }
        >
          {element}
        </button>
      ),
    );
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    console.log(answers);
    const options = answers
      .map((answer) => <p className="h5" key={ answer }>{answer}</p>);
    return (
      <div>
        {this.header(avatar, name, scorePlayer)}
        <img src="https://www.imagensempng.com.br/wp-content/uploads/2021/02/17-1.png" alt="" width="100px" />
        <div>
          <p
            data-testid="question-category"
            className="category"
          >
            {question[changeAsk].category}
          </p>
          <h4 data-testid="question-text">{question[changeAsk].question}</h4>
          <div className="buttons-game">{options}</div>
          <div>{`Tempo Restante: ${timer}`}</div>
        </div>
        {nextAsk && this.buttonNext()}
      </div>
    );
  }
}

GameCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getScore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
    avatar: state.user.avatar,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getScore: (playerScore) => dispatch(score(playerScore)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GameCard),
);
