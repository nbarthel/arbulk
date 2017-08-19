import React, { Component } from 'react';
var locJSON = require('./LocationLib.json')
class LocationComponent extends Component {
	
	
	render() {
		var locationOptions = _.map(locJSON,(loc,index)=>{
			return (<option key = {index} value = {loc.abbreviation}>{loc.name}</option>)
		})
		return (
			<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 pddn-10-btm">
									<div className="row"> 
									<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 "> 
									<select className="form-control" id="locationName" name="" onChange = {this.props.handleLocationChange}>
										<option value="">AR Bulk Location</option>
										{locationOptions}										
									</select>
			</div>									
			<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 "> 
			<input type="number"
			 className="form-control" 
			 id="bagsPerPallet" 
			 name="" 
			 onChange = {this.props.handleLocationChange}
			 placeholder="Bags Per Pallet"/>
			</div>									 
			<div className="error"><span></span></div>	
			</div>
			</div>
		);
	}
}
export default LocationComponent