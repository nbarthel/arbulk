import React, { Component } from 'react';
import _ from 'lodash';
export default class FilterButton extends React.Component {
	constructor(props){
		super(props);
		//this.buttonDisplay = this.props.buttonDisplay
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
/*onRemoveButton(e){
	<span aria-hidden="true">&times;</span>
	console.log(e.target.id)
}*/
render() {
		let buttons = _.map(this.props.buttonDisplay,(button,index) => {
			return (<button type="button" onClick = {(e) => {this.props.onButtonRemove(index,button)}} id={index} key={index} className="btn btn-default">{button}</button>)
			

		//console.log(this.props.button)
		})
	
		//debugger
		return (
			     
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 filter-btn">
                
                {buttons}	
					{/*<button type="button" name="search" onClick={this.props.onSearch} className="btn btn-default">Search</button>*/}
                <a href="javascript:void(0)" name="clearall" onClick={this.props.onRemove}>Clear All</a>
            </div>
		);
	}
}