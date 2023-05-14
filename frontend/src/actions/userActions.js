import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
} from './types';
import { returnErrors } from './errorActions';

/// //////////////////////////////////////////////////////////////////////////
// login
export const login =
  ({ uName, uPw }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',       
      },
    };
    const body = JSON.stringify({ email:uName, password:uPw });

    axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/login`, body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch(
          returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

/// //////////////////////////////////////////////////////////////////////////////
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(
      `${process.env.REACT_APP_BACK_END_URL}/users/get/user`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        /* for token config */ type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((error) => {
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/// //////////////////////////////////////////////////////////////////////////////////////
export const register =
  ({ firstName, lastName, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ firstName, lastName, email, password });

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_URL}/register`,
        body,
        config
      )
      .then((res) =>
        dispatch({
          /* to register emp */ type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            'REGISTER_FAIL'
          )
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
/// //////////////////////////////////////////////////////////////////

export const logout = () =>
  /* logout */
  ({
    type: LOGOUT_SUCCESS,
  });

/// ///////////////////////////////////////////////////////////////////
export const tokenConfig = (getState) => {
  /* token creation */
  const { token } = getState().user;
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers.user_auth = token;
  }
  return config;
};
