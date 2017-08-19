import React, { Component } from 'react';

class OriginComponent extends Component {
	render() {
		return (
			<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7  pddn-10-btm">
			<input type="text" 
			className="form-control" 
			id="origin"
			onChange = {this.props.handleOriginChange} 
			name="" 
			placeholder="Made in USA "/>
			<div className="error"><span></span></div>
								</div>
		);
	}
}
export default OriginComponent