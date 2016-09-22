import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import RailcarInformation from '../../../components/RailcarInformation/RailcarInformation';
import {Base_Url} from '../../../constants';
export default class EnterPackagingInstructionForm extends React.Component {
    constructor(props) 
    	{
    	super(props);
    	this.Allobjs = { }
    	this.PI ={ }
    	this.obj = { }
    	this.railcarObj = { }
    	this.railCarObjects = []
	    this.state = { 
	    	railCarInfoList: [],
	    	index: 0, 
	    }
	    this.handleRailcarChange = this.handleRailcarChange.bind(this);
	    this.onClick = this.onClick.bind(this);
	    this.onAdd = this.onAdd.bind(this);
	    this.handlePIChange = this.handlePIChange.bind(this);
   	}
handlePIChange(e){
	this.obj[e.target.name] = e.target.value
	//console.log(this.obj)
}
handleRailcarChange(e){
   	//debugger;
   	this.railcarObj[e.target.name] = e.target.value;
   //	console.log(this.railcarObj)
   /*	this.state.tempArray[this.state.index]=this.obj
   	var count = this.state.index+1
   	this.setState({
   		index:count,tempArray:this.state.tempArray
   	})*/

   }

componentDidMount() {
	axios.get(Base_Url +"TCompanies").then((data) => {
		this.setState({
			name: data.data
		})
	})
	.catch(function(err){
		console.log('eroor>>>>' , err)
	})
	axios.get(Base_Url+"TLocations").then((response) => {
		this.setState({
			location: response.data
		})
	})
	.catch(function(err){
		console.log('eroor>>>>' , err)
	})
	axios.get(Base_Url+"TOrigins").then((response)=> {
	this.setState({
		origin: response.data
		})
	})
	.catch(function(err){
	console.log(err)
	})

	axios.get(Base_Url+"TPackagingTypes").then((response) => {
	this.setState({
		packagingtype : response.data
		})
	})
	.catch(function(err){
		console.log(err)
	})

	axios.get(Base_Url+"TPalletTypes").then((response)=> {
		this.setState({
			pallettype : response.data
		})
	})
	.catch(function(err){
		console.log(err)
	})

	axios.get(Base_Url+"TWrapTypes").then((response) => {
		this.setState({
			wrapType : response.data
		})
	})
	.catch(function(err){
		console.log(err)
	})

	axios.get(Base_Url+"TPackagingMaterials").then((response) => {
		this.setState({
			unittype : response.data
		})
	})
	.catch(function(err){
		console.log(err)
	})
}

onClick(e){	
	//console.log(this.obj)
	/*var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)*/
	Object.defineProperty(this.Allobjs,"PI",{value:this.obj})
	if(Object.keys(this.railcarObj).length !== 0){
		this.addrailcarObject();
	}
	Object.defineProperty(this.Allobjs,"packagingLots",{value:this.railCarObjects})
	console.log(this.Allobjs)
	}

    addrailcarObject(){
   	var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)
	console.log(this.railCarObjects)
    }
onAdd(e){ 
	/*var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)*/
	//console.log(this.railcarObj)
	if(Object.keys(this.railcarObj).length !== 0){
		this.addrailcarObject();
		const railCarInfoList = this.state.railCarInfoList;
		var count = this.state.index+1
		this.setState
		({
				index:count,
				railCarInfoList	: railCarInfoList.concat(<RailcarInformation key={railCarInfoList.length} onChange={this.handleRailcarChange.bind(this)} />)
	    })
	    this.railcarObj = {}
	}
	else {
		console.log("Please enter the rail Car information")
	}
}

 
render() {
    var options = _.map(this.state.name,(option) => 
    	{
    		return <option key={option.id} value={option.id}>{option.name}</option>
    	})

    	var locations = _.map(this.state.location,(location) => {
    		return <option key={location.id} value={location.id}>{location.locationName}</option>
    	})
    	var origins = _.map(this.state.origin,(origin) => {
    		return <option key={origin.id} value={origin.id}>{origin.origin}</option>
    	})

    	var packagingtypes = _.map(this.state.packagingtype,(packagingtype) => {
    		return <option key={packagingtype.id} value={packagingtype.id}>{packagingtype.packagingType}</option>
    	})
    	var unittypes = _.map(this.state.unittype,(unittype) => {
    		return <option key={unittype.id} value={unittype.id}>{unittype.packagingName}</option>
    	})

    	var pallettypes = _.map(this.state.pallettype,(pallettype) => {
    		return <option key={pallettype.id} value={pallettype.id}>{pallettype.palletType}</option>
    	})
    	var wraptypes = _.map(this.state.wrapType,(wraptype) => {
    		return <option key={wraptype.id} value={wraptype.id}>{wraptype.name}</option>
    	})
    return (
<section className="edit_Packaging">  
<div className="container"> 
<div className="row">   
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	
		
			<fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PACKAGING INSTRUCTIONS</legend>
				<div className="form-group">
					<label htmlFor="customer_name" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Customer Name</label>
				
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					 <select 
					 className="form-control" 
					 id="customer_name" 
					 name="customer_name"
					 onChange={this.handlePIChange}
					 >
					 {options}	 	
					 	</select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="ar_bulk_location" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">AR Bulk Location</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					   <select 
					   className="form-control" 
					   id="ar_bulk_location" 
					   name="ar_bulk_location"
					   onChange={this.handlePIChange}
					   >
					   {locations}
											  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Purchase_Order" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Purchase Order</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input 
					  type="text" 
					  className="form-control" 
					  id="Purchase_Order" 
					  placeholder="Purchase Order"
					  name="purchase_order"
					  onChange={this.handlePIChange} 
					  value={this.state.purchaseorder}/>
					  <div className="error"><span></span></div>
					</div>
                </div> 
			</fieldset>	
		<fieldset className="scheduler-border no-right-border">
			<legend className="scheduler-border">RAIL CAR INFORMATION</legend>
				<div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span>990 bages Estimated</span></div>
         		<div className="form-group ">
					<label htmlFor="Rail_Car_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Rail Car Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input 
					  type="text"
					  name="railcar_number" 
					  className="form-control" 
					  id="Rail_Car_Number" 
					  placeholder="Rail Car Number"
					  onChange={this.handleRailcarChange}
					  value ={this.state.railcarnumber} />																																
					  <div className="error"><span></span></div>
					 </div>
					 <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">					
						<i className="fa-2x fa fa-plus base_color" onClick={this.onAdd.bind(this)} aria-hidden="true"></i>                   
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Lot_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Lot Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					     <input 
					     type="text" 
					     className="form-control" 
					     id="Lot_Number" 
					     placeholder="Lot Number"
					     name="lot_number" 
					     onChange={this.handleRailcarChange}
					     value={this.state.lotnumber}/>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Weight" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Weight</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					    <input 
					    type="text"
					    className="form-control" 
					    id="Weight" 
					    placeholder="Weight"
					    name="weight" 
					    onChange={this.handleRailcarChange}
					    value={this.state.weight} />
					  <div className="error"><span></span></div>
					</div>
				</div>
				{this.state.railCarInfoList}
     	</fieldset>
    </div>
    	
    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PURCHASE ORDER DETAILS</legend>
				
				<div className="form-group ">
					<label htmlFor="Material" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Material</label>
					<div className="col-lg-7 col-sm-11 col-xs-11 ">
					  <input 
					  type="text" 
					  className="form-control" 
					  id="Material"
					  name="material"
					  placeholder="Material"
					  onChange={this.handlePIChange} 
					  value={this.state.Material}/>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Origin" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Origin</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					   <select 
					   className="form-control" 
					   id="Origin" 
					   name="Origin"
					   onChange={this.handlePIChange}>
						{origins}					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Type_of_Packaging" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Packaging</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select 
					  className="form-control" 
					  id="Type_of_Packaging" 
					  name="Type_of_Packaging"
					  onChange={this.handlePIChange}>
						{packagingtypes}
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Type_of_Unit" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Unit</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select
					   className="form-control"
					    id="Type_of_Unit" 
					    name="Type_of_Unit"
					    onChange={this.handlePIChange}>
						{unittypes}
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Type_of_Pallet" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Pallet</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select 
					  className="form-control" 
					  id="Type_of_Pallet" 
					  name="Type_of_Pallet"
					  onChange={this.handlePIChange}>
					  {pallettypes}
											  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="No_of_Bages_Pallat" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">No of Bages/Pallat</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input 
					  type="text" 
					  className="form-control" 
					  id="No_of_Bages_Pallat" 
					  placeholder="No of Bages/Pallat"
					  onChange={this.handlePIChange}
					  name="no_of_bags_pallets"
					  value={this.state.numberofbagsorpallets} />
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Stretch_wrap" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Stretch wrap</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select 
					  className="form-control" 
					  id="Stretch_wrap" 
					  name="Stretch_wrap"
					  onChange={this.handlePIChange}>
						{wraptypes}					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="No_of_Bages_Pallat" className="col-lg-12 control-label">Notes</label>
					<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
					 <textarea className="form-control textarea" rows="3" id="Notes"></textarea> 					  
					 <div className="error"><span></span></div>
					</div>
                </div>	
			</fieldset>	
		</div>
	<div className="Packaging_footer">

	<div className="container">
		<h4>CUSTOM LABEL </h4><hr/>
		<div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12 pddn-10-top">

			<div className="form-group">
				<textarea className="form-control  textarea" rows="3" id="Notes" placeholder="Enter Custom Label information"></textarea>
				<div className="error"><span></span></div>
			</div>
		</div>


		<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12   padding-20-last-l ">
			<div className="pull-left padding-20-last-l"><button type="button"  className="btn  btn-primary" onClick={this.onClick}>SUBMIT</button> </div>
			<div className="pull-left padding-20-all"><button type="button"  className="btn  btn-gray">CANCEL</button> </div>
		</div>

	</div>

</div>
 		
	</form>	
	
	
 	</div>	
 	</div>
</section>	
    	
)}
}

