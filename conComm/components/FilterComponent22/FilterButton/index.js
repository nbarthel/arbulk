import React, { Component } from 'react';
import _ from 'lodash';
export default class FilterButton extends React.Component {
	constructor(props){
		super(props);
		this.buttonDisplay = props.buttonDisplay 
	}
	//let clearAll = (props) => <a className="underline base_color"> Clear Filter</a>
	
	onClick(e){
		this.props.buttonDisplay = this.props.buttonDisplay.splice(0,this.props.buttonDisplay.length)
		console.log(this.props.buttonDisplay)
	}
	render() {

		var buttons = _.map(this.props.buttonDisplay,(button) => {
			return <button type="button"  className="btn btn-default">{button}<span aria-hidden="true">&times;</span></button>
		console.log(this.props.button)
		}) 
		return (
			     
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 filter-btn">              
                {buttons}
                {(this.props.buttonDisplay.length > 0) ? <a className="underline base_color" onClick={this.onClick}> Clear Filter</a> :null }
                             
            </div>
		);
	}
}