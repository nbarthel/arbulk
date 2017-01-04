import React, { Component } from 'react';

class SteamShipComponent extends Component {
	render() {
		return (
			<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7  pddn-10-btm">
			<input type="text"
			 className="form-control"
			 id="name" 
			 name=""
			 onChange = {this.props.handleSteamShipChange} 
			 placeholder="Type 1 "/>
             <div className="error"><span></span></div>
								</div>
		);
	}
}
export default SteamShipComponent