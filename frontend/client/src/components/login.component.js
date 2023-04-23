import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../actions/empActions";
import {clearErrors} from "../actions/errorActions";
import swal from "sweetalert";
import {Link} from "react-router-dom";

class  LoginEmp  extends  Component{

    state={
        empUn: "",
        empPw: "",
        msg :null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired

    }

    loginClose = () => {
        this.props.clearErrors();
        this.setState({
            empUn: "",
            empPw: "",
            msg :null
        });

        this.props.history.push('/addPackage');
    }

    componentDidUpdate =(prevProps) => {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg : error.msg.msg});


            }else{
                this.setState({msg: null });
            }
        }


        if(this.state.msg){
            swal("Unsuccessful", this.state.msg, "error");
            this.setState({msg: null });
        }

        if(isAuthenticated){
            this.loginClose();
        }
    }

    onChangeEmpUn = (e) => {
        this.setState({
            empUn: e.target.value
        });
    }


    onChangeEmpPw = (e) => {
        this.setState({
            empPw: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {empUn, empPw } = this.state;
        const existUser = {
            empUn,
            empPw
        }

        this.props.login(existUser);

        this.setState({
            empUn: "",
            empPw: "",
            msg :null
        });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <Link to={"/registerEmp"} className="nav-link"><button className="btn btn-danger float-right">Employee Register</button></Link>
                <br/><br/>
                <h3>Employee Sign In</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.empUn} onChange={this.onChangeEmpUn}/>

                    </div>


                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.empPw} onChange={this.onChangeEmpPw}/>

                    </div>

                    <div className="form-group">

                        <input type="submit" value="Login" className="btn btn-primary"/>

                    </div>
                </form>
                <br/><br/><br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.emp.isAuthenticated,
    error : state.error
});

export  default connect(mapStateToProps,{login, clearErrors})(LoginEmp);