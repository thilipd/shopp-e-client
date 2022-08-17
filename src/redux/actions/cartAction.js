import ACTIONS from "./index";





export const dispatchCart = (cart) => {
    return {
        type: ACTIONS.ADD_TO_CART,
        payload: cart
    }
}