import axios from "../axios-config.js";
import moment from "moment";
import { loadState } from "../localStorage"
// import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/authActions";

// *
// Initial State
// **
const initialState = loadState('authState') || {};

// *
// User Reducer
// **
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return {
        ...state,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
};

// *
// Action creators
// **

const API_URL = "http://localhost:5000"

export const getUser = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GETTING_USER" });

    axios({
      method: "get",
      url: `${API_URL}/users/get-user/${username}`,
    })
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    })


  } catch (error) {
    console.log(error);
  }
};



export const startLogin = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: "LOGIN_START" });


    axios.post(`${API_URL}/users/login`, user)
    .then(() => dispatch(getUser(user.username)))
    .catch(err => console.log(err))

    

  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      message: error.message,
      response: error.response,
      payload: error.message,
    });
  }
};



export const startRegister = (username, password) => async (dispatch, getState) => {
  try {
    let dateNow = moment().format("MMMM Do YYYY");
    dispatch({ type: "REGISTER_START" });

    axios({
      method: "POST",
      url: `${API_URL}/users/register`,
      data: {
        username,
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      withCredentials: true
    })
      .then((res) => {

        let registeredUser = res.data;

        dispatch({ type: "REGISTER_SUCCESS", payload: registeredUser });

        dispatch(startLogin(registeredUser));

      })
      .catch((error) => {

        dispatch({ type: "REGISTER_ERROR", payload: error });

      });

  } catch (error) {

    dispatch({
      type: "REGISTER_FAILURE",
      message: error.message,
      response: error.response,
    });

  }
};

export const startLogout = (user) => async (dispatch, getState) => {
  console.log("trying to logout")
  dispatch({ type: "LOGOUT", payload: user.username })
}
