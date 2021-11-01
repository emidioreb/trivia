import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/feedback.css';

class Ranking extends Component {
  render() {
    const number = -1;
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => (a.score > b.score ? number : 1));
    return (
      <div className="feedback">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { ranking.map((element, index) => (
            <li key={ index }>
              <img src={ element.picture } alt="" />
              <div data-testid={ `player-name-${index}` }>{ element.name }</div>
              <div>{`Score ${element.score}`}</div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          className="btn btn-outline-secondary"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
