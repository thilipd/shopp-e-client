import ACTIONS from "./index";


export const dispatchDrawer = (val) => {
    return {
        type: ACTIONS.SET_VISIBLE,
        payload: val
    }
}