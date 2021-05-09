import {combineReducers} from 'redux';

import userReducer from './userReducer';
import actionReducer from './actionReducer';

//Combine all the sub reducers
const rootReducer = combineReducers({
    user: userReducer,
    dashboard: actionReducer,
});

export default rootReducer;