import { GAME_QUESTIONS } from '../actions/actions';

const initialState = {
  questions: [],
  isGameReady: true,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
      isGameReady: false,
    };
  default:
    return state;
  }
}
