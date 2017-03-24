import React from 'react';
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import FilterComponent from '../../../components/ContainerFilterComponent';
import ContainerViewDataComponent from '../../../components/ContainerViewDataComponent/ContainerViewDataComponent';
import FilterButton from '../../../components/ContainerFilterComponent/FilterButton';
import { hashHistory } from 'react-router'
import { createDataLoader } from 'react-loopback';
import axios from 'axios'
import {Base_Url} from '../../../constants';
class  ContainerViewForm extends React.Component {
    constructor(props){
        super(props);
            this.status
            this.state = {
           showARB:"",
           showCustomer:"",
           showRelease:"",
           showBooking:"",
           showContainer:"",
           showTrucker:"",
           showArrived:"",
           showSteamShip:"",
           showType:"",
                key: 0,
                selectedOption: 'lbs',
                index: 0,
                selectedOption1: 'kg'
            }
            this.containerId=''
            this.isDomestic=false
            this.buttonDisplay = [ ]
            this.checkedCustomer = [ ]
            this.checkedStatus = [ ]
            this.checkedCompany = [ ]
            this.checkedContainer = []
            this.editId = ''
            this.Query = {}
            this.Where = { }
            this.qArray = []
            this.selected = null
            this.onContainerFilter = this.onContainerFilter.bind(this)
            this.SteamLine = this.SteamLine.bind(this)
            this.Arrival = this.Arrival.bind(this)
            this.lotSearch = this.lotSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
            this.saveView = this.saveView.bind(this)
            this.onEdit = this.onEdit.bind(this)
            this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.viewChange = this.viewChange.bind(this)
        this.addToqueue = this.addToqueue.bind(this)
        this.PrintScreen = this.PrintScreen.bind(this)
        this.onSteamShipFilter = this.onSteamShipFilter.bind(this)
        this.SteamLineArray = []
        }


    componentWillMount() {
         axios.get(Base_Url+"TCustomViews").then(response=>{
            this.setState({
                savedViews : response.data
            })
        })

        axios.get(Base_Url+"TContainerInternationals/getMaxQueue").then(response=>{
            this.sequense = response.data

            this.setState({
                max_seq : this.sequense[0].max_mark
            })
        })
    }
    print(e){
        if(this.containerId != '' && this.isDomestic==false){
            console.log('print view',this.containerId)
            hashHistory.push('/Container/containerPrint/'+this.contId)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else if(this.containerId!='' && this.isDomestic==true)
        {
            hashHistory.push('/Container/BOLDomestic/'+this.contId)
        }
        else if(this.containerId=='' && this.isDomestic==false)
        {

            swal("Selection Missing", "Please Select A Container To Print.","error")
        }
        else{
            swal('','Domestic Container report is not available');
        }
    }

  printLoadOrder(e){

    if(this.editId != undefined || this.contId != undefined){
        console.log('print view',this.editId+'/'+this.contId)
        hashHistory.push('/Shipment/shipmentPrint/'+this.editId + '/'+ this.contId)
        //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
    }
    else
    {
        console.log('mmmmmmmmmmmmmmmmmmmmm');
        //hashHistory.push('/Shipment/shipmentPrint/')
        swal("Selection Missing", "Please Select A Lot To View.","error")
    }
  }

    Arrival(e){

        console.log("valueShipment type" , e.target.value)
        this.arrivalType = e.target.value

        Object.defineProperty(this.Where,"Arrival",{enumerable: true ,
            writable: true,
            configurable:true,
            value:this.arrivalType})
        this.onSearch(e)
    }

    PrintScreen(){
      var scrollLeft = document.getElementsByClassName("loadedContent")[0].scrollLeft
      document.getElementsByClassName('pos-relative-b')[0].style.display = 'none'
      document.getElementsByClassName('filter-btn')[0].style.display = 'none'
      document.getElementById("nonPrintable").style.display = "none"
      document.getElementById("row").style.display = "none"
      document.getElementById("hide1").style.display = "none"
      // document.getElementById("hide2").style.display = "none"
      // document.getElementById("hide3").style.display = "none"
      document.getElementById("hide4").style.display = "none"
      document.getElementById("hide5").style.display = "none"
      document.getElementById("customer_name").style.display = "none"
      document.getElementsByClassName("loadedContent")[0].style.cssText=""
      document.getElementsByClassName("loadedContent")[0].style.height="100%"
      document.getElementsByClassName("loadedContent")[0].style.overflowX='auto'
      document.getElementsByClassName("loadedContent")[0].scrollLeft = scrollLeft
      var printContent = document.getElementById('Packaging_Instruction_View').innerHtml
      document.body.innerHtml = printContent
      window.print()
      window.location.reload()
    }
    onSteamShipFilter(e,steamShip){
      if(e.target.checked){
      this.SteamLineArray.push(parseInt(e.target.id));
      Object.defineProperty(this.Where,"SteamLine",{enumerable: true ,
                                                writable: true,
                                                configurable:true,
                                                value:this.SteamLineArray})
      // this.buttonDisplay.push(e.target.value)

    }
    else{
          if(this.SteamLineArray.indexOf(parseInt(e.target.id))!=-1){
            this.SteamLineArray.splice(this.SteamLineArray.indexOf(parseInt(e.target.id)),1)
          }
            this.buttonDisplay = _.without(this.buttonDisplay,e.target.value)
    }
      this.onSearch(e)
      this.forceUpdate()
    }
    onContainerFilter(e,location){
        if(e.target.checked){
             this.checkedContainer.push(e.target.id)
            Object.defineProperty(this.Where,"Container",{enumerable: true ,
                writable: true,
                configurable:true,
                value:this.checkedContainer})
            // this.buttonDisplay.push(e.target.value)
            //   this.forceUpdate()
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)

        }
        else if (!e.target.checked){

            let id = e.target.id
            this.checkedContainer = _.without(this.checkedContainer,id)
            this.Where.checkedContainer = this.checkedContainer
            if(Object.keys(this.Where.Container).length === 0){
                this.Where.Container = undefined
                //console.log(this.Where)
                delete this.Where.Container
            }
            let value = e.target.value
            let index = this.buttonDisplay.indexOf(e.target.value)
            if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)
            this.forceUpdate()
        }
        this.onSearch(e)
    }


         onCompanyFilter(e,location){
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCompany})
            //this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
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
             this.onSearch(e)
        }
        onCustomerFilter(e,customer){
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCustomer.push(e.target.id)
            Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCustomer})
            //this.buttonDisplay.push(e.target.value)
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
            this.onSearch(e)
        }
        onStatusFilter(e,status){
            if(e.target.checked){

            this.checkedStatus.push(e.target.value);
            Object.defineProperty(this.Where,"status",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedStatus})
            //this.buttonDisplay.push(e.target.value)
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
            this.onSearch(e)
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
            this.SteamLineArray = []
            delete this.Where.Company
            delete this.Where.Customer
            delete this.Where.status
            delete this.state.viewData
        delete this.state.Container
        delete this.state.Arrival
        delete this.state.SteamLine
            this.setState({
                key : this.state.key +1,
                index : this.state.index +1
            })
            document.getElementById('customer_name').selectedIndex = 0
         localStorage.removeItem('conViewData')
         this.forceUpdate();

    }

onCheckboxChange(e,data ,contData){
    this.containerData = contData
    console.log(">>>>>>>>>>>>>Contaimner Data" ,  this.containerData)
    this.contId = contData.id
    this.type = data.isDomestic
        this.editId = data.id
        console.log("DATA",data)
        this.parentShipId = (data.TContainerInternational && data.TContainerInternational.length > 0 )?data.TContainerInternational[0].id : ''
        this.shipmentid = (data.TShipmentInternational && data.TShipmentInternational.length > 0) ?data.TShipmentInternational[0].id : ''
         if(data.isDomestic==1){
            this.isDomestic=true;
            this.containerId = data.TContainerDomestic[0].id;
        }
        else{
            this.isDomestic=false;
            this.containerId = data.TContainerInternational[0].id;
        }

    }
        onEdit(e){
        hashHistory.push('Container/containeredit/'+this.editId +'/'+this.contId)
           }

    addToqueue() {
      debugger;
       if(!this.containerData.containerSteamshipLineConfirmed){
           swal("", "Domestic container can not be in queue" , 'info')
           return;
       }
        if(!this.containerData.containerArrived){
            swal("" , "Container must be arrived before queued" , 'info');
            return
        }

   if(this.containerData && (this.containerData.status == "LOADED" || this.containerData.status == "INTRANSIT" || this.containerData.status == "DELIVERED"))
   {
     swal("" , "The container is already" +" "+ this.containerData.status , 'info');
     return
   }

       var id  = this.contId
         var shipId = this.shipmentid
         axios.put(Base_Url + "TContainerInternationals/" + id , {sequence : parseInt(this.state.max_seq)+1 , status : 'QUEUED' ,isqueued : 1}).then((response)=> {

           axios.put(Base_Url + "TShipmentInternationals/"+ shipId , {status : "QUEUED"}).then((response)=>{
             swal({
                    title: "Success",
                    text: "Successfully added to the queue",
                    type: "success",
                    showCancelButton: true,
                },

                    function(isConfirm){
                      hashHistory.push('/Conatainer/containerqueueview')

                }
            );
           })




        }).catch((err)=>{

        })
}

    onSearch(e){
      Object.defineProperty(this.Where,"Query",{enumerable:true ,
            writable: true,
            configurable: true,
            value:this.Query})


        var serachObj = []
        var serachObjLots =[]
        var shipType = []
        var containerSearch = []
        var isDomestic
        var intl = []
        var arrival = []
        var arrivedtemp,steamtemp
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

   var searchContainerFlag = false
   if(this.Where.Container && this.Where.Container.length > 0){
     var container = []
     var obj2 = {}
     for (var i in this.Where.Container) {

         obj2 = {"containerTypeId": this.Where.Container[i]}
         container.push(obj2);
     }
     containerSearch.push(container)
     searchContainerFlag = true
   }

      console.log("Search object" , serachObj)

        if (this.Where != undefined && this.Where!= null) {
            if (this.Where.Customer && this.Where.Customer.length > 0) {
                var customer = []
                var obj = {}
                for (var i in this.Where.Customer) {
                    obj = {"customerId": this.Where.Customer[i]}
                    customer.push(obj);
                }
                serachObj.push(customer)
            }

            if (this.Where.Company && this.Where.Company.length > 0) {
                var company = [];
                var objCompany = {}
                for (var j in this.Where.Company) {
                    objCompany = {"locationId": this.Where.Company[j]}
                    company.push(objCompany);
                }
                serachObj.push(company)
            }

            if (this.Where.status && this.Where.status.length) {
                var Railstatus = [];
                var objStatus = {};
                for (var z in this.Where.status) {
                    objStatus = {"status": this.Where.status[z]}
                    Railstatus.push(objStatus)
                }
                serachObjLots.push(Railstatus)
            }

            if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.POSearch && this.Where.Query.POSearch != undefined) {
                var poSearch = [{'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                serachObj.push(poSearch)
            }

             if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch != undefined) {
                var lotSearch = [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                serachObj.push(lotSearch)
            }
            var arrivalData = {"containerArrived":-1}
            if(this.Where.Arrival =="1" || this.Where.Arrival =="0"){

                arrivalData = {"containerArrived" : parseInt(this.Where.Arrival)}
                arrival.push(arrivalData)
                intl.push(arrivalData)
            }
            var tempsteamp = this.SteamLineArray.length>0?1:-1
            var steam = []
            var steamflag = false
            if(this.SteamLineArray.length>0){
                steam = []
                steamflag = true
                for(var steamTemp in this.SteamLineArray){
                  steam.push(this.SteamLineArray[steamTemp])
                }
                var steamdata = {"containerSteamshipLineConfirmed" : this.Where.SteamLine }
                intl.push(steamdata)
            }

            serachObj = [].concat.apply([], serachObj);
            serachObjLots = [].concat.apply([], serachObjLots);
            containerSearch = [].concat.apply([], containerSearch);
                 console.log("search obj second" , serachObj , serachObjLots)
            var PIview = createDataLoader(ContainerViewForm,{
                queries:[{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                    }
                }]
            })

            var base = 'TShipmentents';
            //TPackagingInstructionLots TContainerInternational
 if((containerSearch && containerSearch.length > 0)){

   this.url = PIview._buildUrl(base, {
       "include": ["TContainerInternational", "TCompany", "TLocation", "TShipmentDomestic",
        {"relation":"TShipmentInternational" ,"include":["TContainerType" , "TSteamshipLine"], "scope":{"include" : "TContainerType" , "where":{"or":containerSearch}}}]
       //where: {"and": serachObj}

   });
 }

  if(serachObjLots && serachObjLots.length>0){
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"or": serachObjLots}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include" : "TCompany","where": {"or": serachObjLots}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",
                    {"relation":"TShipmentInternational" ,
                                "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                    where: {"and":[
                      {"or":customer},
                      {"or":company},
                      {"or":lotSearch}
                    ]
                    }

                });
            }
            if(tempsteamp!=-1 && serachObj.length > 0  && arrival.length>0 && serachObjLots.length ==0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TShipmentDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include":"TCompany","where": {"and":[{"containerArrived": arrivalData.containerArrived},
                                                                        {"containerSteamshipLineConfirmed":tempsteamp}
                                                                            ]}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                  "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                    where: {"and":[
                      {"or":customer},
                      {"or":company},
                      {"or":lotSearch}

                    ]
                    }

                });
            }

           else if(tempsteamp!=-1 && serachObj.length >= 0  &&  arrival.length>=0 && serachObjLots.length ==0) {
                debugger;
                this.url = PIview._buildUrl(base, {
                    "include": [ {
                        "relation": "TContainerInternational",
                        "scope": {"include":"TCompany","where":{"containerSteamshipLineConfirmed":tempsteamp}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                  "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                    where: {"and":[
                      {"or":customer},
                      {"or":company},
                      {"or":lotSearch}

                    ]
                    }

                });
            }

            else if(tempsteamp!=-1 &&  arrival.length >= 0 && serachObj.length == 0  && serachObjLots.length ==0) {
                debugger;
                this.url = PIview._buildUrl(base, {
                    "include": [ {
                        "relation": "TContainerInternational",
                        "scope": {"include":"TCompany","where": {"and":[{"containerArrived": arrivalData.containerArrived},
                                                                        {"containerSteamshipLineConfirmed":tempsteamp}
                                                                            ]}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                  "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]
                    //where: {"and": serachObj}

                });
            }

            else if( arrival.length>0 && tempsteamp==-1 && serachObj.length == 0 && serachObjLots.length ==0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived":arrivalData.containerArrived}}
                    },  {"relation":"TContainerInternational","scope": {"include" : "TCompany","where": {"containerArrived":arrivalData.containerArrived}}},
                     "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                   "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]
                    //where: {"and": serachObj}

                });
            }
            else if(tempsteamp==-1 && serachObj.length > 0  && arrival.length==0 && serachObjLots.length ==0)
            {
                this.url = PIview._buildUrl(base, {
                    "include" : [{"relation":"TContainerDomestic","scope":{"include" : "TCompany"}},{"relation":"TContainerInternational","scope":{"include" : "TCompany"}},"TCompany" ,"TLocation","TShipmentDomestic",
                    {"relation":"TShipmentInternational" ,
                                "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                    where: {"and":[
                      {"or":customer},
                      {"or":company},
                      {"or":lotSearch}
                    ]
                    }


                });
            }
            else if(tempsteamp==-1 && serachObj.length > 0  && arrival.length>=0 && serachObjLots.length ==0)
            {
              this.url = PIview._buildUrl(base, {
                  "include": [{
                      "relation": "TContainerDomestic",
                      "scope": {"where": {"containerArrived":arrivalData.containerArrived}}
                  },  {"relation":"TContainerInternational","scope": {"include":"TCompany","where": {"containerArrived":arrivalData.containerArrived}}},
                   "TCompany", "TLocation", "TShipmentDomestic",
                   {"relation":"TShipmentInternational" ,
                               "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                   where: {"and":[
                     {"or":customer},
                     {"or":company},
                     {"or":lotSearch}
                   ]
                   }
                  //where: {"and": serachObj}

              });
            }
            $.ajax({
                url: this.url,
                success:function(data){
                    debugger;
                    if(searchContainerFlag){
                      var temp = []
                      for(var i in containerSearch){
                        temp.push(parseInt(containerSearch[i].containerTypeId))
                      }
                      var i =0
                      while(i<data.length){
                        if(i<data.length && data[i].TShipmentInternational.length>0){
                          if(temp.indexOf(parseInt(data[i].TShipmentInternational[0].TContainerType.id))==-1){
                            data.splice(i,1)
                            i=0
                          }
                          else{
                            i++
                          }
                        }
                        else if(i<data.length){
                          data.splice(i,1)
                          i=0
                        }
                        else{
                          i++
                        }
                      }
                    }
                    i=0
                    if(steamflag){
                      while(i<data.length){
                        if(i<data.length && data[i].TShipmentInternational.length>0){
                          if(steam.indexOf(parseInt(data[i].TShipmentInternational[0].steamshipLineId))==-1){
                            data.splice(i,1)
                            i=0
                          }
                          else{
                            i++
                          }
                        }
                        else if(i<data.length){
                          data.splice(i,1)
                          i=0
                        }
                        else{
                          i++
                        }
                      }
                    }
                    searchContainerFlag = false
                    steamflag = false
                    console.log('ajax ',data);
                    localStorage.setItem('conViewData',JSON.stringify(data))
                    this.setState({
                        viewData : data,
                        loaded:true
                    })
                    this.forceUpdate()

                }.bind(this)

            })





        }
    }

    viewChange(e){
        var index = e.target.selectedIndex ;
       // this.Where = {}
        var blob = e.target.value
       // var changedView = this.state.savedViews[index -1]
        this.Where = JSON.parse(blob)

        Object.defineProperty(this.Where,"Query",{enumerable:true ,
              writable: true,
              configurable: true,
              value:this.Query})


          var serachObj = []
          var serachObjLots =[]
          var shipType = []
          var containerSearch = []
          var isDomestic
          var intl = []
          var arrival = []
          var arrivedtemp,steamtemp
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

     var searchContainerFlag = false
     if(this.Where.Container && this.Where.Container.length > 0){
       var container = []
       var obj2 = {}
       for (var i in this.Where.Container) {

           obj2 = {"containerTypeId": this.Where.Container[i]}
           container.push(obj2);
       }
       containerSearch.push(container)
       searchContainerFlag = true
     }
          if (this.Where != undefined && this.Where!= null) {
              if (this.Where.Customer && this.Where.Customer.length > 0) {
                  var customer = []
                  var obj = {}
                  for (var i in this.Where.Customer) {
                      obj = {"customerId": this.Where.Customer[i]}
                      customer.push(obj);
                  }
                  serachObj.push(customer)
              }

              if (this.Where.Company && this.Where.Company.length > 0) {
                  var company = [];
                  var objCompany = {}
                  for (var j in this.Where.Company) {
                      objCompany = {"locationId": this.Where.Company[j]}
                      company.push(objCompany);
                  }
                  serachObj.push(company)
              }

              if (this.Where.status && this.Where.status.length) {
                  var Railstatus = [];
                  var objStatus = {};
                  for (var z in this.Where.status) {
                      objStatus = {"status": this.Where.status[z]}
                      Railstatus.push(objStatus)
                  }
                  serachObjLots.push(Railstatus)
              }

              if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.POSearch && this.Where.Query.POSearch != undefined) {
                  var poSearch = [{'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                  serachObj.push(poSearch)
              }

               if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch != undefined) {
                  var lotSearch = [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                  serachObj.push(lotSearch)
              }
              var arrivalData = {"containerArrived":-1}
              if(this.Where.Arrival =="1" || this.Where.Arrival =="0"){

                  arrivalData = {"containerArrived" : parseInt(this.Where.Arrival)}
                  arrival.push(arrivalData)
                  intl.push(arrivalData)
              }
              var tempsteamp = this.SteamLineArray.length>0?1:-1
              var steam = []
              var steamflag = false
              if(this.Where.SteamLine && this.Where.SteamLine.length>0){
                  steam = []
                  steamflag = true
                  for(var steamTemp in this.Where.SteamLine){
                    steam.push(this.Where.SteamLine[steamTemp])
                  }
                  var steamdata = {"containerSteamshipLineConfirmed" : this.Where.SteamLine }
                  intl.push(steamdata)
              }

              serachObj = [].concat.apply([], serachObj);
              serachObjLots = [].concat.apply([], serachObjLots);
              containerSearch = [].concat.apply([], containerSearch);
                   console.log("search obj second" , serachObj , serachObjLots)
              var PIview = createDataLoader(ContainerViewForm,{
                  queries:[{
                      endpoint: 'TPackagingInstructions',
                      filter: {
                          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                      }
                  }]
              })

              var base = 'TShipmentents';
              //TPackagingInstructionLots TContainerInternational
   if((containerSearch && containerSearch.length > 0)){

     this.url = PIview._buildUrl(base, {
         "include": ["TContainerInternational", "TCompany", "TLocation", "TShipmentDomestic",
          {"relation":"TShipmentInternational" ,"include":["TContainerType" , "TSteamshipLine"], "scope":{"include" : "TContainerType" , "where":{"or":containerSearch}}}]
         //where: {"and": serachObj}

     });
   }

    if(serachObjLots && serachObjLots.length>0){
                  this.url = PIview._buildUrl(base, {
                      "include": [{
                          "relation": "TContainerDomestic",
                          "scope": {"where": {"or": serachObjLots}}
                      }, {
                          "relation": "TContainerInternational",
                          "scope": {"include" : "TCompany","where": {"or": serachObjLots}}
                      }, "TCompany", "TLocation", "TShipmentDomestic",
                      {"relation":"TShipmentInternational" ,
                                  "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                      where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"or":lotSearch}
                      ]
                      }

                  });
              }
              if(tempsteamp!=-1 && serachObj.length > 0  && arrival.length>0 && serachObjLots.length ==0) {
                  this.url = PIview._buildUrl(base, {
                      "include": [{
                          "relation": "TShipmentDomestic",
                          "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                      }, {
                          "relation": "TContainerInternational",
                          "scope": {"include":"TCompany","where": {"and":[{"containerArrived": arrivalData.containerArrived},
                                                                          {"containerSteamshipLineConfirmed":tempsteamp}
                                                                              ]}}
                      }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                    "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                      where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"or":lotSearch}

                      ]
                      }

                  });
              }

             else if(tempsteamp!=-1 && serachObj.length >= 0  &&  arrival.length>=0 && serachObjLots.length ==0) {
                  debugger;
                  this.url = PIview._buildUrl(base, {
                      "include": [ {
                          "relation": "TContainerInternational",
                          "scope": {"include":"TCompany","where":{"containerSteamshipLineConfirmed":tempsteamp}}
                      }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                    "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                      where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"or":lotSearch}

                      ]
                      }

                  });
              }

              else if(tempsteamp!=-1 &&  arrival.length >= 0 && serachObj.length == 0  && serachObjLots.length ==0) {
                  debugger;
                  this.url = PIview._buildUrl(base, {
                      "include": [ {
                          "relation": "TContainerInternational",
                          "scope": {"include":"TCompany","where": {"and":[{"containerArrived": arrivalData.containerArrived},
                                                                          {"containerSteamshipLineConfirmed":tempsteamp}
                                                                              ]}}
                      }, "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                    "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]
                      //where: {"and": serachObj}

                  });
              }

              else if( arrival.length>0 && tempsteamp==-1 && serachObj.length == 0 && serachObjLots.length ==0) {
                  this.url = PIview._buildUrl(base, {
                      "include": [{
                          "relation": "TContainerDomestic",
                          "scope": {"where": {"containerArrived":arrivalData.containerArrived}}
                      },  {"relation":"TContainerInternational","scope": {"include" : "TCompany","where": {"containerArrived":arrivalData.containerArrived}}},
                       "TCompany", "TLocation", "TShipmentDomestic",   {"relation":"TShipmentInternational" ,
                                     "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]
                      //where: {"and": serachObj}

                  });
              }
              else if(tempsteamp==-1 && serachObj.length > 0  && arrival.length==0 && serachObjLots.length ==0)
              {
                  this.url = PIview._buildUrl(base, {
                      "include" : [{"relation":"TContainerDomestic","scope":{"include" : "TCompany"}},{"relation":"TContainerInternational","scope":{"include" : "TCompany"}},"TCompany" ,"TLocation","TShipmentDomestic",
                      {"relation":"TShipmentInternational" ,
                                  "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                      where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"or":lotSearch}
                      ]
                      }


                  });
              }
              else if(tempsteamp==-1 && serachObj.length > 0  && arrival.length>=0 && serachObjLots.length ==0)
              {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived":arrivalData.containerArrived}}
                    },  {"relation":"TContainerInternational","scope": {"include":"TCompany","where": {"containerArrived":arrivalData.containerArrived}}},
                     "TCompany", "TLocation", "TShipmentDomestic",
                     {"relation":"TShipmentInternational" ,
                                 "scope":{"include":["TContainerType" , "TSteamshipLine"]}}],
                     where: {"and":[
                       {"or":customer},
                       {"or":company},
                       {"or":lotSearch}
                     ]
                     }
                    //where: {"and": serachObj}

                });
              }
              $.ajax({
                  url: this.url,
                  success:function(data){
                      debugger;
                      if(searchContainerFlag){
                        var temp = []
                        for(var i in containerSearch){
                          temp.push(parseInt(containerSearch[i].containerTypeId))
                        }
                        var i =0
                        while(i<data.length){
                          if(data[i].TShipmentInternational.length>0){
                            if(temp.indexOf(parseInt(data[i].TShipmentInternational[0].TContainerType.id))==-1){
                              data.splice(i,1)
                              i=0
                            }
                            else{
                              i++
                            }
                          }
                          else{
                            i++
                          }
                        }
                      }
                      i=0
                      if(steamflag){
                        while(i<data.length){
                          if(data[i].TShipmentInternational.length>0){
                            if(i<data.length && steam.indexOf(parseInt(data[i].TShipmentInternational[0].steamshipLineId))==-1){
                              data.splice(i,1)
                              i=0
                            }
                            else{
                              i++
                            }
                          }
                          else if(i<data.length){
                            data.splice(i,1)
                            i=0
                          }
                          else{
                            i++
                          }
                        }
                      }
                      searchContainerFlag = false
                      steamflag = false
                      localStorage.setItem('conViewData',JSON.stringify(data))
                      this.setState({
                          viewData : data,
                          loaded:true
                      })
                      this.forceUpdate()

                  }.bind(this)

              })





          }

    }

    saveView(e){


        var saveCustomView = {
            "id": 0,
            "screenName": "CONTAINER",
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
 case "Container" :
   if(this.state.showContainer == ""){
    this.setState({
        showContainer : "none"
    })
}
else{
    this.setState({
        showContainer : ""
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
 case "Arrived" :
 console.log(e.target.name)
  if(this.state.showArrived == ""){
    this.setState({
        showArrived : "none"
    })
}
else{
    this.setState({
        showArrived : ""
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
 case "Type" :
 console.log(e.target.name)
  if(this.state.showType == ""){
    this.setState({
        showType : "none"
    })
}
else{
    this.setState({
        showType : ""
    })
}
break;
}
}



    onTextChange(e){
        var idValue = e.target.id
        this.Query[idValue] = e.target.value
        console.log(this.Query)
        this.onSearch(e)
    }

    SteamLine(e){
        console.log("valueShipment type" , e.target.value)
        this.SteamLine = e.target.value
        Object.defineProperty(this.Where,"SteamLine",{enumerable: true ,
            writable: true,
            configurable:true,
            value:this.SteamLine})
        this.onSearch(e)
    }

    lotSearch(e){
        this.Query[e.target.id] = e.target.getAttribute('value')
        console.log(this.Query)
        document.getElementById('LotSearch').value = e.target.getAttribute('value')
        this.onSearch(e)

    }
    handleTextChange(e){
        this.setState({
            Text  : e.target.value
        })
        this.onSearch(e)
    }
onViewClick(e){
    if(this.contId==undefined){
      swal("Info","Selection Missing","info")
      return
    }
        hashHistory.push('/Conatainer/containerDetails/'+this.contId + '/'+ this.type)
    }
    render(){
        var filterData = ''
        if(this.state.viewData && (this.state.viewData.length ==0 || this.state.viewData.length >0 )){

            filterData = this.state.viewData;
        }
        return(
            <section className="side-filter">
                <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
                    <div className="" id="hide1">
                        <h4 className="pull-left">REFINE YOUR RESULT </h4>
                        <button type="button" className="btn collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row-fluid">
    <FilterComponent key={this.state.key} onSteamShipFilter={this.onSteamShipFilter}  onContainerFilter={this.onContainerFilter}   Arrival={this.Arrival} SteamLine={this.SteamLine} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter}  lotSearch={this.lotSearch} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter}/>
<div id="filter-grid">
<div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
<div className="row">
   <FilterButton buttonDisplay = {this.buttonDisplay}  onButtonRemove = {this.onButtonRemove} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">
        <div className="pull-right " id="hide5">
            <select className="form-control"   id="customer_name" name="customer_name" onChange={this.viewChange}>
                <option value="Please Select An Option" disabled selected>Select custom view</option>
                {
                    _.map(this.state.savedViews , (views,index)=>{

                        if(views.screenName == "CONTAINER")
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
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="hide4">
                 <a href="javascript:void(0)" name = "ARB" onClick = {(e) => {this.onHideColumn(e,name)}}>ARB</a>
                 <a href="javascript:void(0)" name = "Customer" onClick = {(e) => {this.onHideColumn(e)}}>Customer</a>
                 <a href="javascript:void(0)" name = "Release" onClick={(e) => {this.onHideColumn(e)}}>Release</a>
                 <a href="javascript:void(0)" name = "Booking" onClick={(e) => {this.onHideColumn(e)}}>Booking</a>
                 <a href="javascript:void(0)" name = "Container" onClick={(e) => {this.onHideColumn(e)}}>Container</a>
                 <a href="javascript:void(0)" name = "Trucker" onClick={(e) => {this.onHideColumn(e)}}>Trucker</a>
                 <a href="javascript:void(0)" name = "Arrived" onClick={(e) => {this.onHideColumn(e)}}>Arrived</a>
                 <a href="javascript:void(0)" name = "SteamShip" onClick={(e) => {this.onHideColumn(e)}}>SteamShip Line</a>
                 <a href="javascript:void(0)" name = "Type" onClick={(e) => {this.onHideColumn(e)}}>Type</a>
                 </div>
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="table-responsive view_table viewLoad">
           <ContainerViewDataComponent  showARB = {this.state.showARB}
                        showCustomer = {this.state.showCustomer}
                        showRelease = {this.state.showRelease}
                        showBooking = {this.state.showBooking}
                        showContainer = {this.state.showContainer}
                        showTrucker = {this.state.showTrucker}
                        showArrived = {this.state.showArrived}
                        showSteamShip = {this.state.showSteamShip}
                        showType = {this.state.showType}
                        onCheckboxChange = {this.onCheckboxChange} key={this.state.index} onCheckboxChange = {this.onCheckboxChange} filterData = {filterData}/>
        </div>
        <div id="nonPrintable">
        <div className="row-fluid pddn-50-btm padding-top-btm-xs">
            <div className="pull-left margin-10-last-l"><button type="button" onClick={(e) => this.print(e)} className="btn  btn-primary">Print BOL</button></div>
            <div className="pull-left margin-10-all"><button type="button"  onClick={(e) => this.printLoadOrder(e)} className="btn  btn-primary">Print Load Order</button></div>
            <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray" onClick={this.addToqueue}>Add to Queue</button></div>
            <div className="pull-left margin-10-all"><button type="button" onClick={this.PrintScreen}  className="btn  btn-gray">Print</button></div>
            <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-success" onClick = {this.onViewClick.bind(this)}>View</button></div>
            <div className="pull-right margin-10-all"><button type="button" id="edit_btn"  className="btn  btn-orange" onClick = {this.onEdit}>EDIT</button></div>
        </div>
        <div className="row pddn-50-btm">
            <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name "
                       onChange = {this.handleTextChange}
                       value = {this.state.Text}/>
            </div>
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                <button type="button"   className="btn  btn-success margin-left-xs" onClick={this.saveView}>SAVE CUSTOMER VIEW</button>
            </div>
        </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</div>
</section>

                                                        )
    }
}
export default ContainerViewForm;
