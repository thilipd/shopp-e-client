import ACTIONS from "../actions";

let intialState = []


const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return action.payload;
        case ACTIONS.REMOVE_FROM_CART:
            return action.payload

        default:
            return state;
    }
}
export default cartReducer