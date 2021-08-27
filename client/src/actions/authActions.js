import axios from "../axios-config"
import moment from "moment"
import history from "../history"
import { getApiUrl } from "../actions/nodeEnvActions"
import { createAvatar } from '@dicebear/avatars';
import * as maleStyle from '@dicebear/avatars-male-sprites';
import * as femaleStyle from '@dicebear/avatars-female-sprites';

const API_URL = getApiUrl()

console.log(API_URL)

export const LOGIN_REQUEST = () => ({
    type: 'LOGIN_START'
})

export const LOGIN_SUCCESS = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
})


export const getUser = (username) => async (dispatch) => {
  try {
    dispatch({ type: "GETTING_USER" });

    axios({
      method: "get",
      url: `${API_URL}/users/get-user/${username}`,
    })
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      // history.push("/")
    })


  } catch (error) {
    console.log(error);
  }
};



export const startLogin = (user) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_START" });


    axios.post(`${API_URL}/users/login`, user)
    .then(() => { 
      dispatch(getUser(user.username))
      history.push("/")
    })
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



export const startRegister = (username, password, gender) => async (dispatch) => {
  try {
    let dateNow = moment().format("MMMM Do YYYY");
    dispatch({ type: "REGISTER_START" });

    await createAvatar(gender === 'Male' ? maleStyle : femaleStyle, {
      seed: username,
    });

    let profilePicture = `https://avatars.dicebear.com/api/${gender.toLowerCase()}/${username}.svg`

    axios({
      method: "POST",
      url: `${API_URL}/users/register`,
      data: {
        username,
        password,
        gender,
        profilePicture,
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

        dispatch({ type: "REGISTER_ERROR", message: error.message });

      });

  } catch (error) {

    dispatch({
      type: "REGISTER_FAILURE",
      message: error.message,
      response: error.response,
    });

  }
};

export const startLogout = (user) => async (dispatch) => {
  console.log("trying to logout")
  dispatch({ type: "LOGOUT", payload: user.username })
}
