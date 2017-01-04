import React, { Component } from 'react';
import axios from 'axios';
import { createDataLoader } from 'react-loopback'
import { Base_Url } from '../../../constants'
import { hashHistory } from 'react-router'
 class DomesticContainerEditForm extends Component {
   constructor(props){
    super(props);
    this.state = {
      trucker : [{"id": 1,
                  "name":"Trucker1"},
                  {"id": 2,
                  "name":"Trucker2"}]
        }
        this.postObj = { }
        this.shipmentId = ''
        this.truckerId = ''
        this.pickupTrucker = ''
        this.containerNumber = ''
        this.trackingNumber = ''
        this.containerArrived = 0
        this.userID  = localStorage.getItem('userId')
    this.poNumber
    //this.toogleTab = this.toogleTab.bind(this)
    this.onCustomerChange =  this.onCustomerChange.bind(this)
    this.onBookingChange = this.onBookingChange.bind(this)
    this.onContainerChange = this.onContainerChange.bind(this)
    this.onTruckerChange = this.onTruckerChange.bind(this)
    this.onTrackChange = this.onTrackChange.bind(this)
    this.handleContainerCheck = this.handleContainerCheck.bind(this)
   // this.onIntSave = this.onIntSave.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  componentWillMount() {
     axios.get(Base_Url +"TCompanies").then((response) => {
            this.setState({
                customer: response.data
            })

        })
            .catch(function(err){
                console.log('eroor>>>>' , err)
            })
  }
componentDidMount() {
  this.shipmentId = this.props.editData.TContainerDomestic[0].shipmentId
  this.truckerId = this.props.editData.TContainerDomestic[0].truckerId
  this.pickupTrucker = this.props.editData.TContainerDomestic[0].pickupTrucker
  this.containerNumber = this.props.editData.TContainerDomestic[0].containerNumber
  this.trackingNumber = this.props.editData.TContainerDomestic[0].trackingNumber
  this.containerArrived = this.props.editData.TContainerDomestic[0].containerArrived
  if(this.props.editData.TContainerDomestic[0].containerArrived){
    document.getElementById("containerArrived").checked = true
  }
	var CIView = createDataLoader(DomesticContainerEditForm,{
                queries:[{
                  endpoint: 'TShipmentents',
                  filter:{
                    include:["TShipmentDomestic"]
                  }
                }]
  })

 this.customerValue = this.props.editData.customerId
  var base = "TShipmentents"
  this.url = CIView._buildUrl(base, {
         include : ["TShipmentDomestic"],
        "where":{"customerId":this.customerValue}
  })
   axios.get(this.url).then((response) => {
    this.setState({
      bookingNumbers : response.data
    })

  })
}
onBookingChange(e){
  debugger
  this.props.editData.TContainerDomestic[0].shipmentId = e.target.value
  this.shipmentId = e.target.value
  this.forceUpdate()
  console.log("ShipmentId",this.shipmentId)
}
onTruckerChange(e){
  if(e.target.id == "d_Trucker" ){
    this.props.editData.TContainerDomestic[0].truckerId = e.target.value
    this.truckerId = e.target.value
    this.forceUpdate()
    console.log("DropTrucker",this.truckerId)
  }
  else if(e.target.id == "pu_Trucker"){
    this.props.editData.TContainerDomestic[0].pickupTrucker = e.target.value
    this.pickupTrucker = e.target.value
    this.forceUpdate()
    console.log("Pickup",this.pickupTrucker)
  }
}
onContainerChange(e){
  this.props.editData.TContainerDomestic[0].containerNumber = e.target.value
  this.containerNumber = e.target.value
  this.forceUpdate()
  console.log("ContainerNumber",this.containerNumber)
}
onTrackChange(e){
  this.props.editData.TContainerDomestic[0].trackingNumber = e.target.value
  this.trackingNumber = e.target.value
  this.forceUpdate()
  console.log("Track",this.trackNumber)
}
handleContainerCheck(e){
  if(this.props.editData.TContainerDomestic[0].containerArrived == 1){
    this.props.editData.TContainerDomestic[0].containerArrived = 0
    this.containerArrived = 0
  }
  else if(this.props.editData.TContainerDomestic[0].containerArrived == 0){
    this.props.editData.TContainerDomestic[0].containerArrived = 1
    this.containerArrived = 1
  }
}
onSave(e){
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
  this.id = this.props.editData.TContainerDomestic[0].id
  this.postObj.shipmentId = parseInt(this.shipmentId)
  this.postObj.truckerId = this.truckerId
  this.postObj.pickupTrucker = this.pickupTrucker
  this.postObj.containerNumber = this.containerNumber
  this.postObj.trackingNumber = this.trackingNumber
  this.postObj.containerArrived = this.containerArrived
  this.postObj.status = this.containerArrived ? "ARRIVED" : "NOT ARRIVED"
  this.postObj.modifiedBy = this.userID
  this.postObj.modifiedOn = today
  axios.put(Base_Url + "TContainerDomestics" + "/" + this.id,this.postObj).then((response) =>{
    swal("success","Succuessfully Edited","success")
     hashHistory.push('/Container/containerview')
  })
  console.log("POSTOBJ",this.postObj)
}
  onCustomerChange(e){
 //debugger
 var CIView = createDataLoader(DomesticContainerEditForm,{
                queries:[{
                  endpoint: 'TShipmentents',
                  filter:{
                    include:["TShipmentDomestic"]
                  }
                }]
  })
 if(e.target.id == "customer_domestic" ){
  this.props.editData.customerId = e.target.value
 this.customerValue = e.target.value
  var base = "TShipmentents"
  this.url = CIView._buildUrl(base, {
         include : ["TShipmentDomestic"],
        "where":{"customerId":this.customerValue}
  })
   axios.get(this.url).then((response) => {
    this.setState({
      bookingNumbers : response.data
    })

  })
   if(e.target.value == "1"){
            axios.get(Base_Url+"TPackagingInstructions/getPoListID1").then((response)=>{
                this.setState({
                    poNumber:response.data
                })
                 this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>})
                console.log("poNumber",this.state.poNumber)
                this.forceUpdate()
            })
            }
            else if(e.target.value == "2"){
                 axios.get(Base_Url+"TPackagingInstructions/getPoListID2").then((response)=>{
                this.setState({
                    poNumber:response.data
                })
                this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>})
                console.log("poNumber",this.state.poNumber)
            })

            }

 }else if(e.target.id == "customer_international"){
this.value = e.target.value
  var base = "TShipmentents"
  this.url = CIView._buildUrl(base, {
         include : ["TShipmentDomestic"],
        "where":{"customerId":this.value}
  })
   axios.get(this.url).then((response) => {
    this.setState({
      bookingNumbers : response.data
    })

  })
 }
  }
	render() {
		  var trucker
         if(this.state.trucker){
          trucker = _.map(this.state.trucker,(truck,index)=>{
          	return <option key = {index} value ={truck.id}>{truck.name}</option>
          })
         }
          var customers = _.map(this.state.customer,(cust,index)=>{
            return <option key = {index} value = {cust.id} id = {cust.id}>{cust.name}</option>
          })

          if(this.state.bookingNumbers != undefined ){
                    var bookingNumbers = _.map(this.state.bookingNumbers,(book,index) => {
                      if(book.TShipmentDomestic.length > 0){
                      	return <option key = {index} value = {book.TShipmentDomestic[0].shipmentId}>{book.TShipmentDomestic[0].bookingNumber}</option>}

                    })}
		return (
			<section className="container_detils">
			<div className="container-fluid">
			<div className="row">
			<form className="form-horizontal">
				<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">

					<div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<fieldset className="scheduler-border sameHeight">
							<legend className="scheduler-border">Container INFO</legend>


                            <div className="form-group">
                                <label htmlFor="Customer" className="col-lg-6 control-label">Customer</label>
                                <div className="col-lg-6">
                                   <select ref = "domestic" className="form-control" value = {this.props.editData ? this.props.editData.customerId : null} onChange = {this.onCustomerChange} id="customer_domestic">
                                   <option value = "" selected disabled >Customer</option>
                                   {customers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

							<div className="form-group ">
                                <div  className="col-lg-6"><label htmlFor="Booking" className=" control-label">Domestic Booking</label></div>
                                <div className="col-lg-6">
                                 <select className="form-control" id="Booking" value = {this.props.editData ? this.props.editData.TContainerDomestic[0].shipmentId : null} onChange = {this.onBookingChange} name="Booking">
                                    <option disabled selected value="">Booking </option>
                                    {bookingNumbers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

						  <div className="form-group ">
                                <label htmlFor="Dropoff_Trucker" className="col-lg-6 control-label">Dropoff Trucker</label>
                                <div className="col-lg-6">
                                 <select className="form-control" value = {this.props.editData.TContainerDomestic[0].truckerId} onChange = {this.onTruckerChange} id="d_Trucker" name="Dropoff_Trucker">
                                    <option selected disabled value="">Dropoff Trucker</option>
                                    {trucker}
                                    </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

							 <div className="form-group ">
                                <label htmlFor="P_U_Trucker" className="col-lg-6 control-label">P / U Trucker</label>
                                <div className="col-lg-6">
                                 <select className="form-control" value = {this.props.editData.TContainerDomestic[0].pickupTrucker}  onChange = {this.onTruckerChange} id="pu_Trucker" name="P_U_Trucker">
                                    <option disabled selected value="">P/U Trucker</option>
                                    {trucker}
                                   </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

							 <div className="form-group">
                                <label htmlFor="Container_#" className="col-lg-6 control-label">Container #</label>
                                <div className="col-lg-6">
                                    <input type="text" onChange = {this.onContainerChange} value = {this.props.editData ? this.props.editData.TContainerDomestic[0].containerNumber : null} className="form-control" id="Container_#" placeholder="Container #" />
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

							<div className="form-group">
                                <label htmlFor="Tracking_#" className="col-lg-6 control-label">Tracking #</label>
                                <div className="col-lg-6">
                                     <input type="text" onChange = {this.onTrackChange} value = {this.props.editData.TContainerDomestic[0].trackingNumber} className="form-control" id="Tracking_#" placeholder="Tracking #" />
                                     <div className="error"><span></span></div>
                                </div>
                            </div>
							<div className="form-group pddn-10-top">
                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <label className="control control--checkbox "> Container Arrived?
                                      <input type="checkbox" value = {this.props.editData.TContainerDomestic[0].containerArrived} onChange = {this.handleContainerCheck}  id="containerArrived"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                            </div>
						</fieldset>
						<div className="text_left">
						  <div className="pull-left padding-20-last-l "><button type="button"  className="btn  btn-gray"  onClick={hashHistory.goBack}>CANCEL </button>  </div>
						  <div className="pull-left padding-20-all"><button type="button" className="btn  btn-primary" onClick = {this.onSave}> SAVE </button> </div>
						</div>
				</div>
				</div>

				<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<fieldset className="scheduler-border sameHeight">
							<legend className="scheduler-border">SHIPMENT INFO</legend>

							<div className=" col-lg-6 col-md-6 col-sm-5 col-xs-12 no-space">
							<ul className="no-space">
								<li>Eligible Lot Numbers</li>
								<li>Eligible Lot Numbers</li>
								<li>Eligible Lot Numbers</li>
							</ul>
							</div>
							<div className=" col-lg-6 col-md-6 col-sm-7 col-xs-12 no-space">
							<ul className="no-space">
								<li>Type of Shipment</li>
								<li>Shipping Reference Number</li>
								<li>Recipient</li>
								<li>Recipient Contact</li>
								<li>Recipient Telephone Number</li>
								<li>Ship To
									<ul>
									<li>Address 1</li>
									<li>City, State, Zip Code</li>
									</ul>
								</li>
								<li>Carrier</li>
								<li>Carrier Account Number</li>
								<li>Shipping Payment Type</li>
								<li>Shipping Paid By</li>
								<li>Request Ship Date</li>
								<li>Request Delivery Date</li>

							</ul>
							</div>
					</fieldset>
				</div>
				</div>
				</form>
			</div>
			</div>
	</section>
		);
	}
}
export default DomesticContainerEditForm
