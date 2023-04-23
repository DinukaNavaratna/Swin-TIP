import React, {Component} from 'react';
import axios from 'axios';

import DefaultImg from './assets/default-img.jpg';

import swal from "sweetalert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import disableBrowserBackButton from "disable-browser-back-navigation";
import Alert from "@material-ui/lab/Alert";


class AddPackage extends Component{
    state = {
        serialCode: "",
        packageName: "",
        packageType: "",
        monthlyCharge: "",
        downloadSpeed: "",
        uploadSpeed: "",
        downloadLimit: "",
        uploadLimit: "",
        extraGBFee: "",
        downPayment: "",
        img1: "",
        img2: "",
        multerImage: DefaultImg,
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };


    componentDidMount() {

        disableBrowserBackButton();
    }


    onChangeSerialCode =(e) =>{
        this.setState({
            serialCode: e.target.value
        });
    }

    onChangePackageName =(e) =>{
        this.setState({
            packageName: e.target.value
        });
    }


    onChangePackageType =(e) =>{
        this.setState({
            packageType: e.target.value
        });
    }

    onChangeMonthlyCharge  =(e) =>{
        this.setState({
            monthlyCharge: e.target.value
        });
    }

    onChangeDownloadSpeed =(e) =>{
        this.setState({
            downloadSpeed: e.target.value
        });
    }

    onChangeUploadSpeed =(e) =>{
        this.setState({
            uploadSpeed: e.target.value
        });
    }

    onChangeDownloadLimit =(e) =>{
        this.setState({
            downloadLimit: e.target.value
        });
    }

    onChangeUploadLimit =(e) =>{
        this.setState({
            uploadLimit: e.target.value
        });
    }

    onChangeExtraGBFee =(e) =>{
        this.setState({
            extraGBFee: e.target.value
        });
    }

    onChangeDownPayment =(e) =>{
        this.setState({
            downPayment: e.target.value
        });
    }

    setDefaultImage (uploadType)  {
        if (uploadType === "multer") {
            this.setState({
                multerImage: DefaultImg
            });
        }
    }


    setImage (e, method) {

        if (method === "multer") {


            this.setState({
                img1:"multer-image-" + Date.now(),
                img2 : e.target.files[0]
            });



            this.setState({
                multerImage: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    onSubmit =(e) =>{
        e.preventDefault();

        let imageFormObj = new FormData();

        imageFormObj.append("imageName", this.state.img1);
        imageFormObj.append("imageData", this.state.img2);
        imageFormObj.append("serialCode", this.state.serialCode);
        imageFormObj.append("packageName", this.state.packageName);
        imageFormObj.append("packageType", this.state.packageType);
        imageFormObj.append("monthlyCharge", this.state.monthlyCharge);
        imageFormObj.append("downloadSpeed", this.state.downloadSpeed);
        imageFormObj.append("uploadSpeed", this.state.uploadSpeed);
        imageFormObj.append("downloadLimit", this.state.downloadLimit);
        imageFormObj.append("uploadLimit", this.state.uploadLimit);
        imageFormObj.append("extraGBFee", this.state.extraGBFee);
        imageFormObj.append("downPayment", this.state.downPayment);

        axios.post('http://localhost:5000/api/pac/add', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    swal("Successful", "Package Details Added", "success");
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Package Details Not Added", "error");

            });



        this.setState({
            serialCode: "",
            packageName: "",
            packageType: "",
            monthlyCharge: "",
            downloadSpeed: "",
            uploadSpeed: "",
            downloadLimit: "",
            uploadLimit: "",
            extraGBFee: "",
            downPayment: "",
            img1: "",
            img2: "",
            multerImage: DefaultImg,
            msg: null
        })

    }

    render() {

        const {isAuthenticated} =  this.props.emp;

        return(
            <div style={{marginTop: 10}}>

                {!isAuthenticated ?

                    <div className="text-center">
                    <Alert className="text-center" color="danger"><h3><p className="text-danger text-center">Please Login To add Package Details</p></h3></Alert>
                    <br/>      <br/>          <br/>              <br/>            <br/>             <br/>                <br/>          <br/> <br/>



                    </div>

                        :

                <div>


                    <h3>Add Package Details</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Package Serial Code :</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                value={this.state.serialCode}
                                onChange={this.onChangeSerialCode}
                                maxLength="10"
                            />
                        </div>

                        <div className="form-group">
                            <label>Package Name :</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                value={this.state.packageName}
                                onChange={this.onChangePackageName}
                            />
                        </div>

                        <div className="form-group">
                            <label>Package Type :</label>
                            <div onChange={this.onChangePackageType}>
                                <input type="radio" value="4G" name="type" required/> 4G <br/>
                                <input type="radio" value="Fiber" name="type" required/> Fiber <br/>
                                <input type="radio" value="Broadband" name="type" required/> Broadband
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Monthly Rental (Rs) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.monthlyCharge}
                                onChange={this.onChangeMonthlyCharge}

                            />
                        </div>

                        <div className="form-group">
                            <label>Download Speed (Mbps) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.downloadSpeed}
                                onChange={this.onChangeDownloadSpeed}

                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Speed (Mbps) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.uploadSpeed}
                                onChange={this.onChangeUploadSpeed}

                            />
                        </div>


                        <div className="form-group">
                            <label>Download Limit (GB) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.downloadLimit}
                                onChange={this.onChangeDownloadLimit}

                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Limit (GB) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.uploadLimit}
                                onChange={this.onChangeUploadLimit}

                            />
                        </div>



                        <div className="form-group">
                            <label>Charge for an Extra GB (Rs) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.extraGBFee}
                                onChange={this.onChangeExtraGBFee}
                            />
                        </div>

                        <div className="form-group">
                            <label>Down Payment (Rs) :</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                value={this.state.downPayment}
                                onChange={this.onChangeDownPayment}

                            />
                        </div>


                        <div className="form-group">
                            <label>Add Package Photo :</label>
                            <div className="main-container">
                                <div className="image-container">
                                    <div className="process">

                                        <input required type="file" className="process__upload-btn" onChange={(e) => this.setImage(e, "multer")}/>
                                        <img src={this.state.multerImage} alt="upload-image" className="process__image" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Add Details" className= "btn btn-primary"/>
                        </div>
                    </form>


                </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.emp.isAuthenticated,
    emp: state.emp,
});

export default connect(mapStateToProps, null)(AddPackage);