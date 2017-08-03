import React from 'react';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router'
import FilterComponent from '../../../components/FilterComponent';
import FilterButton from '../../../components/FilterComponent/FilterButton';
import ViewDataComponent from '../../../components/ViewDataComponent/ViewDataComponent';
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import HeadBody from '../../../components/ViewDataComponent/HeadBody';
import axios from 'axios'
var Loader = require('react-loader')
import {Base_Url} from '../../../constants';
import '../../../public/stylesheets/style.css'
export default class PackagingInstructionViewForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            viewData : '',
            dataView : '',
            key : 0,
            selectedOption: 'lbs',
            index : 0,
            selectedOption1: 'lbs',
            showARB:"",
            showCustomer:"",
            showPO:"",
            Railcar:"",
            showLot:"",
            showMaterial:"",
            showConfmd:"",
            showArrvd:"",
            showRecd:"",
            showCutoff:"",
            showWeight:"",
            showBag:"",
            showInInvt:"",
            showStatus:"",
            showRailcarArr:"",
            showRailcarArrD:"",
            showRailcarDep:"",
            showRailcarDepDate:"",
            showDaysPresent:"",
            showRailcarStatus:"",
            startDate:'',
            endDate:'',
            OptionToGroupby :["ARB","Customer","PO#","Railcar#","Lot#","Material","Status","Railcar Status"],
            SelcetedOptionForGroupBy : ""
        }
        this.status
        this.buttonDisplay = [ ]
        this.checkedCustomer = [ ]
        this.checkedStatus = [ ]
        this.checkedCompany = [ ]
        this.Query = {}
        this.Where = { }
        this.qArray = []
        this.selected = null
        this.piID = null
        this.showARB ="block"
        this.onClickli = this.onClickli.bind(this)
        this.onClickPo = this.onClickPo.bind(this)
        this.lotSearch = this.lotSearch.bind(this)
        this.onCompanyFilter = this.onCompanyFilter.bind(this)
        this.onCustomerFilter =  this.onCustomerFilter.bind(this)
        this.onStatusFilter = this.onStatusFilter.bind(this)
        this.onRailCarArrivalFilter = this.onRailCarArrivalFilter.bind(this);
        this.onRemove = this.onRemove.bind(this)
        this.onButtonRemove = this.onButtonRemove.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.saveView = this.saveView.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.viewChange = this.viewChange.bind(this)
        this.checkboxChange = this.checkboxChange.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleOptionChange1 = this.handleOptionChange.bind(this)
        this.onEdit =this.onEdit.bind(this)
        this.qArray = []
        this.addToQueue = this.addToQueue.bind(this)
        this.headerCheckboxChange = this.headerCheckboxChange.bind(this)
        this.EndDate = ''
        this.StartDate = ''
        this.getdt = this.getdt.bind(this)
        this.PrintScreen = this.PrintScreen.bind(this)
        this.OnGroupBy = this.OnGroupBy.bind(this)
        this.railcarArrival = '';
    }
    componentWillMount() {
        axios.get(Base_Url+"TCustomViews").then(response=>{
            this.setState({
                savedViews : response.data
            })
        })
        axios.get(Base_Url+"TContainerLoads").then(response=>{
            this.setState({
                contanerLoad : response.data
            })
        })
        axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
            this.setState({
                queue_Sequence : response.data
            })
        })

    }
    getdt(a){
        a.id=="1"?this.startDate = a.tempDate:this.endDate=a.tempDate;
        this.onSearch(a)
    }
    onTextChange(e){
        var idValue = e.target.id
        this.Query[idValue] = e.target.value
        this.onSearch(e)
    }
    OnGroupBy(e){
        this.setState({
            SelcetedOptionForGroupBy : e.target.value
        })
        this.forceUpdate()
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
    PrintScreen(){
        var scrollLeft = document.getElementsByClassName("loadedContentNew")[0].scrollLeft
        debugger;
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
        console.log(printContent)
        document.body.innerHtml = printContent
        window.print()
        window.location.reload()

    }
    onSearch(e){
        var cutofFilter = []
        var flagForcutOffFilter = false
        if(this.startDate && this.endDate) {
            var cutoffDate = []
            cutoffDate.push(this.startDate)
            cutoffDate.push(this.endDate)

            var objdate = {}
            for(var j in cutoffDate){
                objdate = {"cargoCutoffDate" : cutoffDate[j]}
                cutofFilter.push(objdate)
            }
            Object.defineProperty(this.Where,"CutofFilter",{enumerable:true ,
                writable: true,
                configurable: true,
                value:cutofFilter})
            flagForcutOffFilter = true

        }
        if(this.Query != undefined){
            Object.defineProperty(this.Where,"Query",{enumerable:true ,
                writable: true,
                configurable: true,
                value:this.Query})
        }

        var serachObj = []
        var serachObjLots =[]
        if (this.Where != undefined && this.Where!= null)
        {
            if(this.Where.Customer && this.Where.Customer.length >0){
                var customer = []
                var obj = {}
                for(var i in this.Where.Customer){
                    obj = {"customer_id" : this.Where.Customer[i] }
                    customer.push(obj);
                }

            }

            if(this.Where.Company && this.Where.Company.length > 0){
                var company = [] ;
                var objCompany = {}
                for(var j in this.Where.Company)
                {
                    objCompany = {"location_id" : this.Where.Company[j] }
                    company.push(objCompany);
                }

            }
            var Railstatus = [];
            if(this.Where.status && this.Where.status.length){


                var temp = []
                var objStatus = {};
                for(var z in this.Where.status){
                    objStatus = {"status" : this.Where.status[z]}
                    Railstatus.push(objStatus)
                }
                //Railstatus.push(temp)
                //serachObjLots.push(Railstatus)
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
                var lotSearch =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                serachObjLots.push(lotSearch)
            }
            if(this.railcarArrival===true){
                var arrivalSerach = [{'railcar_status':'ARRIVED'}]
                serachObjLots.push(arrivalSerach)
            }
            else if(this.railcarArrival===false){
                var arrivalSerach = [{'railcar_status':'INTRANSIT'}]
                serachObjLots.push(arrivalSerach)
            }
            serachObj = [].concat.apply([], serachObj);
            serachObjLots = [].concat.apply([], serachObjLots);
            var PIview = createDataLoader(PackagingInstructionViewForm, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                    }
                }]
            });
            var base = 'TPackagingInstructions';
            if(serachObjLots && serachObjLots.length > 0 ){

                this.urlSearch = PIview._buildUrl(base, {
                    include : ["TLocation" , "TCompany" ,{"relation": "TPackagingInstructionLots", "scope":
                    {
                        "include" :{
                            "relation" : "TShipmentLots" ,
                            "scope":{
                                "include":{
                                    "relation":"TShipmentent" ,
                                    "scope":{"include" : "TShipmentInternational",
                                        "scope":{"where" : {"and" : cutofFilter }}
                                    }}}},
                        "where":{ "and": [{"and":serachObjLots},{active:1},{"or":Railstatus}]}
                    }
                    }
                    ],
                    where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"and":serachObjLots},
                        { "or": serachObj },
                        {"or":Railstatus}
                    ]
                    }
                });
            }

            else {
                this.urlSearch = PIview._buildUrl(base, {
                    include : [
                        {"relation":"TPackagingInstructionLots" ,
                            "scope":{
                                "include" :{
                                    "relation" : "TShipmentLots" ,
                                    "scope":{
                                        "include":{
                                            "relation":"TShipmentent" ,
                                            "scope":{"include" : "TShipmentInternational",
                                                "scope":{"where" : {"and" : cutofFilter }}
                                            }}}},
                                "where":{ "and": [{"and":serachObjLots},{active:1},{"or":Railstatus}]}
                            }},
                        "TLocation" ,
                        "TCompany"],
                    where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"and":serachObj},
                        {"or":serachObjLots},
                    ]
                    }
                });
            }


            $.ajax({
                url: this.urlSearch,
                success:function(data){
                    var flag = false;
                    console.log('ajax ',data);
                    var st = this.startDate,
                        ed = this.endDate,
                        i=0,
                        flagToDecideIncrement = true

                    if(flagForcutOffFilter && data.length>0){

                        while(i<data.length){
                            flagToDecideIncrement = true
                            if(data[i].TPackagingInstructionLots.length<1){
                                data.splice(i,1)
                                i = i==0?0:i-1
                                flagToDecideIncrement = false
                            }
                            else{
                                for(var j in data[i].TPackagingInstructionLots){

                                    if(!data[i].TPackagingInstructionLots[j].TShipmentLots || data[i].TPackagingInstructionLots[j].TShipmentLots.length<1){
                                        data[i].TPackagingInstructionLots.splice(j,1)
                                        i = i==0?0:i-1
                                        flagToDecideIncrement = false
                                        break
                                    }
                                    else{
                                        for(var k in data[i].TPackagingInstructionLots[j].TShipmentLots){
                                            var date = new Date(data[i].TPackagingInstructionLots[j].TShipmentLots[k].TShipmentent.TShipmentInternational.length>0?data[i].TPackagingInstructionLots[j].TShipmentLots[k].TShipmentent.TShipmentInternational[0].cargoCutoffDate:new Date('01-01-0001'))
                                            if(date > new Date(this.endDate) || date<new Date(this.startDate)){
                                                data[i].TPackagingInstructionLots.splice(j,1)
                                                i = i==0?0:i-1
                                                flagToDecideIncrement = false
                                                break
                                            }
                                        }
                                    }
                                    if(!flagToDecideIncrement){
                                        break
                                    }
                                }
                            }
                            if(flagToDecideIncrement){
                                i++
                            }
                        }
                    }

                    localStorage.setItem('piViewData', JSON.stringify(data));
                    this.setState(
                        {
                            viewData : data
                        }
                    )
                    this.forceUpdate();
                }.bind(this)

            })
        }
    }
    onRailCarArrivalFilter(e,option){
        debugger
        let filterValue = ''
        if(option===1){
            filterValue = true

        }
        else if(option===0){
            filterValue = false;
        }
        else{
            filterValue = ''
        }
        this.railcarArrival = filterValue;
        Object.defineProperty(this.Where,"railcar_status",{enumerable: true ,
            writable: true,
            configurable:true,
            value:filterValue})
        this.onSearch(e);
    }
    onCompanyFilter(e,location){

        if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                writable: true,
                configurable:true,
                value:this.checkedCompany})

        }
        else if (!e.target.checked){
            let id = e.target.id
            this.checkedCompany = _.without(this.checkedCompany,id)
            this.Where.Company = this.checkedCompany
            if(Object.keys(this.Where.Company).length === 0){
                this.Where.Company = undefined
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

            this.forceUpdate()


        }
        else if (!e.target.checked){
            let value = e.target.value

            this.checkedStatus = _.without(this.checkedStatus,value)
            this.Where.status = this.checkedStatus

            if(Object.keys(this.Where.status).length === 0){
                this.Where.status = undefined
                delete this.Where.status
            }
            console.log(this.Where)

            let index = this.buttonDisplay.indexOf(e.target.value)
            if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)

            this.forceUpdate()
        }
        this.onSearch(e)
    }


    handleTextChange(e){
        this.setState({
            Text  : e.target.value
        })

    }
    viewChange(e){
        debugger
        var index = e.target.selectedIndex ;
        var blob = e.target.value
        var changedView = this.state.savedViews[index -1]
        this.Where = JSON.parse(blob)


        var cutofFilter = []
        var flagForcutOffFilter = false


        if(this.Where.CutofFilter){
            this.startDate = new Date(this.Where.CutofFilter[0].cargoCutoffDate)
            this.endDate = new Date(this.Where.CutofFilter[this.Where.CutofFilter.length-1].cargoCutoffDate)
        }
        if(this.startDate && this.endDate) {

            var cutoffDate = []
            cutoffDate.push(this.startDate)
            cutoffDate.push(this.endDate)

            var objdate = {}
            for(var j in cutoffDate){
                objdate = {"cargoCutoffDate" : cutoffDate[j]}
                cutofFilter.push(objdate)
            }
            Object.defineProperty(this.Where,"CutofFilter",{enumerable:true ,
                writable: true,
                configurable: true,
                value:cutofFilter})

            flagForcutOffFilter = true

        }

        var serachObj = []
        var serachObjLots =[]
        if (this.Where != undefined && this.Where!= null)
        {
            if(this.Where.railcar_status===true){
                var arrivalSerach = [{'railcar_status':'ARRIVED'}]
                serachObjLots.push(arrivalSerach)
            }
            else if(this.Where.railcar_status===false){
                var arrivalSerach = [{'railcar_status':'INTRANSIT'}]
                serachObjLots.push(arrivalSerach)
            }
            if(this.Where.Customer && this.Where.Customer.length >0){
                var customer = []
                var obj = {}
                for(var i in this.Where.Customer){
                    obj = {"customer_id" : this.Where.Customer[i] }
                    customer.push(obj);
                }

            }

            if(this.Where.Company && this.Where.Company.length > 0){
                var company = [] ;
                var objCompany = {}
                for(var j in this.Where.Company)
                {
                    objCompany = {"location_id" : this.Where.Company[j] }
                    company.push(objCompany);
                }

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
                var lotSearch =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                serachObjLots.push(lotSearch)
            }

            serachObj = [].concat.apply([], serachObj);
            serachObjLots = [].concat.apply([], serachObjLots);
            var PIview = createDataLoader(PackagingInstructionViewForm, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                    }
                }]
            });
            var base = 'TPackagingInstructions';

            if(serachObjLots && serachObjLots.length > 0 ){

                this.urlSearch = PIview._buildUrl(base, {
                    include : ["TLocation" , "TCompany" ,{"relation": "TPackagingInstructionLots", "scope":
                    {
                        "include" :{
                            "relation" : "TShipmentLots" ,
                            "scope":{
                                "include":{
                                    "relation":"TShipmentent" ,
                                    "scope":{"include" : "TShipmentInternational",
                                        "scope":{"where" : {"or" : cutofFilter }}
                                    }}}},
                        "where":{ "and": [{"and":serachObjLots},{active:1}]}
                    }
                    }
                    ],
                    where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"and":serachObjLots},
                        { "or": serachObj }
                    ]
                    }
                });
            }

            else {
                this.urlSearch = PIview._buildUrl(base, {
                    include : [
                        {"relation":"TPackagingInstructionLots" ,
                            "scope":{
                                "include" :{
                                    "relation" : "TShipmentLots" ,
                                    "scope":{
                                        "include":{
                                            "relation":"TShipmentent" ,
                                            "scope":{"include" : "TShipmentInternational",
                                                "scope":{"where" : {"or" : cutofFilter }}
                                            }}}},
                                "where":{ "and": [{"and":serachObjLots},{active:1}]}
                            }},
                        "TLocation" ,
                        "TCompany"],
                    where: {"and":[
                        {"or":customer},
                        {"or":company},
                        {"and":serachObj},
                        {"or":serachObjLots},
                    ]
                    }
                });
            }


            $.ajax({
                url: this.urlSearch,
                success:function(data){
                    var flag = false;
                    console.log('ajax ',data);
                    var st = this.startDate,
                        ed = this.endDate,
                        i=0,
                        flagToDecideIncrement = true

                    if(flagForcutOffFilter && data.length>0){

                        while(i<data.length){
                            flagToDecideIncrement = true
                            if(data[i].TPackagingInstructionLots.length<1){
                                data.splice(i,1)
                                i = i==0?0:i-1
                                flagToDecideIncrement = false
                            }
                            else{
                                for(var j in data[i].TPackagingInstructionLots){

                                    if(!data[i].TPackagingInstructionLots[j].TShipmentLots || data[i].TPackagingInstructionLots[j].TShipmentLots.length<1){
                                        data[i].TPackagingInstructionLots.splice(j,1)
                                        i = i==0?0:i-1
                                        flagToDecideIncrement = false
                                        break
                                    }
                                    else{
                                        for(var k in data[i].TPackagingInstructionLots[j].TShipmentLots){

                                            var date = new Date(data[i].TPackagingInstructionLots[j].TShipmentLots[k].TShipmentent.TShipmentInternational.length>0?data[i].TPackagingInstructionLots[j].TShipmentLots[k].TShipmentent.TShipmentInternational[0].cargoCutoffDate:new Date('01-01-0001'))
                                            if(date > new Date(this.endDate) || date<new Date(this.startDate)){
                                                data[i].TPackagingInstructionLots.splice(j,1)
                                                i = i==0?0:i-1
                                                flagToDecideIncrement = false
                                                break
                                            }
                                        }
                                    }
                                    if(!flagToDecideIncrement){
                                        break
                                    }
                                }
                            }
                            if(flagToDecideIncrement){
                                i++
                            }
                        }
                    }

                    localStorage.setItem('piViewData', JSON.stringify(data));
                    this.setState(
                        {
                            viewData : data
                        }
                    )
                    this.forceUpdate()

                }.bind(this)

            })
        }
    }
    saveView(e){
        for(var props in this.Where.Query){
            var obj = {[props]:this.Where.Query[props]}
            this.Where.Query[props] = this.Where.Query[props]
        }
        var saveCustomView = {
            "id": 0,
            "screenName": "PACKAGING",
            "viewName": this.state.Text,
            "viewFilters": JSON.stringify(this.Where),
            "createdBy": 0,
            "createdOn": "2016-09-26",
            "modifiedBy": 0,
            "modifiedOn": "2016-09-26",
            "active": 1
        }
        if(saveCustomView.viewFilters != undefined && saveCustomView.viewFilters != null){
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

    handleOptionChange1(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    handleOptionChange(changeEvent) {
        var selectedOption = changeEvent.target.value
        this.setState({
            selectedOption: changeEvent.target.value
        });
        console.log( selectedOption);
    }

    onViewClick(e){
        if(this.selected != undefined || this.piID != undefined){
            hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)}
        else
        {
            swal("Selection Missing", "Please Select A Lot To View.","error")
        }
    }
    headerCheckboxChange(e,value){


        if(e.target.checked){
            this.piID = e.target.value
                    }
        else if(!e.target.checked){
            this.piID = undefined

        }

    }
    checkboxChange(e,value){

        if(e.target.checked){
            this.piID = e.target.value
            this.selected = e.target.id
            this.status = value.status
        }
        else if(!e.target.checked){
            this.selected = null
            this.piID = null
            this.status = null

        }

    }
    onButtonRemove(index,button){
        this.buttonDisplay.splice(index,1)

        this.forceUpdate()

    }
    onRemove(e){


        this.buttonDisplay = [];
        this.checkedCustomer = []
        this.checkedStatus = []
        this.checkedCompany = []
        this.Query = []
        delete this.Where.Company
        delete this.Where.Customer
        delete this.Where.status
        delete this.state.viewData
        delete this.state.SelcetedOptionForGroupBy
        this.setState({
            key : this.state.key +1,
            index : this.state.index +1,
            SelcetedOptionForGroupBy : ""
        })
        document.getElementById('groupBy').selectedIndex = 0
        document.getElementById('customer_name').selectedIndex = 0
        localStorage.removeItem('piViewData')
        this.forceUpdate();

    }
    onConfirmClick(){
        if(this.selected != undefined && this.selected != null){

            if(this.status == "UNCONFIRMED"){
                hashHistory.push('/Packaging/confirmpckginst/'+this.selected)
            }

            else{
                swal("Error","Please select unconfirmed order","error")
            }
        }
        else
        {
            swal("Selection Missing", "Please select a lot to confirm.","error")
        }
    }

    onEdit(){
        if(this.piID != null && this.piID != undefined && this.selected == null){

            hashHistory.push('/Packaging/enterpackginginst/'+this.piID)
        }
        else if(this.selected != null && this.selected != undefined)
        {
            hashHistory.push('/Packaging/enterpackginginst/'+this.piID +'/'+ this.selected)
        }
        else{
            swal("Nothing To Edit","Please Select A PI To Edit.","error")
        }
    }

    addToQueue(e){

        let pid = this.piID
        var qArray =  localStorage.getItem('qArray')
        var sequence =  localStorage.getItem('queue_Sequence')
        var queueArray = qArray.split(",")

        localStorage.removeItem('qArray');
        localStorage.removeItem('queue_Sequence');
        var option = {
            queue_sequence : parseInt(sequence) + 1
        }

        var optionpkg = {

            status : "QUEUED"
        }
        if(this.status == "READY" || this.status == "CONFIRMED"){
            if(queueArray && queueArray.length > 0 && qArray!= null){
                queueArray.forEach((id , index)=>{
                    axios.put( Base_Url+"TPackagingInstructionLots/"+id , {queue_sequence : option.queue_sequence + parseInt(index) , status : "QUEUED"}).then(function(response){
                        console.log("Queue Added" , response)
                        swal({
                                title: "Success",
                                text: "Successfully added to the queue",
                                type: "success",
                                showCancelButton: true,
                            },
                            function(isConfirm){
                                hashHistory.push('/Packaging/packaginginstqueue/')

                            }
                        );
                    }).catch(function(err){
                        console.log("Error Is" + err)
                    })
                })
            }
            else{
                alert('Please select row ')
            }

        }

        else {
            swal("","The selected order is not ready","info")
        }
    }
    onHideColumn(e,name){

        setTimeout(function () {
        $("#Packaging_Instruction_View").colResizable({
            disable: true
        });

        $("#Packaging_Instruction_View").colResizable({
            liveDrag:false,
            gripInnerHtml:"<div class='grip'></div>",
            draggingClass:"dragging",
        });
        },100);

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
            case "Railcar" :
                console.log(e.target.name)
                if(this.state.showRailcar == ""){
                    this.setState({
                        showRailcar : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcar : ""
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
            case "Arrvd" :
                console.log(e.target.name)
                if(this.state.showArrvd == ""){
                    this.setState({
                        showArrvd : "none"
                    })
                }
                else{
                    this.setState({
                        showArrvd : ""
                    })
                }
                break;
            case "Recd" :
                console.log(e.target.name)
                if(this.state.showRecd == ""){
                    this.setState({
                        showRecd : "none"
                    })
                }
                else{
                    this.setState({
                        showRecd : ""
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
            case "Weight" :
                console.log(e.target.name)
                if(this.state.showWeight == ""){
                    this.setState({
                        showWeight : "none"
                    })
                }
                else{
                    this.setState({
                        showWeight : ""
                    })
                }
                break;
            case "Bag" :
                console.log(e.target.name)
                if(this.state.showBag == ""){
                    this.setState({
                        showBag : "none"
                    })
                }
                else{
                    this.setState({
                        showBag : ""
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
            case "RailcarArr" :
                console.log(e.target.name)
                if(this.state.showRailcarArr == ""){
                    this.setState({
                        showRailcarArr : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcarArr : ""
                    })
                }
                break;
            case "RailcarArrD" :
                console.log(e.target.name)
                if(this.state.showRailcarArrD == ""){
                    this.setState({
                        showRailcarArrD : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcarArrD : ""
                    })
                }
                break;
            case "RailcarDep" :
                console.log(e.target.name)
                if(this.state.showRailcarDep == ""){
                    this.setState({
                        showRailcarDep : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcarDep : ""
                    })
                }
                break;
            case "RailcarDepDate" :
                console.log(e.target.name)
                if(this.state.showRailcarDepDate == ""){
                    this.setState({
                        showRailcarDepDate : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcarDepDate : ""
                    })
                }
                break;
            case "DaysPresent" :
                console.log(e.target.name)
                if(this.state.showDaysPresent == ""){
                    this.setState({
                        showDaysPresent : "none"
                    })
                }
                else{
                    this.setState({
                        showDaysPresent : ""
                    })
                }
                break;
            case "RailcarStatus" :
                console.log(e.target.name)
                if(this.state.showRailcarStatus == ""){
                    this.setState({
                        showRailcarStatus : "none"
                    })
                }
                else{
                    this.setState({
                        showRailcarStatus : ""
                    })
                }
                break;
        }
    }
    print(e){
        if(this.status==undefined || this.status==null){
            swal("" , "Please Select a single Lot" , "info")
            return
        }
        if(this.status == "UNCONFIRMED"){
            swal("" , "The Order is not confirmed yet" , "info")
            return
        }
        if(this.selected != undefined || this.piID != undefined){
            console.log('print view',this.piID+'/'+this.selected)
            hashHistory.push('/Packaging/packagingInstFormPrint/'+this.piID+'/'+this.selected)
        }
        else
        {
            swal("Selection Missing", "Please Select A Lot To View.","error")
            return
        }
    }
    render() {
        var index = 0
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

                        <FilterComponent getdt = {this.getdt} startDate = {this.StartDate} endDate = {this.EndDate} key={this.state.key} lotSearch={this.lotSearch}   onClickPo={this.onClickPo}  onClickli={this.onClickli} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter} onRailCarArrivalFilter={this.onRailCarArrivalFilter}/>
                        <div id="filter-grid">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
                                <div className="pull-right margin-30-right" id="hide2">
                                    <label className="control control--radio ">LBS
                                        <input id="Modify_User" name="Modify_User" type="radio"
                                               type="radio"
                                               id="ADDCustomers"
                                               name="ADDCustomers"
                                               value="lbs"
                                               onChange={this.handleOptionChange}
                                               checked={this.state.selectedOption==='lbs'}
                                            /><div className="control__indicator"></div>
                                    </label>
                                </div>
                                <div className="pull-right margin-30-right" id="hide3">
                                    <label className="control control--radio ">Kg
                                        <input id="Modify_User" name="Modify_User" type="radio"
                                               id="ADDCustomers"
                                               name="ADDCustomers"
                                               value="kg"
                                               onChange={this.handleOptionChange1}
                                               checked={this.state.selectedOption==='kg'}
                                            /><div className="control__indicator"></div>
                                    </label>
                                </div>


                                <div className="row">
                                    <FilterButton buttonDisplay = {this.buttonDisplay}  onButtonRemove = {this.onButtonRemove} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                        <div className="pull-right " id="hide5">

                                            <select className="form-control" id="groupBy" name="groupBy" onChange={this.OnGroupBy}>
                                                <option value="Please Select An Option To Group by" disabled selected>Select An Option To Group by</option>
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
                                                        if(views.screenName == "PACKAGING") {
                                                            return (

                                                                <option key={index} value={views.viewFilters}>{views.viewName}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="hide4">
                                <a href="javascript:void(0)" name = "ARB" onClick = {(e) => {this.onHideColumn(e,name)}}>ARB</a>
                                <a href="javascript:void(0)" name = "Customer" onClick = {(e) => {this.onHideColumn(e)}}>Customer</a>
                                <a href="javascript:void(0)" name = "PO" onClick={(e) => {this.onHideColumn(e)}}>PO#</a>
                                <a href="javascript:void(0)" name = "Railcar" onClick={(e) => {this.onHideColumn(e)}}>Railcar#</a>
                                <a href="javascript:void(0)" name = "Lot" onClick={(e) => {this.onHideColumn(e)}}>Lot#</a>
                                <a href="javascript:void(0)" name = "Material" onClick={(e) => {this.onHideColumn(e)}}>Material</a>
                                <a href="javascript:void(0)" name = "Confmd" onClick={(e) => {this.onHideColumn(e)}}>Confirmed?</a>
                                <a href="javascript:void(0)" name = "Arrvd" onClick={(e) => {this.onHideColumn(e)}}>Arrived?</a>
                                <a href="javascript:void(0)" name = "Recd" onClick={(e) => {this.onHideColumn(e)}}>Shipment Received?</a>
                                <a href="javascript:void(0)" name = "Cutoff" onClick={(e) => {this.onHideColumn(e)}}>Cutoff</a>
                                <a href="javascript:void(0)" name = "Weight" onClick={(e) => {this.onHideColumn(e)}}>Weight</a>
                                <a href="javascript:void(0)" name = "Bag" onClick={(e) => {this.onHideColumn(e)}}>Qty Allocated</a>
                                <a href="javascript:void(0)" name = "InInvt" onClick={(e) => {this.onHideColumn(e)}}>Qty Packaged</a>
                                <a href="javascript:void(0)" name = "Status"onClick={(e) => {this.onHideColumn(e)}}>Status</a>
                                <a href="javascript:void(0)" name = "RailcarArr" onClick={(e) => {this.onHideColumn(e)}}>Railcar Arrival</a>

                                <a href="javascript:void(0)" name = "RailcarArrD" onClick={(e) => {this.onHideColumn(e)}}>Railcar Arrival Date</a>
                                <a href="javascript:void(0)" name = "RailcarDep" onClick={(e) => {this.onHideColumn(e)}}>Railcar Departure</a>
                                <a href="javascript:void(0)" name = "RailcarDepDate" onClick={(e) => {this.onHideColumn(e)}}>Railcar Departure Date</a>
                                <a href="javascript:void(0)" name = "DaysPresent" onClick={(e) => {this.onHideColumn(e)}}>Railcar Days Present</a>
                                <a href="javascript:void(0)" name = "RailcarStatus" onClick={(e) => {this.onHideColumn(e)}}>Railcar Status</a>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"  >
                                <div className="">

                                    {this.props.id != undefined ? <ViewDataComponent
                                        SelcetedOptionForGroupBy = {this.state.SelcetedOptionForGroupBy}
                                        headerCheckboxChange = {this.headerCheckboxChange}
                                        showARB = {this.state.showARB}
                                        showCustomer = {this.state.showCustomer}
                                        showPO = {this.state.showPO}
                                        Railcar = {this.state.showRailcar}
                                        showLot = {this.state.showLot}
                                        showMaterial = {this.state.showMaterial}
                                        showConfmd = {this.state.showConfmd}
                                        showArrvd = {this.state.showArrvd}
                                        showRecd = {this.state.showRecd}
                                        showCutoff = {this.state.showCutoff}
                                        showWeight = {this.state.showWeight}
                                        showBag = {this.state.showBag}
                                        showInInvt = {this.state.showInInvt}
                                        showStatus = {this.state.showStatus }
                                        showRailcarArr = {this.state.showRailcarArr}
                                        showRailcarArrD = {this.state.showRailcarArrD}
                                        showRailcarDep = {this.state.showRailcarDep}
                                        showRailcarDepDate = {this.state.showRailcarDepDate}
                                        showDaysPresent = {this.state.showDaysPresent}
                                        showRailcarStatus = {this.state.showRailcarStatus}
                                        checkboxChange = {this.checkboxChange}
                                        key={this.state.index}
                                        filterData = {filterData}
                                        id = {this.props.id}
                                        weight={this.state.selectedOption}
                                        contanerLoad = {this.state.contanerLoad}/>
                                        :
                                        <ViewDataComponent
                                            SelcetedOptionForGroupBy = {this.state.SelcetedOptionForGroupBy}
                                            checkboxChange = {this.checkboxChange}
                                            headerCheckboxChange = {this.headerCheckboxChange}
                                            key={this.state.index}
                                            showARB = { this.state.showARB }
                                            showCustomer = {this.state.showCustomer}
                                            showPO = {this.state.showPO}
                                            Railcar = {this.state.showRailcar}
                                            showLot = {this.state.showLot}
                                            showMaterial = {this.state.showMaterial}
                                            showConfmd = {this.state.showConfmd}
                                            showArrvd = {this.state.showArrvd}
                                            showRecd = {this.state.showRecd}
                                            showCutoff = {this.state.showCutoff}
                                            showWeight = {this.state.showWeight}
                                            showBag = {this.state.showBag}
                                            showInInvt = {this.state.showInInvt}
                                            showStatus = {this.state.showStatus }
                                            showRailcarArr = {this.state.showRailcarArr}
                                            showRailcarArrD = {this.state.showRailcarArrD}
                                            showRailcarDep = {this.state.showRailcarDep}
                                            showRailcarDepDate = {this.state.showRailcarDepDate}
                                            showDaysPresent = {this.state.showDaysPresent}
                                            showRailcarStatus = {this.state.showRailcarStatus}
                                            filterData = {filterData}
                                            weight={this.state.selectedOption}
                                            contanerLoad = {this.state.contanerLoad}/>}

                                </div>
                                <div id="nonPrintable">
                                    <div className="row-fluid pddn-50-btm padding-top-btm-xs">

                                        <div className="pull-left margin-10-last-l"><button type="button" onClick = {(e)=>{this.print(e)}} className="btn  btn-gray">Print Packaging Instruction</button></div>
                                        <div className="pull-left margin-10-all"><button type="button" onClick={this.addToQueue} className="btn  btn-gray">Add To Queue</button></div>
                                        <div className="pull-left margin-10-all"><button type="button" onClick={this.PrintScreen}  className="btn  btn-gray">Print</button></div>
                                        <div className="pull-right margin-10-last-r"><button type="button" onClick={(e) => this.onViewClick(e)} className="btn  btn-primary">View</button></div>
                                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn" onClick={this.onEdit}  className="btn  btn-orange">EDIT</button></div>
                                        <div className="pull-right margin-10-all"><button type="button" onClick = {(e) => this.onConfirmClick(e)}  className="btn  btn-default">Confirm</button></div>


                                    </div>

                                    <div className="row pddn-50-btm">
                                        <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

                                        <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="No_of_Bages_Pallat"
                                                placeholder="Enter a name for your custom saved view"
                                                onChange = {this.handleTextChange}
                                                value = {this.state.Text}
                                                />
                                        </div>

                                        <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                                            <button type="button" onClick={(e) => this.saveView(e)} className="btn  btn-success margin-left-xs">SAVE CUSTOM VIEW</button>
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