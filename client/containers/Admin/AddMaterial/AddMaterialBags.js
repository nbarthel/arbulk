import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
class AddMaterialBags extends Component {
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
		this.bagPostObj = { 
							"id": 0,
							"packagingTypeId": this.props.packagingTypeId,
							"locationId": '',
							"companyMaterial": 0,
							"customerId":'',
							"packagingName":'',
							"emptyWeight":'',
							"avarageMaterialWeight":'',
							"reorderThreshold":'',
							"quantity":'',
							"fullWrapLength":'0',
							"halfWrapLength":'0',
							"notes":'',
							"active": 1}

		this.onBagsInput = this.onBagsInput.bind(this)
		this.onAddPackMaterial = this.onAddPackMaterial.bind(this) 
	}
	onAddPackMaterial(e){
		e.preventDefault()
		axios.post(Base_Url + "TPackagingMaterials",this.bagPostObj).then((response)=>{
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
		console.log("BAG POST OBJ",this.bagPostObj)
	}
	onBagsInput(e){
		this.bagPostObj[e.target.id] = e.target.value
		if(e.target.id == "companyMaterial"){
			if(e.target.checked){
				this.bagPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.bagPostObj[e.target.id] = 0
			}
		}
		if(e.target.id == "active"){
			if(e.target.checked){
				this.bagPostObj[e.target.id] = 1
			}else if(!e.target.checked){
				this.bagPostObj[e.target.id] = 0
			}
		}
	}
	render() {
		return (
			
			<div > 
			
					
					
					
				       
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >ARB Location</label></div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								 <select onChange = {this.onBagsInput} className="form-control" id="locationId" name="">
										<option value="">Select ARB Location</option>
										{this.locationOptions}										
								 </select>
								 <div className="error"><span></span></div>
								</div>	
								
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Company Material</b>
								<input onChange = {this.onBagsInput} type="checkbox" id="companyMaterial" name=""  /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label htmlFor="" >Customer Name</label>
								<select onChange = {this.onBagsInput} className="form-control" id="customerId" name="" >
									<option value = "">Select Company</option>
									{this.companyOptions}
								</select>
								 <div className="error"><span></span></div>
								</div>	
								
								{/*<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">						
																<label htmlFor="" >Type of Packaging Material</label>
																<input type="text" className="form-control" id="" name="" placeholder="Enter Packaging Type Material"/>
																 <div className="error"><span></span></div>
																</div>*/}
							</div>
							
							
							
							
							<div className="form-group">							
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Packaging Name</label>
							    <input type="text"
							     className="form-control"
							      id="packagingName"
							      onChange = {this.onBagsInput} 
							      name="" placeholder="Enter Packaging Name "/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Quantity</label>
								<input type="text"
								 className="form-control"
								  id="quantity" 
								  onChange = {this.onBagsInput}
								  name=""
								  placeholder="Enter Quantity"/>
								<div className="error"><span></span></div>	
								</div>								
							</div>
							
							<div className="form-group">							
							  	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Estimated Weight Empty (lbs.)</label>
							    <input type="text" 
							    className="form-control" 
							    id="emptyWeight"
							    onChange = {this.onBagsInput} 
							    name="" 
							    placeholder="Enter Estimated Weight"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Avg. Weight of Material in Bags (kgs)</label>
								<input type="text" 
								className="form-control" 
								id="avarageMaterialWeight" 
								onChange = {this.onBagsInput}
								name="" 
								placeholder="Enter Avg, Weight"/>
								<div className="error"><span></span></div>	
								</div>								
							</div>
							
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >No. of Active Bags</label>
									<input type="text" 
									className="form-control" 
									id="" 
									name="" 
									placeholder="Enter Avg, Weight"/>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >Reorder Threshold</label>
									<input type="text"
									 className="form-control"
									  id="reorderThreshold" 
									  name="" 
									  onChange = {this.onBagsInput}
									  placeholder="Enter Reorder Threshold"/>
									 <div className="error"><span></span></div>
								</div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Active</b>
								<input type="checkbox" onChange = {this.onBagsInput} id="active" name=""/><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="Notes" >Notes</label></div>	
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <textarea className="form-control textarea"
									  rows="3"
									  id="notes"
									  onChange = {this.onBagsInput} 
									  placeholder="Enter Notes "></textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">							
							 <div className="pull-left margin-10-last-l"> <button type="submit" onClick = {this.onAddPackMaterial} className="btn  btn-primary text-uppercase " >Add Packaging Material</button> </div>
						</div>		
						
										
					</div>
					
					
				
			</div>
   
		);
	}
}
export default AddMaterialBags