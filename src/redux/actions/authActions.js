import axios from "../../utils/axios-config"
import moment from "moment"
import history from "../../utils/history"
import { getApiUrl } from "../../redux/actions/nodeEnvActions"
import { createAvatar } from "@dicebear/avatars"
import * as maleStyle from "@dicebear/avatars-male-sprites"
import * as femaleStyle from "@dicebear/avatars-female-sprites"
// import escapeHTML from "../utils/escapeHTML"

const API_URL = getApiUrl()

export const LOGIN_REQUEST = () => ({
  type: "LOGIN_START",
})

export const LOGIN_SUCCESS = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
})

export const getUser = (username) => async (dispatch) => {
  try {
    dispatch({ type: "GETTING_USER" })

    axios({
      method: "get",
      url: `${API_URL}/users/get-user/${username}`,
    }).then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    })
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      message: error.response.data.message,

    })
  }
}

export const startLogin = (user) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" })

    const response = await axios.post(`${API_URL}/users/login`, user)

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch(getUser(user.username))
    history.push("/")
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: "LOGIN_FAILURE",
      message: error.response.data.message,
    })
  }
}

export const startRegister =
  (username, password, gender) => async (dispatch) => {
    try {
      let dateNow = moment().format("MMMM Do YYYY")
      dispatch({ type: "REGISTER_START" })

      await createAvatar(gender === "Male" ? maleStyle : femaleStyle, {
        seed: username,
      })

      let profilePicture = `https://api.dicebear.com/7.x/identicon/svg`

      // username = escapeHTML(username)
      // password = escapeHTML(password)
      // gender = escapeHTML(gender)

      const response = await axios({
        method: "POST",
        url: `${API_URL}/users/register`,
        data: {
          username,
          password,
          gender,
          profilePicture,
          updatedAt: dateNow,
        },
        withCredentials: true,
      })

      let registeredUser = response.data

      dispatch({ type: "REGISTER_SUCCESS", payload: registeredUser })
      dispatch(startLogin(registeredUser))
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        message: error.response.data.message,

      })
    }
  }

export const startLogout = (user) => async (dispatch) => {
  dispatch({ type: "LOGOUT", payload: user.username })
}
