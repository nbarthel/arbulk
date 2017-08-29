import React, { Component } from 'react';

  class ArrivalFilter extends Component {
  	constructor(props){
  		super(props)
	}
	componentWillReceiveProps(nextProps){
  		if(nextProps.selectedArrd===1){
  			this.refs["A1"].checked = true
		}
		else if(nextProps.selectedArrd===0){
            this.refs["A0"].checked = true
		}
	}
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
						  <input type="radio"  name="arrived_yes" ref = "A1" value="1" id="A1" onClick={this.props.Arrival}/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--radio">No
						  <input type="radio"  name="arrived_yes" id="A0" ref="A0" value="0" onClick={this.props.Arrival} /><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>
		);
	}
}
export default ArrivalFilter