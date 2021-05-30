import axios from "axios";
import moment from "moment";
// import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/authActions";

// *
// Initial State
// **
const initialState = {
  user: null,
};

// *
// User Reducer
// **
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST": 
      return {
        ...state
      }
    case "REGISTER_SUCCESS":
      return {
        ...state
      }
    case "LOGIN_REQUEST":
      return {
        ...state,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: {
          // id: action.payload.id,
          username: action.payload.username,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt
        },
      };
    default:
      return state;
  }
};

// *
// Action creators
// **

export const startLogin = (user) => async (dispatch, getState) => {
  try {
    
    console.log("starting login on reducer")
    console.log("User in startlogin ===>", user)
    dispatch({ type: "LOGIN_REQUEST" });
    await axios.post("http://localhost:5000/users/login", user);
    

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      message: error.message,
      response: error.response,
      payload: error.message
    });
    console.log(Promise.reject(error))
  }
};

export const startRegister = (username, password) => async (dispatch, getState) => {
  try {
    let dateNow = moment().format("MMMM Do YYYY");
    dispatch({ type: "REGISTER_START" });

    axios
      .post("http://localhost:5000/users/register", {
        username,
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      })
      .then((res) => {

        let registeredUser = res.data
        console.log("registed user =====> ", registeredUser)

        dispatch({ type: "REGISTER_SUCCESS", payload: registeredUser })
    
        dispatch(startLogin(registeredUser));
        
      })
      .catch((error) => { 
        dispatch({ type: "REGISTER_ERROR", payload: error })
       })

  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};