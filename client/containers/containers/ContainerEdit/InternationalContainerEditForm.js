import React, { Component } from 'react';
import axios from 'axios'
import { Base_Url } from '../../../constants'
import { createDataLoader } from 'react-loopback'
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
var moment = require('moment')
import { hashHistory } from 'react-router'
 class InternationalContainerEditForm extends Component {
	constructor(props){
    super(props);
    this.state = {
      trucker : [{"id": 1,
                  "name":"Trucker1"},
                  {"id": 2,
                  "name":"Trucker2"}],
              
        }
        this.IntPostObj = { }
        this.shipmentId = ''
        this.truckerId = ''
        this.pickupTrucker = ''
        this.containerNumber = ''
        this.trackingNumber = ''
        this.containerArrived = 0
        this.containerTNumber = ''
        this.ContainerArrivedInt = 0
        this.ContainerSteamLineConfirmed = 0
        this.ContainerTypeConfirmed = 0
        this.chassisNumber = ''
        this.userID  = localStorage.getItem('userId')
   this.onCustomerChange =  this.onCustomerChange.bind(this)
   this.onContainerTChange = this.onContainerTChange.bind(this)
   this.handleContainerTypeCheck = this.handleContainerTypeCheck.bind(this)
   this.onChassisChange = this.onChassisChange.bind(this)
   this.handleContainerSteamLineCheck = this.handleContainerSteamLineCheck.bind(this)
   this.onBookingChange = this.onBookingChange.bind(this)
   this.onTruckerChange = this.onTruckerChange.bind(this)
   this.onContainerChange = this.onContainerChange.bind(this)
   this.handleContainerArrivedCheck = this.handleContainerArrivedCheck.bind(this)
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
	this.shipmentId = this.props.editData.TContainerInternational[0].shipmentId
    this.truckerId = this.props.editData.TContainerInternational[0].truckerId
        this.pickupTrucker = this.props.editData.TContainerInternational[0].pickupTrucker
        this.containerNumber = this.props.editData.TContainerInternational[0].containerNumber
        this.containerArrived = this.props.editData.TContainerInternational[0].containerArrived
        this.containerTNumber = this.props.editData.TContainerInternational[0].tareWeight
        this.ContainerArrivedInt = this.props.editData.TContainerInternational[0].containerArrived
        this.ContainerSteamLineConfirmed = this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed
        this.ContainerTypeConfirmed = this.props.editData.TContainerInternational[0].containerTypeConfirmed
        this.chassisNumber = this.props.editData.TContainerInternational[0].chasisNumber
        if(this.props.editData.TContainerInternational[0].containerArrived){
        	document.getElementById("containerArrived").checked = true
        }
        if(this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed){
        	document.getElementById("containerSteamshipLineConfirmed").checked = true
        }
        if(this.props.editData.TContainerInternational[0].containerTypeConfirmed){
        	document.getElementById("ContainerTypeConfirmed").checked = true	
        }
	var CIView = createDataLoader(InternationalContainerEditForm,{
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
         include : ["TShipmentInternational"],
        "where":{"customerId":this.customerValue}
  })
   axios.get(this.url).then((response) => {
    this.setState({
      bookingNumbers : response.data
    })
     
  })
}
onContainerTChange(e){
	this.props.editData.TContainerInternational[0].tareWeight = e.target.value
  this.containerTNumber = e.target.value
  this.forceUpdate()
}
handleContainerTypeCheck(e){
if(this.props.editData.TContainerInternational[0].containerTypeConfirmed == 1){
  this.props.editData.TContainerInternational[0].containerTypeConfirmed = 0
  this.ContainerTypeConfirmed = 1
  return
}
if(this.props.editData.TContainerInternational[0].containerTypeConfirmed == 0){
	this.props.editData.TContainerInternational[0].containerTypeConfirmed = 1
  this.ContainerTypeConfirmed = 1
}
}
onChassisChange(e){
  this.props.editData.TContainerInternational[0].chasisNumber = e.target.value
  this.chassisNumber = e.target.value 
  this.forceUpdate()
}
handleContainerSteamLineCheck(e){
if(this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed == 1){
  this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed = 0
  this.ContainerSteamLineConfirmed = 0
  return
  }
  if(this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed == 0){
	this.props.editData.TContainerInternational[0].containerTypeConfirmed = 1
  this.ContainerSteamLineConfirmed = 1
  return
}
}
handleContainerArrivedCheck(e){
	debugger
if(this.props.editData.TContainerInternational[0].containerArrived == 1){
  	this.props.editData.TContainerInternational[0].containerArrived = 0
  	this.ContainerArrivedInt = 0
  	 
  	return
  	}
if(this.props.editData.TContainerInternational[0].containerArrived == 0){
  this.props.editData.TContainerInternational[0].containerArrived == 1
  this.ContainerArrivedInt = 1
 
  return
  }
 
}
onBookingChange(e){
  this.shipmentId = e.target.value
  console.log("ShipmentId",this.shipmentId) 
}
onTruckerChange(e){
  if(e.target.id == "d_Trucker" ){
  	this.props.editData.TContainerInternational[0].truckerId = e.target.value
    this.truckerId = e.target.value
    console.log("DropTrucker",this.truckerId)
 	this.forceUpdate();
  }
  else if(e.target.id == "pu_Trucker"){
    this.props.editData.TContainerInternational[0].pickupTruckerId = e.target.value
    this.pickupTrucker = e.target.value
    console.log("Pickup",this.pickupTrucker)
    this.forceUpdate()
  }
}
onContainerChange(e){
  this.props.editData.TContainerInternational[0].containerNumber = e.target.value
  this.containerNumber = e.target.value
  console.log("ContainerNumber",this.containerNumber)
  this.forceUpdate()
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
  this.id = this.props.editData.TContainerInternational[0].id 
  this.IntPostObj.shipmentId = parseInt(this.shipmentId)
  this.IntPostObj.truckerId = this.truckerId
  this.IntPostObj.pickupTruckerId = this.pickupTrucker
  this.IntPostObj.containerNumber = this.containerNumber
  this.IntPostObj.chasisNumber = this.chassisNumber
  this.IntPostObj.tareWeight = this.containerTNumber
  this.IntPostObj.containerTypeConfirmed = this.ContainerTypeConfirmed
  this.IntPostObj.containerSteamshipLineConfirmed = this.ContainerSteamLineConfirmed
  this.IntPostObj.containerArrived = this.ContainerArrivedInt
  this.IntPostObj.sealNumber
  this.IntPostObj.modifiedBy = this.userID
  this.IntPostObj.modifiedOn = today 
  axios.put(Base_Url + "TContainerInternationals" + "/" + this.id,this.IntPostObj).then((response) =>{
  	swal("success","Succuessfully Edited","success");
      hashHistory.push('/Container/containerview')
  })
  console.log("POSTOBJ",this.IntPostObj)
}
  onCustomerChange(e){
 //debugger
 var CIView = createDataLoader(InternationalContainerEditForm,{
                queries:[{
                  endpoint: 'TShipmentents',
                  filter:{
                    include:["TShipmentDomestic"]
                  }
                }]             
  })
 if(e.target.id == "customer_domestic" ){
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
         include : ["TShipmentInternational"],
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
                      if(book.TShipmentInternational.length > 0){
                      	return <option key = {index} value = {book.TShipmentInternational[0].shipmentId}>{book.TShipmentInternational[0].bookingNumber}</option>}
                      	          
                    })}
		return (
<section className="shipment">  
<div className="container-fluid"> 
<div className="row">   
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	
		
		<div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
			<fieldset className="scheduler-border sameHeight">
				<legend className="scheduler-border">SHIPMENT INFO</legend>
				
				<div className="form-group">
                   <label htmlFor="Customer" className="col-lg-6 control-label">Customer</label>
                     <div className="col-lg-6">
                        <select ref = "domestic" className="form-control" value = {this.props.editData ? this.props.editData.customerId : null} onChange = {this.onCustomerChange} id="customer_international">
                        <option value = "" selected disabled >Customer</option>
                           {customers}
                            </select>
                         <div className="error"><span></span></div>
                         </div>
                </div>
				<div className="form-group ">
                                <div  className="col-lg-6"><label htmlFor="Booking" className=" control-label">Domestic Booking</label></div>
                                <div className="col-lg-6">
                                 <select className="form-control" id="Booking" value = {this.props.editData ? this.props.editData.TShipmentInternational[0].shipmentId : null} onChange = {this.onBookingChange} name="Booking">
                                    <option disabled selected value="">Booking </option>
                                    {bookingNumbers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

				
				 <div className="form-group ">              
                                <label htmlFor="Dropoff_Trucker" className="col-lg-6 control-label">Dropoff Trucker</label>
                                <div className="col-lg-6"> 
                                 <select className="form-control" value = {this.props.editData ? this.props.editData.TContainerInternational[0].truckerId : null} onChange = {this.onTruckerChange} id="d_Trucker" name="Dropoff_Trucker">
                                    <option selected disabled value="">Dropoff Trucker</option>
                                    {trucker}
                                    </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>
				 <div className="form-group ">             
                                <label htmlFor="P_U_Trucker" className="col-lg-6 control-label">P / U Trucker</label>
                                <div className="col-lg-6"> 
                                 <select className="form-control" value = {this.props.editData ? this.props.editData.TContainerInternational[0].pickupTruckerId : null}  onChange = {this.onTruckerChange} id="pu_Trucker" name="P_U_Trucker">
                                    <option disabled selected value="">P/U Trucker</option>
                                    {trucker}
                                   </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>
			  
			   <div className="form-group ">
                              
                                    <label htmlFor="Container" className="col-lg-6 control-label">Container #</label>
                                    <div className="col-lg-6"> 
                                      <input type="text" className="form-control" ref = "containerNumber" value = {this.props.editData.TContainerInternational[0].containerNumber} onChange = {this.onContainerChange}  id="Container_int" placeholder="Container" />
                                      <div className="error"><span></span></div>
                                    </div>
                                </div>
				
				<div className="form-group">
                                    <label htmlFor="Chassis" className="col-lg-6 control-label">Chassis #</label>
                                    <div className="col-lg-6">
                                         <input type="text" className="form-control" value = {this.props.editData.TContainerInternational[0].chasisNumber} onChange = {this.onChassisChange} id="Chassis" placeholder="Chassis #" />
                                         <div className="error"><span></span></div>
                                    </div>
                                </div>
				
				<div className="form-group">
                                    <label htmlFor="Container_Tare_Weight" className="col-lg-6 control-label">Container Tare Weight</label>
                                    <div className="col-lg-6">
                                        <input type="text" className="form-control" id="Container_Tare_Weight" onChange = {this.onContainerTChange} value = {this.props.editData.TContainerInternational[0].tareWeight} placeholder="Container Tare Weight" />
                                      <div className="error"><span></span></div>
                                    </div>
                                </div>
				
			    
				
				<div className="form-group pddn-10-top">                
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">            
                                        <label className="control control--checkbox ">Container Type Confirmed?
                                          <input type="checkbox" value = {this.props.editData.TContainerInternational[0].containerTypeConfirmed} onChange = {this.handleContainerTypeCheck} id="ContainerTypeConfirmed"/><div className="control__indicator"></div>
                                        </label>                
                                    </div>
				
					<div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
					 <label for="Container_Type"  className="">Container Type</label> 
					</div>
                </div> 
				
				<div className="form-group">                
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">            
                                        <label className="control control--checkbox ">Container Steamship Line Type Confirmed?
                                          <input type="checkbox" value = {this.props.editData.TContainerInternational[0].containerSteamshipLineConfirmed} onChange = {this.handleContainerSteamLineCheck}  id="containerSteamshipLineConfirmed"/><div className="control__indicator"></div>
                                        </label>                
                                    </div>
				
				  <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
					 <label for="Steamship_Line" className=" ">Steamship Line</label> 
					</div>
                </div> 
				
			   <div className="form-group">             
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">            
                                        <label className="control control--checkbox ">Container Arrived?
                                          <input type="checkbox" value = {this.props.editData.TContainerInternational[0].containerArrived}  onChange = {this.handleContainerArrivedCheck} id="containerArrived"/><div className="control__indicator"></div>
                                        </label>                
                                    </div>
				
					<div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right  ">
					 <label for="Container_Type" className="">&nbsp; </label> 
					</div>
                </div> 
				
			</fieldset>	
			
            <div className="text_left">
			  <div className="pull-left padding-20-last-l "><button type="button"  className="btn  btn-gray">CANCEL </button>  </div>	
			  <div className="pull-left padding-20-all"><button type="button" className="btn  btn-primary" onClick = {this.onSave}> SAVE </button> </div>
			 		
			</div>

	</div>
	</div>
	
   <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
	    <fieldset className="scheduler-border sameHeight">
				<legend className="scheduler-border">SHIPMENT INFO</legend>
				
				<div className="form-group">
					<label for="Material" className="col-lg-6 ">Booking #:   </label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.TShipmentInternational[0].bookingNumber : '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="Origin" className="col-lg-6 ">Container Type:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.TShipmentInternational[0].TContainerType.name: '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Packaging" className="col-lg-6 ">Number of Containers:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.numberOfContainers: '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Bag" className="col-lg-6 "># of Bags per Container:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.numberOfBags: '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Pallet" className="col-lg-6 ">Steamship Line:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.TShipmentInternational[0].TSteamshipLine.name: '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="No_of_Bages_Pallat" className="col-lg-6 ">Steamship Vessel:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  this.props.editData.TShipmentInternational[0].steamshipVessel: '') : ''}</p></div>
                </div>
				
				<div className="form-group">
					<label for="Stretch_wrap" className="col-lg-6 ">Earliest Return Date:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  moment(this.props.editData.TShipmentInternational[0].earliestReturnDate).format('MM-DD-YYYY') : '') : ''}</p></div>
                </div>
				<div className="form-group">
					<label for="Stretch_wrap" className="col-lg-6 ">Doc Cutoff Date:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  moment(this.props.editData.TShipmentInternational[0].docCutoffDate).format('MM-DD-YYYY') : '') : ''}</p></div>
                </div>
				<div className="form-group">
					<label for="Stretch_wrap" className="col-lg-6 ">Cutoff Date:</label>
					<div className="col-lg-6"><p>{this.props.editData.TShipmentInternational ?(this.props.editData.TShipmentInternational ?  moment(this.props.editData.TShipmentInternational[0].cargoCutoffDate).format('MM-DD-YYYY') : '') : ''}</p></div>
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
export default InternationalContainerEditForm