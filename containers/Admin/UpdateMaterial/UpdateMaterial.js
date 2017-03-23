import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'

import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router'
class UpdateMaterial extends Component {
	componentWillMount() {

	}
  componentWillReceiveProps(){
    if(this.props.viewData){
      document.getElementById('active').checked = (this.props.viewData.active==1?true:false)
      document.getElementById('companyMaterial').checked = (this.props.viewData.companyMaterial==1?true:false)
    }

  }
	constructor(props){

		super(props);
		this.state = { location : '',
                  packType : '',
                  customer : ''}
    this.onValueChange = this.onValueChange.bind(this)
    this.Update = this.Update.bind(this)
		this.bagPostObj = {
							"id": 0,
							"packagingTypeId": '',
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
}
onValueChange(e){
  debugger
this.bagPostObj[e.target.id]=e.target.value
this.props.viewData[e.target.id]=e.target.value
if(e.target.id=="active"||e.target.id=="companyMaterial"){
  if(!e.target.checked){
    this.bagPostObj[e.target.id] =0
    this.props.viewData[e.target.id] =0
  }
  else{
    this.props.viewData[e.target.id] = 1
  }
}
this.forceUpdate()
}
	Update(e){
    debugger
		e.preventDefault()
    var temp = JSON.parse(JSON.stringify(this.props.viewData))
    delete temp['TCompany']
    delete temp['TLocation']
    delete temp['TPackagingType']
    axios.put(Base_Url+"TPackagingMaterials/"+temp.id,temp).then((response)=>{
      	swal({
  				title: "Success",
  				text: "Updated",
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

    var locations = _.map(this.props.location,(location)=>{
      return <option key={location.id} value={location.id}>{location.locationName}</option>
    })
    var customers = _.map(this.props.customer,(customer) =>
     {
       return <option key={customer.id} id = {customer.id} value={customer.id}>{customer.name}</option>
     })
     var packagingType = _.map(this.props.packType,(pck,index)=>{
       return(<option key = {index} value = { pck.id }>{pck.packagingType}</option>)
     })
		return (

			<div >
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="form-group">

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >Packaging Type</label></div>
                <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <select onChange = {this.onValueChange} className="form-control" id="packagingTypeId" name=""
              value={this.props&&this.props.viewData?this.props.viewData.packagingTypeId:""}>
                  <option value="">Select Packaging Type</option>
                  {packagingType}									
                </select>
                 <div className="error"><span></span></div>
                </div>

							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >ARB Location</label></div>
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								 <select onChange = {this.onValueChange} className="form-control" id="locationId" name=""
                 value={this.props&&this.props.viewData.TLocation?this.props.viewData.TLocation.id:""}>
										<option disabled selected>Select ARB Location</option>
										{locations}
								 </select>
								 <div className="error"><span></span></div>
								</div>

								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">
								<label className="control control--checkbox "><b>Company Material</b>
								<input onChange = {this.onValueChange} type="checkbox" id="companyMaterial" name=""  /><div className="control__indicator"></div>
								</label>
								</div>
							</div>

							<div className="form-group">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label htmlFor="" >Customer Name</label>
								<select onChange = {this.onValueChange} className="form-control" id="customerId" name=""
                value={this.props&&this.props.viewData.TCompany?this.props.viewData.TCompany.id:""}>
									<option disabled selected>Select Company</option>
									{customers}
								</select>
								 <div className="error"><span></span></div>
								</div>
							</div>

							<div className="form-group">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Packaging Name</label>
							    <input type="text"
							     className="form-control"
							      id="packagingName"
							      onChange = {this.onValueChange}
							      name="" placeholder="Enter Packaging Name "
                    value={this.props&&this.props.viewData.TCompany?this.props.viewData.packagingName:""}/>
								 <div className="error"><span></span></div>
							   </div>

								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Quantity</label>
								<input type="text"
								 className="form-control"
								  id="quantity"
								  onChange = {this.onValueChange}
								  name=""
								  placeholder="Enter Quantity"
                  value={this.props&&this.props.viewData.TCompany?this.props.viewData.quantity:""}/>
								<div className="error"><span></span></div>
								</div>
							</div>

							<div className="form-group">
							  	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Estimated Weight Empty (lbs.)</label>
							    <input type="text"
							    className="form-control"
							    id="emptyWeight"
							    onChange = {this.onValueChange}
							    name=""
							    placeholder="Enter Estimated Weight"
                  value={this.props&&this.props.viewData?this.props.viewData.emptyWeight:""}/>
								 <div className="error"><span></span></div>
							   </div>

								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Avg. Weight of Material in Bags (kgs)</label>
								<input type="text"
								className="form-control"
								id="avarageMaterialWeight"
								onChange = {this.onValueChange}
								name=""
								placeholder="Enter Avg, Weight"
                value={this.props&&this.props.viewData?this.props.viewData.avarageMaterialWeight:""}/>
								<div className="error"><span></span></div>
								</div>
							</div>

							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >No. of Active Bags</label>
									<input type="text"
									className="form-control"
									id="ActiveBags"
									name=""
									placeholder="Enter Avg, Weight"
                  onChange={this.onValueChange}
                  value={this.props&&this.props.viewData?this.props.viewData.ActiveBags:0}/>
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
									  onChange = {this.onValueChange}
									  placeholder="Enter Reorder Threshold"
                    value={this.props&&this.props.viewData?this.props.viewData.reorderThreshold:""}/>
									 <div className="error"><span></span></div>
								</div>
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">
								<label className="control control--checkbox "><b>Active</b>
								<input type="checkbox" onChange = {this.onValueChange} id="active" name=""
                value={this.props&&this.props.viewData?this.props.viewData.active:""}/><div className="control__indicator"></div>
								</label>
								</div>
							</div>

							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="Notes" >Notes</label></div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <textarea className="form-control textarea"
									  rows="3"
									  id="notes"
									  onChange = {this.onValueChange}
									  placeholder="Enter Notes "
                    value={this.props&&this.props.viewData?this.props.viewData.notes:""}></textarea>
									 <div className="error"><span></span></div>
								</div>
							</div>


						</div>




					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							 <div className="pull-left margin-10-last-l"> <button type="submit" onClick = {this.Update} className="btn  btn-primary text-uppercase " >Update</button> </div>
						</div>


					</div>



			</div>

		);
	}
}
export default UpdateMaterial
