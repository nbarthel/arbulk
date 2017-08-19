import React, { Component } from 'react';
import axios from 'axios'
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
class AddMaterialShrinkWrap extends Component {
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
		this.wrapPostObj =    {  
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
									"active": 0}
		this.onWrapInput = this.onWrapInput.bind(this)
		this.onAddPackMaterial = this.onAddPackMaterial.bind(this) 
	}
		onAddPackMaterial(e){
			e.preventDefault()
		console.log(this.wrapPostObj)
		axios.post(Base_Url + "TPackagingMaterials",this.wrapPostObj).then((response)=>{
			swal({
				title: "Success",
				text: "New Material Added",
				type: "success",
				showCancelButton: false
			},
			function(isConfirm){
				hashHistory.goBack()
			}
			)
		})
	}
	onWrapInput(e){
		this.wrapPostObj[e.target.id] = e.target.value
		if(e.target.id == "companyMaterial"){
			if(e.target.checked){
				this.wrapPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.wrapPostObj[e.target.id] = 0
			}
		}
		if(e.target.id == "active"){
			if(e.target.checked){
				this.wrapPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.wrapPostObj[e.target.id] = 0
			}
		}
	}
	render() {
		return (
			
			<div > 
			
					
					
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
						
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label for="usr" >ARB Location</label></div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								 <select className="form-control" onChange = {this.onWrapInput} id="locationId" name="">
										<option value="">Select ARB Location</option>
										{this.locationOptions}									
								 </select>
								 <div className="error"><span></span></div>
								</div>	
								
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Company Material</b>
								<input type="checkbox" onChange = {this.onWrapInput} id="companyMaterial" name=""/><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
															
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">						
								<label for="" >Customer Name</label>
								<select className="form-control" id="customerId" onChange = {this.onWrapInput} name="">
								<option value = "">Select Customer</option>
								{this.companyOptions}
								</select>
								 <div className="error"><span></span></div>
								</div>
								
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label for="" >Packaging Name</label>
							    <input type="text" 
							    className="form-control" 
							    id="packagingName" 
							    name="" 
							    onChange = {this.onWrapInput}
							    placeholder="Enter Packaging Name "/>
								 <div className="error"><span></span></div>
							   </div>
							   
							</div>
							
							<div className="form-group">	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label for="" ># Ft. For Full Wrap</label>
								<input type="text" 
								className="form-control" 
								id="fullWrapLength"
								onChange = {this.onWrapInput} 
								name="" 
								placeholder="Enter # Ft. For Full Wrap"/>
								<div className="error"><span></span></div>	
								</div>	

								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label for="" ># Ft. For Half Wrap</label>
							    <input type="text" 
							    className="form-control" 
							    id="halfWrapLength" 
							    onChange = {this.onWrapInput}
							    name="" 
							    placeholder="Enter #ft. for half wrap"/>
								 <div className="error"><span></span></div>
							   </div>
							   
							</div>
							
							<div className="form-group">							
							  	
							   
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label for="" >Avg. Weight of Material in Bags (kgs)</label>
								<input type="text" 
								className="form-control" 
								id="avarageMaterialWeight"
								onChange = {this.onWrapInput} 
								name="" 
								placeholder="Enter Avg, Weight"/>
								<div className="error"><span></span></div>	
								</div>	
															
							</div>
							
						{/*	<div className="form-group">
																						<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
																						<label for="" >No. of Active Bags</label>
																						<input type="text" className="form-control" id="" name="" placeholder="Enter Avg, Weight"/>
																						 <div className="error"><span></span></div>
																					</div>	
																				</div>
													*/}							
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label for="" >Reorder Threshold</label>
									<input type="text"
									 className="form-control"
									  id="reorderThreshold" 
									  onChange = {this.onWrapInput}
									  name="" 
									  placeholder="Enter Reorder Threshold"/>
									 <div className="error"><span></span></div>
								</div>	
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Active</b>
								<input type="checkbox" onChange = {this.onWrapInput} id="active" name=""/><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label for="Notes" >Notes</label></div>	
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <textarea onChange = {this.onWrapInput} className="form-control textarea" rows="3" id="notes"  placeholder="Enter Notes "></textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">
							<div className="col-lg-12 padding-20-last-l">
							  <button type="submit" onClick = {this.onAddPackMaterial} className="btn  btn-primary text-uppercase">Add Packaging Material</button>
							</div>
						</div>					
					</div>
					
				
			</div>
	
		);
	}
}
export default AddMaterialShrinkWrap