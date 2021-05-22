import { useDispatch } from "react-redux"
import axios from "axios"
import moment from "moment"


export const startRegister = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_REQUEST' })

        let dateNow = moment().format("MMMM Do YYYY");

        const response = await axios.post("http://localhost:5000/users/register", {
          username,
          password,
          createdAt: dateNow,
          updatedAt: dateNow,
        })

        console.log(response)


        
        
        
    } catch (error) {
        console.log(error)
    }
}