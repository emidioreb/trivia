import fetchAvatarAPI from '../../services/avatarAPI';
import fetchTokenAPI from '../../services/tokenAPI';
import fetchQuestionsAPI from '../../services/questionsAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_AVATAR = 'USER_AVATAR';
export const USER_TOKEN = 'USER_TOKEN';
export const GAME_QUESTIONS = 'GAME_QUESTIONS';
export const GAME_SCORE = 'GAME_SCORE';

export const login = (value) => ({
  type: USER_LOGIN,
  payload: value,
});

export const userAvatar = (value) => ({
  type: USER_AVATAR,
  payload: value,
});

export const userToken = (value) => ({
  type: USER_TOKEN,
  payload: value,
});

export const gameQuestions = (value) => ({
  type: GAME_QUESTIONS,
  payload: value,
});

export const score = (value) => ({
  type: GAME_SCORE,
  payload: value,
});

export const fetchAvatar = (email) => async (dispatch) => {
  const response = await fetchAvatarAPI(email);
  dispatch(userAvatar(response));
};

export const fetchToken = () => async (dispatch) => {
  const response = await fetchTokenAPI();
  dispatch(userToken(response));
};

export const fetchQuestions = (token) => async (dispatch) => {
  const response = await fetchQuestionsAPI(token);
  dispatch(gameQuestions(response));
};
