import React, { Component } from 'react';

class TextField extends Component {
	render() {
		return (
			<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7  pddn-10-btm">
									 <input type="text" 
									 className="form-control"
									 onChange = {this.props.handleInventLocChange} 
									 id="locationName" 
									 name="" 
									 placeholder="Aisle 1 "/>
					                 <div className="error"><span></span></div>
								</div>	
		);
	}
}
export default TextField