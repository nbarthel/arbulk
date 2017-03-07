import React from 'react';
import axios from 'axios';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
var DatePicker = require('react-datepicker');
import SweetAlert from 'sweetalert-react';
import { DateField, Calendar } from 'react-datepicker'
var moment = require('moment');
var Spinner = require('react-spinkit');
import {Base_Url} from '../../../constants';
import { createDataLoader } from 'react-loopback';
//import  validateInput  from './shipmentvalidator';
require('react-datepicker/dist/react-datepicker.css');
import '../../../public/stylesheets/sweetalert.css';
import LotInformation from './LotInformation';
import { hashHistory } from 'react-router'
class InternationalShipementEdit extends React.Component {
	constructor(props){
		super(props);
		this.SIObj = { }
		this.postObj = { }
		this.lotNumber
		this.onSave = this.onSave.bind(this)
		this.EarliestReturnDate = this.EarliestReturnDate.bind(this)
		this.DocDate = this.DocDate.bind(this)
		this.CargoDate = this.CargoDate.bind(this)
		this.customerChange = this.customerChange.bind(this)
		this.releaseChange = this.releaseChange.bind(this)
		this.containerChange = this.containerChange.bind(this)
		this.noOfBagsChange = this.noOfBagsChange.bind(this)
		this.poChange =  this.poChange.bind(this)
		this.bookingChange = this.bookingChange.bind(this)
		this.freightChange = this.freightChange.bind(this)
		this.vesselChange = this.vesselChange.bind(this)
		this.shipLineChange = this.shipLineChange.bind(this)
		this.containerTypeChange = this.containerTypeChange.bind(this)
		this.pickupChange = this.pickupChange.bind(this)
		this.returnChange = this.returnChange.bind(this)
		this.noteChange = this.noteChange.bind(this)
		this.freeDaysChange = this.freeDaysChange.bind(this)
		this.lotBagsChange = this.lotBagsChange.bind(this)
		this.handleBagsToShip = this.handleBagsToShip.bind(this)
	}
	bagsChange(e){
		this.props.editData.numberOfBags = e.target.value
		this.forceUpdate()
	}
	lotBagsChange(e){
		this.props.editData.TShipmentLots[0].noOfBags = e.target.value
		this.forceUpdate()
	}

	freeDaysChange(e){
		this.props.editData.TShipmentInternational[0].freeDaysPerContainer = e.target.value
		this.forceUpdate()
	}
	noteChange(e){
		this.props.editData.TShipmentInternational[0].notes = e.target.value
		this.forceUpdate()
	}
	returnChange(e){
		this.props.editData.TShipmentInternational[0].containerReturnLocation = e.target.value
		this.forceUpdate()
	}
	pickupChange(e){
		this.props.editData.TShipmentInternational[0].containerPickupLocation = e.target.value
		this.forceUpdate()
	}
	containerTypeChange(e){
		this.props.editData.TShipmentInternational[0].containerTypeId = e.target.value
		this.forceUpdate()
	}
	shipLineChange(e){
		this.props.editData.TShipmentInternational[0].steamshipLineId = e.target.value
		this.forceUpdate()
	}
	vesselChange(e){
		this.props.editData.TShipmentInternational[0].steamshipVessel = e.target.value
		this.forceUpdate()
	}
	freightChange(e){
		this.props.editData.TShipmentInternational[0].freightForwarder = e.target.value
		this.forceUpdate()
	}
	bookingChange(e){
		this.props.editData.TShipmentInternational[0].bookingNumber = e.target.value
		this.forceUpdate()
	}
    handleBagsToShip(e){
        this.props.editData.TShipmentLots[0].noOfBags = e.target.value
        this.forceUpdate()
    }
    handleLotBagsToShip(e,index){
        this.props.editData.TShipmentLots[index].noOfBags = e.target.value
        this.forceUpdate()
    }
	poChange(e){
		var MIView = createDataLoader(InternationalShipementEdit, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var pLotUrl = MIView._buildUrl(base, {

                        "where": {"pi_id":  e.target.value }
                     } );

                 axios.get(pLotUrl).then((response)=>{
                   this.setState({
                    lotNumber: response.data
                   })
              this.lotNumber = _.map(this.state.lotNumber,(lotNum,index) => {
            return <option key = {index} id = {lotNum.id} value = {lotNum.id}>{lotNum.lot_number}</option>
        })
                })
       this.forceUpdate()
	}
	noOfBagsChange(e){
		this.props.editData.noOfBags = e.target.value
		this.forceUpdate()
	}
	containerChange(e){
		this.props.editData.numberOfContainers = e.target.value
		this.forceUpdate()
	}
	releaseChange(e){
		this.props.editData.releaseNumber = e.target.value
		this.forceUpdate()
	}
	customerChange(e){
		this.props.editData.customerId = e.target.value
		 var MIView = createDataLoader(InternationalShipementEdit,{
            queries: [{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include: ['TPackagingInstructionLots']
                }
            }]
           })
           var baseUrl = 'TpackagingInstructions'
           var Purl = MIView._buildUrl(baseUrl,{
            "where" : {"customer_id": e.target.value}
           })


         axios.get(Purl).then((response)=>{
            this.setState({
                poNumber: response.data
            })
        this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} value={poNum.id}>{poNum.po_number}</option>})
                console.log("poNumber",this.state.poNumber)
            this.forceUpdate()
         })
	}
	CargoDate(e){
		this.props.editData.TShipmentInternational[0].cargoCutoffDate = e.target.value
	}
	DocDate(e){
		 this.props.editData.TShipmentInternational[0].docCutoffDate = e.target.value
	}
	EarliestReturnDate(e){
        this.props.editData.TShipmentInternational[0].earliestReturnDate = e.target.value
        console.log(this.props.editData.TShipmentInternational[0].earliestReturnDate);

    }
	componentDidMount() {
		debugger
            var MIView = createDataLoader(InternationalShipementEdit, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var pLotUrl = MIView._buildUrl(base, {

                        "where": {"pi_id":  this.props.editData.TShipmentLots[0].sId }
                     } );

                 axios.get(pLotUrl).then((response)=>{
                   this.setState({
                    lotNumber: response.data
                   })
              this.lotNumber = _.map(this.state.lotNumber,(lotNum,index) => {
                console.log("LOTNUMBER",this.state.lotNumber)
            return <option key = {index} id = {lotNum.id} value = {lotNum.id}>{lotNum.lot_number}</option>
                 })
                 this.forceUpdate()
                })
                if(this.props.editData.TShipmentInternational[0].cargoCutoffDate){
                	document.getElementById("ccdate").value = moment(this.props.editData.TShipmentInternational[0].cargoCutoffDate).format("YYYY-MM-DD")
                }
                 if(this.props.editData.TShipmentInternational[0].docCutoffDate){
                	document.getElementById("dcdate").value = moment(this.props.editData.TShipmentInternational[0].docCutoffDate).format("YYYY-MM-DD")
                }
                if(this.props.editData.TShipmentInternational[0].earliestReturnDate){
                	document.getElementById("errdate").value = moment(this.props.editData.TShipmentInternational[0].docCutoffDate).format("YYYY-MM-DD")
                }
                this.SIObj.customerId = this.props.editData.customerId
                this.SIObj.releaseNumber = this.props.editData.releaseNumber
                this.SIObj.numberOfContainers = this.props.editData.numberOfContainers
                this.SIObj.numberOfBags = this.props.editData.numberOfBags
                this.SIObj.id = this.props.editData.id
                this.SIObj.isDomestic = this.props.editData.isDomestic
                this.SIObj.loactionId = this.props.editData.loactionId


           var MIView = createDataLoader(InternationalShipementEdit,{
            queries: [{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include: ['TPackagingInstructionLots']
                }
            }]
           })
           var baseUrl = 'TpackagingInstructions'
           var Purl = MIView._buildUrl(baseUrl,{
            "where" : {"customer_id": this.props.editData.customerId}
           })


         axios.get(Purl).then((response)=>{
            this.setState({
                poNumber: response.data
            })
        this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} value={poNum.id}>{poNum.po_number}</option>})
                console.log("poNumber",this.state.poNumber)
                this.forceUpdate()
         })
   }
            componentWillMount() {
            axios.get(Base_Url + "TShipmentTypes/").then((response) => {
            this.setState({
            ShipmentType: response.data
            })
            })
            .catch(function (err) {
            console.log(err)
            })
            axios.get(Base_Url +"TCompanies").then((response) => {
            this.setState({
            customer: response.data
            })
            this.customers = _.map(this.state.customer,(customer) => {
            return <option key = {customer.id} id = {customer.id} value={customer.id}>{customer.name}</option>
            })
            })
            .catch(function(err){
            console.log('eroor>>>>' , err)
            })

            axios.get(Base_Url + "TContainerTypes").then((response) => {
            this.setState({
            containerType: response.data
            })
            this.containerType = _.map(this.state.containerType,(contType,index) => {
            return <option key = {index} id = {contType.id} value = {contType.id}>{contType.name}</option>
            })
            })

            axios.get(Base_Url +"TSteamshipLines").then((response) => {
            this.setState({
            steamShipLine : response.data
            })
            this.steamShipLine = _.map(this.state.steamShipLine,(steamShip,index) => {
            return <option key = {index} id = {steamShip.id} value = {steamShip.id}>{steamShip.name}</option>
            })
            })
            axios.get(Base_Url + "TPaymentTypes").then((response) => {
            this.setState({
            paymentType : response.data
            })
            })
            axios.get(Base_Url + "TLocations").then((response) => {
            this.setState({
            location : response.data
            })
            var location = _.map(this.state.location,(location,index) =>
            {
            return <option key = {index} id = {location.id} value = {location.id}>{location.locationName}</option>
            })
            })
            }
     onSave(e){
			 debugger;
			 if(this.props.editData.TShipmentLots[0].TPackagingInstructionLots.inInventory<this.props.editData.TShipmentLots[0].noOfBags){
		     swal("Shipped bags must not be greater than Inventory bags")
		     return;
		   }
     	this.SIObj.customerId = this.props.editData.customerId
        this.SIObj.releaseNumber = this.props.editData.releaseNumber
        this.SIObj.numberOfContainers = this.props.editData.numberOfContainers
        this.SIObj.numberOfBags = this.props.editData.numberOfBags
        this.SIObj.id = this.props.editData.id
        this.SIObj.isDomestic = this.props.editData.isDomestic
        this.SIObj.loactionId = this.props.editData.loactionId
		this.id = this.props.editData.id
		this.postObj.SI = this.SIObj
		this.postObj.International = this.props.editData.TShipmentInternational
		this.postObj.lotInformation = this.props.editData.TShipmentLots
		axios.post(Base_Url+"TShipmentents/updateShipMentEntry",this.postObj).then((response)=>{

			var Lilength = this.postObj.lotInformation.length
			if(this.postObj.lotInformation.length > 1) {
					this.postObj.lotInformation.forEach(function (element, index) {
							if (parseInt(element.noOfBags) == parseInt(element.TPackagingInstructionLots.inInventory)) {
									axios.put(Base_Url + "TPackagingInstructionLots/" + element.piLotsId, {status: "SHIPPED"}).then((response)=> {

									}).then((response)=> {

											if (Lilength == index + 1) {
													swal("Posted", "Success", "success")
													hashHistory.push("/Shipment/shipmentview")
											}
									})
							}
							else{
									if (Lilength == index + 1) {
											swal("Posted", "Success", "success")
											hashHistory.push("/Shipment/shipmentview")
									}
							}


					});
			}
			else if(this.postObj.lotInformation.length ==1){
					this.postObj.lotInformation.forEach(function (element, index) {
							if (parseInt(element.noOfBags) == parseInt(element.TPackagingInstructionLots.inInventory)) {
									axios.put(Base_Url + "TPackagingInstructionLots/" + element.piLotsId, {status: "SHIPPED"}).then((response)=> {
											swal("Posted", "Success", "success")
											hashHistory.push("/Shipment/shipmentview")
									}).then((response)=> {

											//if (Lilength == index + 1) {
											//    swal("Posted", "Success", "success")
											//    hashHistory.push("/Shipment/shipmentview")
											//}
									})
							}
							else{
									swal("Posted","Success","success")
									hashHistory.push("/Shipment/shipmentview")
							}


					});
			}
		})
		console.log("POSTOBJ",this.postObj)
	}
	render() {
		var editableLot = []
        editableLot = _.map(this.props.editData.TShipmentLots,(lots,index) =>{
            if(index != 0){
            return <LotInformation key = {index} lotNumber = {this.lotNumber} handleLotBagsToShip = {(e) => {this.handleLotBagsToShip(e,index)}} id = {index} data = {lots} />}
        })
		return (
			<section className="shipment_edit">
<div className="container">
<div className="row">
<form className="form-horizontal">
	<div className=" col-lg-6  col-sm-6 col-xs-12">
			<fieldset className="scheduler-border ">
				<legend className="scheduler-border">Shipment Info</legend>
				 <div className="form-group">
                            <label htmlFor="customer_name"
                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Customer Name
                            </label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <select
                                    className="form-control"
                                    id="customer_name"
                                    name="customer_id"
                                    disabled
                                    value = {this.props.editData.customerId}
                                    onChange={this.customerChange}
                                    >
                                    <option value="Please Select An Option" disabled selected>Customer Name</option>
                                    {this.customers ? this.customers : ''}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="ar_bulk_location" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Release #</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id=""
                                onChange = {this.releaseChange}
                                value = {this.props.editData.releaseNumber}
                                placeholder="Release #"/>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Purchase_Order" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"># Containers</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id=""
                                onChange = {this.containerChange}
                                value = {this.props.editData.numberOfContainers}
                                placeholder="No. of Containers"/>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span></div>
                    </fieldset>



          <fieldset className="scheduler-border ">
				<legend className="scheduler-border">Material Info</legend>
				 <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span></div>
                        <div className="form-group ">
                            <label for="Rail_Car_Number" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Purchase Order #</label>
                            <div className="col-lg-6  col-sm-11  col-xs-11">
                                <select disabled onChange = {this.poChange} value = {this.props.editData.TShipmentLots[0].sId}  className="form-control" id="" >
                                 <option>{this.props.editData.TShipmentLots[0].TPackagingInstructions.po_number}</option>
                                </select>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Weight" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot #</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <select
                                value = {this.props.lotId}
                                className="form-control" id="" >

                                {this.lotNumber}
                                </select>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                          <div className="form-group ">
                                        <label htmlFor="Bags_To_Ship"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Bags To Ship</label>

                                        <div className="col-lg-6  col-sm-11  col-xs-11">
                                            <input type = "number" className="form-control"
                                                   id="bags_to_ship"
                                                   name="bags_to_ship"
                                                   placeholder = "Bags To Ship"
                                                   value = {this.props.editData.TShipmentLots[0].noOfBags ? this.props.editData.TShipmentLots[0].noOfBags : ''}
                                                   onChange = {this.handleBagsToShip}
                                                   defaultValue = ""/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>
                        <div className="form-group">
                            <label for="Lot_Number" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"># Bags  for Lot</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text" onChange = {this.lotBagsChange} disabled value = {this.props.editData.TShipmentLots[0].TPackagingInstructionLots.inInventory != null ? this.props.editData.TShipmentLots[0].TPackagingInstructionLots.inInventory : 0} className="form-control" id="Lot_Number" placeholder="No. of Bags  for Lot"/>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        {this.props.editData.TShipmentLots.length > 1 ? editableLot : ''}
            </fieldset>
	</div>



    <div className=" col-lg-6  col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border  tab-pane active " id="International">
		<legend className="scheduler-border">Shipment Info International</legend>
			<div className="form-group ">
					<label for="" className="col-lg-5 col-md-5 col-sm-11  col-xs-11 control-label">Booking #</label>
					<div className="col-lg-6  col-sm-11 col-xs-11 ">
					  <input type="text" onChange = {this.bookingChange} value = {this.props.editData.TShipmentInternational[0].bookingNumber} className="form-control" id="" placeholder="Booking Number"/>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Freight Forwarder</label>
					<div className="col-lg-6    col-sm-11 col-xs-11 ">
					    <input type="text" onChange = {this.freightChange} value ={this.props.editData.TShipmentInternational[0].freightForwarder != null ? this.props.editData.TShipmentInternational[0].freightForwarder : '' } className="form-control" id="" placeholder="Freight Forwarder"/>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container Type</label>
					<div className="col-lg-6    col-sm-11 col-xs-11 ">
					  <select value = {this.props.editData.TShipmentInternational[0].containerTypeId} onChange = {this.containerTypeChange} className="form-control" id="" name="">
						<option selected disabled value="">Container Type</option>
						{this.containerType}
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Steamship Line</label>
					<div className="col-lg-6    col-sm-11 col-xs-11 ">
					  <select value = {this.props.editData.TShipmentInternational[0].steamshipLineId} onChange = {this.shipLineChange} className="form-control" id="" name="">
						<option selected disabled value="">Steamship Line</option>
						{this.steamShipLine}
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Vessel</label>
					<div className="col-lg-6 col-sm-11 col-xs-11 ">
					 <input type="text" className="form-control" onChange = {this.vesselChange} value = {this.props.editData.TShipmentInternational[0].steamshipVessel} id="SteamshipVessel" placeholder="Steamship Vessel"/>
					  <div className="error"><span></span></div>

					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Earliest Return Date</label>
					<div className="col-lg-6 col-sm-11 col-xs-11 ">
					 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
						<input className="form-control"  name="date" onChange = {this.EarliestReturnDate} id = "errdate" placeholder="Earliest Return Date" type="date"/>
					</div>
					  <div className="error"><span></span></div>
					</div>
                </div>
				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Doc Cutoff Date/Time</label>
					<div className="col-lg-6 col-sm-11 col-xs-11 ">
					 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
						<input className="form-control" id="dcdate" onChange = {this.DocDate} name="date" placeholder="Doc Cutoff Date/Time" type="date"/>
					</div>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Cargo Cutoff Date/Time </label>
					<div className="col-lg-6    col-sm-11 col-xs-11 ">
					 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
						<input className="form-control" id="ccdate"  name="date" onChange = {this.CargoDate} placeholder="Cargo Cutoff Date/Time" type="date"/>
					</div>
					 <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"># of Free Days per Container</label>
					<div className="col-lg-6   col-sm-11 col-xs-11 ">
					   <input type="text" className="form-control" onChange = {this.freeDaysChange} value = {this.props.editData.TShipmentInternational[0].freeDaysPerContainer} id="" placeholder="# of Free Days per Container"/>
					  <div className="error"><span></span></div>
					</div>
                </div>
				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container Pick Up Location</label>
					<div className="col-lg-6   col-sm-11 col-xs-11 ">
					 <input type="text" className="form-control" id="" onChange = {this.pickupChange} value = {this.props.editData.TShipmentInternational[0].containerPickupLocation} placeholder="Container Pick Up Location"/>
					  <div className="error"><span></span></div>
					</div>
                </div>
				<div className="form-group">
					<label for="" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container Return Location</label>
					<div className="col-lg-6   col-sm-11 col-xs-11 ">
					 <input type="text" className="form-control" id="" onChange = {this.returnChange} value ={this.props.editData.TShipmentInternational[0].containerReturnLocation} placeholder="Container Return Location"/>
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label for="No_of_Bages_Pallat" className="col-lg-12 control-label">Notes</label>
					<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
					 <textarea className="form-control textarea-entry" onChange = {this.noteChange} value = {this.props.editData.TShipmentInternational[0].notes} rows="3" id="Notes"></textarea>
					 <div className="error"><span></span></div>
					</div>
                </div>

	    </fieldset>

	</div>

	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pddn-30-btm padding-top-btm-xs">
		<div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-orange text-uppercase hidden">Delete</button></div>
		<div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray text-uppercase" onClick ={hashHistory.goBack}>Cancel</button></div>
		<div className="pull-left margin-10-all"><button type="button"  className="btn  btn-primary text-uppercase" onClick = {this.onSave}>Save</button></div>
	</div>

	</form>

 </div>

 </div>




</section>
		);
	}
}
export default InternationalShipementEdit
