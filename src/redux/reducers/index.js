import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import users from './usersReducers';
import cart from './cartReducer';


export default combineReducers({ auth, token, users, cart });