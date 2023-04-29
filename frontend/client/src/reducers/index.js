import {combineReducers} from "redux";
import empReducer from './empReducer';
import errorReducer from './errorReducer';
import applicantReducer from './empReducer';


export default combineReducers({

    applicant : applicantReducer,
    emp : empReducer,
    error : errorReducer
});