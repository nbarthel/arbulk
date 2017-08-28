import React, { Component } from 'react';
import axios from 'axios'
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
class AddMaterialSeal extends Component {
	componentWillMount() {
		this.locationOptions = _.map(this.props.location,(loc,index)=>{
			return (<option key = {index} value = {loc.id}>{loc.locationName}</option>)
		})
		this.companyOptions = _.map(this.props.companyData,(comp,index)=>{
			return (<option key = {index} value = {comp.id}>{comp.name}</option>)
		})
	}
	constructor(props){
		super(props);
		this.state = { }
		this.sealPostObj =    {  
									"id": 0,
									"packagingTypeId": this.props.packagingTypeId,
									"locationId": '',
									"companyMaterial": 0,
									"customerId":'',
									"packagingName":'',
									"emptyWeight":'',
									"avarageMaterialWeight":0,
									"reorderThreshold":'',
									"quantity":'',
									"fullWrapLength":'0',
									"halfWrapLength":'0',
									"notes":'',
									"active": 1}
		this.onSealInput = this.onSealInput.bind(this)
		this.onAddPackMaterial = this.onAddPackMaterial.bind(this) 
	}
	onSealInput(e){
		this.sealPostObj[e.target.id] = e.target.value
		if(e.target.id == "companyMaterial"){
			if(e.target.checked){
				this.sealPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.sealPostObj[e.target.id] = 0
			}
		}
		if(e.target.id == "active"){
			if(e.target.checked){
				this.sealPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.sealPostObj[e.target.id] = 0
			}
		}
	}
	onAddPackMaterial(e){
		console.log(this.sealPostObj)
		axios.post(Base_Url + "TPackagingMaterials",this.sealPostObj).then((response)=>{
			swal({
				title: "Success",
				text: "New material added.",
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
			
			<div > 
			
					
					
					
				        
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >ARB Location</label></div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								 <select className="form-control" onChange = {this.onSealInput} id="locationId" name="">
										<option value="">Select ARB Location</option>
										{this.locationOptions}										
								 </select>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Company Material</b>
								<input type="checkbox" id="companyMaterial" onChange = {this.onSealInput} name=""  /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">								
															<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">						
															<label htmlFor="" >Customer Name</label>
															<select  
															className="form-control" 
															id="customerId" 
															onChange = {this.onSealInput}
															name="" 
															>
															<option value = "">Select Customer</option>
															{this.companyOptions}
															</select>
															 <div className="error"><span></span></div>
															</div>
								
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Packaging Name</label>
							    <input type="text" 
							    className="form-control" 
							    id="packagingName" 
							    name="" 
							    onChange = {this.onSealInput}
							    placeholder="Enter Packaging Name "/>
								 <div className="error"><span></span></div>
							   </div>
								
							</div>
							
							
							
							
							<div className="form-group">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Quantity</label>
								<input type="text"
								 className="form-control" 
								 id="quantity" 
								 name="" 
								 onChange = {this.onSealInput}
								 placeholder="Enter Quantity"/>
								<div className="error"><span></span></div>	
								</div>		
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Estimated Weight Empty (Kg)</label>
							    <input type="text" 
							    className="form-control" 
							    id="emptyWeight"
							    onChange = {this.onSealInput} 
							    name="" 
							    placeholder="Enter Estimated Weight"/>
								 <div className="error"><span></span></div>
							   </div>
							</div>
							
							
							
							<div className="form-group">
																							{/*<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
																							<label htmlFor="" >No. of Active Bags</label>
																							<input type="text" className="form-control" id="" name="" placeholder="Enter Avg, Weight"/>
																							 <div className="error"><span></span></div>
																						</div>	
																					
														*/}	
							</div>													
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >Reorder Threshold</label>
									<input type="text"
									 className="form-control"
									  id="reorderThreshold" 
									  name="" 
									  onChange = {this.onSealInput}
									  placeholder="Enter Reorder Threshold"/>
									 <div className="error"><span></span></div>
								</div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Active</b>
								<input type="checkbox" onChange = {this.onSealInput} id="active" name=""/><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="Notes" >Notes</label></div>	
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <textarea className="form-control textarea" rows="3" id="notes" onChange = {this.onSealInput}  placeholder="Enter Notes "></textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">
							<div className="col-lg-12 padding-20-last-l">
							  <button type="submit" className="btn  btn-primary text-uppercase" onClick = {this.onAddPackMaterial}>Add Packaging Material</button>
							</div>
						</div>					
					</div>
					
					
				
			</div>
	
		);
	}
}
export default AddMaterialSeal