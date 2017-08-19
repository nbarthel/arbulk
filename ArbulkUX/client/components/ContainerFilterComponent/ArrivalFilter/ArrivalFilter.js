import React, { Component } from 'react';

  class ArrivalFilter extends Component {
	render() {
		return (
			<div>
				 
				<div className="head_bg">
					<h6 className="pull-left">Arrived</h6>
					<a href=""  className="pull-right text_right"> </a>
				</div>	
				<ul>
					<li>
						<label className="control control--radio">Yes
						  <input type="radio"  name="arrived_yes" value="1" id="arrived_yes" onChange={this.props.Arrival}/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--radio">No
						  <input type="radio"  name="arrived_yes" id=""  value="0" onChange={this.props.Arrival} /><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>
		);
	}
}
export default ArrivalFilter