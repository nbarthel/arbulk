import React, { Component } from 'react';
import { Base_Url } from '../../../constants';
import axios from 'axios'
import TextField from './TextField'
 class InventoryComponent extends Component {
 	constructor(props){
		super(props);
		this.state = { 
			textIndex: 0
		}
		this.textFieldComponent = [<TextField key = {this.state.textIndex} handleInventLocChange = {(e) => this.props.handleInventLocChange(e)}/>]
		this.locationOptions
		this.onAddTextField = this.onAddTextField.bind(this)
	}
 	componentWillMount() {
		axios.get(Base_Url + "TLocations").then((response)=>{
			this.setState({
				locationName: response.data
			})
		})
	}
	onAddTextField(e){
		if(this.props.inventLocData.locationName != null && this.props.inventLocData.locationId != null){
			this.props.inventPostArray.push(_.cloneDeep(this.props.inventLocData))
			this.props.inventLocData.locationName = null
		}else{
			swal("Missing Data","Please fill the current field before adding.","info")
			return
		}
		this.textFieldComponent = this.textFieldComponent.concat(<TextField key = {this.state.textIndex + 1}  handleInventLocChange = {(e) => this.props.handleInventLocChange(e)}/>)
		this.setState({
			textIndex: this.state.textIndex + 1
		})
		console.log(this.props.inventPostArray)
	}
	render() {
		if(this.state.locationName){
			this.locationOptions = _.map(this.state.locationName,(loc,index)=>{
				return ( <option key = {index} value = {loc.id}>{loc.locationName}</option>)
			})
		}
		return (
			<div>
			<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 pddn-10-btm">
									<select className="form-control" onChange = {this.props.handleInventLocChange} id="locationId" name="">
										<option value="">AR Bulk Location</option>
										{this.locationOptions}								
										</select>
									  <div className="error"><span></span></div>
								</div>
									
							{this.textFieldComponent}		
						<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " ><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddTextField }></i> </div>
			</div>	
		);
	}
}
export default InventoryComponent