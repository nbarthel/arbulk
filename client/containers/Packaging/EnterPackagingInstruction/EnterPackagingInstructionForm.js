import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import SweetAlert from 'sweetalert-react';
import { hashHistory } from 'react-router'
import '../../../public/stylesheets/sweetalert.css';
import RailcarInformation from '../../../components/RailcarInformation/RailcarInformation';
import {Base_Url} from '../../../constants';
var Spinner = require('react-spinkit');
import  validateInput  from './PIValidator';
import { createDataLoader } from 'react-loopback';
export default class EnterPackagingInstructionForm extends React.Component {
    constructor(props)
    	{
    	super(props);
    	this.Allobjs = { }
    	this.PI ={ }
    	this.obj = { }
    	this.railcarObj = { }
		this.railObjects = []
		this.rObjects = []
    	this.PIedit = { }
    	this.railCarObjects = []
    	this.RailCarChange = { }
	    this.state = {
	    	railCarInfoList: [],
	    	customChecked : false,
	    	index: 0,
	    	display: 'none',
	    	isLoading : false,
	    	errors : { },
			rObjects:[]
	    }
	    this.userId = localStorage.getItem('userId')
	    //this.index = 0
	    this.handleRailcarChange = this.handleRailcarChange.bind(this);
	   	this.obj = {
	   		customer_id : '',
	   		location_id : '',
	   		po_number : '',
	   		material : '',
	   		origin_id : '',
	   		packaging_material_id : '',
	   		pallet_type_id : '',
	   		bags_per_pallet : '',
	   		wrap_type_id : '',
	   		bag_id : '',
	   		custom_label : '',
	   	 }
	    this.onAdd = this.onAdd.bind(this);
	    this.handlePIChange = this.handlePIChange.bind(this);
	   	this.onSubmit = this.onSubmit.bind(this);
	   	this.onUpdate =this.onUpdate.bind(this);
	   	this.handleWeightEdit = this.handleWeightEdit.bind(this)
	   	this.onMinus = this.onMinus.bind(this)
	   	this.onChekBoxClick = this.onChekBoxClick.bind(this)
			this.Add = false
	   	//this.onCancel = this.onCancel.bind(this)
	   //	this.onSaveChange = this.onSaveChange.bind(this)
	   // this.handlePIeditChange = this.handlePIeditChange.bind(this)
}
componentWillMount() {

	var PIview = createDataLoader(EnterPackagingInstructionForm,{
		queries:[{
			endpoint: 'TPackagingInstructions',
			filter: {
				include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
			}
		}]
	})
	console.log("I have recieved props")
	//debugger

	var base = 'TCompanies'
	this.urlCustomer = PIview._buildUrl(base, {
		"where" : {type : "CUSTOMER" }
	})


	axios.get(Base_Url+"TPackagingInstructions/getPoList").then((response) => {
            this.setState({
                polList: response.data
            })
        })
            .catch(function(err){
                console.log(err)
            })

	axios.get(this.urlCustomer).then((response) => {
		this.setState({
			customer: response.data
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

/*onCancel(){
	this.context.router.goBack()
}*/

handlePIChange(e){
	this.obj[e.target.name] = e.target.value
	if(this.obj.bag_id == 1){
		this.setState({
			display : 'block'
		})
	}
	else if(this.obj.bag_id != 1){
		this.setState({
			display : 'none'
		})
		this.obj.packaging_material_id = 1
	}
	console.log(this.obj)
}
handleCustomerEditChange(e){
	this.props.data.customer_id = e.target.value
	//this.props.data.customer_id = this.refs.customerPicker.value
	this.forceUpdate()
console.log(this.props.data)
}
handleLocationEditChange(e){
	this.props.data.location_id = e.target.value
	//this.props.data.location_id = this.refs.locationPicker.value
	this.forceUpdate()
	console.log(this.props.data)
}
handlePOEditChange(e){
	this.props.data.po_number = e.target.value
	//this.props.data.po_number = this.refs.purchaseOrder.value
	this.forceUpdate()
	console.log(this.props.data)
}
	cancel(e){

		window.location.reload();
	}
handleMaterialEditChange(e){
	this.props.data.material = e.target.value
	//t	his.props.data.material = this.refs.Material.value
	this.forceUpdate()
	console.log(this.props.data)
}
handleOriginEditChange(e){
	this.props.data.origin_id = e.target.value
	//this.props.data.origin_id = this.refs.Origin.value
	this.forceUpdate()
	console.log(this.props.data)
}
handleTypeOfPackagingEditChange(e){
	this.props.data.bag_id = e.target.value
	//this.props.data.packaging_material_id = this.refs.packagingType.value
	this.forceUpdate()
	console.log(this.props.data)
}
handleTypeofUnitEditChange(e){
this.props.data.packaging_material_id = e.target.value
//this.props.data.bag_id = this.refs.unitType.value
this.forceUpdate()
console.log(this.props.data)
}
handlepalletTypeChange(e){
this.props.data.pallet_type_id = e.target.value
//this.props.data.pallet_type_id = this.refs.palletType.value
this.forceUpdate()
console.log(this.props.data)
}
handleNumberofbagsChange(e){
	this.props.data.bags_per_pallet = e.target.value
	//this.props.data.number_of_bags =  this.refs.bagsNumber.value
	this.forceUpdate()
	console.log(this.props.data)
}

handleWrapTypeChange(e){
		this.props.data.wrap_type_id = e.target.value
		//this.props.data.wrap_type_id = this.refs.wrapType.value
		this.forceUpdate()
		console.log(this.props.data)
}
handleNotesChange(e){
		this.props.data.notes = e.target.value
		//this.props.data.notes = this.refs.notes.value
		this.forceUpdate()
		console.log(this.props.data)
}
handleLabelChange(e){
	this.props.data.custom_label = e.target.value
	//this.props.data.custom_label = this.refs.customLabel.value
	this.forceUpdate()
	console.log(this.props.data)
}
handleRailCarNumberEdit(e,index){
	/*this.RailCarChange[e.target.name] = e.target.value*/
	//console.log(">>>>>>>>>>>>>>..",this.props.id)
	this.props.data.TPackagingInstructionLots[index].railcar_number = e.target.value
	this.forceUpdate()
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...",this.props.data.TPackagingInstructionLots)

}
handleLotNumberEdit(e,index){
	//this.RailCarChange[e.target.name] = e.target.value
	this.props.data.TPackagingInstructionLots[index].lot_number = e.target.value
	this.forceUpdate()

}
handleWeightEdit(e,index){
	//console.log("<<*_________________*>>",key)
	this.props.data.TPackagingInstructionLots[index].weight = e.target.value
	//this.props.lotInfo[id].weight = this.refs.weight.value
	this.forceUpdate()
//console.log(this.RailCarChange)
}

handleRailcarChange(e){
   	//debugger;
   	this.railcarObj[e.target.name] = e.target.value;

   	console.log(this.railcarObj)
   /*	this.state.tempArray[this.state.index]=this.obj
   	var count = this.state.index+1
   	this.setState({
   		index:count,tempArray:this.state.tempArray*/
 // 	})
   }
onUpdate(e){
	debugger;
	//console.log(">>>>>>>>>>>>>>>>>>>>>>",this.PIedit)
	//swal("Failed" , "Error occured please try later!" , "error");
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>.",this.props.data)
	/*this.props.data.customer_id = 2;
	this.props.data.TPackagingInstructionLots[0].lot_number = 5555*/
	var postUrl = Base_Url+"TPackagingInstructions/updatePIEntry"


	$.ajax({
	type:"POST",
	url: postUrl,
	data:this.props.data,
	success:function(){
		swal("Posted" , "Data Has Been Successfully Edited !" , "success");
		hashHistory.push('/Packaging/packaginginstview/')
	},
	Error:function(err){
		swal("Failed" , "Error occured please try later!" , "error");
	}
	})

}
isValid(){
	debugger
	const { errors , isValid } = validateInput(this.obj);
	if(!isValid){
		this.setState({
			errors : errors
		})
	}
	return isValid;
}


onSubmit(e){

	var checkPo = []
	for(var i in this.state.polList){
		checkPo.push(this.state.polList[i].poNumber)
	}
	if(this.obj.po_number != ""){
		if(checkPo.indexOf(this.obj.po_number) > 0){
		swal('Warning' , "This Purchase order already exists" , 'info')
		return ;
	}
	}
	if(this.isValid() == true){
	console.log("PI Object",this.obj)
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){
		dd = '0'+dd
	}
	if(mm<10){
		mm = '0'+mm
	}
	today = mm+'/'+dd+'/'+yyyy
	this.obj.created_by = this.userId
	this.obj.created_on = today
	this.obj.packaging_status = "UNCONFIRMED"
	//this.obj.
Object.defineProperty(this.Allobjs,"PI",{
										enumerable: true ,
                                        writable: true,
                                        configurable:true,
										value:this.obj})
//if(this.state.customChecked == false){
 	if(Object.keys(this.railcarObj).length !== 0){
 		this.addrailcarObject();
 	}
//}

console.log(this.railCarObjects)
/*var Allobjs = {}*/
	/*Object.defineProperty(this.Allobjs,"packagingLots",{
													enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
													value:this.railCarObjects})
	*/

this.Allobjs.packagingLots = this.railCarObjects

console.log(this.Allobjs)

var postUrl = Base_Url+"TPackagingInstructions/createPiEntry"
if(this.railCarObjects== 0){
	swal("Error","Please enter railcar Information","error")
	return;
}
console.log(this.Allobjs)
if(this.Allobjs.PI.po_number == "" || this.Allobjs.PI.po_number === undefined){
	this.Allobjs.PI.po_number = this.Allobjs.packagingLots[0].lot_number
}
$.ajax({
	type:"POST",
	url: postUrl,
	data:this.Allobjs,
	success:function(){
		swal("Posted" , "Data Has Been Successfully Posted !" , "success");
		hashHistory.push('/Packaging/packaginginstview/')
	},
	error:function(err){
		swal("Error","Please enter all the fields","error")

	}

	})

}
	else{
		swal('',"Please complete fields marked as red" , 'info')
	}

}


  addrailcarObject(){
   	var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)
	console.log(this.railCarObjects)
    }

    onMinus(e){
    	    	this.setState({
    		railCarInfoList : [ ]
    	})

		this.Add = false
    	console.log(">>>>>?>>>>>?>>>>>?>>>>>>",this.railcarObj)
    	console.log(this.railCarObjects)
    	//React.unmountComponentAtNode(document.getElementById(''));
    }
onAdd(e){
	/*var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)*/
	//console.log(this.railcarObj)
	this.Add = true
	if(Object.keys(this.railcarObj).length !== 0){
		this.addrailcarObject();
		const railCarInfoList = this.state.railCarInfoList;
		var count = this.state.index+1
		this.setState
		({
				index:count,
				railCarInfoList	: railCarInfoList.concat(<RailcarInformation key={railCarInfoList.length} onChange={this.handleRailcarChange.bind(this)} />)
	    })
	    console.log(this.state.railCarInfoList.length)
	    	/*this.railcarObj = {}*/
	}
	else {
		swal("Empty Fields","Please Enter All The Fields Before Adding New Lots.","error")
	}
}



onChekBoxClick(e){

if(e.target.checked == true)
{

 var obj = ""

 var arrRail = []
 var mulrail = []
 var arrWeight = []
 var arrlot= []
	if(this.Add == false) {
      this.state.rObjects.push(this.railcarObj)
	}
	else if(this.Add == true){

     	mulrail.push(this.railcarObj)
		this.state.rObjects.push(mulrail)
		this.state.rObjects = [].concat.apply([], this.state.rObjects);

		this.state.rObjects.push(this.railCarObjects)
	}
 // railObjects.push(this.addrailcarObjectLabel())
	this.state.rObjects = [].concat.apply([], this.state.rObjects);

 for(var i in this.state.origin){

  if(this.state.origin[i].id == this.obj.origin_id){
   var originName = this.state.origin[i].origin

}

}



 for(var i in this.state.rObjects){
   arrRail.push(this.state.rObjects[i].railcar_number)
   arrWeight.push(this.state.rObjects[i].weight)
   arrlot.push(this.state.rObjects[i].lot_number)
 }
var uniqueRail = arrRail.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

var uniquelot = arrlot.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

//var uniqueWeight = arrWeight
	var uniqueWeight = arrWeight.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
	})

var stampConfirm = localStorage.getItem('userName')
var obj =  this.obj.po_number +'\n' + uniquelot.join() + '\n' + originName + '\n' + this.obj.material +'\n' + uniqueWeight.join() + '\n' + "Stamp Confirmed By :" +  stampConfirm

	this.autolabel = obj
	this.obj.custom_label = obj
	this.setState({
		labelObject : obj,
		customChecked : true
	})
}
else{
  this.setState({
		labelObject : null,
		customChecked : true
	})
	this.obj.custom_label = ""
}
}
 addrailcarObjectLabel()
 {
   	var railCarObjects = Object.assign({},this.railcarObj)
	this.railCarObjects.push(railCarObjects)
	console.log(this.railCarObjects)
     return this.railCarObjects
    }
render() {
	   var customers = _.map(this.state.customer,(customer) =>
    	{
    		return <option key={customer.id} id = {customer.id} value={customer.id}>{customer.name}</option>
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
    	if(this.props.data != undefined){
    		var editableLots = []
    		var index= 0
    	editableLots = _.map(this.props.lotInfo,(lotInfo,index) => {
    		return <RailcarInformation key={index} id = {index} data = {lotInfo} handleRailCarNumberEdit = {(e)=>{this.handleRailCarNumberEdit(e,index)}} handleWeightEdit = {(e)=>{this.handleWeightEdit(e,index) }} handleLotNumberEdit = {(e)=>{this.handleLotNumberEdit(e,index)}} />
    	})
    }
    return (
<section className="edit_Packaging">
<div className="container">
<div className="row">
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">


			<fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PACKAGING INSTRUCTIONS</legend>
				<div className="form-group">
					<label htmlFor="customer_name" className={this.state.errors.customer_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Customer Name</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					{this.props.data == undefined ?
					<select
					 className="form-control"
					 id="customer_name"
					 name="customer_id"
					 onChange={this.handlePIChange}
					>
					<option value="Please Select An Option" disabled selected>Customer Name</option>
					 {customers}
					 </select>
					:
					<select
					 className="form-control"
					 id="customer_name"
					 name="customer_id"
					 ref="customerPicker"
					 onChange={(e) => {this.handleCustomerEditChange(e)}}
					 defaultValue={this.props.data.customer_id}
					 value={this.props.data.customer_id}
					 >
					{customers}
					 </select>
					}
					<div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="ar_bulk_location" className={this.state.errors.location_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>AR Bulk Location</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					   <select
					   className="form-control"
					   id="ar_bulk_location"
					   name="location_id"
					   ref="locationPicker"
					   value = {this.props.data.location_id}
					   onChange={(e)=>{this.handleLocationEditChange(e)}}
					   >
					   {locations}
											  </select> :
						<select
					   className="form-control"
					   id="ar_bulk_location"
					   name="location_id"
					   onChange={this.handlePIChange}
					   >
					   <option value="Please Select An Option" disabled selected>Location</option>
					   {locations}
						</select>}
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Purchase_Order" className={this.state.errors.po_number ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Purchase Order</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <input
					  type="text"
					  className="form-control"
					  id="Purchase_Order"
					  placeholder="Purchase Order"
					  ref="purchaseOrder"
					  name="po_number"
					  onChange={(e)=>{this.handlePOEditChange(e)}}
					  value={this.props.data.po_number} />
					  :
					  <input
					  type="text"
					  className="form-control"
					  id="Purchase_Order"
					  placeholder="Purchase Order"
					  name="po_number"
					  onChange={this.handlePIChange}
					  value={this.state.purchaseorder}/>

					   }

					  <div className="error"><span></span></div>
					</div>
                </div>
			</fieldset>
		<fieldset className="scheduler-border no-right-border">
			<legend className="scheduler-border">RAIL CAR INFORMATION</legend>
				{this.props.lotInfo == undefined ?
				<div>
				<div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span></div>
         		<div className="form-group ">
					<label htmlFor="Rail_Car_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Rail Car Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					{this.props.lotInfo != undefined ?
					  <input
					  type="text"
					  name="railcar_number"
					  className="form-control"
					  id="Rail_Car_Number"
					  placeholder="Rail Car Number"
					  onChange={this.handleRailcarChange}
					  value ={this.props.lotInfo[0].railcar_number} />
					  :
					  <input
					  type="text"
					  name="railcar_number"
					  className="form-control"
					  id="Rail_Car_Number"
					  placeholder="Rail Car Number"
					  onChange={this.handleRailcarChange}
					  value ={this.state.railcarnumber} />	}
					  <div className="error"><span></span></div>
					 </div>
					 <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
						<i className="fa-2x fa fa-plus base_color" onClick={this.onAdd.bind(this)} aria-hidden="true"></i>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="Lot_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Lot Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					     {this.props.lotInfo != undefined ?
					     <input
					     type="text"
					     className="form-control"
					     id="Lot_Number"
					     placeholder="Lot Number"
					     name="lot_number"
					     onChange={this.handleRailcarChange}
					     value={this.props.lotInfo[0].lot_number}/>
					     :
					     <input
					     type="text"
					     className="form-control"
					     id="Lot_Number"
					     placeholder="Lot Number"
					     name="lot_number"
					     onChange={this.handleRailcarChange}
					     value={this.state.lotnumber}/>
					 }
					  <div className="error"><span></span></div>
					</div>
					<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
						{this.state.railCarInfoList.length > 0 ? <i className="fa-2x fa fa-minus base_color" onClick={this.onMinus} aria-hidden="true"></i> : null}
					</div>

                </div>

				<div className="form-group">
					<label htmlFor="Weight" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Weight</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					    {this.props.lotInfo != undefined ?
					    <input
					    type="number"
					    className="form-control"
					    id="Weight"
					    placeholder="Enter in lbs"
					    name="weight"
					    onChange={this.handleRailcarChange}
					    value={this.props.lotInfo[0].weight} />
					    :
					    <input
					    type="number"
					    className="form-control"
					    id="Weight"
					    placeholder="Enter in lbs"
					    name="weight"
					    onChange={this.handleRailcarChange}
					    value={this.state.weight} />
					}
					  <div className="error"><span></span></div>
					</div>
				</div>
				{this.state.railCarInfoList}
				</div>
				:
				<div>{editableLots}</div> }
     	</fieldset>
    </div>

    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PURCHASE ORDER DETAILS</legend>

				<div className="form-group ">
					<label htmlFor="Material" className={this.state.errors.material ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Material</label>
					<div className="col-lg-7 col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <input
					  type="text"
					  className="form-control"
					  id="Material"
					  name="material"
					  placeholder="Material"
					  ref="Material"
					  onChange={(e)=>{this.handleMaterialEditChange(e)}}
					  value={this.props.data.material}/>
					  :
					  <input
					  type="text"
					  className="form-control"
					  id="Material"
					  name="material"
					  placeholder="Material"
					  onChange={this.handlePIChange}
					  value={this.state.Material}/>
					}
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Origin" className = { this.state.errors.origin_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label" }  >Origin</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <select
					   className="form-control"
					   id="Origin"
					   name="origin_id"
					   ref="Origin"
					   value = {this.props.data.origin_id}
					   onChange={(e)=>{this.handleOriginEditChange(e)}}>
						{origins}
						</select>
						:
					   	<select
					   className="form-control"
					   id="Origin"
					   name="origin_id"
					   onChange={this.handlePIChange}>
					   <option value="Please Select An Option" disabled selected>Origin</option>
						{origins}
						</select>
					}
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Type_of_Packaging" className= { this.state.errors.bag_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11 col-xs-11 control-label" } >Type of Packaging</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					 {
					 this.props.data !=undefined ?
					 	 <select
					  className="form-control"
					  id="Type_of_Packaging"
					  name="bag_id"
					  ref="packagingType"
					  onChange={(e)=>{this.handleTypeOfPackagingEditChange(e)}}
					  value = {this.props.data.bag_id}>
						{packagingtypes}
					  </select>
					  :
					  	 <select
					  className="form-control"
					  id="Type_of_Packaging"
					  name="bag_id"
					  onChange={this.handlePIChange}>
					  <option value="Please Select An Option" disabled selected>Type of Packaging</option>
						{packagingtypes}
					  </select>
					  }
					  <div className="error"><span></span></div>

					</div>
                </div>

				<div className="form-group" style={{display : this.state.display}}>
					<label htmlFor="Type_of_Unit" className = {this.state.errors.packaging_material_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"} >Type of Unit</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <select
					   className="form-control"
					    id="Type_of_Unit"
					    name="packaging_material_id"
					    ref="unitType"
					    onChange={(e) => {this.handleTypeofUnitEditChange}}
					    value = {this.props.data.packaging_material_id}>
						{unittypes}
					  </select>
					  :
					<select
					   className="form-control"

					    id="Type_of_Unit"
					    name="packaging_material_id"
					    disabled = {this.state.disabled}
					    onChange={this.handlePIChange}>
					    <option value="Please Select An Option" disabled selected>Type Of Unit</option>
						{unittypes}
					  </select>
					}
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Type_of_Pallet" className= { this.state.errors.pallet_type_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"} >Type of Pallet</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <select
					  className = "form-control"
					  id = "Type_of_Pallet"
					  name = "pallet_type_id"
					  ref="palletType"
					  value = {this.props.data.pallet_type_id}
					  onChange = {(e)=>{this.handlepalletTypeChange(e)}}>
					  {pallettypes}
					</select>
					:
					<select
					  className="form-control"
					  id="Type_of_Pallet"
					  name="pallet_type_id"
					  onChange={this.handlePIChange}>
					  <option value="Please Select An Option" disabled selected>Type of Pallet</option>
					  {pallettypes}
											  </select>
					}
				  <div className = "error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="No_of_Bags_Pallet" className= {this.state.errors.bags_per_pallet ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>No of Bags/Pallet</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <input
					  type="number"
					  className="form-control"
					  id="No_of_Bages_Pallet"
					  placeholder="No of Bags/Pallet"
					  ref="bagsNumber"
					  onChange={(e)=>{this.handleNumberofbagsChange(e)}}
					  name="bags_per_pallet"
					  value={this.props.data.bags_per_pallet} />
					  :
					  <input
					  type="number"
					  className="form-control"
					  id="No_of_Bages_Pallet"
					  placeholder="No of Bags/Pallet"
					  onChange={this.handlePIChange}
					  name="bags_per_pallet"
					  value={this.state.numberofbagsorpallets} />
					}
					  <div className="error"><span>{this.state.errors.bags_per_pallet}</span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Stretch_wrap" className={ this.state.errors.wrap_type_id ? "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label has error" : "col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Stretch wrap</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  {this.props.data != undefined ?
					  <select
					  className="form-control"
					  id="Stretch_wrap"
					  name="wrap_type_id"
					  ref="wrapType"
					  value = {this.props.data.wrap_type_id}
					  onChange={(e)=>{this.handleWrapTypeChange(e)}}>
						{wraptypes}
					</select>
					:
					<select
					  className="form-control"
					  id="Stretch_wrap"
					  name="wrap_type_id"
					  onChange={this.handlePIChange}>
					  <option value="Please Select An Option" disabled selected>Stretch wrap</option>
						{wraptypes}
					</select>
				}
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="No_of_Bags_Pallat" className="col-lg-12 control-label">Notes</label>
					<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
					 {this.props.data != undefined ?
					 <textarea
					 className="form-control textarea"
					 onChange ={(e)=>{this.handleNotesChange(e)}}
					 ref="notes"
					 value = {this.props.data.notes}
					 name="notes"
					 rows="3"
					 id="Notes"></textarea>
					 :
					 <textarea
					 className="form-control textarea"
					 onChange ={this.handlePIChange}
					 name="notes"
					 rows="3"
					 id="Notes"></textarea>
					 }
					 <div className="error"><span></span></div>
					</div>
                </div>
			</fieldset>
		</div>
		<div className="Packaging_footer">
		<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 pddn-10-top">
					<label className="control control--checkbox ">Create Label
					  <input type="checkbox" onClick = {this.onChekBoxClick}  id="row1"/><div className="control__indicator"></div>
					</label>
	</div>
   <div className="container">
      <h4>CUSTOM LABEL</h4><hr/>
      <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12 pddn-10-top">
         <div className="form-group">
            {
            this.props.data != undefined ?
            <textarea
            className="form-control  textarea"
            name= "custom_label"
            onChange ={(e)=>{this.handleLabelChange(e)}}
            ref="customLabel"
            rows="3"
            id="Notes"
            value = {this.props.data.custom_label}
            placeholder="Enter Custom Label information"></textarea>
            :
            <textarea
            className="form-control  textarea"
            name = "custom_label"
            onChange ={this.handlePIChange}
            rows="3"
            id="Notes"
            value={ this.obj.custom_label }
            placeholder="Enter Custom Label information"></textarea>
        	}
            <div className="error"><span>{this.state.errors.custom_label}</span></div>
         </div>

      </div>


      <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12   padding-20-last-l ">
         <div className="pull-left padding-20-last-l">
         {
         this.props.data != undefined ? <button type="button"  className="btn  btn-primary" onClick = {this.onUpdate}>Update</button> :
         <button type="button"  className="btn  btn-primary" onClick = {this.onSubmit}>SUBMIT</button> }
         </div>
         <div className="pull-left padding-20-all"><button type="button" onClick={(e) => this.cancel(e)}  className="btn  btn-gray">CANCEL</button> </div>
		  <div className="pull-left padding-20-all"><button type="button" onClick={hashHistory.goBack}  className="btn  btn-gray">BACK</button> </div>

	  </div>
      {this.state.isLoading ?  <Spinner spinnerName='circle' /> : null}
   </div>

</div>
	</form>


 	</div>
 	</div>
</section>

)}
}
