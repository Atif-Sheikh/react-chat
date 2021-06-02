import {combineReducers} from 'redux';

import userReducer from './userReducer';
import actionReducer from './actionReducer';
import chatReducer from './chatReducer';

//Combine all the sub reducers
const rootReducer = combineReducers({
    user: userReducer,
    dashboard: actionReducer,
    chat: chatReducer,
});

export default rootReducer;