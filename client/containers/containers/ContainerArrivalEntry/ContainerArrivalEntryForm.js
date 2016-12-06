import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import axios from 'axios';
import { Base_Url } from '../../../constants';
import { createDataLoader } from 'react-loopback'
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
var moment = require('moment');
import validateInput from './DomesticContainerValidator'
import validateIntInput from './InternationalContainerValidator'
class  ContainerArrivalEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trucker : [{"id": 1,
                  "name":"Trucker1"},
                  {"id": 2,
                  "name":"Trucker2"}],
        domesticData : '',
        IntlData : '',
        poArray : [],
        index:0,
        domesticErrors : { },
        intErrors : { }
        }
        this.IntPostObj = {containerNumber: '',
                        pickupTruckerId: '',
                        shipmentId: '',
                        trackingNumber: '',
                        truckerId: '',
                        chasisNumber: '',
                        tareWeight: '' }

        this.postObj = {containerNumber: '',
                        pickupTrucker: '',
                        shipmentId: '',
                        trackingNumber: '',
                        truckerId: '',
                      }
        this.shipmentId = ''
        this.truckerId = ''
        this.sealNumber = ''
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
    this.poNumber

    this.toogleTab = this.toogleTab.bind(this)
      this.index = 0
    this.onCustomerChange =  this.onCustomerChange.bind(this)
    this.onBookingChange = this.onBookingChange.bind(this)
    this.onContainerChange = this.onContainerChange.bind(this)
    this.onTruckerChange = this.onTruckerChange.bind(this)
    this.onTrackChange = this.onTrackChange.bind(this)
    this.handleContainerCheck = this.handleContainerCheck.bind(this)
    this.onChassisChange = this.onChassisChange.bind(this)
    this.onIntSave = this.onIntSave.bind(this)
    this.onSave = this.onSave.bind(this)
      this.ponumberArray
    this.onContainerTChange = this.onContainerTChange.bind(this)
    this.handleContainerTypeCheck = this.handleContainerTypeCheck.bind(this)
    this.handleContainerArrivedCheck = this.handleContainerArrivedCheck.bind(this)
    this.handleContainerSteamLineCheck = this.handleContainerSteamLineCheck.bind(this)
    //this.getPonumber = this.getPonumber.bind(this)
    this.onSealChange = this.onSealChange.bind(this)
  }




    componentDidMount(){

        this.getParams  = this.props.paramsValue
        var loadView = createDataLoader(ContainerArrivalEntryForm,{
            queries:[{
                endpoint: 'TShipmentDomestics',
                filter:{
                    include:["TShipmentDomestic"]
                }
            }]
        })
        if(this.getParams.id != undefined){
            var sID = this.getParams.id[0]
            this.shipmentId = sID
            var type = this.getParams.id[1]
            if(type == 1){
                this.IsInternational = false
                this.IsDomestic = true
                this.intl = ''
                this.lotIdArray = []
                this.dom = '#Domestic'
                var base = "TShipmentents/"+sID
                this.urlData = loadView._buildUrl(base, {
                    include : ["TCompany" ,"TShipmentDomestic" ,{"relation" : "TShipmentLots" , "scope" :{"include" :"TPackagingInstructionLots"}}]
                })

                axios.get(this.urlData).then((response)=>{
                    debugger;
                    this.domesticData = response.data
                    this.state.domesticData = this.domesticData
                    this.CustomerName = this.domesticData.TCompany.name
                    this.bookingNumber = this.domesticData.TShipmentDomestic[0].bookingNumber
                    this.lotsId = this.domesticData.TShipmentLots[0].piLotsId


                    var base1 = "TpackagingInstructionLots/"+this.lotsId
                    var poUrl = loadView._buildUrl(base1 ,{
                        include : ["TPackagingInstructions"]
                    })
                    axios.get(poUrl).then((response)=>{
                        this.resultPo = response.data
                        this.ponumbervalue = this.resultPo.TPackagingInstructions.po_number
                        this.setState({
                            poNumberval : this.ponumbervalue
                        })

                    })

                    this.setState({
                        domesticData : this.domesticData,

                    })
                })


                this.setState({
                    IsInternational : this.IsInternational,
                    IsDomestic : this.IsDomestic
                })

         }
            else if(type ==0){
                this.IsDomestic = false
                this.IsInternational = true
                this.target = "#International"
                this.intl = '#International'
                this.dom = ''
                var base = "TShipmentents/"+sID
                this.urlData = loadView._buildUrl(base, {
                    include : ["TCompany", {"relation" : "TShipmentInternational" , "scope" :{"include" :["TContainerType" ,"TSteamshipLine"]}} ,{"relation" : "TShipmentLots" , "scope" :{"include" :"TPackagingInstructionLots"}}]
                })

                axios.get(this.urlData).then((response)=>{
                    this.InterNationalData = response.data
                    this.CustomerNameInt = this.InterNationalData.TCompany.name
                    this.bookingNumberInt = this.InterNationalData.TShipmentInternational[0].bookingNumber
                    this.setState({
                        IntlData : this.InterNationalData
                    })
                })
                this.setState({
                    IsInternational : this.IsInternational,
                    IsDomestic : this.IsDomestic
                })
            }
        }
        else{
            this.IsInternational = false,
                this.IsDomestic = true
            //this.intl = '#International'
            //this.dom = '#Domestic'
        }
    }


  componentWillMount() {

      var PIview = createDataLoader(ContainerArrivalEntryForm,{
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
      this.urlTrucker = PIview._buildUrl(base, {
          "where" : {type : "TRUCKER" }
      })






      axios.get(this.urlTrucker).then((response) => {
          this.setState({
              trucker: response.data
          })

      })
          .catch(function(err){
              console.log('eroor>>>>' , err)
          })



      this.urlCustomer = PIview._buildUrl(base, {
          "where" : {type : "CUSTOMER" }
      })
      axios.get(this.urlCustomer).then((response) => {
          this.setState({
              customer: response.data
          })

      })
          .catch(function(err){
              console.log('eroor>>>>' , err)
          })
  }

/*onIntSave(e){
  this.IntpostObj.
}*/
onBookingChange(e){
    debugger;
    var dataView = createDataLoader(ContainerArrivalEntryForm,{
        queries:[{
            endpoint: 'TShipmentDomestics',
            filter:{
                include:["TShipmentDomestic"]
            }
        }]
    })
    this.shipmentId = e.target.value.split(',')[0]
    this.shipDomesticId = e.target.value.split(',')[1]
    this.shipmentType = e.target.value.split(',')[2]
    if(this.shipmentType=="1"){
        var base = "TShipmentents/"+this.shipmentId
        this.urlData = dataView._buildUrl(base, {
            include : ["TShipmentDomestic" ,"TShipmentAddress",{"relation" : "TShipmentLots" , "scope" :{"include" :"TPackagingInstructionLots"}} ,{"relation" : "TShipmentLots" , "scope" :{"include" :"TPackagingInstructionLots"}},{"relation" :"TShipmentLots" ,"scope":{"include" : "TPackagingInstructionLots"}}]
        })

        axios.get(this.urlData).then((response)=>{
            this.domesticData = response.data
            this.state.domesticData = this.domesticData

            this.setState({
                domesticData : this.domesticData
            })
        })
    }
    else if(this.shipmentType == "0"){
        var base = "TShipmentents/"+this.shipmentId
        this.urlData = dataView._buildUrl(base, {
            include : [{"relation" : "TShipmentInternational" , "scope" :{"include" :["TContainerType" ,"TSteamshipLine"]}} ,{"relation" : "TShipmentLots" , "scope" :{"include" :"TPackagingInstructionLots"}},{"relation" :"TShipmentLots" ,"scope":{"include" : "TPackagingInstructionLots"}}]
        })

        axios.get(this.urlData).then((response)=>{
            this.InterNationalData = response.data
            console.log(">>>>>>>>>>>>>" , this.InterNationalData)
            this.setState({
                IntlData : this.InterNationalData
            })
        })
    }
  console.log("ShipmentId",this.shipmentId)
}
onTruckerChange(e){
  if(e.target.id == "d_Trucker" ){
    this.truckerId = e.target.value
    this.refs.PUTR.value = e.target.value
    this.refs.IPUTR.value = e.target.value
    this.pickupTrucker = e.target.value
    //this.forceUpdate()
    console.log("DropTrucker",this.truckerId,this.pickupTrucker)
  }
  else if(e.target.id == "pu_Trucker"){
    this.pickupTrucker = e.target.value
    console.log("Pickup",this.pickupTrucker)
  }
}
onChassisChange(e){
  this.chassisNumber = e.target.value
}
onContainerChange(e){
  this.containerNumber = e.target.value
  console.log("ContainerNumber",this.containerNumber)
}
onSealChange(e){
  this.sealNumber = e.target.value
}
onTrackChange(e){
  this.trackNumber = e.target.value
  console.log("Track",this.trackNumber)
}
handleContainerCheck(e){
  if(e.target.checked){
    this.containerArrived = 1
  }
  else if(!e.target.checked){
    this.containerArrived = 0
  }
}
isValid(){

  const { domesticErrors , isValid } = validateInput(this.postObj);

  console.log(domesticErrors)
  if(!isValid){
    this.setState({
      domesticErrors : domesticErrors
    })

  }
  return isValid;
}
isIValid(){
  const{ intErrors , isIValid } = validateIntInput(this.IntPostObj)
  if(!isIValid){
    this.setState({
        intErrors : intErrors
    })
  }
  return isIValid
}
onSave(e){
  debugger
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
  if(this.shipmentId == ""){
    swal("Missing","Please Select A Booking Number","info")
    return
      }
  this.postObj.shipmentId = parseInt(this.shipmentId)
  this.postObj.truckerId = this.truckerId
  this.postObj.pickupTrucker = this.pickupTrucker
  this.postObj.containerNumber = this.containerNumber
  this.postObj.trackingNumber = this.trackNumber ? this.trackNumber : ''
  this.postObj.containerArrived = this.containerArrived
  this.postObj.createdBy = this.userID
  this.postObj.createdOn = today
  this.postObj.sealNumber = this.sealNumber
  this.postObj.shipmentLotsId = this.lotsId ? this.lotsId : null
  this.postObj.containerArrived = this.containerArrived
  this.postObj.modifiedOn = today
  this.postObj.id = 0
  if(this.isValid() == true){
    axios.post(Base_Url + 'TContainerDomestics',this.postObj).then((response) =>{
      swal('Success',"Entry Done","success")
        hashHistory.push('/Container/containerview')

    })}else{
      swal("Missing","Please fill in all the fields","info")
    }
  console.log("POSTOBJ",this.postObj)
}
onIntSave(e){
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

if(this.shipmentId == ""){
  swal("Missing","Please Select A Booking Number","info")
  return
}
  this.IntPostObj.shipmentId = parseInt(this.shipmentId)
  this.IntPostObj.truckerId = this.truckerId
  this.IntPostObj.pickupTruckerId = this.pickupTrucker
  this.IntPostObj.containerNumber = this.containerNumber
  this.IntPostObj.chasisNumber = this.chassisNumber
  this.IntPostObj.tareWeight = this.containerTNumber
  this.IntPostObj.containerTypeConfirmed = this.ContainerTypeConfirmed
  this.IntPostObj.containerSteamshipLineConfirmed = this.ContainerSteamLineConfirmed
  this.IntPostObj.containerArrived = this.ContainerArrivedInt
  this.IntPostObj.sealNumber = this.sealNumber
  this.IntPostObj.createdBy = this.userID
  this.IntPostObj.createdOn = today
  this.IntPostObj.modifiedOn = today
  this.IntPostObj.id = 0
  console.log("THISINTPOSTOBJ",this.IntPostObj)
    debugger;
  if(this.isIValid() == true){
    axios.post(Base_Url + 'TContainerInternationals',this.IntPostObj).then((response) =>{
      swal('Success',"Entry Done","success")
        hashHistory.push('/Container/containerview')
    })}else{
      swal("Missing","Please fill the missing fields","info")
    }
}
onContainerTChange(e){
  this.containerTNumber = e.target.value
}
handleContainerTypeCheck(e){
if(e.target.checked){
  this.ContainerTypeConfirmed = 1
}else if(!e.target.checked){
  this.ContainerTypeConfirmed = 0
}
}
handleContainerSteamLineCheck(e){
if(e.target.checked){
  this.ContainerSteamLineConfirmed = 1
}else if(!e.target.checked){
  this.ContainerSteamLineConfirmed = 0
}
}
handleContainerArrivedCheck(e){
if(e.target.checked){
  this.ContainerArrivedInt = 1
}else if(!e.target.checked){
  this.ContainerArrivedInt = 0
}
}
  onCustomerChange(e){
 //debugger
 var CIView = createDataLoader(ContainerArrivalEntryForm,{
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
  debugger
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

  toogleTab(e){
    debugger
    this.refs.international.value = ""
     this.refs.domestic.value = ""
     this.IntPostObj = { }
     this.postObj = { }
     this.shipmentId = ''
     this.truckerId = ''
     this.pickupTrucker = ''
     this.refs.PUTR.value = ''
     this.refs.IPUTR.value = ''
     this.refs.DDTR.value = ''
     this.refs.IDTR.value = ''
     this.containerNumber = ''
     this.sealNumber = ''
     this.trackingNumber = ''
     this.containerArrived = 0
     this.containerTNumber = ''
     this.ContainerArrivedInt = 0
     this.ContainerSteamLineConfirmed = 0
     this.ContainerTypeConfirmed = 0
     this.chassisNumber = ''
     this.setState({
     bookingNumbers : [],
     domesticErrors : {},
     intErrors : {}
     })
  }

    onHandleDomesticChange(e,data){
        debugger;
        console.log("data>>>>>>>>>>>>>" , data)
    }
    onHandleIntlChange(e ,data){

    }


//    var populatePo = undefined
//    var populateArry = this.state.poArray
//    //if(this.state.poArray > 0) {
//    alert(JSON.stringify(this.state.poArray))
//
//    setTimeout(function(){
//    populatePo = _.map(populateArry, (data, index)=> {
//        alert("poresult")
//        debugger;
//        return (
//            <option key={index} id={index} value={data.TPackagingInstructions ? data.TPackagingInstructions.po_number : ''}>{data.TPackagingInstructions ? data.TPackagingInstructions.po_number : ''}</option>
//        )
//    })
//    console.log("populatePo" ,populatePo)
//},500)

    render() {
        debugger;




         var trucker
         if(this.state.trucker){
          trucker = _.map(this.state.trucker,(truck,index)=>{
            return <option key = {index} value ={truck.id}>{truck.name}</option>
          })
         }
          var customers = _.map(this.state.customer,(cust,index)=>{
            return <option key = {index} value = {cust.id} id = {cust.id}>{cust.name}</option>
          })

          if(this.state.bookingNumbers != undefined ){debugger
            console.log(this.state.bookingNumbers)
                    var bookingNumbers = _.map(this.state.bookingNumbers,(book,index) => {
                      if(book.isDomestic == 1 && book.TShipmentDomestic != undefined && book.TShipmentDomestic.length > 0){
                                  return <option key ={index}  onChange = {(e)=> this.onHandleDomesticChange(e,book)}   value = {book.id +',' +book.TShipmentDomestic[0].id +','+book.isDomestic}>{book.TShipmentDomestic[0].bookingNumber}</option>}
                                  else if(book.isDomestic == 0 && book.TShipmentInternational != undefined && book.TShipmentInternational.length > 0){
                                    return <option key = {index} onChange = {(e)=> this.onHandleIntlChange(e,book)}  value = {book.id +','+book.TShipmentInternational[0].id +','+book.isDomestic}>{book.TShipmentInternational[0].bookingNumber}</option>
                                  }
                    })}
          return (
           <section className="container_detils">
            <div className="container-fluid">
            <div className="row">
            <form className="form-horizontal">
            <div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <ul className="nav nav-pills nav-justified tab-bg text-uppercase " onClick = {this.toogleTab} id="tabs">
             <li className={this.IsInternational ? 'active' :''}><a data-target="#International" data-toggle="tab">Container Arrival Entry International</a></li>
             <li className={this.IsDomestic ? 'active' :''} ><a  data-toggle="tab" data-target="#Domestic">Container Arrival Entry Domestic</a></li>
            </ul>
            </div>
             <div className="tab-content">
                     <div id="International" className={this.IsInternational ? 'active tab-pane' :'tab-pane'}>
                         <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <fieldset className="scheduler-border   sameHeight" >
                            <legend className="scheduler-border">Container INFO</legend>
                             <div className="form-group">
                                <label htmlFor="Customer" className="col-lg-6 control-label">Customer</label>

                                <div className="col-lg-6">
                                   <select ref = "international" className="form-control" onChange = {this.onCustomerChange} id="customer_international">
                                   <option value = ""  selected disabled >{this.CustomerNameInt ?this.CustomerNameInt :"Customer"}</option>
                                   {customers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>


                            <div className="form-group">
                                    <div  className="col-lg-6"><label htmlFor="Booking" className=" control-label">Booking #</label></div>
                                    <div className="col-lg-6">
                                     <select className="form-control" id="Booking" onChange = {this.onBookingChange} name="Booking">
                                        <option value="Select Booking" disabled selected>{this.bookingNumberInt ? this.bookingNumberInt : "Select an Option"}</option>
                                        {bookingNumbers}
                                        </select>
                                      <div className="error"><span></span></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                     <label htmlFor="Dropoff_Trucker" className={this.state.intErrors.truckerId ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Dropoff Trucker</label>
                                     <div className="col-lg-6">
                                        <select className="form-control" ref = "IDTR" onChange = {this.onTruckerChange} id="d_Trucker" name="Dropoff_Trucker">
                                         <option disabled selected value="">Dropoff Trucker</option>
                                         {trucker}
                                         </select>
                                       <div className="error"><span></span></div>
                                     </div>
                                 </div>

                                 <div className="form-group">
                                     <label htmlFor="P_U_Trucker" className={this.state.intErrors.pickupTrucker ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>P/U Trucker</label>
                                     <div className="col-lg-6">
                                       <select className="form-control" ref = "IPUTR" onChange = {this.onTruckerChange} id="pu_Trucker" name="P_U_Trucker">
                                         <option disabled selected value="">P/U Trucker</option>
                                         {trucker}
                                       </select>
                                       <div className="error"><span></span></div>
                                     </div>
                                 </div>

                              <div className="form-group ">

                                  <label htmlFor="Container" className={this.state.intErrors.sealNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Seal #</label>
                                  <div className="col-lg-6">
                                      <input type="text" className="form-control" onChange = {this.onSealChange}  id="Container_int" placeholder="Seal #" />
                                      <div className="error"><span></span></div>
                                  </div>
                              </div>



                               <div className="form-group ">

                                    <label htmlFor="Container" className={this.state.intErrors.containerNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Container #</label>
                                    <div className="col-lg-6">
                                      <input type="text" className="form-control" onChange = {this.onContainerChange}  id="Container_int" placeholder="Container" />
                                      <div className="error"><span></span></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Chassis" className={this.state.intErrors.chasisNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Chassis #</label>
                                    <div className="col-lg-6">
                                         <input type="text" className="form-control" onChange = {this.onChassisChange} id="Chassis" placeholder="Chassis #" />
                                         <div className="error"><span></span></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Container_Tare_Weight" className={this.state.intErrors.tareWeight ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Container Tare Weight</label>
                                    <div className="col-lg-6">
                                        <input type="number" className="form-control" id="Container_Tare_Weight" onChange = {this.onContainerTChange} placeholder="Container Tare Weight" />
                                      <div className="error"><span></span></div>
                                    </div>
                                </div>



                                <div className="form-group pddn-10-top">
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                        <label className="control control--checkbox ">Container Type Confirmed?
                                          <input type="checkbox" onChange = {this.handleContainerTypeCheck} id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </div>

                                    <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
                                     <label htmlFor="Container_Type"  className="">Container Type</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                        <label className="control control--checkbox ">Container Steamship Line Type Confirmed?
                                          <input type="checkbox" onChange = {this.handleContainerSteamLineCheck}  id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </div>

                                  <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
                                     <label htmlFor="Steamship_Line" className=" ">Steamship Line</label>
                                    </div>
                                </div>

                               <div className="form-group">
                                    <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                        <label className="control control--checkbox ">Container Arrived?
                                          <input type="checkbox"  onChange = {this.handleContainerArrivedCheck} id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </div>

                                    <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right  ">
                                     <label htmlFor="Container_Type" className="">&nbsp; </label>
                                    </div>
                                </div>

                          </fieldset>

                         </div>



                        <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                         <fieldset className="scheduler-border  sameHeight" >
                            <legend className="scheduler-border">SHIPMENT INFO</legend>
                            <div className="form-group">
                                <label htmlFor="Material" className="col-lg-6 ">Booking #:   </label>
                                <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.TShipmentInternational[0].bookingNumber : ''}</p></div>
                                 </div>

                                <div className="form-group">
                                    <label htmlFor="Origin" className="col-lg-6 ">Container Type:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.TShipmentInternational[0].TContainerType.name : ''}</p></div>
                                </div>

                             <div className="form-group">
                                 <label htmlFor="Type_of_Packaging" className="col-lg-6 ">Number of Containers:</label>
                                 <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.numberOfContainers : ''}</p></div>
                             </div>

                                <div className="form-group">
                                    <label htmlFor="Type_of_Bag" className="col-lg-6 "># of Bags per Container:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.numberOfBags : ''}</p></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Type_of_Pallet" className="col-lg-6 ">Steamship Line:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.TShipmentInternational[0].TSteamshipLine.name : ''}</p></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="No_of_Bages_Pallat" className="col-lg-6 ">Steamship Vessel:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?this.state.IntlData.TShipmentInternational[0].steamshipVessel : ''}</p></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Stretch_wrap" className="col-lg-6 ">Earliest Return Date:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?moment(this.state.IntlData.TShipmentInternational[0].earliestReturnDate).format('MM-DD-YYYY') : ''}</p></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Stretch_wrap" className="col-lg-6 ">Doc Cutoff Date:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?moment(this.state.IntlData.TShipmentInternational[0].docCutoffDate).format('MM-DD-YYYY') : ''}</p></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Stretch_wrap" className="col-lg-6 ">Cutoff Date:</label>
                                    <div className="col-lg-6"><p>{(this.state.IntlData.TShipmentInternational && this.state.IntlData.TShipmentInternational.length>0)?moment(this.state.IntlData.TShipmentInternational[0].cargoCutoffDate).format('MM-DD-YYYY') : ''}</p></div>
                                </div>
                         </fieldset>
                        </div>
                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="form-group col-lg-12">
               <div className="pull-left margin-10-last-l"> <button type="submit" className="btn  btn-gray text-uppercase " >CANCEL</button> </div>
                <div className="pull-left margin-10-all"><button type="button" id="cancel" className="btn  btn-primary text-uppercase " onClick = {this.onIntSave}>Save</button> </div>
               </div>
              </div>
                    </div>

                     <div id="Domestic" className={this.IsDomestic ? " active  tab-pane" :'tab-pane'}>
                         <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <fieldset className="scheduler-border   sameHeight" >
                            <legend className="scheduler-border">Container INFO</legend>

                            <div className="form-group">
                                <label htmlFor="Customer" className="col-lg-6 control-label">Customer</label>
                                <div className="col-lg-6">
                                   <select ref = "domestic" className="form-control" onChange = {this.onCustomerChange} id="customer_domestic">
                                   <option value = "" selected disabled >{this.CustomerName ? this.CustomerName:"Customer"}</option>
                                   {customers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <div  className="col-lg-6"><label htmlFor="Booking" className=" control-label">Domestic Booking</label></div>
                                <div className="col-lg-6">
                                 <select className="form-control" id="Booking" onChange = {this.onBookingChange} name="Booking">
                                    <option disabled selected value="">{this.bookingNumber? this.bookingNumber : "Booking"} </option>
                                    {bookingNumbers}
                                  </select>
                                  <div className="error"><span></span></div>
                                </div>
                            </div>
                              {
                                 /* <div className="form-group">
                                      <label htmlFor="PO_Number" className="col-lg-6 control-label">PO Number</label>

                                      <div className="col-lg-6">
                                          <select className="form-control" id="PO_Number" onChange={this.onPoChange}
                                                  name="PO_Number" key={this.state.index}>
                                              <option selected disabled
                                                      value="">{this.state.poNumberval ? this.state.poNumberval : "PO Number"}</option>

                                              {this.poNumber}
                                          </select>

                                          <div className="error"><span></span></div>
                                      </div>
                                  </div>*/
                              }
                              <div className="form-group ">
                                   <label htmlFor="Dropoff_Trucker" className={this.state.domesticErrors.truckerId ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Dropoff Trucker</label>
                                   <div className="col-lg-6">
                                    <select className="form-control" ref = "DDTR" onChange = {this.onTruckerChange} id="d_Trucker" name="Dropoff_Trucker">
                                       <option selected disabled value="">Dropoff Trucker</option>
                                       {trucker}
                                       </select>
                                     <div className="error"><span></span></div>
                                   </div>
                               </div>

                               <div className="form-group ">
                                     <label htmlFor="P_U_Trucker" className={this.state.domesticErrors.pickupTrucker ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>P / U Trucker</label>
                                     <div className="col-lg-6">
                                      <select className="form-control" ref = "PUTR"  onChange = {this.onTruckerChange} id="pu_Trucker" name="P_U_Trucker">
                                         <option disabled selected value="">P/U Trucker</option>
                                         {trucker}
                                        </select>
                                       <div className="error"><span></span></div>
                                     </div>
                                 </div>

                              <div className="form-group ">

                                  <label htmlFor="Container" className={this.state.domesticErrors.sealNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Seal #</label>
                                  <div className="col-lg-6">
                                      <input type="text" className="form-control" onChange = {this.onSealChange}  id="Container_int" placeholder="Seal #" />
                                      <div className="error"><span></span></div>
                                  </div>
                              </div>

                            <div className="form-group">
                                <label htmlFor="Container_#" className={this.state.domesticErrors.containerNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Container #</label>
                                <div className="col-lg-6">
                                    <input type="text" onChange = {this.onContainerChange} className="form-control" id="Container_#" placeholder="Container #" />
                                  <div className="error"><span></span></div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Tracking_#" className={this.state.domesticErrors.trackingNumber ? "col-lg-6 control-label has error" : "col-lg-6 control-label"}>Tracking #</label>
                                <div className="col-lg-6">
                                     <input type="text" onChange = {this.onTrackChange} className="form-control" id="Tracking_#" placeholder="Tracking #" />
                                     <div className="error"><span></span></div>
                                </div>
                            </div>

                            <div className="form-group pddn-10-top">
                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <label className="control control--checkbox "> Container Arrived?
                                      <input type="checkbox" onChange = {this.handleContainerCheck}  id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                            </div>
                          </fieldset>
                         </div>

                        <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                         <fieldset className="scheduler-border sameHeight" >
                            <legend className="scheduler-border">SHIPMENT INFO</legend>
                            <div className=" col-lg-6 col-md-6 col-sm-5 col-xs-12 no-space">
                            <ul className="no-space">
                                {
                                    _.map(this.state.domesticData.TShipmentLots , (data,index)=>{
                                        return(
                                            <li key={index}>Eligible Lot Numbers : {data.TPackagingInstructionLots?data.TPackagingInstructionLots.lot_number : ''}</li>
                                               )
                                    })


                                }
                            </ul>
                            </div>
                            <div className=" col-lg-6 col-md-6 col-sm-7 col-xs-12 no-space">
                            <ul className="no-space">
                                <li>Type of Shipment :{( this.state.domesticData && this.state.domesticData.isDomestic) ? "DOMESTIC" : "INTERNATIONAL"}</li>
                                <li>Shipping Reference Number : {(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].shippingReferenceNumber :''}</li>
                                <li>Recipient : {(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].recipent:''}</li>
                                <li>Recipient Contact : {(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].recipentContact:''}</li>
                                <li>Recipient Telephone Number:{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].recipentTelNumber:''}</li>
                                <li>Ship To :-</li>
                                      <li>Address : {this.state.domesticData ? this.state.domesticData.TShipmentAddress[0].shipToAddress : ''}</li>
                                      <li>City : {this.state.domesticData ? this.state.domesticData.TShipmentAddress[0].shipToCity : ''} </li>
                                      <li>State : {this.state.domesticData ? this.state.domesticData.TShipmentAddress[0].shipToState : ''} </li>
                                      <li>Zip Code : {this.state.domesticData ? this.state.domesticData.TShipmentAddress[0].shipToZip : ''} </li>
                                <li>Carrier :{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].carrier : ''}</li>
                                <li>Carrier Account Number :{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].carrierAcNumber:''}</li>
                                <li>Shipping Payment Type:{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].shippingReferenceNumber:''}</li>
                                <li>Shipping Paid By :{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?this.state.domesticData.TShipmentDomestic[0].paidBy:''}</li>
                                <li>Request Ship Date :{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?moment(this.state.domesticData.TShipmentDomestic[0].requestedShipDate).format('MM-DD-YYYY'):''}</li>
                                <li>Request Delivery Date :{(this.state.domesticData.TShipmentDomestic && this.state.domesticData.TShipmentDomestic.length>0) ?moment(this.state.domesticData.TShipmentDomestic[0].requestedDeliveryDate).format('MM-DD-YYYY') : ''}</li>

                            </ul>
                            </div>
                         </fieldset>
                        </div>
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="form-group col-lg-12">
               <div className="pull-left margin-10-last-l"> <button type="submit" className="btn  btn-gray text-uppercase " >CANCEL</button> </div>
                <div className="pull-left margin-10-all"><button type="button" id="cancel" className="btn  btn-primary text-uppercase " onClick = {this.onSave}>Save</button> </div>
               </div>
              </div>
                    </div>

            </div>

            </div>
                        </form>
            </div>
            </div>
    </section>
)
}
}
export default ContainerArrivalEntryForm;
