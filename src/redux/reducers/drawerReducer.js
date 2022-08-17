import ACTIONS from "../actions";

let intialState = false


const drawerReducer = (state = intialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return action.payload;

        default:
            return state;
    }
}
export default drawerReducer;