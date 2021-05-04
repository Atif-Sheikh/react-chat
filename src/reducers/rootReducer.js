import {combineReducers} from 'redux';

import userReducer from './userReducer';

//Combine all the sub reducers
const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;