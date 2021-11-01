import { USER_LOGIN, USER_TOKEN, USER_AVATAR, GAME_SCORE } from '../actions/actions';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  token: '',
  score: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case USER_AVATAR:
    return {
      ...state,
      avatar: action.payload,
    };
  case USER_TOKEN:
    return ({
      ...state,
      token: action.payload.token,
    });
  case GAME_SCORE:
    return ({
      ...state,
      score: action.payload,
    });
  default:
    return state;
  }
}
