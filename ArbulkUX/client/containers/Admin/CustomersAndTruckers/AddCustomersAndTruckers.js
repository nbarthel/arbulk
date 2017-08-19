import React, { Component } from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import { hashHistory } from 'react-router'
import axios from 'axios';
import { Base_Url } from '../../../constants'
import { createDataLoader } from 'react-loopback'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { validateCustomer,validateAddress } from './validateCustomer'
 class AddCustomersAndTruckers extends Component {
 	constructor(props){
 		super(props);
 		this.state = {
 		errors: { },
 		addrErrors: { } }
 		this.custInput = { "id": 0,
 							"active": 1,
 							"name": '',
 							"primaryContactName": '',
 							"secondaryContactName":'',
 							"phoneNumber":'',
 							"emailAddress":'',
 							"type":''}
 		this.addressInput = { "id": 0, 
 							  "active": 1,
 							  "stateId":'',
 							  "address": '',
 							  "billingAddress" : '',
 							  "zipCode": '',
 							  "cityId": ''
 							}
 		this.count = 0
 		
 		this.onStateChange = this.onStateChange.bind(this)
 		this.onCityChange = this.onCityChange.bind(this)
 		this.onRadioChange = this.onRadioChange.bind(this)
 		this.onCustomerInput = this.onCustomerInput.bind(this)
 		this.onTypeRadioChange = this.onTypeRadioChange.bind(this)
 		this.onAddCustomer = this.onAddCustomer.bind(this)
 		this.onAddressChange = this.onAddressChange.bind(this)
 		this.onAddressCheckBox = this.onAddressCheckBox.bind(this)
 	}
 	componentWillMount(){
 		axios.get(Base_Url + "TStates").then((response)=>{
 			this.setState({
 				stateData : response.data
 			})
 		})
 	}
 	onStateChange(e){
 		this.addressInput[e.target.id] = e.target.value
 		var CustView = createDataLoader(AddCustomersAndTruckers,{
 			queries:[{
 				endpoint: 'TCities',
 				filter: {
 					include:["TStates"]
 				}
 			}]
 		})

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
 	onAddressChange(e){
 		this.addressInput[e.target.id] = e.target.value
 	}
 	onCityChange(e){
 		this.addressInput[e.target.id] = e.target.value
 	}
 	onCustomerInput(e){
 		this.custInput[e.target.id] = e.target.value
 		console.log("CustInput",this.custInput)
 	}
 	onTypeRadioChange(e){
 		if(e.target.value == "CUSTOMER"){
 			this.custInput.type = e.target.value
 		}
 		else if(e.target.value == "TRUCKER"){
 			this.custInput.type = e.target.value
 		}
 		console.log("typeChange",this.custInput)
 	}
 	onRadioChange(e){
 		var temp = ''
 		
 		if(this.custInput.primaryContactName != null || this.custInput.secondaryContactName != null)
 			{
 				if(this.count == 0){
 		 			this.origObj = _.cloneDeep(this.custInput)
 		 		}
 		 	if(e.target.value == 0){
 		 		if(this.count == 0){
 		 			temp = this.custInput.primaryContactName 
 		 			this.custInput.primaryContactName = this.custInput.secondaryContactName
 		 			this.custInput.secondaryContactName = temp
 		 			this.newObj = _.cloneDeep(this.custInput)		
 		 			this.count = this.count + 1
 		 		}
 		 		this.custInput = _.cloneDeep(this.newObj)
 			} else if(e.target.value == 1) {
 					this.custInput = _.cloneDeep(this.origObj)
 			}}
 	}
	onAddressCheckBox(e){
		console.log("HELLO");
		if(e.target.checked){
			
			this.addressInput.billingAddress = this.addressInput.address
			this.refs.billAddr.value = this.addressInput.address
		}else if(!e.target.checked){
			
			this.addressInput.billingAddress = ''
			this.refs.billAddr.value = ''
		}
		this.forceUpdate()
	}
	 isValid(){
    
    const { errors , isValid } = validateCustomer(this.custInput);
    if(!isValid){
        this.setState({
            errors : errors
        })
    }
    return isValid;
}
	isAddrValid(){
		debugger
		const { errorsA , isAddrValid } = validateAddress(this.addressInput);
		if(!isAddrValid){
			this.setState({
				addrErrors : errorsA
			})
		}
		return isAddrValid;
	}
 	onAddCustomer(e){
 		e.preventDefault()
 		
 		if(this.isValid() == true && this.isAddrValid() == true){
 			axios.post(Base_Url + "TCompanies",this.custInput).then((response)=>{
 		 			this.addressInput.companyId = response.data.id
 		 			var payLoad = this.addressInput
 		 			console.log("Address",payLoad,response)
 		 			axios.post(Base_Url + "TAddresses",payLoad).then((newResponse)=>{
 		 				swal({
 						title: "Success",
 						text: "New Entry Created",
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
			 <div className="wrapper-inner">
      		<div className="content-inside">
            <AdminHeader routes = {this.props.routes}/>
			<section className="admin">   
			<div className="container"> 
		
				<div className="row pddn-20-btm">	
					<form action="" method="post">
						<div className="col-md-6 ">
							<div className="pull-left margin-30-right">
								<label className={this.state.errors.type ? "control control--radio has error " : "control control--radio"}><b>Customers</b>
									<input type="radio" id="CUSTOMER" onChange = {this.onTypeRadioChange} value = "CUSTOMER"  name="ADDCustomers"/><div className="control__indicator"></div>
								</label>
							</div>
							<div className="pull-left margin-30-right">
								<label className= {this.state.errors.type ? "control control--radio has error" : "control control--radio" } ><b>Truckers</b>
									<input type="radio" id="TRUCKER" onChange = {this.onTypeRadioChange} value = "TRUCKER" name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
							</div>
						</div>	
					</form>
				</div>	
		
			
			
				<div className="row">   
					<form className="form-horizontal">
					<fieldset className="scheduler-border no-right-border">
				        <legend className="scheduler-border">Upload Data</legend>
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							<div className="form-group">
								<div className={this.state.errors.name ? "col-lg-12 col-md-12 col-sm-12 col-xs-12 has error" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"}><label htmlFor="usr" >Company Name</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
									<input type="text"
									 className={this.state.errors.name ? "form-control has error" : "form-control"} 
									 id="name" 
									 name="" 
									 onChange = {this.onCustomerInput}
									 placeholder="Company Name"/>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
							   <div className={this.state.errors.primaryContactName ? "col-lg-12 col-md-12 col-sm-12 col-xs-12 has error" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"}>	<label htmlFor="usr" >Contact Person 1</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="primaryContactName" 
								name="" 
								onChange = {this.onCustomerInput}
								placeholder="Contact Person Name"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--radio "><b>Set as Primary Contact</b>
								<input type="radio" 
								onChange = {this.onRadioChange}
								value = {1}
								id="ADDCustomers" 
								name="ADDCustomers"
								 /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
							   <div className={this.state.errors.secondaryContactName ? "col-lg-12 col-md-12 col-sm-12 col-xs-12 has error" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"}> <label htmlFor="" >Contact Person 2</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="secondaryContactName" 
								name="" 
								onChange = {this.onCustomerInput}
								placeholder="Contact Person Name"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--radio "><b>Set as Primary Contact</b>
								<input type="radio"
								onChange = {this.onRadioChange} 
								value = {0}
								id="ADDCustomers" 
								name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
							
							   <div className={this.state.addrErrors.address ? "col-lg-3 col-md-3 col-sm-3 col-xs-12 has error" : "col-lg-3 col-md-3 col-sm-3 col-xs-12"}> <label htmlFor="" >Customer Address</label>
							    <input type="text"
							     className="form-control"
							      id="address" 
							      name=""
							      onChange = {this.onAddressChange} 
							      placeholder="Customer Address"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> <label htmlFor="" >State</label>
								   <select onChange = {this.onStateChange} className="form-control" id="stateId" name="">
										<option value="">State</option>
													{this.stateOptions}							
									</select>
									<div className="error"><span></span></div>							
								</div>	
								
								<div className={this.state.addrErrors.cityId ? "col-lg-3 col-md-3 col-sm-3 col-xs-12 has error" : "col-lg-3 col-md-3 col-sm-3 col-xs-12"} >	<label htmlFor="" >City</label>
								   <select onChange = {this.onCityChange} className="form-control" id="cityId" name="">
										<option value="">City</option>
										{this.cityOptions}									
									</select>
									<div className="error"><span></span></div>
								</div>
								
								<div className={this.state.addrErrors.zipCode ? "col-lg-3 col-md-3 col-sm-3 col-xs-12 has error" : "col-lg-3 col-md-3 col-sm-3 col-xs-12"}>	<label htmlFor="" >Postal Code</label>
								<input type="text" 
								className="form-control" 
								id="zipCode" 
								name="" 
								onChange = {this.onAddressChange}
								placeholder="Postal Code"/>
								<div className="error"><span></span></div>	
								</div>
								
							</div>
							
							<div className="form-group">
							   <div className={this.state.addrErrors.billingAddress ? "col-lg-12 col-md-12 col-sm-12 col-xs-12 has error" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"}>	<label htmlFor="" >Billing Info</label></div>	
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">	
								<input type="text" 
								className="form-control" 
								id="billingAddress" 
								name="" 
								ref = "billAddr"
								onChange = {this.onAddressChange}
								placeholder="Billing Info"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Same as Address</b>
								<input type="checkbox" 
								id="ADDCustomers" 
								onChange = {this.onAddressCheckBox}
								name="ADDCustomers"/><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">							
							 <div className={this.state.errors.phoneNumber ? "col-lg-3 col-md-3 col-sm-3 col-xs-12 has error" : "col-lg-3 col-md-3 col-sm-3 col-xs-12"}> <label for="" >Phone Number</label>
							    <input type="number" 
							    className="form-control" 
							    onChange = {this.onCustomerInput}
							    id="phoneNumber"
							    name="" 
							    placeholder="Phone Number"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className={this.state.errors.emailAddress ? "col-lg-3 col-md-3 col-sm-3 col-xs-12 has error" : "col-lg-3 col-md-3 col-sm-3 col-xs-12"}>	<label htmlFor="" >Email Address</label>
								<input type="email" 
								className="form-control" 
								id="emailAddress" 
								name=""
								onChange = {this.onCustomerInput} 
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
									 <textarea onChange = {this.onCustomerInput} className="form-control textarea" rows="3" id="notes"></textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					</fieldset>
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">
							
							 <div className="pull-left margin-10-last-l"> <button type="submit" onClick = {this.onAddCustomer} className="btn  btn-primary text-uppercase " >Add Customer</button> </div>
							  <div className="pull-left margin-10-all"><button type="button" id="cancel" onClick = {hashHistory.goBack} className="btn  btn-gray">CANCEL</button> </div>							  
							
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
export default AddCustomersAndTruckers