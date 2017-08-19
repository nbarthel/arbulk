import React, { Component } from 'react';
import axios from 'axios'
import { createDataLoader } from 'react-loopback'
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
 class EditCustomersAndTruckersForm extends Component {
 	constructor(props){
 		super(props);
 		this.state = { }
 		this.count = 0
 		this.onStateChange = this.onStateChange.bind(this)
 		this.onCustomerInput = this.onCustomerInput.bind(this)
 		this.onAddressInput = this.onAddressInput.bind(this)
 		this.onUpdateCustomer = this.onUpdateCustomer.bind(this)
 	  	this.onTypeRadioChange = this.onTypeRadioChange.bind(this)
 	  	this.onCityChange = this.onCityChange.bind(this)
 	  	this.onRadioChange = this.onRadioChange.bind(this)
 	  	}
 	componentWillMount(){

 		axios.get(Base_Url + "TStates").then((response)=>{
 			this.setState({
 				stateData : response.data
 			})
 		})
 	}
 	componentDidMount() {
 		if(this.props.custData){
			if(this.props.custData.type == "CUSTOMER"){
				this.refs.cust.checked = true 
			}else if(this.props.custData.type == "TRUCKER"){
				this.refs.truck.checked = true
			}
		}
 			var CustView = createDataLoader(EditCustomersAndTruckersForm,{
 			queries:[{
 				endpoint: 'TCities',
 				filter: {
 					include:["TStates"]
 				}
 			}]
 		})

 		this.selectedState = this.props.addrData.stateId
 		var base = "TCities"
 		this.url = CustView._buildUrl(base,{
 			"where" : {"stateId":this.selectedState}
 		})
 		axios.get(this.url).then((response)=>{
 			this.setState({
 				cityData : response.data
 			})

 		}) 		
 			
 		
 	}
 	onCityChange(e){
 		this.props.addrData.cityId = e.target.value
 		this.forceUpdate()
 	}
 	onStateChange(e){
 		var CustView = createDataLoader(EditCustomersAndTruckersForm,{
 			queries:[{
 				endpoint: 'TCities',
 				filter: {
 					include:["TStates"]
 				}
 			}]
 		})
 		this.props.addrData.stateId = e.target.value
 		this.selectedState = e.target.value
 		var base = "TCities"
 		this.url = CustView._buildUrl(base,{
 			"where" : {"stateId":this.selectedState}
 		})
 		axios.get(this.url).then((response)=>{
 			this.setState({
 				cityData : response.data
 			})

 		})
 	}
 	
 	onCustomerInput(e){
 		this.props.custData[e.target.id] = e.target.value
 		console.log("Props",this.props.custData)
 		//console.log("UpdateObj",this.custUpdateObj)
 		this.forceUpdate()
 	}
 	onAddressInput(e){
 		this.props.addrData[e.target.id] = e.target.value
 		this.forceUpdate()
 	}

 	onTypeRadioChange(e){
 		if(e.target.value == "CUSTOMER"){
 			this.props.custData.type = e.target.value
 		}else if(e.target.value == "TRUCKER"){
 			this.props.custData.type = e.target.value
 		}
 	}
 	onRadioChange(e){
 		var temp = ''
 		if(this.props.custData.primaryContactName != null || this.props.custData.secondaryContactName != null){
 		 		if(this.count == 0){
 		 			this.origObj = _.cloneDeep(this.props.custData)
 		 		}
 		 	if(e.target.value == 0){
 		 		if(this.count == 0){
 		 			temp = this.props.custData.primaryContactName 
 		 			this.props.custData.primaryContactName = this.props.custData.secondaryContactName
 		 			this.props.custData.secondaryContactName = temp
 		 			this.newObj = _.cloneDeep(this.props.custData)		
 		 			this.count = this.count + 1
 		 		}
 		 		this.props.custData.primaryContactName = _.cloneDeep(this.newObj.primaryContactName)
 		 		this.props.custData.secondaryContactName = _.cloneDeep(this.newObj.secondaryContactName)
 			} else if(e.target.value == 1) {
 					this.props.custData.primaryContactName = _.cloneDeep(this.origObj.primaryContactName)
 					this.props.custData.secondaryContactName = _.cloneDeep(this.origObj.secondaryContactName)
 			}
 			console.log(this.props.custData)}
 	}
 	onUpdateCustomer(e){
 		e.preventDefault()
 		var addrId = this.props.addrData.id
 		var custId = this.props.custData.id
 		console.log(this.props.addrData)
 		axios.patch(Base_Url + "TCompanies"+"/"+custId,this.props.custData).then((response)=>{
 			axios.patch(Base_Url + "TAddresses"+"/"+addrId,this.props.addrData).then((newResponse)=>{
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
 		})
 	}
	render() {
			if(this.state.stateData){
			this.stateOptions = _.map(this.state.stateData,(state,index)=>{
					return (
						<option key ={index} value ={state.id}>{state.name}</option>)			
						})
				}
		if(this.state.cityData){
			this.cityOptions = _.map(this.state.cityData,(cty,index)=>{
 				return(<option key = {index} value = {cty.id}>{cty.name}</option>)
 			})
		}	
		return (
			<section className="admin">   
			<div className="container-fluid"> 
		
				<div className="row pddn-20-btm">	
					<form action="" method="post">
						<div className="col-md-6 ">
							<div className="pull-left margin-30-right">
								<label className="control control--radio "><b>Customers</b>
									<input type="radio" onChange = {this.onTypeRadioChange} ref = "cust" id="CUSTOMER" value = "CUSTOMER" name="ADDCustomers"/><div className="control__indicator"></div>
								</label>
							</div>
							<div className="pull-left margin-30-right">
								<label className="control control--radio "><b>Truckers</b>
									<input type="radio" ref = "truck" onChange = {this.onTypeRadioChange} id="TRUCKER" value = "TRUCKER" name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
							</div>
						</div>	
					</form>
				</div>	
		
			
			
				<div className="">   
					<form className="form-horizontal">
					<fieldset className="scheduler-border no-right-border">
				        <legend className="scheduler-border">Upload Data</legend>
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >Company Name</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
									<input type="text"
									 className="form-control" 
									 id="name"
									 name="" 
									 onChange = {this.onCustomerInput}
									 value = {this.props.custData ? (this.props.custData.name ? this.props.custData.name : '') : ''}
									 placeholder="Company Name"/>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	<label htmlFor="usr" >Contact Person 1</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="primaryContactName" 
								name="" 
								onChange = {this.onCustomerInput}
								value = {this.props.custData ? (this.props.custData.primaryContactName ? this.props.custData.primaryContactName : '') : ''}
								placeholder="Contact Person Name"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--radio "><b>Set as Primary Contact</b>
								<input type="radio"
								value = {1}
								onChange = {this.onRadioChange}
								 id="ADDCustomers" 
								 name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	<label htmlFor="" >Contact Person 2</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="secondaryContactName"
								name=""
								onChange = {this.onCustomerInput}
								value = {this.props.custData ? (this.props.custData.secondaryContactName ? this.props.custData.secondaryContactName : '') :''} 
								placeholder="Contact Person Name"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--radio "><b>Set as Primary Contact</b>
								<input type="radio"
								 id="ADDCustomers"
								 value = {0}
								 onChange = {this.onRadioChange}
								  name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
							
							   <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> <label htmlFor="" >Customer Address</label>
							    <input type="text" 
							    className="form-control" 
							    id="address" 
							    name="" 
							    onChange = {this.onAddressInput}
							    value = {this.props.addrData ? (this.props.addrData.address ? this.props.addrData.address : '') : ''}
							    placeholder="Customer Address"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> <label htmlFor="" >State</label>
								   <select value = {this.props.addrData ? (this.props.addrData.stateId ? this.props.addrData.stateId : '') : ''} onChange = {this.onStateChange} className="form-control" id="" name="">
										<option value="">State</option>
										{this.stateOptions}									
									</select>
									<div className="error"><span></span></div>							
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  ">	<label htmlFor="" >City</label>
								   <select className="form-control" onChange = {this.onCityChange} value = {this.props.addrData ? (this.props.addrData.cityId ? this.props.addrData.cityId : '') : ''} id="cityId" name="">
										<option value="">City</option>
										{this.cityOptions}										
									</select>
									<div className="error"><span></span></div>
								</div>
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  ">	<label htmlFor="" >Postal Code</label>
								<input type="text" 
								className="form-control" 
								id="zipCode"
								name="" 
								onChange = {this.onAddressInput}
								value = {this.props.addrData ? (this.props.addrData.zipCode ? this.props.addrData.zipCode : '') : ''}
								placeholder="Postal Code"/>
								<div className="error"><span></span></div>	
								</div>
								
							</div>
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	<label htmlFor="" >Billing Info</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="billingAddress" 
								name=""
								onChange = {this.onAddressInput}
								value = {this.props.addrData ? (this.props.addrData.billingAddress ? this.props.addrData.billingAddress : ''): ''} 
								placeholder="Billing Info"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Same as Address</b>
								<input type="checkbox" id="ADDCustomers" name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">							
							 <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> <label htmlFor="" >Phone Number</label>
							    <input type="text" 
							    className="form-control" 
							    id="phoneNumber"
							    onChange = {this.onCustomerInput}
							    name=""
							    value = {this.props.custData ? (this.props.custData.phoneNumber ? this.props.custData.phoneNumber : '') : ''} 
							    placeholder="Phone Number"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  ">	<label htmlFor="" >Email Address</label>
								<input type="text" 
								className="form-control" 
								id="emailAddress"
								name=""
								onChange = {this.onCustomerInput}
								value = {this.props.custData ? (this.props.custData.emailAddress ? this.props.custData.emailAddress : ''): ''} 
								placeholder="Email Address"/>
								<div className="error"><span></span></div>	
								</div>								
							</div>
							
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="" >Customers Preferences</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
									 <select className="form-control" id="" name="">
										<option value="">Selected Preferences</option>
										<option value="" >Preferences</option>
										<option value="" >Preferences</option>										
									</select>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12"><label htmlFor="Notes" >Notes</label></div>	
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									 <textarea className="form-control textarea" value = {this.props.custData ? (this.props.custData.notes ? this.props.custData.notes : '') : ''} onChange = {this.onCustomerInput} rows="3" id="notes">
									 
									 </textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					</fieldset>
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">
							<div className="col-lg-12 padding-20-last-l">
							  <button type="submit" className="btn  btn-primary text-uppercase" onClick = {this.onUpdateCustomer}>Update Customer</button>
							</div>
						</div>					
					</div>
					
					</form>
				</div>
			</div>
	</section>		      
		);
	}
}
export default EditCustomersAndTruckersForm