import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import validateUser from './validateUser';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
class CreateUserForm extends React.Component {


  constructor(props){
       super(props);
        this.createUsrObj = {
            "id": 0,
            "firstName" : '',
            "lastName" : '',
            "email": '',
            "confirmEmail": '',
            "role": '',
            "password": '',
            "confirmPassword": ''
        }
        this.state = {
            errors : { }
        }
        this.onUserInfoChange = this.onUserInfoChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        }
        onUserInfoChange(e){
            this.createUsrObj[e.target.id] = e.target.value
            console.log(this.createUsrObj)
        }
    isValid(){
    debugger
    const { errors , isValid } = validateUser(this.createUsrObj);
    if(!isValid){
        this.setState({
            errors : errors
        })
    }
    return isValid;
}
        onSubmit(e){
            e.preventDefault()
            if(this.isValid() == true){
                        axios.post(Base_Url+"TUsers",this.createUsrObj).then((response)=>{
                            swal("Success","User Created","success")
                        })

                    }
            //onSubmit
        }
        render() {
        return (
        <section className="admin">
            <div className="container">
                <div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <form className="form-horizontal bs-component">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Create User</legend>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className={this.state.errors.firstName ? "form-group has error" : "form-group"}>
                                    <label htmlFor="First_Name">First Name</label>
                                    <input type="text"
                                     className="form-control"
                                      id="firstName"
                                      onChange = {this.onUserInfoChange}
                                      placeholder="Enter First Name"/>
                                    <div className="error"><span>{this.state.errors.firstName ? this.state.errors.firstName : ''}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className={this.state.errors.lastName ? "form-group has error" : "form-group"}>
                                    <label htmlFor="Last_Name">Last Name</label>
                                    <input type="text"
                                    className="form-control"
                                    onChange = {this.onUserInfoChange}
                                    id="lastName"
                                    placeholder="Enter Last Name"/>
                                    <div className="error"><span>{this.state.errors.lastName ? this.state.errors.lastName : ''}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className={this.state.errors.emailAddr ?  "form-group has error" : "form-group"}>
                                    <label htmlFor="">Email Address</label>
                                    <input type="email"
                                    className="form-control"
                                    onChange = {this.onUserInfoChange}
                                    id="email"

                                    placeholder="Enter Email Address"/>
                                    <div className="error"><span>{this.state.errors.emailAddr ? this.state.errors.emailAddr : ''}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className = {this.state.errors.confirmEmail ? "form-group has error" : "form-group"}>
                                    <label htmlFor="">Confirm Email Address</label>
                                    <input type="email"
                                    className="form-control"
                                    onChange = {this.onUserInfoChange}
                                    id="confirmEmail"
                                    placeholder="Confirm Email Address"/>
                                    <div className="error"><span>{this.state.errors.confirmEmail ? this.state.errors.confirmEmail : ''}</span></div>
                                </div>
                            </div>
                             <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className = {this.state.errors.password ? "form-group has error" : "form-group"}>
                                    <label htmlFor="">Password</label>
                                    <input type="password"
                                    className="form-control"
                                    onChange = {this.onUserInfoChange}
                                    id="password"
                                    placeholder="Password"/>
                                    <div className="error"><span>{this.state.errors.password ? this.state.errors.passowrd : ''}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className = {this.state.errors.confirmPassword ? "form-group has error" : "form-group"}>
                                    <label htmlFor="">Confrim Password</label>
                                    <input type="password"
                                    className="form-control"
                                    onChange = {this.onUserInfoChange}
                                    id="confirmPassword"
                                    placeholder="Confirm Password"/>
                                    <div className="error"><span>{this.state.errors.confirmPassword ? this.state.errors.confirmPassword : ''}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                <div className= {this.state.errors.role ? "form-group has error" : "form-group"}>
                                    <label htmlFor="">Role</label>
                                    <select className="form-control" onChange = {this.onUserInfoChange} id="role" name="">
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">Employee</option>
                                        </select>
                                    <div className="error"><span>{this.state.errors.role ? this.state.errors.role : ''}</span></div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-group">
                            <div className="col-lg-12 padding-20-last-l">
                                <button type="submit"
                                 onClick = {this.onSubmit}
                                 className="btn  btn-primary text-uppercase"
                                 >Add User</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        );
        }
        }
        export default CreateUserForm;
