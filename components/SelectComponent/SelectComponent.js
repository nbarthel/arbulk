import React from 'react';

class SelectComponent extends React.Component {

constructor(props){
	super(props);
	this.state={
		selectValue : '',
		options:[]
	}
}

	render(){
		var selectValue =  this.state.selectValue;
		var cOption = this.props.options.map(function(item, index){
			return <option key={index} value={item}>{item}</option>
		})

		return(
		<div className="form-group">
		<label className="col-lg-4 control-label">{label}</label>
		<div className="col-lg-8">
		<select 
		id={id}
		value={selectValue}>
		{cOptions}
		</select>
		<div className="error">
		<span></span>
		</div>
		</div>
		</div>

		)
	}
}
export default SelectComponent;