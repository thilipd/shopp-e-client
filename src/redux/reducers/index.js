import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import users from './usersReducers';
import cart from './cartReducer';
import drawer from './drawerReducer';


export default combineReducers({ auth, token, users, cart, drawer });