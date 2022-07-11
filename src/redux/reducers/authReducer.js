import ACTIONS from "../actions";

const intialState = {
    user: [],
    isLogged: false,
    isAdmin: false
}


const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state, isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin
            }
        case ACTIONS.LOGOUT:
            return intialState;
        default:
            return state;
    }
}
export default authReducer