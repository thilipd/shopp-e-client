import ACTIONS from "./index";
import axios from '../../axios/axios';


export const fetchAllUser = async (token) => {

    try {
        const res = await axios.get('/user/allinfo', {
            headers: {
                Authorization: token
            }
        })
        return res

    } catch (error) {
        console.log(error)
    }


}

export const dispatchAllUser = (res) => {

    return {
        type: ACTIONS.GET_ALL_USER,
        payload: res.data
    }
}