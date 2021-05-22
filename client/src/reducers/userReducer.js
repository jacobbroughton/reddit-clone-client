import axios from "axios";
import moment from "moment";

const initialState = {
  username: null,
  password: null,
  loggedIn: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                ...state,
                
            }
    }
};
