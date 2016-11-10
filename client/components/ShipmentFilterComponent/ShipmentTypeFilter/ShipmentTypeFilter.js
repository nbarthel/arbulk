import React, { Component } from 'react';

  class ShipmentTypeFilter extends Component {
	render() {
		return (
			<div>
				<hr className=" hidden-xs"/>
				<div className="head_bg">
					<h6 className="pull-left">SHIPMENT TYPE</h6>
					<a href=""  className="pull-right text_right"> Show All</a>
				</div>	
				<ul>
					<li>
						<label className="control control--radio">International
						  <input type="radio"  name="shipment_type" value="International" id="International" onChange={this.props.ShipmentType}/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--radio">Domestic
						  <input type="radio"  name="shipment_type" id=""  value="Domestic"  id="Domestic" onChange={this.props.ShipmentType}/><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>
		);
	}
}
export default ShipmentTypeFilter