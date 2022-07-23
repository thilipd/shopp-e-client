import ACTIONS from "./index";
import axios from '../../axios/axios';




export const dispatchCart = (cart) => {
    return {
        type: ACTIONS.ADD_TO_CART,
        payload: cart
    }
}