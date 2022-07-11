import ACTIONS from "./index";
import axios from '../../axios/axios';



export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}


export const fetchUser = async (token) => {

    try {
        const res = await axios.get('/user/info', {
            headers: {
                Authorization: token
            }
        })
        return res

    } catch (error) {
        console.log(error)
    }


}

export const dispatchUser = (res) => {

    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res,
            isAdmin: res.role === 1 ? true : false
        }
    }
}



export const dispatchLogout = () => {
    return {
        type: ACTIONS.LOGOUT
    }
}

