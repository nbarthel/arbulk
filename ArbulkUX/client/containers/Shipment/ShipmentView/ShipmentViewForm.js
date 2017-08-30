import React from 'react';

import '../../../public/stylesheets/sweetalert.css';
import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router';
import ShipmentViewDataComponent from '../../../components/ShipmentViewDataComponent/ShipmentViewDataComponent'
import FilterComponent from '../../../components/ShipmentFilterComponent';
import FilterButton from '../../../components/ShipmentFilterComponent/FilterButton';
import ShowHideColumn from '../../../components/ShowColumns/showColumn'
import axios from 'axios'
import sweetalert from 'sweetalert-react'
import {Base_Url} from '../../../constants';
var moment = require('moment')
//import './moment.js'
class  ShipmentViewForm extends React.Component
{
    constructor(props){
        super(props);
        this.state= {  viewData : '',
                key : 0,
                index : 0,
            startDate: null,
            endDate : null,
   		      showARB:"",
           showCustomer:"",
           showPO:"",
           showRelease:"",
           showLot:"",
           showMaterial:"",
           showConfmd:"",
           showBooking:"",
           showShipmentType:"",
           showCutoff:"",
           showForwarder:"",
           showCntrSize:"",
           showInInvt:"",
           showQty:"",
           showAlloc:"",
           showEno:"",
           showBags:"",
           showERD:"",
           showVessel:"",
           showSteamShip:"",
           showPU: "",
           showRet: "",
           showDoc: "",
           showStatus: "",
           showTrucker: "",
            SelcetedOptionForGroupBy :"",
            OptionToGroupby : ["ARB","customer","Release","Booking","PO#","Lot#","Material","Forwarder","Cntr Size","Qty","Allocated","Enough?","Vessel","Shipment Type","Steamship Line","PULocation","Return Location","Status"],
            open: false,
            locationSelected:[],
            customerSelected:[],
            selectedPO:'',
            selectedRelease:'',
            selectedshipType:-1,
            SelectedCutOffDate:[],
            statusSelected:[],
            viewId:''
    }
            this.status
            this.handleChange = this.handleChange.bind(this);
            this.handleChange1 = this.handleChange1.bind(this);
            this.buttonDisplay = [ ]
            this.checkedCustomer = [ ]
            this.checkedStatus = [ ]
            this.checkedCompany = [ ]
            this.Query = {}
            this.Where = { }
            this.qArray = []
            this.selected = null
            this.piID = null
		     this.conFirmID = null
             this.ShipmentType = this.ShipmentType.bind(this)
             this.getDates = this.getDates.bind(this)
            this.onClickli = this.onClickli.bind(this)
            this.onClickPo = this.onClickPo.bind(this)
            this.lotSearch = this.lotSearch.bind(this)
            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
            this.onButtonRemove = this.onButtonRemove.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            this.saveView = this.saveView.bind(this)
            this.handleTextChange = this.handleTextChange.bind(this)
            this.viewChange = this.viewChange.bind(this)
            this.checkboxChange = this.checkboxChange.bind(this)
            this.qArray = []
            this.addToQueue = this.addToQueue.bind(this)
            this.tempLotId = ""
            this.PrintElem = this.PrintElem.bind(this)
            this.headerCheckboxChange = this.headerCheckboxChange.bind(this)
            this.OnGroupBy = this.OnGroupBy.bind(this)
            this.toggleColumn = this.toggleColumn.bind(this)
            this.handleOpen = this.handleOpen.bind(this)
            this.handleClose = this.handleClose.bind(this)
            this.removeState = this.removeState.bind(this)
    }
    OnGroupBy(e){
        this.setState({
            SelcetedOptionForGroupBy : e.target.value
        })
        this.forceUpdate()
    }

    //allocateContainer(e){
    //    console.log(e);
    //    hashHistory.push('/Container/containerarrivalentry')
    //}
    headerCheckboxChange(e, data) {
      if(e.target.checked){
          this.conFirmID = e.target.value
          this.selected = e.target.id
        //  this.confId = data.id
          // this.tempLotId = data.piLotsId
      }
      else if(!e.target.checked){
          this.selected = null
      //    this.confId = null
          this.selected = null
          this.conFirmID = null
        //  this.tempLotId = null
          //this.piID = null

      }
        //console.log("--->selected", this.selected);
        //console.log("--->confId", this.conFirmID);
        // console.log("--->tempLotId",this.tempLotId);

    }
    onConfirmClick(e){

        if( this.confId != undefined && this.confId != null){

            if(this.status == "UNCONFIRMED"){
                hashHistory.push('/Shipment/shipmentConfirmation/'+this.confId)
            }

            else{
                swal("Error","Please select unconfirmed order.","error")
            }
        }
        else
        {

            swal("Selection Missing", "Please select a shipment lot.","error")
        }

    }

onViewClick(e){

      if(this.conFirmID != null || undefined){
          hashHistory.push('/Shipment/shipmentDetails/'+this.conFirmID+'/'+this.tempLotId+'/'+1+'/');
    }else{
      swal("Selection Missing","Please select a shipment lot.","info")
    }
}

 componentWillMount() {
     var userId = Number(localStorage.getItem("userId"));
     axios.get(Base_Url+"TCustomViews").then(response=>{
         this.setState({
             savedViews : response.data
         })
     });
     axios.get(Base_Url+"TShipmentLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
});
     axios.get(Base_Url+`TColumnShowHides?filter={"where":{"tableName":"Shipment","userId":${userId}}}`).then(response=>{
         this.setState({
             columns:response.data
         })
         for(var i=0;i<response.data.length;i++){
             this.toggleColumn(response.data[i].columnName,response.data[i].show);
         }
     })
 }
 PrintElem(elem)
{
    var mywindow = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=100,toolbars=no,scrollbars=yes,status=no,resizable=yes,');
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
   // mywindow.document.write('<link rel="stylesheet" href={../../../public/stylesheets/style.css} type="text/css" />');
    mywindow.document.write('</head><body ><table border="0" width="10">');
    mywindow.document.write(document.getElementById('Packaging_Instruction_View').innerHTML);
    mywindow.document.write('</table></body></html>');
     
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true

    //window.location.reload()
}
PrintScreen(){
  var scrollLeft = document.getElementsByClassName("loadedContentNew")[0].scrollLeft
  document.getElementsByClassName('pos-relative-b')[0].style.display = 'none'
  document.getElementsByClassName('filter-btn')[0].style.display = 'none'
  document.getElementById("nonPrintable").style.display = "none"
  document.getElementById("row").style.display = "none"
  document.getElementById("hide1").style.display = "none"
  document.getElementById("hide2").style.display = "none"
  document.getElementById("hide3").style.display = "none"
  document.getElementById("hide4").style.display = "none"
  document.getElementById("hide5").style.display = "none"
  document.getElementById("customer_name").style.display = "none"
  document.getElementsByClassName("loadedContentNew")[0].style.cssText=""
  document.getElementsByClassName("loadedContentNew")[0].style.height="100%"
  document.getElementsByClassName("loadedContentNew")[0].style.maxHeight="100%"
  document.getElementsByClassName("loadedContentNew")[0].scrollLeft = scrollLeft
  var printContent = document.getElementById('Packaging_Instruction_View').innerHtml
  document.body.innerHtml = printContent
  window.print()
  window.location.reload()
}

    checkboxChange(e,value,data){


        if(e.target.checked){
            this.conFirmID = e.target.value
            this.selected = e.target.id.split(":")[0]
            this.confId = data.id
            if(value.isDomestic== 0){
                this.status = value.TShipmentInternational[0].status;
                // this.confId = value.TShipmentInternational[0].id
            }else{
                this.status = value.TShipmentDomestic[0].status;
                // this.confId = value.TShipmentDomestic[0].id
            }
            this.shipId = value.id
            this.tempLotId = data.piLotsId
        }
        else if(!e.target.checked){
            this.selected = null
            this.confId = null
            this.selected = null
            this.conFirmID = null
            this.tempLotId = null
            //this.piID = null

        }

    }
    allocateContainer(e){

        if (this.conFirmID != null || undefined) {
            hashHistory.push('/Shipment/shipmentDetails/' + this.conFirmID + '/' + this.tempLotId);
        } else {
            swal("Selection Missing", "Please select a shipment lot.", "info")
        }
    }


    addToQueue(e){

        var option = {
          "queueSequence" : parseInt(this.state.queue_Sequence[0].max_mark) +1
      }
    axios.put(Base_Url+"TShipmentLots/"+this.shipLotid ,option).then((response)=>{
        swal("Success" , "Successfully added to the queue." , 'success')
    })

    }


       onTextChange(e){
           var idValue = e.target.id
           this.Query[idValue] = e.target.value
           let Obj = ''
           if(idValue === "LotSearch"){
               Obj = {"releaseNumber":e.target.value}
               this.setState({
                   selectedRelease:Obj
               })
           }
           else{
               Obj = {"po_number":e.target.value}
               this.setState({
                   selectedPO:Obj
               })
           }
           this.onSearch(e)
        }

      onClickPo(e){

           this.Query[e.target.id] = e.target.getAttribute('value')

          document.getElementById('POSearch').value = e.target.getAttribute('value')

           this.onSearch(e)
      }

      lotSearch(e){

           this.Query[e.target.id] = e.target.getAttribute('value')

           document.getElementById('LotSearch').value = e.target.getAttribute('value')

           this.onSearch(e)
      }

onClickli(e){
  this.Query[e.target.id] = e.target.getAttribute('value')
    document.getElementById('railcarSearch').value = e.target.getAttribute('value')

}
        onCompanyFilter(e,location){
//console.log("group",e.target.checked);
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCompany})
            this.state.locationSelected.push({"locationId":e.target.id})
            // this.buttonDisplay.push(e.target.value)
            // console.log(this.checkedCompany)
            //console.log(this.props.buttonDisplay)

           }
            else if (!e.target.checked){
            let id = e.target.id
            this.checkedCompany = _.without(this.checkedCompany,id)
            this.Where.Company = this.checkedCompany
            if(Object.keys(this.Where.Company).length === 0){
              this.Where.Company = undefined
              //console.log(this.Where)
              delete this.Where.Company
             }
                let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                    this.buttonDisplay = _.without(this.buttonDisplay,value)
                for(let i =0 ;i<this.state.locationSelected.length;i++){
                    if(this.state.locationSelected[i].locationId.toString() == id.toString()){
                        this.state.locationSelected.splice(i,1);
                    }
                }

                this.forceUpdate()
            }
          this.onSearch(e)
        }
        onCustomerFilter(e,customer, isOnly){
            if(isOnly){
                let id = e.target.id.split(':')[1]
                let elements = document.getElementsByClassName('checkboxCustomer inline')
                for(let i=0;i<elements.length;i++){
                    let elem = elements[i].firstChild.firstChild;
                    elem.checked = false;
                    if(elem.id === id)
                        elem.checked = true
                }
                //will not work as 2 child components are having same id
                //document.getElementById(id).checked = true;
                this.checkedCustomer = []
                this.checkedCustomer.push(id)
                Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                    writable: true,
                    configurable:true,
                    value:this.checkedCustomer})
                this.setState({
                    customerSelected:[]
                });
                this.state.customerSelected.push(id)
            }
            else{
                if(e.target.checked){
                    this.forceUpdate()
                    this.checkedCustomer.push(e.target.id)
                    Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                        writable: true,
                        configurable:true,
                        value:this.checkedCustomer})
                    this.state.customerSelected.push(e.target.id)
                    //this.buttonDisplay.push(e.target.value)
                    //console.log(this.props.checkedCompany)
                    //console.log(this.props.buttonDisplay)
                    //console.log(this.checkedCustomer)
                }
                else if (!e.target.checked){
                    let id = e.target.id
                    this.checkedCustomer = _.without(this.checkedCustomer,id)
                    this.Where.Customer = this.checkedCustomer
                    if(Object.keys(this.Where.Customer).length === 0){
                        this.Where.Customer = undefined
                        delete this.Where.Customer
                    }
                    let value = e.target.value
                    let index = this.buttonDisplay.indexOf(e.target.value)
                    if(index !== -1)
                        this.buttonDisplay = _.without(this.buttonDisplay,value)
                    for(let i in this.state.customerSelected){
                        if(this.state.customerSelected[i] === e.target.id){
                            this.state.customerSelected.splice(i,1);
                        }
                    }
                    this.forceUpdate()
                }
            }
            this.onSearch(e)
        }
        onStatusFilter(e,status){
            debugger
            if(e.target.checked){

            this.checkedStatus.push(e.target.value);
            Object.defineProperty(this.Where,"status",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedStatus})

            // this.buttonDisplay.push(e.target.value)
            // this.forceUpdate()
            //console.log(this.props.buttonDisplay)
           /* console.log(this.Where)
            console.log(this.checkedStatus)
            console.log(this.checkedStatus.length)*/

            }
            else if (!e.target.checked){
            let value = e.target.value
            //let pos = this.checkedStatus.indexOf(e.target.value)
            this.checkedStatus = _.without(this.checkedStatus,value)
            this.Where.status = this.checkedStatus
            if(Object.keys(this.Where.status).length === 0){
              this.Where.status = undefined
              delete this.Where.status
            }

                //let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)
                //console.log(this.buttonDisplay)
                for(let i =0;i<this.state.statusSelected.length;i++){
                    if(this.state.statusSelected[i].status === e.target.value)
                        this.state.statusSelected.splice(i,1);
                }
                  this.forceUpdate()
                  }
                  this.onSearch(e)
        }
    onButtonRemove(index,button){
    this.buttonDisplay.splice(index,1)
    this.forceUpdate()

}
    removeState(){
        this.buttonDisplay = [];
        this.checkedCustomer = []
        this.checkedStatus = []
        this.checkedCompany = []
        this.Query = []
        delete this.Where.Company
        delete this.Where.Customer
        delete this.Where.status
        delete this.state.viewData
        delete this.Where.CutofFilter
        delete this.Where.shipMentType
        delete this.state.SelcetedOptionForGroupBy
        delete this.startdate
        delete this.endDate
        delete this.Where.Query
        this.setState({
            key : this.state.key +1,
            index : this.state.index +1,
            SelcetedOptionForGroupBy :"",
            locationSelected:[],
            customerSelected:[],
            selectedPO:'',
            selectedRelease:'',
            selectedshipType:-1,
            SelectedCutOffDate : [],
            statusSelected:[],
            viewId:''
        })

    }
    onRemove(e){
            this.removeState();
            document.getElementById('groupBy').selectedIndex = 0
            document.getElementById('customer_name').selectedIndex = 0
            localStorage.removeItem('siViewData')
         this.forceUpdate();

       }

    onSearch(e){
        debugger
        var cutofFilter = []
        var lotFlag = false
        var poFlag = false
        var flagForCutOfDate = false;
        if(this.startdate && this.endDate) {
            var startDate = moment(this.startdate.format('MM-DD-YYYY')),
                endDate = moment(this.endDate.format('MM-DD-YYYY'));
            var cutoffDate = this.getDates(startDate, endDate)

            var objdate = {}
            for(var j in cutoffDate){
                objdate = {"cargoCutoffDate" : cutoffDate[j]}
                cutofFilter.push(objdate)
            }
            Object.defineProperty(this.Where,"CutofFilter",{enumerable:true ,
                writable: true,
                configurable: true,
                value:cutofFilter})
            flagForCutOfDate = true

        }
       if(this.Query != undefined){
                Object.defineProperty(this.Where,"Query",{enumerable:true ,
                    writable: true,
                    configurable: true,
                    value:this.Query})
            }
          var serachObj = []
          var serachObjLots =[]
          var shipType = []
          var isDomestic
        if(this.shipMentType){
            Object.defineProperty(this.Where,"shipMentType",{enumerable:true ,
                writable: true,
                configurable: true,
                value:this.shipMentType})
        }
        if(this.Where.shipMentType && this.Where.shipMentType == "Domestic") {
            isDomestic = true
            var objShip = {"isDomestic" : 1}
            serachObj.push(objShip)
        }
        else if(this.Where.shipMentType && this.Where.shipMentType== "International"){  isDomestic = false
            var objShip = {"isDomestic" : 0}
            serachObj.push(objShip)
        }
        var customer = []
            if (this.Where != undefined && this.Where!= null)
                {
                    if(this.Where.Customer && this.Where.Customer.length >0){
                        var obj = {}
                        for(var i in this.Where.Customer){
                            obj = {"customerId" : this.Where.Customer[i] }
                            customer.push(obj);
                        }
                        serachObj.push(customer)
                    }
                    if(this.Where.Company && this.Where.Company.length > 0){
                        var company = [] ;
                        var objCompany = {}
                        for(var j in this.Where.Company)
                        {
                            objCompany = {"locationId" : this.Where.Company[j] }
                            company.push(objCompany);
                        }
                        serachObj.push(company)
                    }
                      var Railstatus = [{"status":"UNCONFIRMED"},{"staus":"CONFIRMED"},{"status":"QUEUED"},{"status":"LOADED"},{"status":"COMPLETED"}];

                    if(this.Where.status && this.Where.status.length){
                        Railstatus = [];
                        var objStatus = {};
                        for(var z in this.Where.status){
                            objStatus = {"status" : this.Where.status[z]}
                            Railstatus.push(objStatus)
                        }
                         serachObjLots.push(Railstatus)
                    }

                    var poSearch = {}
                    var railSearch = {}
                    var lotSearch = {}

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
                        poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                        serachObj.push(poSearch)
                        poFlag = true
                    }
                    else{
                      poSearch =  [ {'po_number': {"like": "%" + "%"}}]
                      serachObj.push(poSearch)
                    }

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                         railSearch = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
                         serachObjLots.push(railSearch)
                    }


                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                        var lotSearch =  [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                        serachObj.push(lotSearch)
                        lotFlag = true
                    }
                    else{
                      var lotSearch =  [{'releaseNumber': {"like": "%"  + "%"}}]
                      serachObj.push(lotSearch)
                    }

                     serachObj = [].concat.apply([], serachObj);
                      serachObjLots = [].concat.apply([], serachObjLots);

                      var PIview = createDataLoader(ShipmentViewForm,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{
                                                  "relation":"TPackagingInstructions",
                                                  "scope":{"include":["TLocation"]}
                                                }
                   ]
        }
      }]
    })
       var base = 'TShipmentents';

                     if(this.Where.CutofFilter && this.Where.CutofFilter.length > 0){

                        this.url = PIview._buildUrl(base, {

                            include : ["TLocation" ,"TContainerAllocation", "TCompany" ,

                                                                 {"relation" : "TContainerDomestic",
                                                                                "scope":{"include" : "TCompany"}
                                                                 },

                                                                 {"relation" : "TContainerInternational",
                                                                               "scope":{"include" : "TCompany"}
                                                                 },
                                                                 {
                                                                  "relation" :"TShipmentDomestic",
                                                                  "scope":{"include":"TShipmentType",
                                                                  "where":{"or":Railstatus,"active":1}}
                                                                 },
                                                                 {
                                                                  "relation" :"TShipmentInternational",
                                                                  "scope":{
                                                                            "include":["TSteamshipLine","TContainerType"],
                                                                            "where" : {"and":[{"cargoCutoffDate":
                                                                                                                  {
                                                                                                                      "between" : [new Date(cutofFilter[0].cargoCutoffDate),new Date(cutofFilter[cutofFilter.length-1].cargoCutoffDate)]
                                                                                                                  }
                                                                                              },
                                                                                              {
                                                                                                  "or":Railstatus
                                                                                              },{"active":1}]

                                                                                      }
                                                                         }
                                                                  },
                                                                  {
                                                                      "relation": "TShipmentLots",
                                                                      "scope":{
                                                                                "include":["TPackagingInstructionLots",{
                                                                                                                          "relation":"TPackagingInstructions",
                                                                                                                          "scope":{"where":{"and":[
                                                                                                                                                    {"or":poSearch}
                                                                                                                                                  ]
                                                                                                                                           }
                                                                                                                                  }
                                                                                                                       }
                                                                                          ],
                                                                                "where":{"active":"1"}
                                                                              }
                                                                  }
                                      ],
                            where: {"and":[
                                           {"or":customer},
                                           {"or":company},
                                           {"active":1}
                                          ]
                                   }

                        });
                    }


                  else if(serachObjLots && serachObjLots.length > 0){

                       this.url = PIview._buildUrl(base, {

                           include : ["TLocation" ,"TContainerAllocation", "TCompany" ,
                                                                {
                                                                  "relation" : "TContainerDomestic",
                                                                   "scope":{"include" : "TCompany"}
                                                                },

                                                                {
                                                                  "relation" : "TContainerInternational",
                                                                  "scope":{"include" : "TCompany"}
                                                                },

                                                                {
                                                                  "relation" :"TShipmentDomestic",
                                                                  "scope":{"include":"TShipmentType",
                                                                  "where":{"or":serachObjLots,"active":1}}
                                                                },

                                                                {
                                                                  "relation" :"TShipmentInternational",
                                                                  "scope":{"where" : {
                                                                                        "or" : serachObjLots,"active":1
                                                                                      },
                                                                  "include":["TSteamshipLine","TContainerType"]}
                                                                },

                                                                {
                                                                    "relation": "TShipmentLots",
                                                                    "scope":{
                                                                              "include":["TPackagingInstructionLots",{
                                                                                                                        "relation":"TPackagingInstructions",
                                                                                                                        "scope":{"where":{"and":[
                                                                                                                                                  {"and":poSearch}
                                                                                                                                                ]
                                                                                                                                         }
                                                                                                                                }
                                                                                                                     }
                                                                                        ],
                                                                              "where":{"active":"1"}
                                                                            }
                                                                }
                                    ],
                           where: {"and":[
                             {"or":customer},
                             {"or":company},
                             {"or":serachObjLots}
                           ]}


                       });
                   }

                    else {
                      if(objShip==undefined)
                        {
                          this.url = PIview._buildUrl(base, {
                            include: ["TLocation","TContainerAllocation","TCompany",
                                                              {
                                                                  "relation" : "TContainerDomestic",
                                                                  "scope":{"include" : "TCompany"}
                                                              },

                                                              {
                                                                  "relation" : "TContainerInternational",
                                                                  "scope":{"include" : "TCompany"}
                                                              },
                                                              {
                                                                  "relation": "TShipmentDomestic",
                                                                  "scope": {"include": ["TShipmentType"],
                                                                  "where":{"or":Railstatus,"active":1}}
                                                              },

                                                              {
                                                                  "relation": "TShipmentInternational",
                                                                  "scope": {"include": ["TSteamshipLine","TContainerType"],
                                                                  "where":{"or":Railstatus,"active":1}}
                                                              },

                                                              {
                                                                  "relation": "TShipmentLots",
                                                                  "scope":{
                                                                            "include":["TPackagingInstructionLots",{
                                                                                                                      "relation":"TPackagingInstructions",
                                                                                                                      "scope":{"where":{"and":[
                                                                                                                                                {"and":poSearch}
                                                                                                                                              ]
                                                                                                                                       }
                                                                                                                              }
                                                                                                                   }
                                                                                      ],
                                                                            "where":{"active":"1"}
                                                                          }
                                                              }
                                    ]
                                    ,
                            where: {
                              //"active":1
                              "and":[
                              {"or":customer},
                              {"or":company},
                              {"or":lotSearch}
                            ]
                          }
                        });
                      }
                      else if(objShip.isDomestic==0){
                        this.url = PIview._buildUrl(base, {
                          include: ["TLocation", "TContainerAllocation", "TCompany",
                                                            {
                                                                "relation" : "TContainerDomestic",
                                                                "scope":{"include" : "TCompany"}
                                                            },

                                                            {
                                                                "relation" : "TContainerInternational",
                                                                "scope":{"include" : "TCompany"}
                                                            },

                                                            {
                                                                "relation": "TShipmentDomestic",
                                                                "scope": {"include": ["TShipmentType"],"where":{"or":Railstatus,"active":1}}
                                                            },

                                                            {
                                                                "relation": "TShipmentInternational",
                                                                "scope": {"include": ["TSteamshipLine","TContainerType"],"where":{"or":Railstatus,"active":1}}
                                                            },

                                                            {
                                                                "relation": "TShipmentLots",
                                                                "scope":{
                                                                          "include":["TPackagingInstructionLots",{
                                                                                                                    "relation":"TPackagingInstructions",
                                                                                                                    "scope":{"where":{"and":[
                                                                                                                                              {"and":poSearch}
                                                                                                                                            ]
                                                                                                                                     }
                                                                                                                            }
                                                                                                                 }
                                                                                    ],
                                                                          "where":{"active":"1"}
                                                                        }
                                                            }
                                   ],
                          where: {"and":[
                            {"or":customer},
                            {"or":company},
                            {"or":lotSearch},
                            {"isDomestic":0}
                          ]}


                      });
                      }
                      else{
                        this.url = PIview._buildUrl(base, {
                          //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                          include: ["TLocation", "TContainerAllocation", "TCompany",
                                                                          {
                                                                              "relation" : "TContainerDomestic",
                                                                              "scope":{"include" : "TCompany"}
                                                                          },

                                                                          {
                                                                              "relation" : "TContainerInternational",
                                                                              "scope":{"include" : "TCompany"}
                                                                          },

                                                                          {
                                                                              "relation": "TShipmentDomestic",
                                                                              "scope": {"include": ["TShipmentType"],"where":{"or":Railstatus,"active":1}}
                                                                          },

                                                                          {
                                                                              "relation": "TShipmentInternational",
                                                                              "scope": {"include": ["TSteamshipLine","TContainerType"],"where":{"or":Railstatus,"active":1}}
                                                                          },
                                                                          {
                                                                              "relation": "TShipmentLots",
                                                                              "scope":{
                                                                                        "include":["TPackagingInstructionLots",{
                                                                                                                                  "relation":"TPackagingInstructions",
                                                                                                                                  "scope":{"where":{"and":[
                                                                                                                                                            {"and":poSearch}
                                                                                                                                                          ]
                                                                                                                                                   }
                                                                                                                                          }
                                                                                                                               }
                                                                                                  ],
                                                                                        "where":{"active":"1"}
                                                                                      }
                                                                          }
                        ],
                          where: {"and":[
                            {"or":customer},
                            {"or":company},
                            {"or":lotSearch},
                            {"isDomestic":1}
                          ]}


                      });
                      }
                    }
      $.ajax({
            url: this.url,
            success:function(data){
              var i =0,
                  st = this.startDate,
                  ed = this.endDate,
                  flagToDecideIncrement = true

              if(poFlag){
                while(poFlag){
                  if(i<data.length && data[i].TShipmentLots.length > 0 && data[i].TShipmentLots[0].TPackagingInstructions==undefined ){
                    data.splice(i,1)
                  }
                  else if(i>=data.length-1){
                    poFlag = false;
                  }
                  else{
                    i++
                  }
                }
              }
              i = 0
              if(lotFlag){
                while(lotFlag){
                  if(i<data.length && data.length > 0 && !data[i].releaseNumber.toUpperCase().includes(this.Where.Query.LotSearch.toUpperCase())){
                    data.splice(i,1)
                  }
                  else if(i>=data.length-1){
                    lotFlag = false;
                  }
                  else{
                    i++
                  }
                }
              }
              i=0
              while(i<data.length && flagForCutOfDate){
                flagToDecideIncrement = true
                if(i<data.length && data.length>0 && data[i].TShipmentInternational.length <1){
                  data.splice(i,1)
                  i= i==0?0:i-1
                  flagToDecideIncrement = false
                }
                else{
                  var date = new Date(data[i].TShipmentInternational[0].cargoCutoffDate)
                  if(date > new Date(ed) || date < new Date(st)){
                    data.splice(i,1)
                    i= i==0?0:i-1
                    flagToDecideIncrement = false
                  }
                }
                if(flagToDecideIncrement){
                  i++
                }
              }


                localStorage.setItem('siViewData', JSON.stringify(data));
               this.setState(
                   {
                       viewData : data,
                       loaded:true
                   }
               )


            }.bind(this)
        })



    }

}

  handleTextChange(e){
        this.setState({
            Text  : e.target.value
        })

    }

   saveView(e){
       const tempThis = this
       for(let props in tempThis.Where.Query){
           tempThis.Where[props] = tempThis.Where.Query[props]
       }
       for(let props in tempThis.Where.Query){
           var obj = {[props]:tempThis.Where.Query[props]}
           tempThis.Where.Query[props] = tempThis.Where.Query[props]
       }
        var saveCustomView = {
            "id": 0,
            "screenName": "SHIPMENT",
            "viewName": this.state.Text,
            "viewFilters": JSON.stringify(this.Where),
            "createdBy": 0,
            "createdOn": "2016-09-26",
            "modifiedBy": 0,
            "modifiedOn": "2016-09-26",
            "active": 1
        }

       if(saveCustomView.viewFilters != undefined && saveCustomView.viewFilters != null && saveCustomView.viewFilters != {} ){
        axios.post(Base_Url + "TCustomViews", saveCustomView).then(response=> {
        swal('Success' , "Successfully saved." , 'success');


            axios.get(Base_Url+"TCustomViews").then(response=>{
         this.setState({
             savedViews: response.data,
             Text: ""
             })
         })
       })

            }
       else {
        swal('Error' , "Please select filter options first." , 'error');
      }

    }

 viewChange(e){
       debugger
    this.removeState();
     this.setState({
         viewId:e.target.selectedOptions[0].id
     });
    var blob = e.target.value
    this.Where = JSON.parse(blob)
     var serachObj = []
     var serachObjLots =[]
     var shipType = []
     var isDomestic
     var cutofFilter = []
     var lotFlag = false
     var poFlag = false
   if(this.Where.shipMentType && this.Where.shipMentType == "Domestic") {
         isDomestic = true
         var objShip = {"isDomestic" : 1}
         serachObj.push(objShip)
         this.setState({
             selectedshipType : 1
         })
     }
   else if(this.Where.shipMentType && this.Where.shipMentType== "International"){
        isDomestic = false
         var objShip = {"isDomestic" : 0}
         serachObj.push(objShip)
       this.setState({
           selectedshipType : 0
       })
     }
     var customer = []
         if (this.Where != undefined && this.Where!= null)
             {
                 if(this.Where.Customer && this.Where.Customer.length >0){
                     var obj = {}
                     let tempObj = [];
                     for(var i in this.Where.Customer){
                         this.checkedCustomer.push(this.Where.Customer[i])
                         tempObj.push(this.Where.Customer[i])
                         this.setState({
                             customerSelected : tempObj
                         })
                         obj = {"customerId" : this.Where.Customer[i] }
                         customer.push(obj);
                     }
                     serachObj.push(customer)
                 }

                 if(this.Where.Company && this.Where.Company.length > 0){
                     var company = [] ;
                     var objCompany = {}
                     for(var j in this.Where.Company)
                     {
                         this.checkedCompany.push(this.Where.Company[j])
                         objCompany = {"locationId" : this.Where.Company[j] }
                         company.push(objCompany);
                         this.setState({
                             locationSelected:company
                         });
                     }
                     serachObj.push(company)
                 }
                 var Railstatus = [{"status":"UNCONFIRMED"},{"staus":"CONFIRMED"},{"status":"QUEUED"},{"status":"LOADED"},{"status":"COMPLETED"}];
                 if(this.Where.status && this.Where.status.length){
                     Railstatus = [];
                     var objStatus = {};
                     for(var z in this.Where.status){
                         objStatus = {"status" : this.Where.status[z]}
                         this.checkedStatus.push(this.Where.status[z]);
                         Railstatus.push(objStatus)
                         this.setState({
                             statusSelected : Railstatus
                         })
                     }
                      serachObjLots.push(Railstatus)
                 }

                 var poSearch = {}
                 var railSearch = {}
                 var lotSearch = {}

                 if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
                     poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                     serachObj.push(poSearch)
                     poFlag = true
                     this.setState({
                         selectedPO:{"po_number":this.Where.Query.POSearch}
                     })
                 }
                 else{
                   poSearch =  [ {'po_number': {"like": "%" + "%"}}]
                   serachObj.push(poSearch)
                 }

                 if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                      railSearch = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
                      serachObjLots.push(railSearch)
                 }


                 if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                     var lotSearch =  [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                     serachObj.push(lotSearch)
                     lotFlag = true
                     this.setState({
                         selectedRelease : {"releaseNumber":this.Where.Query.LotSearch}
                     })
                 }
                 else{
                   var lotSearch =  [{'releaseNumber': {"like": "%"  + "%"}}]
                   serachObj.push(lotSearch)
                 }

                  serachObj = [].concat.apply([], serachObj);
                   serachObjLots = [].concat.apply([], serachObjLots);

         var PIview = createDataLoader(ShipmentViewForm,{
             queries:[{
                 endpoint: 'TPackagingInstructions',
                 filter: {
                     include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                 }
             }]
         })
         var base = 'TShipmentents';
         if(this.Where.CutofFilter && this.Where.CutofFilter.length > 0){
           var startDate = moment(this.Where.CutofFilter[0].cargoCutoffDate),
               endDate = moment(this.Where.CutofFilter[this.Where.CutofFilter.length-1].cargoCutoffDate);
           var cutoffDate = this.getDates(startDate, endDate)
           let dateObj = [startDate,endDate]
             this.setState({
               SelectedCutOffDate : dateObj,
               startDate : startDate,
               endDate :  endDate
           })
           var objdate = {}
           for(var j in cutoffDate){
               objdate = {"cargoCutoffDate" : cutoffDate[j]}
               cutofFilter.push(objdate)
           }

           this.url = PIview._buildUrl(base, {

               include : ["TLocation" ,"TContainerAllocation", "TCompany" ,

                                                    {"relation" : "TContainerDomestic",
                                                                   "scope":{"include" : "TCompany"}
                                                    },

                                                    {"relation" : "TContainerInternational",
                                                                  "scope":{"include" : "TCompany"}
                                                    },
                                                    {
                                                     "relation" :"TShipmentDomestic",
                                                     "scope":{"include":"TShipmentType",
                                                     "where":{"or":Railstatus}}
                                                    },
                                                    {
                                                     "relation" :"TShipmentInternational",
                                                     "scope":{
                                                               "include":["TSteamshipLine","TContainerType"],
                                                               "where" : {"and":[{"cargoCutoffDate":
                                                                                                     {
                                                                                                         "between" : [new Date(cutofFilter[0].cargoCutoffDate),new Date(cutofFilter[cutofFilter.length-1].cargoCutoffDate)]
                                                                                                     }
                                                                                 },
                                                                                 {
                                                                                     "or":Railstatus
                                                                                 }]

                                                                         }
                                                            }
                                                     },
                                                     {
                                                         "relation": "TShipmentLots",
                                                         "scope":{
                                                                   "include":["TPackagingInstructionLots",{
                                                                                                             "relation":"TPackagingInstructions",
                                                                                                             "scope":{"where":{"and":[
                                                                                                                                       {"or":poSearch}
                                                                                                                                     ]
                                                                                                                              }
                                                                                                                     }
                                                                                                          }
                                                                             ],
                                                                   "where":{"active":"1"}
                                                                 }
                                                     }
                         ],
               where: {"and":[
                              {"or":customer},
                              {"or":company},
                              {"active":1}
                             ]
                      }

           });
        }


      else if(serachObjLots && serachObjLots.length > 0){

           this.url = PIview._buildUrl(base, {

               include : ["TLocation" ,"TContainerAllocation", "TCompany" ,
                                                    {
                                                      "relation" : "TContainerDomestic",
                                                       "scope":{"include" : "TCompany"}
                                                    },

                                                    {
                                                      "relation" : "TContainerInternational",
                                                      "scope":{"include" : "TCompany"}
                                                    },

                                                    {
                                                      "relation" :"TShipmentDomestic",
                                                      "scope":{"include":"TShipmentType",
                                                      "where":{"or":serachObjLots}}
                                                    },

                                                    {
                                                      "relation" :"TShipmentInternational",
                                                      "scope":{"where" : {
                                                                            "or" : serachObjLots
                                                                          },
                                                      "include":["TSteamshipLine","TContainerType"]}
                                                    },

                                                    {
                                                        "relation": "TShipmentLots",
                                                        "scope":{
                                                                  "include":["TPackagingInstructionLots",{
                                                                                                            "relation":"TPackagingInstructions",
                                                                                                            "scope":{"where":{"and":[
                                                                                                                                      {"and":poSearch}
                                                                                                                                    ]
                                                                                                                             }
                                                                                                                    }
                                                                                                         }
                                                                            ],
                                                                  "where":{"active":"1"}
                                                                }
                                                    }
                        ],
               where: {"and":[
                 {"or":customer},
                 {"or":company},
                 {"or":serachObjLots}
               ]}


           });
       }

        else {
          if(objShip==undefined)
            {
              this.url = PIview._buildUrl(base, {
                include: ["TLocation","TContainerAllocation","TCompany",
                                                  {
                                                      "relation" : "TContainerDomestic",
                                                      "scope":{"include" : "TCompany"}
                                                  },

                                                  {
                                                      "relation" : "TContainerInternational",
                                                      "scope":{"include" : "TCompany"}
                                                  },
                                                  {
                                                      "relation": "TShipmentDomestic",
                                                      "scope": {"include": ["TShipmentType"],
                                                      "where":{"or":Railstatus,"active":1}}
                                                  },

                                                  {
                                                      "relation": "TShipmentInternational",
                                                      "scope": {"include": ["TSteamshipLine","TContainerType"],
                                                      "where":{"or":Railstatus,"active":1}}
                                                  },

                                                  {
                                                      "relation": "TShipmentLots",
                                                      "scope":{
                                                                "include":["TPackagingInstructionLots",{
                                                                                                          "relation":"TPackagingInstructions",
                                                                                                          "scope":{"where":{"and":[
                                                                                                                                    {"and":poSearch}
                                                                                                                                  ]
                                                                                                                           }
                                                                                                                  }
                                                                                                       }
                                                                          ],
                                                                "where":{"active":"1"}
                                                              }
                                                  }
                        ]
                        ,
                where: {
                  //"active":1
                  "and":[
                  {"or":customer},
                  {"or":company},
                  {"or":lotSearch}
                ]
              }
            });
          }
          else if(objShip.isDomestic==0){
            this.url = PIview._buildUrl(base, {
              include: ["TLocation", "TContainerAllocation", "TCompany",
                                                {
                                                    "relation" : "TContainerDomestic",
                                                    "scope":{"include" : "TCompany"}
                                                },

                                                {
                                                    "relation" : "TContainerInternational",
                                                    "scope":{"include" : "TCompany"}
                                                },

                                                {
                                                    "relation": "TShipmentDomestic",
                                                    "scope": {"include": ["TShipmentType"],"where":{"or":Railstatus,"active":1}}
                                                },

                                                {
                                                    "relation": "TShipmentInternational",
                                                    "scope": {"include": ["TSteamshipLine","TContainerType"],"where":{"or":Railstatus,"active":1}}
                                                },

                                                {
                                                    "relation": "TShipmentLots",
                                                    "scope":{
                                                              "include":["TPackagingInstructionLots",{
                                                                                                        "relation":"TPackagingInstructions",
                                                                                                        "scope":{"where":{"and":[
                                                                                                                                  {"and":poSearch}
                                                                                                                                ]
                                                                                                                         }
                                                                                                                }
                                                                                                     }
                                                                        ],
                                                              "where":{"active":"1"}
                                                            }
                                                }
                       ],
              where: {"and":[
                {"or":customer},
                {"or":company},
                {"or":lotSearch},
                {"isDomestic":0}
              ]}


          });
          }
          else{
            this.url = PIview._buildUrl(base, {
              //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

              include: ["TLocation", "TContainerAllocation", "TCompany",
                                                              {
                                                                  "relation" : "TContainerDomestic",
                                                                  "scope":{"include" : "TCompany"}
                                                              },

                                                              {
                                                                  "relation" : "TContainerInternational",
                                                                  "scope":{"include" : "TCompany"}
                                                              },

                                                              {
                                                                  "relation": "TShipmentDomestic",
                                                                  "scope": {"include": ["TShipmentType"],"where":{"or":Railstatus,"active":1}}
                                                              },

                                                              {
                                                                  "relation": "TShipmentInternational",
                                                                  "scope": {"include": ["TSteamshipLine","TContainerType"],"where":{"or":Railstatus,"active":1}}
                                                              },
                                                              {
                                                                  "relation": "TShipmentLots",
                                                                  "scope":{
                                                                            "include":["TPackagingInstructionLots",{
                                                                                                                      "relation":"TPackagingInstructions",
                                                                                                                      "scope":{"where":{"and":[
                                                                                                                                                {"and":poSearch}
                                                                                                                                              ]
                                                                                                                                       }
                                                                                                                              }
                                                                                                                   }
                                                                                      ],
                                                                            "where":{"active":"1"}
                                                                          }
                                                              }
            ],
              where: {"and":[
                {"or":customer},
                {"or":company},
                {"or":lotSearch},
                {"isDomestic":1}
              ]}


          });
          }
        }

                 $.ajax({
url: this.url,
success:function(data){
  var i =0
  if(poFlag){
    while(poFlag){
      if(i<data.length && data[i].TShipmentLots.length > 0 && data[i].TShipmentLots[0].TPackagingInstructions==undefined ){
        data.splice(i,1)
      }
      else if(i>=data.length-1){
        poFlag = false;
      }
      else{
        i++
      }
    }
  }
  i = 0
  if(lotFlag){
    while(lotFlag){
      if(i<data.length && data.length > 0 && !data[i].releaseNumber.toUpperCase().includes(this.Where.Query.LotSearch.toUpperCase())){
        data.splice(i,1)
      }
      else if(i>=data.length-1){
        lotFlag = false;
      }
      else{
        i++
      }
    }
  }
  localStorage.setItem('siViewData', JSON.stringify(data));
   this.setState(
       {
           viewData : data,
           loaded:true
       }
   )
    this.forceUpdate();
}.bind(this)
})
     }

 }


    handleChange(date){

        this.setState({
            startDate: date,
        });
        this.startdate = date

        this.onSearch()
    }

    handleChange1(date){

        this.setState({
            endDate: date
        });
        this.endDate = date ;

        this.onSearch()
    }

    getDates(startDate, endDate,interval) {
        var cfg = {interval: interval || 'days'};
        var dateArray = [];
        var currentDate = moment(startDate);

        while (currentDate <= endDate) {
            dateArray.push(currentDate.format('YYYY-MM-DD') )
            currentDate = currentDate.add(1, cfg.interval);
        }

        return dateArray;
    }

    ShipmentType(e){
         
        this.shipMentType = e.target.value
        this.setState({
            selectedshipType : e.target.value === "Domestic"?1:0
        })
        this.onSearch(e)
    }

    print(e){

        if(this.selected != undefined || this.conFirmID != undefined){

            hashHistory.push('/Shipment/shipmentPrint/'+this.conFirmID)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else
        {

            //hashHistory.push('/Shipment/shipmentPrint/')
            swal("Selection Missing", "Please select a lot to view.","error")
        }
    }

    onEditClick(e){

      if(this.conFirmID != undefined){
        hashHistory.push('/Shipment/shipmentedit/'+this.conFirmID+"/"+this.tempLotId)
      }

    else
    {
      swal("Error","Selection Missing","Please select a checkbox.","error")
    }
  }
    toggleColumn(name,value){
        switch(name){
            case "ARB" :
                if(value===0){
                    this.setState({
                        showARB : "none"
                    })
                }
                else{
                    this.setState({
                        showARB : ""
                    })
                }
                break;
            case "Customer" :
                if(value===0){
                    this.setState({
                        showCustomer : "none"
                    })
                }
                else{
                    this.setState({
                        showCustomer : ""
                    })
                }
                break;
            case "PO" :
                if(value===0){
                    this.setState({
                        showPO : "none"
                    })
                }
                else{
                    this.setState({
                        showPO : ""
                    })
                }
                break;
            case "Release" :

                if(value===0){
                    this.setState({
                        showRelease : "none"
                    })
                }
                else{
                    this.setState({
                        showRelease : ""
                    })
                }
                break;
            case "Lot" :

                if(value===0){
                    this.setState({
                        showLot : "none"
                    })
                }
                else{
                    this.setState({
                        showLot : ""
                    })
                }
                break;
            case "Material" :

                if(value===0){
                    this.setState({
                        showMaterial : "none"
                    })
                }
                else{
                    this.setState({
                        showMaterial : ""
                    })
                }
                break;
            case "Confmd" :

                if(value===0){
                    this.setState({
                        showConfmd : "none"
                    })
                }
                else{
                    this.setState({
                        showConfmd : ""
                    })
                }
                break;
            case "Booking" :

                if(value===0){
                    this.setState({
                        showBooking : "none"
                    })
                }
                else{
                    this.setState({
                        showBooking : ""
                    })
                }
                break;
            case "ShipmentType" :

                if(value===0){
                    this.setState({
                        showShipmentType : "none"
                    })
                }
                else{
                    this.setState({
                        showShipmentType : ""
                    })
                }
                break;
            case "Cutoff" :

                if(value===0){
                    this.setState({
                        showCutoff : "none"
                    })
                }
                else{
                    this.setState({
                        showCutoff : ""
                    })
                }
                break;
            case "Forwarder" :

                if(value===0){
                    this.setState({
                        showForwarder : "none"
                    })
                }
                else{
                    this.setState({
                        showForwarder : ""
                    })
                }
                break;
            case "CntrSize" :

                if(value===0){
                    this.setState({
                        showCntrSize : "none"
                    })
                }
                else{
                    this.setState({
                        showCntrSize : ""
                    })
                }
                break;
            case "InInvt" :

                if(value===0){
                    this.setState({
                        showInInvt : "none"
                    })
                }
                else{
                    this.setState({
                        showInInvt : ""
                    })
                }
                break;
            case "Qty" :

                if(value===0){
                    this.setState({
                        showQty : "none"
                    })
                }
                else{
                    this.setState({
                        showQty : ""
                    })
                }
                break;
            case "Alloc" :

                if(value===0){
                    this.setState({
                        showAlloc : "none"
                    })
                }
                else{
                    this.setState({
                        showAlloc : ""
                    })
                }
                break;
            case "Enough" :

                if(value===0){
                    this.setState({
                        showEno : "none"
                    })
                }
                else{
                    this.setState({
                        showEno : ""
                    })
                }
                break;
            case "Bags" :

                if(value===0){
                    this.setState({
                        showBags : "none"
                    })
                }
                else{
                    this.setState({
                        showBags : ""
                    })
                }
                break;
            case "ERD" :

                if(value===0){
                    this.setState({
                        showERD : "none"
                    })
                }
                else{
                    this.setState({
                        showERD : ""
                    })
                }
                break;
            case "Vessel" :

                if(value===0){
                    this.setState({
                        showVessel : "none"
                    })
                }
                else{
                    this.setState({
                        showVessel : ""
                    })
                }
                break;
            case "SteamShip" :

                if(value===0){
                    this.setState({
                        showSteamShip : "none"
                    })
                }
                else{
                    this.setState({
                        showSteamShip : ""
                    })
                }
                break;
            case "PU" :

                if(value===0){
                    this.setState({
                        showPU : "none"
                    })
                }
                else{
                    this.setState({
                        showPU : ""
                    })
                }
                break;
            case "Ret" :

                if(value===0){
                    this.setState({
                        showRet : "none"
                    })
                }
                else{
                    this.setState({
                        showRet : ""
                    })
                }
                break;
            case "Doc" :

                if(value===0){
                    this.setState({
                        showDoc : "none"
                    })
                }
                else{
                    this.setState({
                        showDoc : ""
                    })
                }
                break;
            case "Status" :

                if(value===0){
                    this.setState({
                        showStatus : "none"
                    })
                }
                else{
                    this.setState({
                        showStatus : ""
                    })
                }
                break;
            case "Trucker" :

                if(value===0){
                    this.setState({
                        showTrucker : "none"
                    })
                }
                else{
                    this.setState({
                        showTrucker : ""
                    })
                }
                break;
        }
    }
    handleOpen(){
        this.setState({open: true});
    }
    handleClose(submitted){

        this.setState({open: false});
        if(submitted){
            window.location.reload();
        }
    }
    render()
    {
        var filterData = ''
if(this.state.viewData && (this.state.viewData.length ==0 || this.state.viewData.length >0 )){

    filterData = this.state.viewData;
}
        return (

            <section className="side-filter">
                <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
                    <div className="" id="hide1">
                        <h4 className="pull-left">REFINE YOUR RESULT </h4>
                        <button type="button" className="btn collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row-fluid">
                    <FilterComponent
                            customerSelected = {this.state.customerSelected}
                            locationSelected = {this.state.locationSelected}
                            selectedPO = {this.state.selectedPO}
                            selectedRelease = {this.state.selectedRelease}
                            selectedshipType = {this.state.selectedshipType}
                            SelectedCutOffDate = {this.state.SelectedCutOffDate}
                            statusSelected = {this.state.statusSelected}
                            key= {this.state.key}
                            ShipmentType={this.ShipmentType}
                            startDate = {this.state.startDate}
                            endDate = {this.state.endDate}
                            handleChange = {(date) => {this.handleChange(date)}}
                            handleChange1 = {(date) => {this.handleChange1(date)}}
                            lotSearch={this.lotSearch}
                            onClickPo={this.onClickPo}
                            onClickli={this.onClickli}
                            onCompanyFilter = {this.onCompanyFilter}
                            onCustomerFilter = {this.onCustomerFilter}
                            onTextChange = {this.onTextChange}
                            onStatusFilter = {this.onStatusFilter}
                            handleChange1={this.handleChange1}
                            handleChange={this.handleChange}/>
                    <div id="filter-grid">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
                            <div className="row">
                               <FilterButton buttonDisplay = {this.buttonDisplay}  onButtonRemove = {this.onButtonRemove} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
                                <div className="col-lg-2 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                    <div className="pull-right ">
                                        <button className="btn btn-primary" onClick={this.handleOpen}> <i className="fa fa-cogs" aria-hidden="true"></i> Columns</button> </div>

                                </div>
                                <div className="col-lg-3 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                    <div className="pull-right " id="hide5">

                                        <select className="form-control" id="groupBy" name="groupBy" onChange={this.OnGroupBy}>
                                            <option value="Please Select An Option To Group by" disabled selected> Select An Option To Group by</option>
                                            {
                                                _.map(this.state.OptionToGroupby,(views,index)=>{
                                                    return (
                                                        <option key={index} value={views}>{views}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className="col-lg-3 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                    <div className="pull-right " id="hide5">



                                        <select className="form-control"   id="customer_name" name="customer_name" onChange={this.viewChange}>
                                            <option value="Please Select An Option" disabled selected>Select custom view</option>
                                            {
                                                _.map(this.state.savedViews , (views,index)=>{

                                                    if(views.screenName == "SHIPMENT")
                                                    {
                                                        return(

                                                            <option key = {index} value={views.viewFilters}>{views.viewName }</option>
                                                        )
                                                    }
                                                })
                                            }
                                        </select>                    </div>

                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className=" ">
                                    <ShipmentViewDataComponent key={this.state.index} headerCheckboxChange={this.headerCheckboxChange} filterData = {filterData} checkboxChange = {this.checkboxChange} showARB = {this.state.showARB}
showCustomer = {this.state.showCustomer}
SelcetedOptionForGroupBy = {this.state.SelcetedOptionForGroupBy}
showPO = {this.state.showPO}
showRelease = {this.state.showRelease}
showLot = {this.state.showLot}
showMaterial = {this.state.showMaterial}
showConfmd = {this.state.showConfmd}
showBooking = {this.state.showBooking}
showShipmentType = {this.state.showShipmentType}
showCutoff = {this.state.showCutoff}
showForwarder = {this.state.showForwarder}
showCntrSize = {this.state.showCntrSize}
showInInvt = {this.state.showInInvt}
showStatus = {this.state.showStatus }
showQty = {this.state.showQty}
showAlloc = {this.state.showAlloc}
showEno = {this.state.showEno}
showBags = {this.state.showBags}
showERD = {this.state.showERD}
showVessel = {this.state.showVessel}
showSteamShip = {this.state.showSteamShip}
showPU = {this.state.showPU}
showRet = {this.state.showRet}
showDoc = {this.state.showDoc}
showStatus = {this.state.showStatus}
showTrucker = {this.state.showTrucker}
/>

                                    </div>
                                    <div id="nonPrintable">
                                    <div className="row-fluid pddn-50-btm padding-top-btm-xs">

                                        {
                                            /*
                                            <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray text-uppercase" onClick={this.addToQueue}>Add to queue</button></div>
                                               */
                                        }
                                     <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray text-uppercase" onClick = {(e) => {this.print(e)}}>Print Load Order</button></div>
                                     <div className="pull-left margin-10-all"><button type="button" onClick = {(e) => {this.allocateContainer(e)} }  className="btn  btn-primary text-uppercase">Allocate Container</button></div>
                                     <div className="pull-left margin-10-all"><button type="button" onClick={this.PrintElem}  className="btn  btn-gray">Print</button></div>

                                        <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-primary text-uppercase" onClick = {this.onViewClick.bind(this)}>VIEW</button></div>
                                        <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-orange text-uppercase" onClick={(e) =>this.onEditClick(e)}>EDIT</button></div>
                                        <div className="pull-right margin-10-all"><button type="button" onClick = {(e) => {this.onConfirmClick(e)}}  className="btn  btn-success text-uppercase">Confirm</button></div>


                                    </div>

                                    <div className="row pddn-50-btm">
                                        <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

                                        <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                                            <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter a name for your custom saved view"
                                             onChange = {this.handleTextChange}
                                             value = {this.state.Text}
                                             />
                                            </div>

                                            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                                                <button type="button"   className="btn  btn-success margin-left-xs text-uppercase" onClick={this.saveView}>SAVE CUSTOM VIEW</button>
                                            </div>

                                        </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                <ShowHideColumn
                    Name={"Shipment"}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                />
                                                        </section>
            );
            }
            }
export default ShipmentViewForm;
