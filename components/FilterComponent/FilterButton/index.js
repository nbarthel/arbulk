import React, { Component } from 'react';
import _ from 'lodash';
export default class FilterButton extends React.Component {
	constructor(props){
		super(props);
		this.buttonDisplay = this.props.buttonDisplay
		//this.Query = this.props.Query
		//this.buttonDisplay = ["abc","xyz"] 
	}
/*	componentWillReceiveProps(nextProps) {
		this.setState({
			buttonDisplay : this.props.buttonDisplay
		})
	}*/
	//let clearAll = (props) => <a className="underline base_color"> Clear Filter</a>
	
	/*onClick(e){
		this.props.buttonDisplay = this.props.buttonDisplay.splice(0,this.props.buttonDisplay.length)
		console.log(this.props.buttonDisplay)
	}*/
	/*onClick(e){
		console.log(this.props.buttonDisplay.length)
	}

*/	
onClick(e){
	console.log(e.target.value)
}
render() {
		let index = 0
		let buttons = _.map(this.props.buttonDisplay,(button) => {
			return (<button type="button" onClick = {this.onClick} id={index++} key={index++} className="btn btn-default">{button}<span aria-hidden="true">&times;</span></button>)
			

		//console.log(this.props.button)
		})
	

		return (
			     
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 filter-btn"> 
                {buttons}
                {(this.props.buttonDisplay.length ||  Object.keys(this.props.Query).length !== 0) ?<div> <button type="button" name="clearall" onClick={this.props.onRemove} className="btn btn-default">Clear All</button><button type="button" name="search" onClick={this.props.onSearch} className="btn btn-default">Search</button></div> : null }
                             
            </div>
		);
	}
}