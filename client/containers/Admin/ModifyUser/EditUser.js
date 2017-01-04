import React, { Component } from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import { Base_Url } from '../../../constants'
import axios from 'axios'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
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
	this.onRoleChange = this.onRoleChange.bind(this) 
	this.onUpdate = this.onUpdate.bind(this)
	}
	componentWillMount() {
		if(this.props.params.empId){
			this.empId = this.props.params.empId
			axios.get(Base_Url + "TUsers"+"/"+this.empId).then((response)=>{
				this.setState({
					user : response.data
				})
			})
		}
	}
	onRoleChange(e){
		this.state.user.role = e.target.value
		this.role.role = e.target.value
		console.log(this.role)
		this.forceUpdate()	
	}




	onUpdate(e){
      e.preventDefault()
		this.setState({
			pressed: true
		})
		axios.put(Base_Url + "TUsers" +"/" +this.empId,this.role).then((response)=>{
			swal({
				title: "Success",
				text: "User Data Has Been Updated",
				type: "success",
				showCancelButton: false
			},
			function(isConfirm){
				hashHistory.goBack()
			}
			)


					
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
						<label for="First_Name">First Name</label>
						<input type="text"
						 className="form-control" 
						 id="First_Name" 
						 value = {this.state.user ? this.state.user.firstName : ''} 
						 disabled />
						<div className="error"><span></span></div>
					</div>
				</div>  
				
				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="Last_Name">Last Name</label>
						<input type="text"
						 className="form-control"
						  id="Last_Name"
						  value = {this.state.user ? this.state.user.lastName : ''} 
						  disabled />
						<div className="error"><span></span></div>
					</div>
				</div>  
				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="">Email Address</label>
						<input type="email" 
						className="form-control" 
						id="" 
						value = {this.state.user ? this.state.user.email : ''} 
						disabled />
						<div className="error"><span></span></div>
					</div>
				</div>  
				<div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
					<div className="form-group ">
						<label for="">Confirm Email Address</label>
						<input type="email" 
						className="form-control" 
						id="" 
						value = {this.state.user ? this.state.user.email : ''} 
						disabled /> 
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
				
			</fieldset>
			<div className="form-group">
			<div className="col-lg-12 padding-20-last-l">
			  <button type="submit" className= {this.state.pressed == false ? "btn  btn-primary text-uppercase" : "btn  btn-primary text-uppercase disabled"} onClick = {this.onUpdate}>{this.state.pressed == false ? "Update User" : "PLEASE WAIT"}</button>
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