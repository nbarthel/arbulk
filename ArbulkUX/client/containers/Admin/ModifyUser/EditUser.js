import React, { Component } from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import { Base_Url } from '../../../constants'
import axios from 'axios'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
var errors={}
class EditUser extends Component {
	constructor(props){
		super(props);
		this.state = {
		user:[],
		pressed : false
	}

	this.empId
	this.role = {
		"role" : ''
	}
	this.state = {
			errors : { }
	}
	this.onRoleChange = this.onRoleChange.bind(this)
	this.onUpdate = this.onUpdate.bind(this)
	this.Change = this.Change.bind(this)
	this.userObject = {}
	this.confirmMatch = this.confirmMatch.bind(this)
	this.setUser = this.setUser.bind(this)
	this.validate = this.validate.bind(this)
	this.tempUser = []
	}
	componentWillMount() {
		if(this.props.params.empId){
			this.empId = this.props.params.empId
			axios.get(Base_Url + "TUsers"+"/"+this.empId).then((response)=>{
				response.data.confirmEmail = response.data.email
				this.setState({
					user : response.data
				})
				this.tempUser = response.data
			})
		}
	}
	Change(e){
		debugger
		this.userObject[e.target.id] = e.target.value
		if(e.target.id=="newPassword" && this.userObject.confirmPassword!=undefined){
			this.confirmMatch()
		}
		if(e.target.id=="email" && this.userObject.confirmEmail!=undefined){
			this.confirmMatch()
		}
		this.tempUser[e.target.id] = e.target.value
		this.setState({
			user : this.tempUser
		})
		this.forceUpdate()
	}
	confirmMatch(e){
		debugger

		if(this.userObject.newPassword || this.userObject.confirmPassword){
		if(this.userObject.newPassword!=this.userObject.confirmPassword){
			errors.confirmPassword="Password doesn't Match"
		}
		else{
				errors.confirmPassword=""
		}
	}
		 if(this.userObject.confirmEmail || this.userObject.email){
			if(this.userObject.confirmEmail!=this.userObject.email){
				errors.confirmEmail="Email doesn't Match"
			}
			else{
				errors.confirmEmail=""
			}
		}
			this.setState({
				errors: errors
			})

	}
	onRoleChange(e){
		this.state.user.role = e.target.value
		this.role.role = e.target.value
		this.userObject.role = e.target.value
		console.log(this.role)
		this.forceUpdate()
	}


 setUser(){
	 if(!this.userObject.role){
		 this.userObject.role = this.state.user.role
	 }
	 if(!this.userObject.email){
		 this.userObject.email = this.state.user.email
	 }
	 if(!this.userObject.confirmEmail){
		 this.userObject.confirmEmail = this.state.user.email
	 }
	 if(!this.userObject.firstName){
		 this.userObject.firstName = this.state.user.firstName
	 }
	 if(!this.userObject.lastName){
		 this.userObject.lastName = this.state.user.lastName
	 }
 }
validate(){
	if(!this.userObject.oldPassword){
		swal("Please provide a old password.")
		return false;
	}
	if(this.userObject.confirmPassword==undefined && this.userObject.newPassword==undefined){
		this.userObject.confirmPassword = this.userObject.oldPassword
		this.userObject.newPassword = this.userObject.oldPassword
	}
	if(!this.userObject.confirmPassword || !this.userObject.newPassword){
		swal("Please provide a password.")
		return false;
	}
	if(this.userObject.confirmPassword!=this.userObject.newPassword){
		swal("Password does not match.")
		return false;
	}
	if(this.userObject.confirmEmail || this.userObject.email){
		if(this.userObject.confirmEmail!=this.userObject.email){
			swal("Email does not match.")
			return false
		}
	}
	if(this.userObject.firstName==""){
		swal("First name can't be empty.")
		return false
	}
	return true
}
	onUpdate(e){
      e.preventDefault()
			debugger
			this.setUser()
		if(!this.validate()){
			return
		}

		this.setState({
			pressed: true
		})
		axios.post(Base_Url+'TUsers/login?include=user',{email:this.userObject.email,password:this.userObject.oldPassword})
		.then((response)=>{
			debugger
			axios.post(Base_Url+"TUsers/"+this.empId+"/replace",{
			password:this.userObject.newPassword,
			firstName:this.userObject.firstName,
			lastName:this.userObject.lastName,
			role:this.userObject.role,
			email:this.userObject.email}).then((response)=>{
				swal("Update successfully.")
				hashHistory.goBack()
			}).catch((error)=>{
				swal("Can't update right now, Please try again later.")
				return
			})

		}).catch((error)=>{
			debugger
				if(error.response.status == 401){
					swal("Old password is wrong.")
					return
				}
		})

	}
	render() {
		return (
			  <div className="wrapper-inner">
    			  <div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
			<section className="admin">
<div className="container">
	<div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
		<form className="form-horizontal bs-component">
			<fieldset className="scheduler-border">
				<legend className="scheduler-border">Create User</legend>


				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="firstName">First Name</label>
						<input type="text"
						 className="form-control"
						 id="firstName"
						 value = {this.state.user ? this.state.user.firstName : ''}
						 onChange={this.Change}
						 />
						<div className="error"><span></span></div>
					</div>
				</div>

				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="lastName">Last Name</label>
						<input type="text"
						 className="form-control"
						  id="lastName"
						  value = {this.state.user ? this.state.user.lastName : ''}
							onChange={this.Change}
						  />
						<div className="error"><span></span></div>
					</div>
				</div>
				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="">Email Address</label>
						<input type="email"
						className="form-control"
						id="email"
						value = {this.state.user ? this.state.user.email : ''}
						onChange={this.Change}
						 />
						<div className="error"><span>{this.state.errors.confirmEmail?this.state.errors.confirmEmail:''}</span></div>
					</div>
				</div>
				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="">Confirm Email Address</label>
						<input type="email"
						className="form-control"
						id="confirmEmail"
						value = {this.state.user ? this.state.user.confirmEmail : ''}
						onChange={this.Change}
						onBlur={this.confirmMatch}
						 />
						  <div className="error"><span>{this.state.errors.confirmEmail?this.state.errors.confirmEmail:''}</span></div>
					</div>
				</div>

				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="oldPassword">Old Password</label>
						<input type="text" id="oldPassword" className="form-control" onChange={this.Change}/>
						<div className="error"><span></span></div>
					</div>
				</div>

				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="">Role</label>
					   <select onChange = {this.onRoleChange} value = {this.state.user ? this.state.user.role : ''} className="form-control" id="" name="">
						<option value="">Select Role</option>
						<option value="Admin">Admin</option>
						<option value="Employee">Employee</option>
						</select>
					  <div className="error"><span></span></div>
					</div>
				</div>

				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="newPassword">New Password</label>
						<input type="text" id="newPassword" className="form-control" onChange={this.Change} />
						<div className="error"><span>{this.state.errors.confirmPassword?this.state.errors.confirmPassword:""}</span></div>
					</div>
				</div>

				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="confirmPassword">Confirm Password</label>
						<input type="text" id="confirmPassword" className="form-control" onChange={this.Change} onBlur={this.confirmMatch} />
						<div className="error"><span>{this.state.errors.confirmPassword?this.state.errors.confirmPassword:""}</span></div>
					</div>
				</div>
			</fieldset>
			<div className="form-group">
			<div className="col-lg-12 padding-20-last-l">
			  <button type="submit" className= {this.state.pressed == false ? "btn  btn-primary text-uppercase" : "btn  btn-primary text-uppercase disabled"} onClick = {this.onUpdate}>Update User</button>
			</div>
			</div>

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
export default EditUser
