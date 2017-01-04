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
class   ShipmentEditForm extends React.Component{
constructor(props){
super(props);
this.state = {
RequestedShipDate : ''}
this.customers = [ ]
this.containerType = [ ]
this.steamShipLine = [ ]
this.poNumber
this.SIObj = { }
this.postObj = { }
this.onSave = this.onSave.bind(this)
//this.customerChange = this.customerChange.bind(this)
this.releaseChange = this.releaseChange.bind(this)
this.containerChange = this.containerChange.bind(this)
this.noOfBagsChange = this.noOfBagsChange.bind(this)
//this.poChange =  this.poChange.bind(this)
this.bookingChange = this.bookingChange.bind(this)
this.lotBagsChange = this.lotBagsChange.bind(this)
this.bagsChange = this.bagsChange.bind(this)
this.shipmentChange = this.shipmentChange.bind(this)
this.shippingrefChange = this.shippingrefChange.bind(this)
this.recipentChange = this.recipentChange.bind(this)
this.recipentContactChange = this.recipentContactChange.bind(this)
this.recipTelChange = this.recipTelChange.bind(this)
this.shipAddressChange = this.shipAddressChange.bind(this)
this.shipCityChange = this.shipCityChange.bind(this)
this.zipCodeChange = this.zipCodeChange.bind(this)
this.shipStateChange = this.shipStateChange.bind(this)
this.carrierChange = this.carrierChange.bind(this)
this.AcChange = this.AcChange.bind(this)
this.paymentChange = this.paymentChange.bind(this)
this.paidByChange = this.paidByChange.bind(this)
this.requestedShipdateChange = this.requestedShipdateChange.bind(this)
this.requestedDeliveryDate = this.requestedDeliveryDate.bind(this)
this.handleBagsToShip = this.handleBagsToShip.bind(this)
}
requestedDeliveryDate(e){
    this.props.editData.TShipmentDomestic[0].requestedDeliveryDate = e.target.value
}
requestedShipdateChange(e){
    this.props.editData.TShipmentDomestic[0].requestedShipDate = e.target.value
}

paidByChange(e){
    this.props.editData.TShipmentDomestic[0].paidBy = e.target.value
    this.forceUpdate()
}
paymentChange(e){
    this.props.editData.TShipmentDomestic[0].paymentTypeId = e.target.value
    this.forceUpdate()
}
AcChange(e){
    this.props.editData.TShipmentDomestic[0].carrierAcNumber = e.target.value
    this.forceUpdate()
}
carrierChange(e){
    this.props.editData.TShipmentDomestic[0].carrier = e.target.value
    this.forceUpdate()
}
shipStateChange(e){
    this.props.editData.TShipmentAddress[0].shipToState = e.target.value
    this.forceUpdate()
}
zipCodeChange(e){
    this.props.editData.TShipmentAddress[0].shipToZip = e.target.value
    this.forceUpdate()
}
shipCityChange(e){
    this.props.editData.TShipmentAddress[0].shipToCity = e.target.value
    this.forceUpdate()
}
shipAddressChange(e){
    this.props.editData.TShipmentAddress[0].shipToAddress = e.target.value
    this.forceUpdate()
}
recipTelChange(e){
    this.props.editData.TShipmentDomestic[0].recipentTelNumber = e.target.value
    this.forceUpdate()
}
recipentContactChange(e){
    this.props.editData.TShipmentDomestic[0].recipentContact = e.target.value
    this.forceUpdate()
}
recipentChange(e){
    this.props.editData.TShipmentDomestic[0].recipent = e.target.value
    this.forceUpdate()
}
shippingrefChange(e){
    this.props.editData.TShipmentDomestic[0].shippingReferenceNumber = e.target.value
    this.forceUpdate()
}
shipmentChange(e){
    this.props.editData.TShipmentDomestic[0].typeOfShipment = e.target.value
    this.forceUpdate()
}
bookingChange(e){
        this.props.editData.TShipmentDomestic[0].bookingNumber = e.target.value
        this.forceUpdate()
    }
/* poChange(e){
        var MIView = createDataLoader(ShipmentEditForm, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructions';

                    var pLotUrl = MIView._buildUrl(base, {
                           include : ['TPackagingInstructionLots'],
                        "where": {"po_number":  e.target.value }
                     } );

                 axios.get(pLotUrl).then((response)=>{
                   this.setState({
                    lotNumber: response.data
                   })
              this.lotNumber = _.map(this.state.lotNumber[0].TPackagingInstructionLots,(lotNum,index) => {
            return <option key = {index} id = {lotNum.id} value = {lotNum.id}>{lotNum.lot_number}</option>
        })
                })
       this.forceUpdate()
    }*/
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
   /* customerChange(e){
        this.props.editData.customerId = e.target.value

         if(e.target.value == "1"){
            axios.get(Base_Url+"TPackagingInstructions/getPoListID1").then((response)=>{
                this.setState({
                    poNumber:response.data
                })
                 this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>})
                console.log("poNumber",this.state.poNumber)
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
            this.forceUpdate()
    }*/

onSave(){

     this.SIObj.customerId = this.props.editData.customerId
     this.SIObj.releaseNumber = this.props.editData.releaseNumber
     this.SIObj.numberOfContainers = this.props.editData.numberOfContainers
     this.SIObj.numberOfBags = this.props.editData.numberOfBags
     this.SIObj.id = this.props.editData.id
     this.SIObj.isDomestic = this.props.editData.isDomestic
     this.SIObj.loactionId = this.props.editData.loactionId
        this.id = this.props.editData.id
        this.postObj.SI = this.SIObj
        this.postObj.Domestic = this.props.editData.TShipmentDomestic
        this.postObj.lotInformation = this.props.editData.TShipmentLots
        this.postObj.Address = this.props.editData.TShipmentAddress
        axios.post(Base_Url+"TShipmentents/updateShipMentEntry",this.postObj).then((resonse)=>{
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
                              debugger;
                                    if (Lilength == index + 1) {
                                            swal("Posted", "Success", "success")
                                            hashHistory.push("/Shipment/shipmentview")
                                    }
                            }
    });
            }
            else if(this.postObj.lotInformation.length == 1){
               var data = {status: "SHIPPED"}
               var lotId = this.postObj.lotInformation[0].piLotsId

               if (parseInt(this.postObj.lotInformation[0].noOfBags) == parseInt(this.postObj.lotInformation[0].TPackagingInstructionLots.inInventory)) {
                   axios.put(Base_Url + "TPackagingInstructionLots/" + lotId, {status: "SHIPPED"}).then((response)=> {
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

            }
        })
        //console.log("POSTOBJ",this.postObj)
}
bagsChange(e){
        this.props.editData.numberOfBags = e.target.value
        this.forceUpdate()
    }
    lotBagsChange(e){
        this.props.editData.TShipmentLots[0].noOfBags = e.target.value
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
componentDidMount() {
                  var MIView = createDataLoader(ShipmentEditForm, {
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
                this.SIObj.customerId = this.props.editData.customerId
                this.SIObj.releaseNumber = this.props.editData.releaseNumber
                this.SIObj.numberOfContainers = this.props.editData.numberOfContainers
                this.SIObj.numberOfBags = this.props.editData.numberOfBags
                this.SIObj.id = this.props.editData.id
                this.SIObj.isDomestic = this.props.editData.isDomestic
                this.SIObj.loactionId = this.props.editData.loactionId

            if(this.props.editData.TShipmentDomestic[0].requestedShipDate){
              document.getElementById("requestedShipDate").value = moment(this.props.editData.TShipmentDomestic[0].requestedShipDate).format('YYYY-MM-DD')
            }
            if(this.props.editData.TShipmentDomestic[0].requestedShipDate){
                document.getElementById("rdd").value = moment(this.props.editData.TShipmentDomestic[0].requestedDeliveryDate).format("YYYY-MM-DD")
            }
             var MIView = createDataLoader(ShipmentEditForm,{
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




render()
{
    console.log(this.props.editData)
var Shipment = _.map(this.state.ShipmentType,(Shipment) =>
        {
            return <option key={Shipment.id} id = {Shipment.id} value={Shipment.id}>{Shipment.shipmentType}</option>
        })

var paymentType = _.map(this.state.paymentType,(pType,index)=>{
            return <option key = {index} id = {pType.id} value = {pType.id}>{pType.type}</option>
        })
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
                    <fieldset className="scheduler-border no-right-border">
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
                                    value = {this.props.editData.customerId}
                                    onChange={this.customerChange}
                                    disabled
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
                            <label for="Purchase_Order" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of Containers</label>
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
                    <fieldset className="scheduler-border no-right-border">
                        <legend className="scheduler-border">Material Info</legend>
                        <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span></div>
                        <div className="form-group ">
                            <label for="Rail_Car_Number" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Purchase Order Number</label>
                            <div className="col-lg-6  col-sm-11  col-xs-11">
                                <select value = {this.props.editData.TShipmentLots[0].TPackagingInstructions.po_number} onChange = {this.poChange}  className="form-control" id="" >
                                    <option>{this.props.editData.TShipmentLots[0].TPackagingInstructions.po_number}</option>
                                </select>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Weight" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot Number</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <select value ={this.props.editData.TShipmentLots[0].TPackagingInstructionLots.id} className="form-control" id="" >
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
                                         <label htmlFor="Lot_Number"
                                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label" >No. of Bags
                                             for Lot</label>

                                         <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                          <span style = {{color: "red"}}>{this.props.editData.TShipmentLots[0].TPackagingInstructionLots.inInventory ? this.props.editData.TShipmentLots[0].TPackagingInstructionLots.inInventory : 0 }</span>
                                             <div className="error"><span></span></div>
                                         </div>
                        </div>
                        {this.props.editData.TShipmentLots.length > 1 ? editableLot : ''}
                    </fieldset>
                </div>
                <div className=" col-lg-6  col-sm-6 col-xs-12">
                    <fieldset className="scheduler-border no-right-border">
                        <legend className="scheduler-border">Shipment Info</legend>
                        <div className="form-group ">
                            <label for="" className="col-lg-5 col-md-5 col-sm-11  col-xs-11 control-label">Booking Number</label>
                            <div className="col-lg-6  col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id=""
                                placeholder="Booking Number"
                                value = {this.props.editData.TShipmentDomestic[0].bookingNumber}
                                name = "bookingNumber"
                                onChange={this.bookingChange}
                                />
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="Material"
                                className="col-lg-5 col-md-5 col-sm-11  col-xs-11 control-label">Type of
                            Shipment</label>
                            <div className="col-lg-6  col-sm-11 col-xs-11 ">
                                <select className="form-control" id="Type_of_Packaging"
                                    name="typeOfShipment"
                                    onChange={this.shipmentChange}
                                    value = {this.props.editData.TShipmentDomestic[0].typeOfShipment}
                                    >
                                    <option value="Please Select An Option" disabled selected>Type of Shipment</option>
                                    {Shipment}
                                </select>
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Origin"
                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                            Ref Number</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id=""
                                value = {this.props.editData.TShipmentDomestic[0].shippingReferenceNumber}
                                placeholder="Shipping Ref Number"
                                name="shippingReferenceNumber"
                                onChange={this.shippingrefChange}
                                />
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Type_of_Bag"
                            className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id="" placeholder="Reciepient"
                                value = {this.props.editData.TShipmentDomestic[0].recipent}
                                name="recipent"
                                onChange={this.recipentChange}
                                />
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="No_of_Bages_Pallat"
                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient
                            Contact</label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id="No_of_Bages_Pallat"
                                placeholder="Recipent Contact"
                                name="recipentContact"
                                value = {this.props.editData.TShipmentDomestic[0].recipentContact}
                                onChange={this.recipentContactChange}
                                />
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Type_of_Packaging"
                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient Telephone
                            </label>
                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                <input type="text"
                                className="form-control"
                                id=""
                                value = {this.props.editData.TShipmentDomestic[0].recipentTelNumber}
                                placeholder="Reciepient Telephone"
                                name="recipentTelNumber"
                                onChange={this.recipTelChange}
                                />
                                <div className="error"><span></span></div>
                            </div>
                        </div>
                        <div className="pddn-30-top">
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                to Address</label>
                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Ship to Address"
                                    value = {this.props.editData.TShipmentAddress.length > 0 ? this.props.editData.TShipmentAddress[0].shipToAddress : ''}
                                    name="shippingAddress"
                                    onChange={this.shipAddressChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                               </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                to Zip Code</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Ship to Zip Code"
                                    name="zipCode"
                                    value = {this.props.editData.TShipmentAddress.length > 0 ? this.props.editData.TShipmentAddress[0].shipToZip : ''}
                                    onChange={this.zipCodeChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                to City</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Ship to City"
                                    name="shippingCity"
                                    value = {this.props.editData.TShipmentAddress.length > 0 ? this.props.editData.TShipmentAddress[0].shipToCity : ''}
                                    onChange={this.shipCityChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                to State</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Ship to State"
                                    name="shippingState"
                                    value = {this.props.editData.TShipmentAddress.length > 0 ? this.props.editData.TShipmentAddress[0].shipToState : ''}
                                    onChange={this.shipStateChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            {this.state.DomesticInfoList}
                        </div>
                        <div className="pddn-30-top">
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier</label>
                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Carrier"
                                    name="carrier"
                                    value = {this.props.editData.TShipmentDomestic[0].carrier}
                                    onChange={this.carrierChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier
                                Account Number</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Carrier Account Number"
                                    name="carrierAcNumber"
                                    value = {this.props.editData.TShipmentDomestic[0].carrierAcNumber}
                                    onChange={this.AcChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                                Payment Type</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <select className="form-control"
                                        id="No_of_Bages_Pallat"
                                        placeholder="Shipping Payment Type"
                                        name="paymentTypeId"
                                        value = {this.props.editData.TShipmentDomestic[0].paymentTypeId}
                                        onChange={this.paymentChange}
                                        >
                                        <option value="Please Select An Option" disabled selected>Payment Type</option>
                                        {paymentType}
                                    </select>
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stretch_wrap"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                                Paid By</label>
                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                    <input type="text"
                                    className="form-control"
                                    id="No_of_Bages_Pallat"
                                    placeholder="Shipping Paid By"
                                    name="paidBy"
                                    value = {this.props.editData.TShipmentDomestic[0].paidBy}
                                    onChange={this.paidByChange}
                                    />
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="No_of_Bages_Pallat"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Requested
                                Ship Date</label>
                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                    <div className="right-inner-addon "><i className="fa fa-calendar"
                                        aria-hidden="true"></i>
                                        <input type = "date"
                                        className = "form-control"
                                        id = "requestedShipDate"
                                        ref = "requestedShipDate"
                                        name="requestedShipDate"
                                        onChange={this.requestedShipdateChange} placeholderText="Requested Ship Date"/>
                                    </div>
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="No_of_Bages_Pallat"
                                    className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Requested
                                Delivery Date</label>
                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                    <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                        <input type = "date"
                                        className = "form-control"
                                        dateFormat="MM-DD-YYYY"
                                        id = "rdd"
                                        selected={this.state.RequestedDeliveryDate}
                                        name="requestedDeliveryDate"
                                        onChange={this.requestedDeliveryChange} placeholderText="Requested Delivery Date"/>
                                    </div>
                                    <div className="error"><span></span></div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pddn-30-btm padding-top-btm-xs">
                    <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-orange text-uppercase hidden">Delete</button></div>
                    <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray text-uppercase" onClick = {hashHistory.goBack}>Cancel</button></div>
                    <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-primary text-uppercase" onClick = {this.onSave}>Save</button></div>
                </div>
            </form>
        </div>
    </div>
</section>
);
}
}
export default ShipmentEditForm;
