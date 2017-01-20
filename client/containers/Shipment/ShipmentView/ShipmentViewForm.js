import React from 'react';
//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';
//import '../../public/stylesheets/font.css';
//import '../../public/stylesheets/font-awesome.min.css';
 import SweetAlert from 'sweetalert-react';
 import '../../../public/stylesheets/sweetalert.css';
import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router';
import ShipmentViewDataComponent from '../../../components/ShipmentViewDataComponent/ShipmentViewDataComponent'
import FilterComponent from '../../../components/ShipmentFilterComponent';
import FilterButton from '../../../components/ShipmentFilterComponent/FilterButton';
import axios from 'axios'
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
           showTrucker: ""
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
           // this.onClick = this.onClick.bind(this)
            this.onButtonRemove = this.onButtonRemove.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            this.saveView = this.saveView.bind(this)
            this.handleTextChange = this.handleTextChange.bind(this)
            this.viewChange = this.viewChange.bind(this)
            this.checkboxChange = this.checkboxChange.bind(this)
           // this.handleOptionChange = this.handleOptionChange.bind(this)
            //this.handleOptionChange1 = this.handleOptionChange.bind(this)
            //this.onEdit =this.onEdit.bind(this)
            this.qArray = []
            this.addToQueue = this.addToQueue.bind(this)
            //this.headerCheckboxChange = this.headerCheckboxChange.bind(this)
    }
    allocateContainer(e){
        hashHistory.push('/Container/containerarrivalentry')
    }
    onConfirmClick(e){
      if(this.confId != null || undefined){
              hashHistory.push('/Shipment/shipmentConfirmation/'+this.confId)}
              else{
                swal("Selection Missing","Please Select A Shipment Lot","info")
              }
    }

onViewClick(e){
      if(this.conFirmID != null || undefined){
          hashHistory.push('/Shipment/shipmentDetails/'+this.conFirmID);
    }else{
      swal("Selection Missing","Please Select A Shipment Lot","info")
    }
}

 componentWillMount() {


  axios.get(Base_Url+"TCustomViews").then(response=>{
         this.setState({
             savedViews : response.data
         })
     })

      axios.get(Base_Url+"TShipmentLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
})



 }


    checkboxChange(e,value,data){
        debugger
        console.log(value,data)
        if(e.target.checked){
            this.conFirmID = e.target.value
            this.selected = e.target.id
            this.confId = data.id
            this.status = value.status
            this.shipId = value.id
        }
        else if(!e.target.checked){
            this.selected = null
            this.confId = null
            this.selected = null
            this.conFirmID = null
            //this.piID = null

        }
        console.log("SelectedID >>>>>>>>>>>>.",this.selected)
        console.log("ConfirmID><^><^><^>^<^>^<",this.conFirmID)
    }

    allocateContainer(e){
        hashHistory.push('/Shipment/shipmentDetails/'+this.shipId+'/'+ 1 )
    }


    addToQueue(e){
        debugger;
      var option = {
          "queueSequence" : parseInt(this.state.queue_Sequence[0].max_mark) +1
      }
    axios.put(Base_Url+"TShipmentLots/"+this.shipLotid ,option).then((response)=>{
        swal("" , "Successfully added to the queue" , 'success')
    })

    }


       onTextChange(e){

         var idValue = e.target.id

          this.Query[idValue] = e.target.value
          console.log(this.Query)
        }

      onClickPo(e){
        debugger;
           this.Query[e.target.id] = e.target.getAttribute('value')

          document.getElementById('POSearch').value = e.target.getAttribute('value')
           console.log(this.Query)
           console.log('>>>>>> target Value' , e.target.value)
      }

      lotSearch(e){
          debugger;
           this.Query[e.target.id] = e.target.getAttribute('value')
           console.log(this.Query)
           document.getElementById('LotSearch').value = e.target.getAttribute('value')
           console.log('>>>>>> target Value' , e.target.value)
      }

onClickli(e){
  this.Query[e.target.id] = e.target.getAttribute('value')

    document.getElementById('railcarSearch').value = e.target.getAttribute('value')
  console.log(this.Query)
  console.log('>>>>>> target Value' , e.target.value)
}
 onCompanyFilter(e,location){

            if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCompany})
            this.buttonDisplay.push(e.target.value)
            console.log(this.checkedCompany)
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
                 this.forceUpdate()
                   }
        }
        onCustomerFilter(e,customer){

            if(e.target.checked){
            this.forceUpdate()
            this.checkedCustomer.push(e.target.id)
            Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCustomer})
            this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
            console.log(this.checkedCustomer)
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
                  this.forceUpdate()
                   }
        }
        onStatusFilter(e,status){

            if(e.target.checked){

            this.checkedStatus.push(e.target.value);
            Object.defineProperty(this.Where,"status",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedStatus})
            this.buttonDisplay.push(e.target.value)
            this.forceUpdate()

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
            //console.log(this.Where.status)
            if(Object.keys(this.Where.status).length === 0){
              this.Where.status = undefined
              delete this.Where.status
            }
            console.log(this.Where)
            //let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)
                //console.log(this.buttonDisplay)
                  this.forceUpdate()
                  }
        }
    onButtonRemove(index,button){
    this.buttonDisplay.splice(index,1)
    this.forceUpdate()

}
    onRemove(e){
        console.log("clicked")
        console.log("WHERE",this.Where)
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

           delete this.startdate
           delete this.endDate
        delete this.Where.Query
            this.setState({
                key : this.state.key +1,
                index : this.state.index +1
            })
            document.getElementById('customer_name').selectedIndex = 0
         this.forceUpdate();

       }

    onSearch(e){
        debugger;
        var cutofFilter = []
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
            if (this.Where != undefined && this.Where!= null)
                {
                    if(this.Where.Customer && this.Where.Customer.length >0){
                        var customer = []
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

                    if(this.Where.status && this.Where.status.length){
                        var Railstatus = [];
                        var objStatus = {};
                        for(var z in this.Where.status){
                            objStatus = {"status" : this.Where.status[z]}
                            Railstatus.push(objStatus)
                        }
                         serachObjLots.push(Railstatus)
                    }

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
                        var poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                        serachObj.push(poSearch)
                    }


                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                        var railSearch = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
                         serachObjLots.push(railSearch)
                    }

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                        var lotSearch =  [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
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
        //TPackagingInstructionLots
        //            if(isDomestic){
        //                this.url = PIview._buildUrl(base, {
        //                    //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]
        //
        //                    include: ["TLocation", "TCompany", {
        //                        "relation": "TShipmentDomestic",
        //                        "scope": {"include": ["TShipmentType"]}
        //                    }, {
        //                        "relation": "TShipmentLots",
        //                        "scope": {"include": "TPackagingInstructionLots", "where": {"lot_number": "wewff"}}
        //                    }],
        //                    where: {
        //                        "and": serachObj
        //                    }
        //
        //                });
        //            }
        //            else if(!isDomestic){
        //                this.url = PIview._buildUrl(base, {
        //                    //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]
        //
        //                    include: ["TLocation", "TCompany",  {
        //                        "relation": "TShipmentInternational",
        //                        "scope": {"include": ["TSteamshipLine"]}
        //                    }, {
        //                        "relation": "TShipmentLots",
        //                        "scope": {"include": "TPackagingInstructionLots", "where": {"lot_number": "wewff"}}
        //                    }],
        //                    where: {
        //                        "and": serachObj
        //                    }
        //
        //                });
        //            }
                     if(this.Where.CutofFilter && this.Where.CutofFilter.length > 0){

                        this.url = PIview._buildUrl(base, {
                            //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                            include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational","scope":{"where" : {"or" : cutofFilter },"include":["TSteamshipLine"]}},{"relation" : "TShipmentLots" ,"scope":{"include":"TPackagingInstructionLots"}}],
                            where: {"and":[
                              {"or":customer},
                              {"or":company}
                            ]}

                        });
                    }


                  else if(serachObjLots && serachObjLots.length > 0){

                       this.url = PIview._buildUrl(base, {
                           //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                           include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":"TShipmentType","where":{"and":serachObjLots}}},{"relation" :"TShipmentInternational","scope":{"where" : {"and" : serachObjLots },"include":["TSteamshipLine"]}},{"relation" : "TShipmentLots" ,"scope":{"include":"TPackagingInstructionLots"}}],
                          where: {"and":[
                              {"or":customer},
                              {"or":company}
                            ]}

                       });
                   }

                    else {
                        this.url = PIview._buildUrl(base, {
                            //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                            include: ["TLocation", "TCompany", {
                                "relation": "TShipmentDomestic",
                                "scope": {"include": ["TShipmentType"]}
                            }, {
                                "relation": "TShipmentInternational",
                                "scope": {"include": ["TSteamshipLine"]}
                            }, {
                                "relation": "TShipmentLots",
                                "scope": {"include": "TPackagingInstructionLots", "where": {"lot_number": "wewff"}}
                            }],
                       where: {"and":[
                              {"or":customer},
                              {"or":company}
                            ]}

                        });
                    }
       
      $.ajax({
            url: this.url,
            success:function(data){

              debugger;
                console.log('ajax ',data);
                debugger
               this.setState(
                   {
                       viewData : data,
                       loaded:true
                   }
               )
               //console.log( this.state.xyz)
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

       debugger;
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
        console.log("Save Customer View" , saveCustomView);
        if(saveCustomView.viewFilters != undefined && saveCustomView.viewFilters != null && saveCustomView.viewFilters != {} ){
        axios.post(Base_Url + "TCustomViews", saveCustomView).then(response=> {
        swal('Success' , "Successfully Saved..." , 'success');
        console.log("response", response)

         axios.get(Base_Url+"TCustomViews").then(response=>{
         this.setState({
             savedViews : response.data
             })
         })
       })

            }
       else {
        swal('Error' , "Please Select Filter Options First" , 'error');
      }

    }

 viewChange(e){

          var blob = e.target.value
         //var changedView = this.state.savedViews[index -1]
        this.Where = JSON.parse(blob)

         //if(this.Query != undefined){
         //       Object.defineProperty(this.Where,"Query",{enumerable:true ,
         //           writable: true,
         //           configurable: true,
         //           value:this.Query})
         //   }
     var serachObj = []
     var serachObjLots =[]
     var shipType = []
     var isDomestic
     //if(this.shipMentType){
     //    Object.defineProperty(this.Where,"shipMentType",{enumerable:true ,
     //        writable: true,
     //        configurable: true,
     //        value:this.shipMentType})
     //
     //
     //
     //}


     if(this.Where.shipMentType && this.Where.shipMentType == "Domestic") {


         isDomestic = true
         var objShip = {"isDomestic" : 1}
         serachObj.push(objShip)
     }
     else if(this.Where.shipMentType && this.Where.shipMentType== "International"){  isDomestic = false
         var objShip = {"isDomestic" : 0}
         serachObj.push(objShip)
     }
     if (this.Where != undefined && this.Where!= null)
     {
         if(this.Where.Customer && this.Where.Customer.length >0){
             var customer = []
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

         if(this.Where.status && this.Where.status.length){
             var Railstatus = [];
             var objStatus = {};
             for(var z in this.Where.status){
                 objStatus = {"status" : this.Where.status[z]}
                 Railstatus.push(objStatus)
             }
             serachObjLots.push(Railstatus)
         }

         if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
             var poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
             serachObj.push(poSearch)
         }


         if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
             var railSearch = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
             serachObjLots.push(railSearch)
         }

         if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
             var lotSearch =  [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
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
         //TPackagingInstructionLots
         //            if(isDomestic){
         //                this.url = PIview._buildUrl(base, {
         //                    //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]
         //
         //                    include: ["TLocation", "TCompany", {
         //                        "relation": "TShipmentDomestic",
         //                        "scope": {"include": ["TShipmentType"]}
         //                    }, {
         //                        "relation": "TShipmentLots",
         //                        "scope": {"include": "TPackagingInstructionLots", "where": {"lot_number": "wewff"}}
         //                    }],
         //                    where: {
         //                        "and": serachObj
         //                    }
         //
         //                });
         //            }
         //            else if(!isDomestic){
         //                this.url = PIview._buildUrl(base, {
         //                    //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]
         //
         //                    include: ["TLocation", "TCompany",  {
         //                        "relation": "TShipmentInternational",
         //                        "scope": {"include": ["TSteamshipLine"]}
         //                    }, {
         //                        "relation": "TShipmentLots",
         //                        "scope": {"include": "TPackagingInstructionLots", "where": {"lot_number": "wewff"}}
         //                    }],
         //                    where: {
         //                        "and": serachObj
         //                    }
         //
         //                });
         //            }
         if(this.Where.CutofFilter && this.Where.CutofFilter.length > 0){

             this.url = PIview._buildUrl(base, {
                 //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                 include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational","scope":{"where" : {"or" : cutofFilter },"include":["TSteamshipLine"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots","TPackagingInstructions"]}}],
               where: {"and":[
                 {"or":customer},
                 {"or":company}
               ]}

             });
         }
         else {
             this.url = PIview._buildUrl(base, {
                 //include : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational",{"relation" : "TPackagingInstructionLots" ,"scope":{"where":{"or":serachObjLots}}}}]

                 include: ["TLocation", "TCompany", {
                     "relation": "TShipmentDomestic",
                     "scope": {"include": ["TShipmentType"]}
                 }, {
                     "relation": "TShipmentInternational",
                     "scope": {"include": ["TSteamshipLine"]}
                 }, {
                     "relation": "TShipmentLots",
                     "scope": {"include": ["TPackagingInstructionLots","TPackagingInstructions"]
                        // , "where": {"lot_number": "wewff"}
                     }
                 }],
               where: {"and":[
                 {"or":customer},
                 {"or":company}
               ]}

             });
         }
        
         $.ajax({
             url: this.url,
             success:function(data){

                 debugger;
                 console.log('ajax ',data);
                 debugger
                 this.setState(
                     {
                         viewData : data,
                         loaded:true
                     }
                 )
                 //console.log( this.state.xyz)
             }.bind(this)
         })



     }


 }


    handleChange(date){
        debugger
        this.setState({
            startDate: date,
        });
        this.startdate = date
        console.log("THESTARTDATE",this.startdate.format('MM-DD-YYYY'))
    }

    handleChange1(date){
        debugger;
        this.setState({
            endDate: date
        });
        this.endDate = date ;
        console.log("THEENDDATE",this.endDate.format('MM-DD-YYYY'))
    }

    getDates(startDate, endDate,interval) {
        var cfg = {interval: interval || 'days'};
        var dateArray = [];
        debugger;
        var currentDate = moment(startDate);
        console.log('-->', currentDate._i, '<=', endDate._i, currentDate <= endDate);
        while (currentDate <= endDate) {
            dateArray.push(currentDate.format('YYYY-MM-DD') )
            currentDate = currentDate.add(1, cfg.interval);
        }

        return dateArray;
    }

    ShipmentType(e){
        console.log("valueShipment type" , e.target.value)
        this.shipMentType = e.target.value
    }

    print(e){
        if(this.selected != undefined || this.conFirmID != undefined){
            console.log('print view',this.conFirmID+'/'+this.selected)
            hashHistory.push('/Shipment/shipmentPrint/'+this.conFirmID)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else
        {
            console.log('mmmmmmmmmmmmmmmmmmmmm');
            //hashHistory.push('/Shipment/shipmentPrint/')
            swal("Selection Missing", "Please Select A Lot To View.","error")
        }
    }

    onEditClick(e){
      if(this.conFirmID != undefined){
        hashHistory.push('/Shipment/shipmentedit/'+this.conFirmID)
      }

    else
    {
      swal("Selection Missing","Please Select A Checkbox","error")
    }
  }
onHideColumn(e,name){
    console.log(e.target.name)
    switch(e.target.name){
    case "ARB" :
    if(this.state.showARB == ""){
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
   if(this.state.showCustomer == ""){
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
   if(this.state.showPO == ""){
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
 console.log(e.target.name)
  if(this.state.showRelease == ""){
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
 console.log(e.target.name)
  if(this.state.showLot == ""){
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
 console.log(e.target.name)
  if(this.state.showMaterial == ""){
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
 console.log(e.target.name)
  if(this.state.showConfmd == ""){
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
 console.log(e.target.name)
  if(this.state.showBooking == ""){
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
 console.log(e.target.name)
  if(this.state.showShipmentType == ""){
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
 console.log(e.target.name)
  if(this.state.showCutoff == ""){
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
 console.log(e.target.name)
  if(this.state.showForwarder == ""){
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
 console.log(e.target.name)
  if(this.state.showCntrSize == ""){
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
 console.log(e.target.name)
  if(this.state.showInInvt == ""){
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
 console.log(e.target.name)
  if(this.state.showQty == ""){
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
 console.log(e.target.name)
  if(this.state.showAlloc == ""){
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
 console.log(e.target.name)
  if(this.state.showEno == ""){
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
 console.log(e.target.name)
  if(this.state.showBags == ""){
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
 console.log(e.target.name)
  if(this.state.showERD == ""){
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
 console.log(e.target.name)
  if(this.state.showVessel == ""){
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
 console.log(e.target.name)
  if(this.state.showSteamShip == ""){
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
 console.log(e.target.name)
  if(this.state.showPU == ""){
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
 console.log(e.target.name)
  if(this.state.showRet == ""){
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
 console.log(e.target.name)
  if(this.state.showDoc == ""){
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
 console.log(e.target.name)
  if(this.state.showStatus == ""){
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
 console.log(e.target.name)
  if(this.state.showTrucker == ""){
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
    render()
    {
        var filterData = ''
if(this.state.viewData && (this.state.viewData.length ==0 || this.state.viewData.length >0 )){

    filterData = this.state.viewData;
}
        return (

            <section className="side-filter">
                <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
                    <div className="">
                        <h4 className="pull-left">REFINE YOUR RESULT </h4>
                        <button type="button" className="btn collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row-fluid">
                    <FilterComponent key= {this.state.key} ShipmentType={this.ShipmentType}  startDate = {this.state.startDate} endDate = {this.state.endDate} handleChange = {(date) => {this.handleChange(date)}} handleChange1 = {(date) => {this.handleChange1(date)}} lotSearch={this.lotSearch}  onClickPo={this.onClickPo}  onClickli={this.onClickli} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter} handleChange1={this.handleChange1} handleChange={this.handleChange}/>
                                                            <div id="filter-grid">
                                                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
                                                                    <div className="row">
                                                                       <FilterButton buttonDisplay = {this.buttonDisplay}  onButtonRemove = {this.onButtonRemove} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
                                                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">
                                                                            <div className="pull-right ">
                                                                                <select className="form-control"   id="customer_name" name="customer_name" onChange={this.viewChange}>
                              <option value="Please Select An Option" disabled selected>Select custom view</option>
                             {
                                 _.map(this.state.savedViews , (views,index)=>{
                                     debugger;
                                     if(views.screenName == "SHIPMENT")
                                     {
                                     return(

                                         <option key = {index} value={views.viewFilters}>{views.viewName }</option>
                                     )
                                 }
                                 })
                             }
                        </select>
                                                                            </div>

                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                 <a href="javascript:void(0)" name = "ARB" onClick = {(e) => {this.onHideColumn(e,name)}}>ARB</a> --
                 <a href="javascript:void(0)" name = "Customer" onClick = {(e) => {this.onHideColumn(e)}}>Customer</a> ---
                 <a href="javascript:void(0)" name = "PO" onClick={(e) => {this.onHideColumn(e)}}>PO</a> --
                 <a href="javascript:void(0)" name = "Release" onClick={(e) => {this.onHideColumn(e)}}>Release</a> --
                 <a href="javascript:void(0)" name = "Lot" onClick={(e) => {this.onHideColumn(e)}}>Lot#</a> --
                 <a href="javascript:void(0)" name = "Material" onClick={(e) => {this.onHideColumn(e)}}>Material</a> --
                 <a href="javascript:void(0)" name = "Confmd" onClick={(e) => {this.onHideColumn(e)}}>Confmd</a> --
                 <a href="javascript:void(0)" name = "Booking" onClick={(e) => {this.onHideColumn(e)}}>Booking</a> --
                 <a href="javascript:void(0)" name = "ShipmentType" onClick={(e) => {this.onHideColumn(e)}}>ShipmentType</a> --
                 <a href="javascript:void(0)" name = "Cutoff" onClick={(e) => {this.onHideColumn(e)}}>Cutoff</a> --
                 <a href="javascript:void(0)" name = "Forwarder" onClick={(e) => {this.onHideColumn(e)}}>Forwarder</a> --
                 <a href="javascript:void(0)" name = "CntrSize" onClick={(e) => {this.onHideColumn(e)}}>#CntrSize</a> --
                 <a href="javascript:void(0)" name = "InInvt" onClick={(e) => {this.onHideColumn(e)}}>In.Invt.</a> --
                 <a href="javascript:void(0)" name = "Qty"onClick={(e) => {this.onHideColumn(e)}}>Qty</a> --
                 <a href="javascript:void(0)" name = "Alloc" onClick={(e) => {this.onHideColumn(e)}}>Allocated</a> --
                 <a href="javascript:void(0)" name = "Enough" onClick={(e) => {this.onHideColumn(e)}}>Enough</a> --
                 <a href="javascript:void(0)" name = "Bags" onClick={(e) => {this.onHideColumn(e)}}>Bags</a> --
                 <a href="javascript:void(0)" name = "ERD" onClick={(e) => {this.onHideColumn(e)}}>ERD</a> --
                 <a href="javascript:void(0)" name = "Vessel" onClick={(e) => {this.onHideColumn(e)}}>Vessel</a> --
                 <a href="javascript:void(0)" name = "SteamShip" onClick={(e) => {this.onHideColumn(e)}}>SteamShipLine</a> --
                 <a href="javascript:void(0)" name = "PU" onClick={(e) => {this.onHideColumn(e)}}>PU</a> --
                 <a href="javascript:void(0)" name = "Ret" onClick={(e) => {this.onHideColumn(e)}}>Return</a> --
                 <a href="javascript:void(0)" name = "Doc" onClick={(e) => {this.onHideColumn(e)}}>Doc</a> --
                 <a href="javascript:void(0)" name = "Status" onClick={(e) => {this.onHideColumn(e)}}>Status</a> --
                 <a href="javascript:void(0)" name = "Trucker" onClick={(e) => {this.onHideColumn(e)}}>Trucker</a>
</div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <div className=" table-responsive view_table viewLoad">
                                                                            <ShipmentViewDataComponent key={this.state.index} filterData = {filterData} checkboxChange = {this.checkboxChange} showARB = {this.state.showARB}
                        showCustomer = {this.state.showCustomer}
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

                                                                            <div className="row-fluid pddn-50-btm padding-top-btm-xs">

                                                                                {
                                                                                    /*
                                                                                    <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray text-uppercase" onClick={this.addToQueue}>Add to queue</button></div>
                                                                                       */
                                                                                }
                                                                             <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray text-uppercase" onClick = {(e) => {this.print(e)}}>Print Load Oreder</button></div>
                                                                                <div className="pull-left margin-10-all"><button type="button" onClick = {(e) => {this.allocateContainer(e)} }  className="btn  btn-primary text-uppercase">Allocate Container</button></div>


                                                                                <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-primary text-uppercase" onClick = {this.onViewClick.bind(this)}>VIEW</button></div>
                                                                                <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-orange text-uppercase" onClick={(e) =>this.onEditClick(e)}>EDIT</button></div>
                                                                                <div className="pull-right margin-10-all"><button type="button" onClick = {(e) => {this.onConfirmClick(e)}}  className="btn  btn-success text-uppercase">Confirm</button></div>


                                                                            </div>

                                                                            <div className="row pddn-50-btm">
                                                                                <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

                                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                                                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name"
                                                                                     onChange = {this.handleTextChange}
                                                                                     value = {this.state.Text}
                                                                                     />
                                                                                    </div>

                                                                                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                                                                                        <button type="button"   className="btn  btn-success margin-left-xs text-uppercase" onClick={this.saveView}>SAVE CUSTOMER VIEW</button>
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                    </div>

                                                        </section>
            );
            }
            }
            export default ShipmentViewForm;
