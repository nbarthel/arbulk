/**
 * Created by kailash on 24/8/17.
 */
import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
class UpdateUnit extends React.Component {

    constructor(props){
        super(props);
        this.createUsrObj = {
            "id":0,
            "name" : '',
            'activee':1
        }
        this.state = {
            errors : { },
            createUsrObj : {
                "id":0,
                "name" : '',
                'activee':1
            }
        }
        this.error = false;
        this.onUserInfoChange = this.onUserInfoChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount()
    {
        axios.get(Base_Url+"TPackagingTypes/"+this.props.params.unitId).then((response)=>{
            if(response.data)
            {
                this.createUsrObj.id =response.data.id;
                this.createUsrObj.packagingType =response.data.packagingType;
                this.createUsrObj.active =response.data.active;
                this.setState({
                    createUsrObj: this.createUsrObj
                });
                console.log(this.state.createUsrObj)
            }
        })
    }
    onUserInfoChange(e){
        this.createUsrObj[e.target.id] = e.target.value;
        this.setState({
            createUsrObj: this.createUsrObj
        });
        console.log(this.state.createUsrObj)
    }
    isValid(){
        this.error = false;
        let errors = { }
        if(this.state.createUsrObj.packagingType == "")
        {
            errors.name = "Unit name is required.";
            this.error = true;
        }
        if(this.error){
            this.setState({
                errors : errors
            })
        }
        return this.error;
    }
    onSubmit(e){
        e.preventDefault()
        if(this.isValid() == false){
            console.log(this.state.createUsrObj);
            axios.put(Base_Url+"TPackagingTypes/"+this.props.params.unitId,this.state.createUsrObj).then((response)=>{
                swal({
                    title: "Success",
                    text: "Packaging unit updated successfully.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                }, function(){
                    window.location.reload();
                });
            })
        }
        //onSubmit
    }
    render() {
        return(
            <div className="wrapper-inner">
                <div className="content-inside">
                    <AdminHeader routes = {this.props.routes}/>
                    <section className="admin">
                        <div className="container">
                            <div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <form className="bs-component">
                                    <fieldset className="scheduler-border">
                                        <legend className="scheduler-border">Update Stretch Wrap</legend>
                                        <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="Weight">Name</label>
                                            <div className={this.state.errors.name ? "form-group has error" : "form-group"}>
                                                <input type="text"
                                                       className="form-control"
                                                       id="packagingType"
                                                       value={this.state.createUsrObj.packagingType}
                                                       onChange = {this.onUserInfoChange}
                                                       placeholder="Enter name"/>
                                                { this.state.errors.name &&
                                                <span>{this.state.errors.name}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-lg-12 ">
                                                <button  type="submit"
                                                         onClick = {this.onSubmit}
                                                         className="btn  btn-primary text-uppercase"
                                                >Update Unit</button>
                                            </div>
                                        </div>
                                    </fieldset>

                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}
export default UpdateUnit;
