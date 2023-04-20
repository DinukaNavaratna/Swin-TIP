import {combineReducers} from "redux";
import empReducer from './empReducer';
import errorReducer from './errorReducer';


export default combineReducers({


    emp : empReducer,
    error : errorReducer
});