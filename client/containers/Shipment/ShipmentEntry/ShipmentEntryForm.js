import React from 'react';
import axios from 'axios';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
var DatePicker = require('react-datepicker');
import SweetAlert from 'sweetalert-react';
//import { DateField, Calendar } from 'react-datepicker'
var moment = require('moment');
import _ from 'lodash';
var Spinner = require('react-spinkit');
import {Base_Url} from '../../../constants';
import { createDataLoader } from 'react-loopback';
import  validateInput  from './shipmentvalidator';
import  validateDomesticInput  from './domestiocValidator';
import  validateInternationalInput  from './InternationalValidate';
require('react-datepicker/dist/react-datepicker.css');
import '../../../public/stylesheets/sweetalert.css';
import MaterialInformation from '../../../components/MaterialInformation/MaterialInformation';
import LotInformation from '../../../components/LotInformation/LotInformation';
import DomesticShip from '../../../components/ShipmentDomesticShip/DomesticShip';
import ShipmentDomesticCarear from '../../../components/ShipmentDomesticCarear/ShipmentDomesticCarear';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';
import { hashHistory } from 'react-router';
import DisableDoubleClick from '../../GlobalFunctions/DisableDoubleClick'
import EnableClick from '../../GlobalFunctions/EnableClick'
var Loader = require('react-loader')
var Promise = require('bluebird');
var totalBagsInPO =0;
var totalBagsOrderForPO = 0
var tempDate = new Date()
class ShipmentEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.inInventoryBags = 0
        this.selectedobj = ""
        this.SIObj = { }
        this.Allobjs = { }
        this.Allobj = { }
        this.MIobj = { }
        this.LIobj = { }
        this.isDomestic = 0
        this.Internationalobj={ }
        this.Domesticobj={ }
        this.Address={ }
        this.DomesticCarearobj={ }
        this.deliveryDate=''
        this.shipDate=''
        this.internationalEarliestReturnDate=tempDate.getFullYear()+"-"+(parseInt(tempDate.getMonth())+1)+"-"+tempDate.getDate()
        this.internationalCargoCutOffDate=tempDate.getFullYear()+"-"+(parseInt(tempDate.getMonth())+1)+"-"+tempDate.getDate()+" "+tempDate.getHours()+":"+(tempDate.getMinutes()<10?"0"+tempDate.getMinutes():tempDate.getMinutes())
        this.DocCutoffDate=tempDate.getFullYear()+"-"+(parseInt(tempDate.getMonth())+1)+"-"+tempDate.getDate()+" "+tempDate.getHours()+":"+(tempDate.getMinutes()<10?"0"+tempDate.getMinutes():tempDate.getMinutes())
        this.minus=0;
        this.lotminus=0;
        this.poNumber
        this.lotNumber
        this.MIObjects = []
        this.material=[]
        this.DomesticInfoObjects = []
        this.DomesticCaraerObjects = []
        this.LIObjects=[]
        this.plotNumber = []
        this.comPo = {"pi_id": "",
            "lot_id" : ""}
        this.state = {
            poNumber: [],
            materialInfoList:[],
            selectedOption:'',
            lotInfoList:[],
            DomesticInfoList:[],
            index: 0,
            DomesticCarearInfoList:[],
            RequestedShipDate : '',
            RequestedDeliveryDate:  '',
            EarliestReturnDate:'',
            CargoCutoffDate:'',
            DocCutoffDate:'',
            errors : { },
            errorsd : { },
            errorsI : { },
            loaded : false
        }
        this.haveSpecial = 0
        this.Address = {
            zipCode: ''
        }
        this.lastSelectedPo = {"po_number" : ""}
        this.userId = localStorage.getItem('userId')
        this.handleSIChange = this.handleSIChange.bind(this);
        this.handleLIChange = this.handleLIChange.bind(this);
        this.onSubmitContainer = this.onSubmitContainer.bind(this)
        //this.HandleAllAction= this.HandleAllAction.bind(this);
        //this.handleOptionChange1= this.handleOptionChange1.bind(this);
        this.RequestedShipDate = this. RequestedShipDate.bind(this);
        this.RequestedDeliveryDate = this.RequestedDeliveryDate.bind(this);
        this.InternationalReturnDate = this. InternationalReturnDate.bind(this);
        this.DocCutOffDate= this.DocCutOffDate.bind(this);
        this.InternationalCargoDate=this.InternationalCargoDate.bind(this)
        this.handleMIChange = this.handleMIChange.bind(this);
        this.InternationalChange = this.InternationalChange.bind(this);
        this.DomesticChange = this.DomesticChange.bind(this);
        this.DomesticChange1 = this.DomesticChange1.bind(this);
       // this.DomesticChange2 = this.DomesticChange2.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onAdd=this.onAdd.bind(this);
        this.onLotAdd=this.onLotAdd.bind(this);
        this.onAdd1=this.onAdd1.bind(this);
       // this.onAdd2=this.onAdd2.bind(this);
        this.onMinus = this.onMinus.bind(this)
        this.onLotMinus = this.onLotMinus.bind(this)
        this.onDomesticShipMinus=this.onDomesticShipMinus.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onZipBlur = this.onZipBlur.bind(this)
        this.GetTotalbags = this.GetTotalbags.bind(this)
       // this.onDomestiCarearMinus=this.onDomestiCarearMinus.bind(this);
        //this.onCancel = this.onCancel.bind(this)
        this.isValid = this.isValid.bind(this)
        this.convertDate = this.convertDate.bind(this)
        this.Total = 0
       // numberOfBags : '',

        this.SIObj = {

            location_id : '',
            customer_id: '',
            isDomestic : '',

            numberOfContainers : '',
            releaseNumber : ''

}
       this.Domesticobj = {
           typeOfShipment: '',
           shippingReferenceNumber: "",
           recipent: "",
           recipentContact: "",
           recipentTelNumber: "",
           carrier: "",
           "carrierAcNumber": "",
           "bookingNumber": "",
           paymentTypeId: '',
           paidBy: "",
           RequestedShipDate: "",
           RequestedDeliveryDate: "",

       }


        this.Internationalobj = {

             bookingNumber: "",
            freightForwarder: "",
            containerTypeId: "'",
            steamshipLineId: "",
            steamshipVessel: "",
            EarliestReturnDate: "",
            DocCutoffDate: "",
            cutoffDateNotRequired: "",
            CargoCutoffDate: "",
            freeDaysPerContainer: "",
            containerPickupLocation: "",
            containerReturnLocation: "",
            notes: ""
        }


        //this.Allobjs.SI = this.SIobj




    }
    componentDidMount() {
        var PIview = createDataLoader(ShipmentEntryForm,{
            queries:[{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        console.log("I have recieved props")


        var base = 'TCompanies'
        this.urlCustomer = PIview._buildUrl(base, {
            "where" : {type : "CUSTOMER" }
        })

        axios.get(Base_Url + "TShipmentTypes/").then((response) => {
            this.setState({
                ShipmentType: response.data
            })
        })
            .catch(function (err) {
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
            axios.get(Base_Url + "TContainerTypes").then((response) => {
                this.setState({
                    containerType: response.data
                })
            })
            axios.get(Base_Url +"TSteamshipLines").then((response) => {
                this.setState({
                    steamShipLine : response.data
                })
            })
            axios.get(Base_Url + "TPaymentTypes").then((response) => {
                this.setState({
                    paymentType : response.data
                })
            })
            axios.get(Base_Url + "TLocations").then((response) => {
                this.setState({
                    location : response.data,
                    loaded : true
                })
            })
    }


    RequestedShipDate(date) {
        var startdate=date.format('YYYY-MM-DD')

        this.setState({
            RequestedShipDate:date
        });

        this.shipDate=startdate
        console.log("startDate",startdate)
    }

    onZipBlur(e){
            var zipCode = this.Address.zipCode
            if(zipCode.length != 6){
                this.zipError = 1
                this.zipCodeError = 'Enter A Valid Zip Code'
            }else if(zipCode.length == 6){
                this.zipError = 0
                this.zipCodeError = ''
            }
            this.forceUpdate()
        }

    RequestedDeliveryDate(date){

        var startdate=date.format('YYYY-MM-DD')

        this.setState({
            RequestedDeliveryDate:date
        });
        console.log(startdate);
        this.deliveryDate=startdate

    }
    InternationalReturnDate(date){

        var startdate=this.convertDate(date)
        this.setState({
            EarliestReturnDate:date
        });
        console.log(startdate);
        this.internationalEarliestReturnDate=startdate

    }
    convertDate(date){

      var temp =[]
      temp = date.split('-');
      var tempYear = temp[2].split(' ')
      var tempDate = ""
      if(tempYear.length==2){
        tempDate = tempYear[0]+"-"+temp[0]+"-"+temp[1]+" "+tempYear[1]
    }
    else{
      tempDate = tempYear[0]+"-"+temp[0]+"-"+temp[1]
    }
      return tempDate
    }
    DocCutOffDate(date){
        var startdate=this.convertDate(date)
        this.setState({
            DocCutoffDate:date
        });
        console.log("start date",startdate);
        this.DocCutoffDate=startdate
    }
    InternationalCargoDate(date){

     var startdate=this.convertDate(date)
        this.setState({
            CargoCutoffDate:date
        });
        this.internationalCargoCutOffDate=startdate
    }
    handleSIChange(e){
        if(e.target.name == "customer_id"){
           var MIView = createDataLoader(ShipmentEntryForm,{
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
         }
         axios.get(Purl).then((response)=>{
            this.setState({
                poNumber: response.data
            })
        this.poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key={index} value={poNum.id}>{poNum.po_number}</option>})
                console.log("poNumber",this.state.poNumber)
            this.forceUpdate()
         })


        this.setState({[e.target.name]: e.target.value});
        this.SIObj[e.target.name] = e.target.value
        console.log("SICHANGES",this.SIObj)
    }
    GetTotalbags(event,next)
    {
      var bags;
      var totalAllocatedbags=0;
      var MIView = createDataLoader(ShipmentEntryForm, {
                  queries: [{
                      endpoint: 'TShipmentLots'
                  }]
              });
    var base = 'TShipmentLots';
      var pLotUrl = MIView._buildUrl(base, {

          "where": { and:
                         [ {"piLotsId":  event.target.value },
                           {active:1}
                         ]
                   }
       } );
       console.log(pLotUrl)
      axios.get(pLotUrl).then(function(response){
        bags=response.data;
          for(var i =0;i<bags.length;i++)
          {
            totalAllocatedbags += bags[i].noOfBags;
          }
            return next({totalBags:totalAllocatedbags});

      })
    }

    handleLIChange(e){

        var lot_name=e.target.name;
        var lot_value=e.target.value;
        var selectedIndex=e.target.selectedIndex;
        var obj=this;
        this.GetTotalbags(e,function(values){
          var bags=values;
          obj.LIobj[lot_name] = lot_value;
          obj.comPo.lot_id = lot_value;
          let selectedValue = selectedIndex - 1
          obj.inInventoryBags = obj.state.lotNumber[selectedValue].inInventory - bags['totalBags']
          obj.comPo.inInventorybags = obj.state.lotNumber[selectedValue].inInventory - bags['totalBags']
          obj.forceUpdate()
      });




    }
    handleMIChange(e){

            totalBagsInPO =0
            totalBagsOrderForPO = 0
          if(e.target.name == "po_number"){
            this.comPo.pi_id = e.target.value
            var MIView = createDataLoader(ShipmentEntryForm, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var pLotUrl = MIView._buildUrl(base, {

                        "where": {and:[{"pi_id":  e.target.value },{active:1}]}
                     } );

                 axios.get(pLotUrl).then((response)=>{

                   this.setState({
                    lotNumber: response.data,
                    len:response.data.length-1
                   })
                   console.log("LOTNUMBER",this.state.lotNumber)
                  var getKeys = []
                     for(var i in this.state.lotNumber){

                         getKeys.push(this.state.lotNumber[i].inInventory)

                     }

                     var inventoryBags = getKeys.filter(function(val) { return val !== null; })
                     this.Total = inventoryBags.reduce(function(a,b){return parseInt(a)+parseInt(b) ;},0)

                this.lotNumber = _.map(this.state.lotNumber,(lotNum,index) => {

                  if(isNaN(lotNum.inInventory) || lotNum.inInventory == null){
                    lotNum.inInventory = 0;
                  }
                totalBagsInPO += parseInt(lotNum.inInventory)
                let temp={target:{value:lotNum.id}}
                var tempthis =this
                this.GetTotalbags(temp,function(values){
                  var tempvalue = values;
                  totalBagsOrderForPO += tempvalue['totalBags']
                  tempthis.inInventoryBags = totalBagsInPO - totalBagsOrderForPO
                  tempthis.comPo.inInventorybags = totalBagsInPO - totalBagsOrderForPO
                  tempthis.forceUpdate()
                })

            return <option key = {index}  value = {lotNum.id}>{lotNum.lot_number}</option>
        })
        this.inInventoryBags = totalBagsInPO //- totalBagsOrderForPO
        this.comPo.inInventorybags = totalBagsInPO
        this.forceUpdate()
        document.getElementById("lot_Number").selectedIndex = null
        this.inInventoryBags = 0
        this.forceUpdate()
        })

     }
        this.lastSelectedPo.po_number = e.target.value
        console.log("LotNumber",this.lotNum)
        this.MIobj[e.target.name] = e.target.value
        console.log("MICHANGE",this.MIobj)
    }
    handleCompPOChange(e,value){
        console.log("I WAS CALLED")
        console.log(value)

        var lot_name=e.target.name;
        var lot_value=e.target.value;
        var selectedIndex=e.target.selectedIndex;
        var obj=this;
        this.GetTotalbags(e,function(values){
          var bags=values;
          obj.LIobj[lot_name] = lot_value;
          obj.comPo.lot_id = lot_value;
          let selectedValue = selectedIndex - 1
          obj.inInventoryBags = obj.state.lotNumber[selectedValue].inInventory - bags['totalBags']
          obj.comPo.inInventorybags = obj.state.lotNumber[selectedValue].inInventory - bags['totalBags']
          obj.forceUpdate()
      });
    }
    handleComplotNumberChange(e){

    }
    InternationalChange(e){
        this.setState({[e.target.name]: e.target.value});
        this.Internationalobj[e.target.name] = e.target.value
        console.log("International",this.Internationalobj)

    }
    DomesticChange(e){
        this.setState({[e.target.name]: e.target.value});
        this.Domesticobj[e.target.name] = e.target.value
        console.log("DomesticCHANGE",this.Domesticobj)

    }
    DomesticChange1(e){
        this.Address[e.target.name] = e.target.value
        console.log("Address",this.Address)

    }

   /* DomesticChange2(e){
        this.setState({[e.target.name]: e.target.value});
        this.DomesticCarearobj[e.target.name] = e.target.value

    }*/
    addMIObject(){
        var MaterialInfoObjects = Object.assign({},this.MIobj)
        this.MIObjects.push(MaterialInfoObjects)

        console.log("MIOBJECT",this.MIObjects)
    }
    /*addLIObject(){
        var LotInfoObjects = Object.assign({},this.LIobj)
        this.LIObjects.push(LotInfoObjects)

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>liobj",this.LIObjects)
    }*/
    addDomesticshipObject(){
        var DomesticInfoObjects = Object.assign({},this.Address)
        this.DomesticInfoObjects.push(DomesticInfoObjects)

        console.log("DomesticInfoObjects",this.DomesticInfoObjects);
    }
   /* addDomesticcarearObject(){
        var DomesticcarearObjects = Object.assign({},this.DomesticCarearobj)
        this.DomesticCaraerObjects.push(DomesticcarearObjects)

        console.log(this.DomesticInfoObjects);
    }*/
    onAdd(){

        if(this.state.materialInfoList.length == 0 && Object.keys(this.MIobj).length != 0) {
            if(this.LIobj.lot_id == undefined){
                swal("Empty Lot","Please select a lot number before adding new lots","error")
                return
            }
            this.addMIObject();
            this.LIObjects.push(this.LIobj)
            console.log("LIOBJECTS",this.LIObjects)
            const materialInfoList = this.state.materialInfoList;
            var count = this.state.index+1

            this.setState({
                index:count,
                materialInfoList: materialInfoList.concat(<MaterialInformation key={materialInfoList.length} poNumber = {this.poNumber} onChange={(e) => {this.handleCompPOChange(e,value)}} comPo = {this.comPo}
                                                                             lastSelectedPo = {this.lastSelectedPo}    onhandleComplotNumberChange = {this.handleComplotNumberChange.bind(this)}/>)
            })
        }
        else if(this.state.materialInfoList.length > 0){
            if(this.comPo.lot_id == ""){
                swal("Empty Lot","Please select a lot number before adding new lots","info")
                return
            }
            this.LIObjects.push(_.cloneDeep(this.comPo))
            console.log("AFTERCOMPADD",this.LIObjects)
            var count = this.state.index+1
            const materialInfoList = this.state.materialInfoList;
             this.setState({
                index:count,
                materialInfoList: materialInfoList.concat(<MaterialInformation key={materialInfoList.length} poNumber = {this.poNumber} onChange={(e) => {this.handleCompPOChange(e,value)}} lastSelectedPo = {this.lastSelectedPo} comPo = {this.comPo}
                                                                                 onhandleComplotNumberChange = {this.handleComplotNumberChange.bind(this)}/>)
            })
            this.comPo.lot_id = ''
        }

        else {
            swal("Empty Fields","Please Enter All The Fields Before Adding New Lots.","error")
        }

    }
    onLotAdd(){
        if(this.comPo.lot_id != "") {

           this.LIObjects.push(_.cloneDeep(this.comPo))
           this.comPo.lot_id = ""
            const lotInfoList = this.state.lotInfoList;
            var count = this.state.index+1
            this.setState({
                index:count,
                lotInfoList:lotInfoList.concat(<LotInformation key = {lotInfoList.length} lotNumber = {this.state.lotNumber}
                                                              lastSelectedPo = {this.lastSelectedPo} onChange = {this.handleLIChange.bind(this)} comPo = {this.comPo} handlebagsToShip = {this.handlebagsToShip.bind(this)}/>)
            })
       }
        else {
            swal("Empty Fields","Please Enter All The Fields Before Adding New Lots.","error")
        }

    }
    onMinus(e){
        this.minus=this.minus + 1

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.minus)
        if(this.minus==1){
            this.addMIObject();
            this.addLIObject();


        }


        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>minus",this.state.materialInfoList)
        this.setState({

            materialInfoList :this.state.materialInfoList.slice(0,-1)



        })

        this.MIObjects= this.MIObjects.slice(0,-1)
        this.LIObjects= this.LIObjects.slice(0,-1)





       // this.state.index=this.state.index-1
        //console.log("index is",this.state.index)


        //console.log(">>>>>?>>>>>?>>>>>?>>>>>>",this.MIobj)
       // console.log(this.MIObjects)
        //React.unmountComponentAtNode(document.getElementById(''));
    }
    onLotMinus(e) {
        this.lotminus=this.lotminus+1
        if(this.lotminus==1){

            this.addLIObject();


        }

        this.setState({
            lotInfoList :this.state.lotInfoList.slice(0,-1)

        })
        this.LIObjects= this.LIObjects.slice(0,-1)

    }
    onDomesticShipMinus(e){
        this.setState({
            DomesticInfoList :this.state. DomesticInfoList.slice(0,-1)
        })


    }
   //React.unmountComponentAtNode(document.getElementById(''));}
    onAdd1(){

        if(Object.keys(this.Address).length != 0) {
            this.addDomesticshipObject();
            const DomesticInfoList = this.state.DomesticInfoList;
            this.setState({
                DomesticInfoList: DomesticInfoList.concat(<DomesticShip key={DomesticInfoList.length}
                                                                        onChange={this.DomesticChange1.bind(this)}/>)
            })
            this.Address={}

            console.log(this.DomesticInfoObjects);
        }
        else {
            swal("Empty Fields","Please Enter All The Fields Before Adding New Lots.","error")
        }

    }


    handleOptionChange(e){
        //
        //console.log(e.target.name);
        if(e.target.name == "Domestic"){
            this.isDomestic = 1
        }
        else{
            this.isDomestic = 0
        }
        let option = e.target.name
       this.setState({
            selectedOption : option
        })
       console.log("isDomestic",this.isDomestic)

        console.log(option);
    }
    isValid(){

        const { errors , isValid, haveSpecialChar } = validateInput(this.SIObj);
        this.haveSpecial = haveSpecialChar
        if(!isValid){
            this.setState({
                errors : errors
            })
        }
        this.forceUpdate()
        return isValid;
    }
 isValidDomestic(){

        const { errorsd , isValid, haveSpecialChar } = validateDomesticInput(this.Domesticobj);
        this.haveSpecial = haveSpecialChar
        if(!isValid){
           this.state.errorsd = errorsd
            this.setState({
                errorsd : this.state.errorsd
            })
        }
        return isValid;
    }
    isValidInt(){

        const { errorsI , isValid, haveSpecialChar } = validateInternationalInput(this.Internationalobj);
        this.haveSpecial = haveSpecialChar
        if(!isValid){
            this.state.errorsI = errorsI
            this.setState({
                errorsI : this.state.errorsI
            })
        }
        return isValid;
    }

    onSubmit(e){
      DisableDoubleClick('submit')
      var bagsLeftTemp = 0
        if(!(this.isValid())){
          EnableClick('submit')
            if(this.haveSpecial==0){
              swal("", "Please fill red marked fields", "error")
            }
            return
        }

        if(this.isDomestic) {
            if (!(this.isValidDomestic())) {
              EnableClick('submit')
                if(this.haveSpecial==0){
                swal("", "Please fill red marked Domestic fields", "error")
              }
                return
            }
        }
        if(!this.isDomestic){

            if(!(this.isValidInt())) {
              EnableClick('submit')
              if(this.haveSpecial==0){
                swal("", "Please fill red marked International Shipment fields", "error")
              }
              return
            }
        }

        if(parseInt(this.comPo.bagsToShip) > parseInt(this.comPo.inInventorybags)){
            //swal("" , "Shipped bags must not be greater than Inventory bags" , "info")
        }
        var flagToDecideLotNumber = false;
        if(this.comPo.lot_id == ''){
          for(var i in this.state.lotNumber){
            if(parseInt(this.comPo.bagsToShip) <= parseInt(this.state.lotNumber[i].inInventory)){
              flagToDecideLotNumber = true
              this.comPo.lot_id = this.state.lotNumber[i].id
              break
            }
          }
        }
        else{
          flagToDecideLotNumber = true
        }
        if(!flagToDecideLotNumber){

          let bagsAdded = 0;
          let bagsrequested = parseInt(this.comPo.bagsToShip)
          let bagsLeft = bagsrequested - bagsAdded
          var obj = {};
          var flag = false
          obj.pi_id = this.comPo.pi_id
          for(var i in this.state.lotNumber){
            flag = false
            if(parseInt(bagsLeft)>0){
              if(parseInt(bagsLeft)>=parseInt(this.state.lotNumber[i].inInventory) && parseInt(this.state.lotNumber[i].inInventory) >0){
                obj.bagsToShip = this.state.lotNumber[i].inInventory
                bagsAdded = parseInt(bagsAdded)+parseInt(this.state.lotNumber[i].inInventory);
                flag = true
              }
            else if(parseInt(bagsLeft)<parseInt(this.state.lotNumber[i].inInventory) && parseInt(this.state.lotNumber[i].inInventory)>0){
              obj.bagsToShip = bagsLeft
              bagsAdded = parseInt(bagsAdded) + parseInt(bagsLeft)
              flag = true
            }
            if(flag){
              obj.lot_id = this.state.lotNumber[i].id
              obj.inInventorybags = this.state.lotNumber[i].inInventory
              this.LIObjects.push(_.cloneDeep(obj));
              bagsLeft = this.comPo.bagsToShip - bagsAdded
            }

          }
          else{
            break;
          }
          if(i==this.state.lotNumber.length-1 && this.LIObjects.length<1){
            obj.lot_id = this.state.lotNumber[0].id
            obj.inInventorybags = this.state.lotNumber[0].inInventory
            obj.bagsToShip = bagsrequested
            bagsLeft = 0
            this.LIObjects.push(_.cloneDeep(obj));
          }
          }
            bagsLeftTemp = bagsLeft
        }
        if(bagsLeftTemp>0){
          this.LIObjects[this.LIObjects.length-1].bagsToShip = parseInt(this.LIObjects[this.LIObjects.length-1].bagsToShip) + parseInt(bagsLeftTemp)
        }
        this.SIObj.isDomestic = this.isDomestic

        if(this.minus==0){
            this.addMIObject();

        }

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
        today = yyyy+'-'+mm+'-'+dd
        this.SIObj.created_on = today
        this.SIObj.created_by = this.userId
        this.Allobjs.SI = this.SIObj

        if(this.state.lotInfoList.length == 0 && this.comPo.lot_id != '' && flagToDecideLotNumber){
            this.LIObjects.push(_.cloneDeep(this.comPo))
        }
        if(this.state.lotInfoList.length > 0 && this.comPo.lot_id != '' && flagToDecideLotNumber){
            this.LIObjects.push(_.cloneDeep(this.comPo))
            console.log("SAVEDAFTERADD",this.LIObjects)
        }
        this.Allobjs.lotInformation = this.LIObjects
        this.Domesticobj.created_on = today
        this.Allobjs.Domestic = this.Domesticobj
        if (Object.keys(this.Address).length != 0) {
            this.addDomesticshipObject()

        }
        this.Allobjs.Address = this.DomesticInfoObjects

        this.Allobjs.Domestic.domesticCarear = this.DomesticCaraerObjects
        this.Allobjs.Domestic.RequestedDeliveryDate = this.deliveryDate
        this.Allobjs.Domestic.RequestedShipDate = this.shipDate
        this.Internationalobj.created_on = today
        this.Allobjs.International = this.Internationalobj
        this.Allobjs.International.EarliestReturnDate = this.internationalEarliestReturnDate
        this.Allobjs.International.CargoCutoffDate = this.internationalCargoCutOffDate
        this.Allobjs.International.DocCutoffDate = this.DocCutoffDate

        axios.post(Base_Url+"TShipmentents/createShipMentEntry",this.Allobjs).then((response)=>{


        //if(parseInt(this.SIObj.numberOfBags) == parseInt(this.Total)){
            // var Lilength = this.LIObjects.length
            // if(this.LIObjects.length > 1) {
            //      this.LIObjects.forEach(function (element, index) {
            //          if (parseInt(element.bagsToShip) == parseInt(element.inInventorybags)) {
            //
            //               axios.put(Base_Url + "TPackagingInstructionLots/" + element.lot_id).then((response)=> {
            //
            //             }).then((response)=> {
            //
            //                 if (Lilength == index + 1) {
            //                     swal("Posted", "Success", "success")
            //                     hashHistory.push("/Shipment/shipmentview")
            //                 }
            //             })
            //         }
            //         else{
            //             if (Lilength == index + 1) {
            //                 swal("Posted", "Success", "success")
            //                 hashHistory.push("/Shipment/shipmentview")
            //             }
            //         }
            //
            //
            //     });
            // }
            // else if(this.LIObjects.length <=1){
            //     this.LIObjects.forEach(function (element, index) {
            //         if (parseInt(element.bagsToShip) == parseInt(element.inInventorybags)) {
            //             axios.put(Base_Url + "TPackagingInstructionLots/" + element.lot_id, {status: "SHIPPED"}).then((response)=> {
            //                 swal("Posted", "Success", "success")
            //                 hashHistory.push("/Shipment/shipmentview")
            //             }).then((response)=> {
            //
            //                 //if (Lilength == index + 1) {
            //                 //    swal("Posted", "Success", "success")
            //                 //    hashHistory.push("/Shipment/shipmentview")
            //                 //}
            //             })
            //         }
            //         else{
            //             swal("Posted","Success","success")
            //             hashHistory.push("/Shipment/shipmentview")
            //         }
            //
            //
            //     });
            // }
           // }

              if(response.data.errors){
                EnableClick('submit')
              if(response.data.errors.code == "Release Number Already Exist" || response.data.errors.code == "Booking Number Already Exist"){
                 swal(response.data.errors.code)
                 return
              }}
               else{
                 swal("Posted","Success","success")
               hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/-'+ 1 )
             }



        }).catch(function (error) {
          EnableClick('submit')
          console.log(error);
  });




        //axios.post(Base_Url+"TShipmentents/createShipMentEntry",this.Allobjs)
        //    .then((response) => {
        //            ;
        //
        //    }).then((response) => {
        //
        //        swal("Posted","Success","success")
        //        hashHistory.push("/Shipment/shipmentview")
        //    })



        this.DomesticCarearobj = {}
        this.Address = {}


        //  }
   }
  //  hashHistory.push('/Container/containerarrivalentry/'+response.data.id+'/'+this.SIObj.isDomestic )
onSubmitContainer(e){
  var bagsLeftTemp =0
DisableDoubleClick('submitContainer')
  if(!(this.isValid())){
    EnableClick('submitContainer')
      if(this.haveSpecial==0){
         swal("" , "Please fill red marked fields" , "error")
       }
         return
     }

     if(this.isDomestic) {
         if (!(this.isValidDomestic())) {
           EnableClick('submitContainer')
           if(this.haveSpecial==0){
             swal("", "Please fill red marked Domestic fields", "error")
           }
             return
         }

     }
     if(!this.isDomestic){

         if(!(this.isValidInt())) {
           EnableClick('submitContainer')
           if(this.haveSpecial==0){
             swal("", "Please fill red marked International Shipment fields", "error")
           }
           return
         }
     }

     if(parseInt(this.comPo.bagsToShip) > parseInt(this.comPo.inInventorybags)){
         //swal("" , "Shipped bags must not be greater than Inventory bags" , "info")
         //return
     }

     var flagToDecideLotNumber = false;
     if(this.comPo.lot_id == ''){
       for(var i in this.state.lotNumber){
         if(parseInt(this.comPo.bagsToShip) <= parseInt(this.state.lotNumber[i].inInventory)){
           flagToDecideLotNumber = true
           this.comPo.lot_id = this.state.lotNumber[i].id
           break
         }
       }
     }
     else{
       flagToDecideLotNumber = true
     }
     if(!flagToDecideLotNumber){

       let bagsAdded = 0;
       let bagsrequested = parseInt(this.comPo.bagsToShip)
       let bagsLeft = bagsrequested - bagsAdded
       var obj = {};
       var flag = false
       obj.pi_id = this.comPo.pi_id
       for(var i in this.state.lotNumber){
         flag = false
         if(parseInt(bagsLeft)>0){
           if(parseInt(bagsLeft)>=parseInt(this.state.lotNumber[i].inInventory) && parseInt(this.state.lotNumber[i].inInventory) >0){
             obj.bagsToShip = this.state.lotNumber[i].inInventory
             bagsAdded = parseInt(bagsAdded)+parseInt(this.state.lotNumber[i].inInventory);
             flag = true
           }
         else if(parseInt(bagsLeft)<parseInt(this.state.lotNumber[i].inInventory) && parseInt(this.state.lotNumber[i].inInventory)>0){
           obj.bagsToShip = bagsLeft
           bagsAdded = parseInt(bagsAdded) + parseInt(bagsLeft)
           flag = true
         }
         if(flag){
           obj.lot_id = this.state.lotNumber[i].id
           obj.inInventorybags = this.state.lotNumber[i].inInventory
           this.LIObjects.push(_.cloneDeep(obj));
           bagsLeft = this.comPo.bagsToShip - bagsAdded
         }

       }
       else{
         break;
       }
       if(i==this.state.lotNumber.length-1 && this.LIObjects.length<1){
         obj.lot_id = this.state.lotNumber[0].id
         obj.inInventorybags = this.state.lotNumber[0].inInventory
         obj.bagsToShip = bagsrequested
         bagsLeft = 0
         this.LIObjects.push(_.cloneDeep(obj));
       }
       }
         bagsLeftTemp = bagsLeft
     }
     if(bagsLeftTemp>0){
       this.LIObjects[this.LIObjects.length-1].bagsToShip = parseInt(this.LIObjects[this.LIObjects.length-1].bagsToShip) + parseInt(bagsLeftTemp)
     }
     this.SIObj.isDomestic = this.isDomestic
     if(this.minus==0){
         this.addMIObject();

     }

     /*Object.defineProperty(this.Allobjs, "MI", {value: this.MIObjects})
      // if (Object.keys(this.LIobj).length !== 0)
      if(this.minus==0){
      this.addLIObject()

      }*/
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
     today = yyyy+'-'+mm+'-'+dd
     this.SIObj.created_on = today
     this.SIObj.created_by = this.userId
     this.Allobjs.SI = this.SIObj
     /*  if(Object.keys(this.LIObjects).length == 0){
      this.addLIObject()
      }*/
     /*if(this.state.lotInfoList.length != 0 && Object.keys(this.LIobj).length != 0){
      this.LIObjects.push(this.LIobj)
      console.log("SaveLIOBJECTS",this.LIObjects)
      }*/
     if(this.state.lotInfoList.length == 0 && this.comPo.lot_id != '' && flagToDecideLotNumber){
         this.LIObjects.push(_.cloneDeep(this.comPo))
     }
     if(this.state.lotInfoList.length > 0 && this.comPo.lot_id != '' && flagToDecideLotNumber){
         this.LIObjects.push(_.cloneDeep(this.comPo))
         console.log("SAVEDAFTERADD",this.LIObjects)
     }
     this.Allobjs.lotInformation = this.LIObjects
     /*Object.defineProperty(this.Allobjs, "lotInformation", {value: this.LIObjects})*/

     this.Domesticobj.created_on = today
     this.Allobjs.Domestic = this.Domesticobj
     if (Object.keys(this.Address).length != 0) {
         this.addDomesticshipObject()

     }
     this.Allobjs.Address = this.DomesticInfoObjects

     //this.Allobjs.Domestic.domesticship = this.DomesticInfoObjects
     // this.Allobjs.Domestic.domesticCarear = this.DomesticCaraerObjects
     this.Allobjs.Domestic.RequestedDeliveryDate = this.deliveryDate
     this.Allobjs.Domestic.RequestedShipDate = this.shipDate

     //Object.defineProperty(this.Allobjs, "International", {value: this.Internationalobj})
     this.Internationalobj.created_on = today
     this.Allobjs.International = this.Internationalobj
     this.Allobjs.International.EarliestReturnDate = this.internationalEarliestReturnDate
     this.Allobjs.International.CargoCutoffDate = this.internationalCargoCutOffDate
     this.Allobjs.International.DocCutoffDate = this.DocCutoffDate

    axios.post(Base_Url+"TShipmentents/createShipMentEntry",this.Allobjs).then((response)=>{


        //if(parseInt(this.SIObj.numberOfBags) == parseInt(this.Total)){
//         var Lilength = this.LIObjects.length
//         if(this.LIObjects.length > 1) {
//             this.LIObjects.forEach(function (element, index) {
// //                 if (parseInt(element.bagsToShip) == parseInt(element.inInventorybags)) {
// //                     axios.put(Base_Url + "TPackagingInstructionLots/" + element.lot_id, {status: "SHIPPED"}).then((data)=> {
// //
// // }).then((data)=> {
// //
// //                         if (Lilength == index + 1) {
// //                             swal("Posted", "Success", "success")
// //                             hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/'+ 1 )
// //                         }
// //                     })
// //                 }
//                 //else{
//                     if (Lilength == index + 1) {
//                         swal("Posted", "Success", "success")
//                         hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/'+1 )
//                     }
//                 //}
//
//
//             });
//         }
//         else if(this.LIObjects.length ==1){
//             this.LIObjects.forEach(function (element, index) {
                // if (parseInt(element.bagsToShip) == parseInt(element.inInventorybags)) {
                //     axios.put(Base_Url + "TPackagingInstructionLots/" + element.lot_id, {status: "SHIPPED"}).then((data)=> {
                //         swal("Posted", "Success", "success")
                //         hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/'+ 1 )
                //     }).then((data)=> {
                //
                //         //if (Lilength == index + 1) {
                //         //    swal("Posted", "Success", "success")
                //         //    hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/'+ response.data.isDomestic )
                //         //}
                //     })
                // }
                if(response.data.errors){
                EnableClick('submitContainer')
                if(response.data.errors.code == "Release Number Already Exist" || response.data.errors.code == "Booking Number Already Exist"){
                   swal(response.data.errors.code)
                   return
                }}
                else{
                    swal("Posted", "Success", "success")
                    hashHistory.push('/Shipment/shipmentDetails/'+response.data.id+'/-'+ 1 )
                }


            }).catch(function(error){
              EnableClick('submitContainer')
            })
        // }ss
        // }
        // else{
        //     swal("Posted","Success","success")
        //     hashHistory.push("/Shipment/shipmentview")
        // }


    // })




     //axios.post(Base_Url+"TShipmentents/createShipMentEntry",this.Allobjs)
     //    .then((response) => {
     //            ;
     //
     //    }).then((response) => {
     //
     //        swal("Posted","Success","success")
     //        hashHistory.push("/Shipment/shipmentview")
     //    })



     this.DomesticCarearobj = {}
     this.Address = {}


     //  }



 }

    onCancel(e){
        windoew.location.reload()
    }

    handlebagsToShip(e){

        this.comPo.bagsToShip = e.target.value
        console.log("bagsToShip",this.LIobj)
    }


    render() {
    var location = _.map(this.state.location,(location,index) =>
        {
            return <option key = {index} id = {location.id} value = {location.id}>{location.locationName}</option>
        })
        var Shipment = _.map(this.state.ShipmentType,(Shipment) =>
        {
            return <option key={Shipment.id} id = {Shipment.id} value={Shipment.id}>{Shipment.shipmentType}</option>
        })
        var customers = _.map(this.state.customer,(customer) =>
        {
            return <option key = {customer.id} id = {customer.id} value={customer.id}>{customer.name}</option>
        })
         var poNumber = _.map(this.state.poNumber,(poNum,index)=>{
            return <option key = {index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>
        })
        var containerType = _.map(this.state.containerType,(contType,index) => {
            return <option key = {index} id = {contType.id} value = {contType.id}>{contType.name}</option>
        })
        var steamShipLine = _.map(this.state.steamShipLine,(steamShip,index) => {
            return <option key = {index} id = {steamShip.id} value = {steamShip.id}>{steamShip.name}</option>
        })
        var paymentType = _.map(this.state.paymentType,(pType,index)=>{
            return <option key = {index} id = {pType.id} value = {pType.id}>{pType.type}</option>
        })
        if(this.state.lotNumber){
            console.log(this.state.lotNumber[0].TPackagingInstructionLots)


    }
               return (

<Loader loaded={this.state.loaded}>
            <section className="shipment_edit">
                <div className="container">
                    <div className="row">
                        <form className="form-horizontal">
                            <div className=" col-lg-6  col-sm-6 col-xs-12">


                                <fieldset className="scheduler-border no-right-border">
                                    <legend className="scheduler-border">Shipment Info</legend>

                                    <div className="form-group">
                                        <label htmlFor="customer_name"
                                               className={this.state.errors.customerId ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Customer Name
                                            </label>

                                        <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                            <select
                                                className="form-control"
                                                id="customer_name"
                                                name="customer_id"
                                                onChange={this.handleSIChange}
                                                defaultValue = ""
                                                >
                                                <option value="" disabled >Customer Name</option>
                                                {customers}
                                            </select>


                                        </div>
                                    </div>
                                     <div className="form-group">
                                        <label htmlFor="location_name"
                                               className={this.state.errors.locationId? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Location
                                            </label>

                                        <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                            <select
                                                className="form-control"
                                                id="location_id"
                                                name="location_id"
                                                onChange={this.handleSIChange}
                                                defaultValue = ""
                                                >
                                                <option value="" disabled>Location</option>
                                                {location}
                                            </select>


                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ar_bulk_location"
                                               className={this.state.errors.releaseNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Release
                                            #</label>

                                        <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                            <input type="text"
                                                   className="form-control"
                                                   id="Release #"
                                                   placeholder="Release #"
                                                   name="releaseNumber"
                                                   onChange={this.handleSIChange}
                                                />

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Purchase_Order"
                                               className={this.state.errors.numberOfContainers ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}># Containers</label>

                                        <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                            <input type="text"
                                                   className="form-control"
                                                   id="No. of Containers"
                                                   placeholder="# Containers"
                                                   name="numberOfContainers"
                                                   onChange={this.handleSIChange}
                                                   value={this.state.noofContainers}
                                                   type="number"

                                                />

                                            <div className="error"><span>{this.state.errors.numberOfBags}</span></div>
                                        </div>
                                    </div>
                                    {
                                        /*
                                        <div className="form-group">
                                            <label htmlFor="Purchase_Order"
                                                   className={this.state.errors.numberOfBags? "col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label has error":"col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"}>No.
                                                of
                                                Bags</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="No. of Bags"
                                                       placeholder="No. of Bags"
                                                       name="numberOfBags"
                                                       onChange={this.handleSIChange}
                                                       value={this.state.noofbags}
                                                       type="number"


                                                    />

                                                <div className="error"><span>{this.state.errors.numberOfBags}</span>
                                                </div>
                                            </div>
                                        </div>
                                   */ }
                                </fieldset>


                                <fieldset className="scheduler-border no-right-border">
                                    <legend className="scheduler-border">Material Info</legend>


                                    <div className="form-group ">
                                        <label htmlFor="Rail_Car_Number"
                                               className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label pr-0">Purchase
                                            Order #</label>

                                        <div className="col-lg-7  col-sm-11  col-xs-11 pr-0">
                                            <select className="form-control"
                                                    id="po_number"
                                                    name="po_number"
                                                    onChange={this.handleMIChange}
                                                    defaultValue = "">
                                                    <option value="" disabled >Purchase Order #</option>
                                                    {this.poNumber}

                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                            <i className="fa-2x fa fa-plus base_color hidden" aria-hidden="true" onClick={this.onAdd}></i>
                                        </div>

                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="Weight"
                                               className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Lot
                                            #</label>

                                        <div className="col-lg-7  col-sm-11 col-xs-11 ">
                                            <select
                                                className="form-control"
                                                id="lot_Number"
                                                ref="Lot"
                                                name="lot_id"
                                                onChange = {this.handleLIChange}
                                                defaultValue = ""
                                                >
                                                 <option value="" disabled>Lot Number</option>
                                                {this.lotNumber}
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                            <i className="fa-2x fa fa-plus base_color" onClick={this.onLotAdd} aria-hidden="true" ></i>
                                        </div>

                                    </div>

                                    <div className="form-group ">
                                        <label htmlFor="Bags_To_Ship"
                                               className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Bags To Ship</label>

                                        <div className="col-lg-7  col-sm-11  col-xs-11">
                                            <input type = "number" className="form-control"
                                                   id="bags_to_ship"
                                                   name="bags_to_ship"
                                                   placeholder = "Bags To Ship"
                                                   onChange={this.handlebagsToShip.bind(this)}
                                                   defaultValue = ""/>



                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>




                                    <div className="form-group">
                                         <label htmlFor="Lot_Number"
                                                className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label" ># Bags
                                             for Lot</label>

                                         <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                          <span style = {{color: "red"}}>{this.inInventoryBags ? this.inInventoryBags : '0'}</span>


                                             <div className="error"><span></span></div>
                                         </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                            {this.state.materialInfoList.length> 0 ? <i className="fa-2x fa fa-minus base_color" onClick={this.onMinus} aria-hidden="true"></i> : null}

                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">

                                            {this.state.lotInfoList.length> 0 ? <i className="fa-2x fa fa-minus base_color" onClick={this.onLotMinus} aria-hidden="true"></i> : null}
                                        </div>

                                    </div>

                                    {this.state.materialInfoList}

                                    {this.state.lotInfoList}


                                </fieldset>
                            </div>

                            <div className=" col-lg-6  col-sm-6 col-xs-12">

                                <ul className="nav nav-pills nav-justified tab-bg text-uppercase tab-width" id="tabs">
                                    <li className=""><a data-target="#Domestic"  name="Domestic" onClick={(e) => this.handleOptionChange(e)}  data-toggle="tab">Domestic / Canadian
                                        Options</a></li>
                                    <li className="active"><a data-target="#International" name="International" onClick={(e) => this.handleOptionChange(e)} data-toggle="tab">International
                                        Options</a></li>
                                </ul>

                                <div className="tab-content customtabContent">
                                    <fieldset className="scheduler-border  tab-pane active" id="International">
                                        <div className="form-group ">
                                            <label htmlFor="Material"
                                                   className={this.state.errorsI.bookingNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Booking
                                                #</label>

                                            <div className="col-lg-7  col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="Material"
                                                       placeholder="Booking #"
                                                       name="bookingNumber"
                                                       onChange={this.InternationalChange}
                                                    />

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Origin"
                                                   className={this.state.errorsI.freightForwarder ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Freight
                                                Forwarder</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="Material"
                                                       placeholder="Freight Forwarder"
                                                       name="freightForwarder"
                                                       onChange={this.InternationalChange}
                                                    />

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Type_of_Packaging"
                                                   className={this.state.errorsI.containerTypeId ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Container
                                                Type</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <select className="form-control"
                                                        id="Type_of_Packaging"
                                                        name="containerTypeId"
                                                        onChange={this.InternationalChange}
                                                        defaultValue = ""
                                                    >
                                                        <option disabled value = "">Select</option>
                                                        {containerType}
                                                  </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Type_of_Bag"
                                                   className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Steamship
                                                Line</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <select className="form-control"
                                                        id="Type_of_Bag"
                                                        name="steamshipLineId"
                                                        onChange={this.InternationalChange}
                                                        defaultValue = ""
                                                        >
                                                        <option disabled value = "">Select</option>
                                                        {steamShipLine}

                                                </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Type_of_Pallet"
                                                   className={this.state.errorsI.steamshipVessel ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Vessel
                                                   </label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="SteamshipVessel"
                                                       placeholder="Steamship Vessel"
                                                       name="steamshipVessel"
                                                       onChange={this.InternationalChange}

                                                    />

                                                <div className="error"><span></span></div>

                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Earliest_Return_Date"
                                                   className={this.state.errorsI.EarliestReturnDate ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Earliest
                                                Return Date</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                       aria-hidden="true"></i>
                                                <DateField
                                                className = "form-control"
                                                dateFormat="MM-DD-YYYY"
                                                forceValidDate={true}
                                                updateOnDateClick={true}
                                                collapseOnDateClick={true}
                                                defaultValue={1486619937042}
                                                showClock={false}
                                                onChange={this.InternationalReturnDate}
                                                selected={this.state.EarliestReturnDate}
                                                >
                                                    <DatePicker
                                                        className = "form-control"
                                                        navigation={true}
                                                        locale="en"
                                                        highlightToday={true}
                                                        forceValidDate={true}
                                                        footer={false}
                                                        selected={this.state.internationalEarliestReturnDate}/>
                                              </DateField>
                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Stretch_wrap"
                                                   className={this.state.errorsI.DocCutoffDate ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Doc Cutoff Date/Time
                                            </label>

                                            <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                            <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                   <DateField
                                     className = "form-control"
                                     dateFormat="MM-DD-YYYY HH:mm"
                                     forceValidDate={true}
                                     updateOnDateClick={true}
                                     collapseOnDateClick={true}
                                     defaultValue={1486619937042}
                                     showClock={false}
                                     onChange={this.DocCutOffDate}
                                     selected={this.state.DocCutoffDate}
                                   >
                                     <DatePicker
                                       className = "form-control"
                                       navigation={true}
                                       locale="en"
                                       forceValidDate={true}
                                       highlightToday={true}
                                       footer={false}
                                       selected={this.state.DocCutoffDate}
                                     />
                                   </DateField>

                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="Stretch_wrap"
                                                   className={this.state.errorsI.CargoCutoffDate ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Cargo
                                                Cutoff Date</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                       aria-hidden="true"></i>
                                             <DateField
                                               className = "form-control"
                                               dateFormat="MM-DD-YYYY HH:mm"
                                               forceValidDate={true}
                                               updateOnDateClick={true}
                                               collapseOnDateClick={true}
                                               defaultValue={1486619937042}
                                               showClock={false}
                                               onChange={this.InternationalCargoDate}
                                               selected={this.state.InternationalCargoDate}
                                             >
                                                    <DatePicker
                                                        className = "form-control"
                                                        navigation={true}
                                                        locale="en"
                                                        highlightToday={true}
                                                        forceValidDate={true}
                                                        footer={false}
                                                    />
                                            </DateField>
                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Stretch_forwrap" className={this.state.errorsI.freeDaysPerContainer ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}># of
                                                Free Days per Container</label>

                                            <div className="col-lg-7   col-sm-11 col-xs-11 ">

                                                <input type="number" className="form-control" id="" name="freeDaysPerContainer"  onChange={this.InternationalChange} placeholder="# of Free Days per Container"/>

                                                <div className="error"><span>{this.state.errorsI.freeDaysPerContainer}</span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Stretch_wrap"
                                                   className={this.state.errorsI.containerPickupLocation ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Container
                                                Pick Up Location</label>

                                            <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                       name="containerPickupLocation" placeholder="Container Pick Up Location" onChange={this.InternationalChange}/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Stretch_wrap"
                                                   className={this.state.errorsI.containerReturnLocation ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Container
                                                Return Location</label>

                                            <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                       name="containerReturnLocation"  placeholder="Container Return Location" onChange={this.InternationalChange}/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="No_of_Bages_Pallat"
                                                   className={this.state.errorsI.notes ? "col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label has error":"col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"}>Notes</label>

                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                                <textarea className="form-control textarea-entry" rows="3"
                                                          name="notes" id="Notes" onChange={this.InternationalChange}></textarea>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                    </fieldset>


                                    <fieldset className="scheduler-border tab-pane " id="Domestic">
                                     <div className="form-group ">
                                        <label for="" className={this.state.errorsd.bookingNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Booking #</label>
                                        <div className="col-lg-7  col-sm-11 col-xs-11 ">
                                          <input type="text"
                                           className="form-control"
                                            id=""
                                            placeholder="Booking #"
                                            name = "bookingNumber"
                                            onChange={this.DomesticChange}
                                            />
                                         <div className="error"><span></span></div>
                                                 </div>
                                                 </div>
                                        <div className="form-group ">
                                            <label htmlFor="Material"
                                                   className={this.state.errorsd.typeOfShipment ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Type of
                                                Shipment</label>

                                            <div className="col-lg-7  col-sm-11 col-xs-11 ">
                                                <select className="form-control" id="Type_of_Packaging"
                                                        name="typeOfShipment"
                                                        onChange={this.DomesticChange}
                                                        defaultValue = ""
                                                    >
                                                    <option value="" disabled >Type of Shipment</option>
                                                    {Shipment}
                                                </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Origin"
                                                   className={this.state.errorsd.shippingReferenceNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Shipping
                                                Ref #</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id=""
                                                       placeholder="Shipping Ref #"
                                                       name="shippingReferenceNumber"
                                                       onChange={this.DomesticChange}

                                                    />

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="Type_of_Bag"
                                                   className={this.state.errorsd.recipent ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Reciepient</label>

                                            <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="" placeholder="Reciepient"
                                                       name="recipent"
                                                       onChange={this.DomesticChange}

                                                    />

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="No_of_Bages_Pallat"
                                                   className={this.state.errorsd.recipentContact ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Reciepient
                                                Contact</label>

                                            <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                <input type="text"
                                                       className="form-control"
                                                       id="No_of_Bages_Pallat"
                                                       placeholder="Recipent Contact"
                                                       name="recipentContact"
                                                       onChange={this.DomesticChange}
                                                    />

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                             <label htmlFor="Type_of_Packaging"
                                                    className={this.state.errorsd.recipentTelNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Reciepient Telephone
                                             </label>

                                             <div className="col-lg-7 col-sm-11 col-xs-11 ">
                                                 <input type="text"
                                                        className="form-control"
                                                        id=""
                                                        placeholder="Reciepient Telephone"
                                                        name="recipentTelNumber"
                                                        onChange={this.DomesticChange}


                                                     />

                                                 <div className="error"><span>{this.state.errorsd.recipentTelNumber ? this.state.errorsd.recipentTelNumber : '' }</span></div>
                                             </div>
                                         </div>


                                        <div className="pddn-30-top">

                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                                                    to Address</label>

                                                <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Ship to Address"
                                                           name="shippingAddress"
                                                           onChange={this.DomesticChange1}

                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>
                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                                    <i className="fa-2x fa fa-plus base_color hidden" aria-hidden="true" onClick={this.onAdd1}></i>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                 <label htmlFor="Stretch_wrap"
                                                        className={this.zipError ?  "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error" :"col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label"}>Ship
                                                     to Zip Code</label>

                                                 <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                     <input
                                                     type = "number"
                                                      maxlength = "3"
                                                            className="form-control"
                                                            id="No_of_Bages_Pallat"
                                                            placeholder="Ship to Zip Code"
                                                            name="zipCode"

                                                            onChange={this.DomesticChange1}
                                                         />


                                                 </div>
                                                {this.state.DomesticInfoList.length> 0 ? <i className="fa-2x fa fa-minus base_color" onClick={this.onDomesticShipMinus} aria-hidden="true"></i> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                                                    to City</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Ship to City"
                                                           name="shippingCity"
                                                           onChange={this.DomesticChange1}
                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                                                    to State</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Ship to State"
                                                           name="shippingState"
                                                           onChange={this.DomesticChange1}

                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                            {this.state.DomesticInfoList}

                                        </div>

                                        <div className="pddn-30-top">

                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className={this.state.errorsd.carrier ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Carrier</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Carrier"
                                                           name="carrier"
                                                           onChange={this.DomesticChange}
                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>

                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className={this.state.errorsd.carrierAcNumber ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Carrier
                                                    Account #</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Carrier Account #"
                                                           name="carrierAcNumber"
                                                           onChange={this.DomesticChange}

                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className={this.state.errorsd.paymentTypeId ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Shipping
                                                    Payment Type</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <select className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Shipping Payment Type"
                                                           name="paymentTypeId"
                                                           onChange={this.DomesticChange}
                                                           defaultValue = ""
                                                           >
                                                           <option value="" disabled >Payment Type</option>
                                                           {paymentType}
                                                           </select>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="Stretch_wrap"
                                                       className={this.state.errorsd.paidBy ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Shipping
                                                    Paid By</label>

                                                <div className="col-lg-7   col-sm-11 col-xs-11 ">
                                                    <input type="text"
                                                           className="form-control"
                                                           id="No_of_Bages_Pallat"
                                                           placeholder="Shipping Paid By"
                                                           name="paidBy"
                                                           onChange={this.DomesticChange}
                                                        />

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="No_of_Bages_Pallat"
                                                       className={this.state.errorsd.RequestedShipDate ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Requested
                                                    Ship Date</label>

                                                <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                    <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                           aria-hidden="true"></i>
                                                        <DatePicker
                                                            dateFormat="MM-DD-YYYY"
                                                            selected={this.state.RequestedShipDate}
                                                            value={this.state.RequestedShipDate}
                                                            name="requestedShipDate"
                                                            onChange={this.RequestedShipDate} placeholderText="Requested Ship Date"/>
                                                    </div>
                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="No_of_Bages_Pallat"
                                                       className={this.state.errorsd.RequestedDeliveryDate ? "col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label has error":"col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label"}>Requested
                                                    Delivery Date</label>

                                                <div className="col-lg-7    col-sm-11 col-xs-11 ">
                                                    <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                                        <DatePicker
                                                            dateFormat="MM-DD-YYYY"
                                                            selected={this.state.RequestedDeliveryDate}

                                                            name="requestedDeliveryDate"
                                                            onChange={this.RequestedDeliveryDate}placeholderText="Requested Delivery Date"/>
                                                    </div>
                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>



                                        </div>

                                    </fieldset>


                                </div>


                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pddn-30-btm padding-top-btm-xs">
                                <div className="pull-left margin-10-last-l">
                                    <button type="button" className="btn  btn-orange text-uppercase" id="submitContainer" onClick={this.onSubmitContainer}>Save  Allocate
                                        Container
                                    </button>
                                </div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" className="btn  btn-primary text-uppercase" id="submit" onClick = {this.onSubmit}>Save</button>
                                </div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" className="btn  btn-gray text-uppercase" onClick={this.onCancel}>Cancel</button>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>


            </section>
</Loader>
        )
    }
}
export default ShipmentEntryForm;
