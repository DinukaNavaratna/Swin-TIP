import {USER_LOADING,USER_LOADED,REGISTER_FAIL,REGISTER_SUCCESS,LOGOUT_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,AUTH_ERROR} from "./types";
import {returnErrors} from "./errorActions";
import axios from 'axios';




/////////////////////////////////////////////////////////////////////////////
//login
export const login = ({empUn , empPw}) => dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({empUn, empPw});



    axios.post('http://localhost:5000/api/emp/login', body, config).then(res => dispatch({
        type:LOGIN_SUCCESS,
        payload: res.data
    })).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        }) ;
    });

}


/////////////////////////////////////////////////////////////////////////////////
export const loadUser = () => (dispatch, getState) => {
    dispatch ({type: USER_LOADING});

    axios.get('http://localhost:5000/api/api/emp/get/emp', tokenConfig(getState)).then(res => dispatch({ /*for token config*/
        type: USER_LOADED,
        payload: res.data
    })).catch(error => {
       // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
export const register = ({empUn, empEmail, empPw}) => dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({empUn,empEmail,empPw});



    axios.post('http://localhost:5000/api/emp/register', body, config).then(res => dispatch({   /*to register emp*/
        type:REGISTER_SUCCESS,
        payload: res.data
    })).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({
           type: REGISTER_FAIL
       }) ;
    });

}
/////////////////////////////////////////////////////////////////////

export const logout = () => {   /*logout*/
    return{
        type : LOGOUT_SUCCESS
    };
};



//////////////////////////////////////////////////////////////////////
export const tokenConfig = (getState) => {    /*token creation*/
    const token = getState().emp.token;
    const config = {
        headers : {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['emp_auth'] = token;
    }
    return config;
}