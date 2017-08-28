import React from 'react';
var moment = require('moment');
import Datetime from 'react-datetime';

import {Base_Url} from '../../../constants';
import axios from 'axios';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import FilterComponent from '../../../components/FilterComponent';
import FilterButton from '../../../components/FilterComponent/FilterButton';
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css'
import './js/tableHeadFixer.js'
import './js/jquery.dataTables.min.js'
import '../../../public/stylesheets/style.css'
import { hashHistory } from 'react-router'
const MUL_FACTOR = 2.204625
export default class RailcarArrivalEntryForm extends React.Component {
    constructor(props){
        super(props);
        this.buttonDisplay = [ ]
        this.checkedCustomer = [ ]
        this.checkedStatus = [ ]
        this.checkedCompany = [ ]
        this.Query = [ ]
        this.Where = { }
        this.cartArray = [ ]
        this.dateTime = ''
        this.state = {
            dateTime:'',
            chekVals:[],
            startDate : '',
            key:0,
            selectedOption: 'lbs',
            selectedOption1: 'lbs',
        }
        this.updateCartArrival = this.updateCartArrival.bind(this);
        this.handledate = this.handledate.bind(this)
        this.lotOrderValue=[]
        this.onClickli = this.onClickli.bind(this)
        this.onClickPo = this.onClickPo.bind(this)
        this.lotSearch = this.lotSearch.bind(this)
        this.click = this.click.bind(this);
        this.onCompanyFilter = this.onCompanyFilter.bind(this)
        this.onCustomerFilter =  this.onCustomerFilter.bind(this)
        this.onStatusFilter = this.onStatusFilter.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleOptionChange1 = this.handleOptionChange1.bind(this)
    }


    onTextChange(e){
        this.Query[e.target.id] = e.target.value
        //	console.log(this.Query)
        this.onSearch(e)
    }

    handledate(event) {
        debugger
        var dateTime = parseInt(event._d.getMonth()) +1 +'/'+parseInt(event._d.getDate())+'/' +parseInt(event._d.getFullYear())+' '+parseInt(event._d.getHours())+':'+parseInt(event._d.getMinutes())+':'+event._d.getSeconds();
        this.startDate = dateTime
        //this.setState({startDate : dateTime, dateTime:event})
    }

    onClickPo(e){
        this.Query[e.target.id] = e.target.getAttribute('value')
        document.getElementById('POSearch').value = e.target.getAttribute('value')
        //console.log(this.Query)
        //console.log('>>>>>> target Value' , e.target.value)
        this.onSearch(e)
    }

    lotSearch(e){
        this.Query[e.target.id] = e.target.getAttribute('value')
        ///	console.log(this.Query)
        document.getElementById('LotSearch').value = e.target.getAttribute('value')
        //	console.log('>>>>>> target Value' , e.target.value)
        this.onSearch(e)
    }

    onClickli(e){
        this.Query[e.target.id] = e.target.getAttribute('value')
        document.getElementById('railcarSearch').value = e.target.getAttribute('value')
        //console.log(this.Query)
        //console.log('>>>>>> target Value' , e.target.value)
        this.onSearch(e)
    }

    onSearch(e){
        if(this.Query != undefined){
            Object.defineProperty(this.Where,"Query",{enumerable:true ,
                writable: true,
                configurable: true,
                value:this.Query})
        }
        //	console.log(this.Where)
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
                serachObj.push(customer)
            }

            if(this.Where.Company && this.Where.Company.length > 0){
                var company = [] ;
                var objCompany = {}
                for(var j in this.Where.Company)
                {
                    objCompany = {"location_id" : this.Where.Company[j] }
                    company.push(objCompany);
                }
                serachObj.push(company)
            }

            if(this.Where.status && this.Where.status.length){
                var status = [];
                var objStatus = {};
                for(var z in this.Where.status){
                    objStatus = {"status" : this.Where.status[z]}
                    status.push(objStatus)
                }
                serachObjLots.push(status)
            }

            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
                var poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                serachObj.push(poSearch);
            }

            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                var railSearch = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
                serachObjLots.push(railSearch)
            }

            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                var lotSearch =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                serachObjLots.push(lotSearch)
            }

            var serachObj = [].concat.apply([], serachObj);
            var serachObjLots = [].concat.apply([], serachObjLots);

            var PIview = createDataLoader(FilterComponent, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include : ['TPackagingInstructionLots',
                            {"relation": "TPackagingInstructions",
                                "scope": {"include": ["TLocation"]}
                            }]
                    }
                }]
            });
            var base = 'TPackagingInstructionLots';
            //TPackagingInstructionLots
            //debugger;
            if(serachObj && serachObj != undefined &&serachObj.length > 0 && serachObjLots.length == 0){
                //debugger;
                this.urlSearch = PIview._buildUrl(base, {

                    "include" : {"relation": "TPackagingInstructions",
                        "scope":{
                            where:     {"and":[
                                {  "or":serachObj}
                            ]
                            } ,
                            "include": ["TOrigin" , "TCompany"]
                        }
                    },
                    "where":{"active":1,"railcar_status": {"neq":"ARRIVED"}}
                })
            }
            else if(serachObjLots.length > 0 && serachObj.length > 0) {
                //debugger;
                this.urlSearch = PIview._buildUrl(base, {
                    include : {"relation": "TPackagingInstructions", "scope":{where:{  "or":serachObj} ,"include": ["TOrigin" , "TCompany"]}},
                    "where":
                        {  "or":
                            [ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},
                                {'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}
                            ],
                            "and":{"railcar_status": {"neq":"ARRIVED"},"active":1}
                        }
                });
            }
            else{
                //debugger;
                this.urlSearch = PIview._buildUrl(base, {
                    include : {"relation": "TPackagingInstructions", "scope":{"include": ["TOrigin" , "TCompany"]}},
                    "where":
                        {
                            "or":serachObjLots,
                            "and":{"railcar_status": {"neq":"ARRIVED"},"active":1}
                            //[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                        }
                });
            }

            //console.log(this.urlSearch , ">>>>>>>>>>>d,lpwkdlwjldjwlkdjwo");
            $.ajax({
                url: this.urlSearch,
                success:function(data){
                    debugger;
                    console.log('ajax ',data);

                    this.setState(
                        {
                            viewData : data
                        }
                    )
                    this.forceUpdate()
                    //	console.log( "ajax>>>>>>>")
                }.bind(this)

            })
        }
    }

    handleOptionChange(changeEvent) {
        var selectedOption = changeEvent.target.value
        this.setState({
            selectedOption: changeEvent.target.value
        });
        //console.log( selectedOption);
    }
    handleOptionChange1(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }



    onCompanyFilter(e,location){
        if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                writable: true,
                configurable:true,
                value:this.checkedCompany})
            // this.buttonDisplay.push(e.target.value)
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
            // this.buttonDisplay.push(e.target.value)
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
            //	console.log(this.Where)
            //let value = e.target.value
            let index = this.buttonDisplay.indexOf(e.target.value)
            if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)
            //console.log(this.buttonDisplay)
            this.forceUpdate()
        }
        this.onSearch(e)
    }
    onRemove(e){
        //console.log("clicked")
        this.buttonDisplay = [];
        //this.buttonDisplay = []
        this.checkedCustomer = []
        this.checkedStatus = []
        this.checkedCompany = []
        delete this.Where.Company
        delete this.Where.Customer
        delete this.Where.status
        this.setState({
            key : this.state.key +1
        })
        this.forceUpdate();
        if(this.state.viewData){
            delete this.state.viewData
        }

    }

     click(data,value,index)
    {
        var cartDataArray = []
        if(data.target.checked){
            //this.checked = true
            document.getElementById('th'+ index).nextSibling.checked=true
            for(var i=0;i<this.props.data.length;i++){
                if(this.props.data[i].TPackagingInstructions.po_number == value.TPackagingInstructions.po_number){
                    this.props.data[i].arrived = 1;
                    this.cartArray.push(value.id)
                    this.lotOrderValue.push(value)
                    break;
                }
            }
            //this.forceUpdate()
        }
        else if(!data.target.checked){

            document.getElementById('checkall').checked=false;
            for(var i=0;i<this.props.data.length;i++){
                if(this.props.data[i].TPackagingInstructions.po_number == value.TPackagingInstructions.po_number){
                    this.props.data[i].arrived = 0
                    let index = this.cartArray.indexOf(value.id);
                    if (index > -1) {
                        this.cartArray.splice(index, 1);
                    }
                    let index1 = this.lotOrderValue.indexOf(value);
                    if (index1 > -1) {
                        this.lotOrderValue1.splice(index, 1);
                    }
                    break;
                }
            }
            //this.forceUpdate()
        }

        //	var dateArray = []


    };

    checkAll(e){
        let viewData = this.props.data
        let checkAll = [];
        let cartDataArray = []

        if(e.target.checked) {
            console.log(e.target.checked)
            for (let i = 0; i < viewData.length; i++) {
                if (viewData[i].TPackagingInstructions && (viewData[i].status == "CONFIRMED" || viewData[i].status == "UNCONFIRMED" || viewData[i].status == "READY") && (viewData[i].arrived != 1)) {
                    this.props.data[i].arrived = 1;
                    if(document.getElementById('th'+ i)) {

                        document.getElementById(viewData[i].id).checked = true;

                        this.cartArray.push(viewData[i].id)
                        this.lotOrderValue.push(viewData[i])
                    }
                }
            }
        }
    else if(e.target.checked===false){
            console.log(e.target.checked)
            for(let i=0; i<viewData.length;i++){
                if(viewData[i].TPackagingInstructions && (viewData[i].status == "CONFIRMED" || viewData[i].status == "UNCONFIRMED"|| viewData[i].status == "READY") && (viewData[i].arrived === 1)){

                    if(document.getElementById('th'+ i)) {
                        this.props.data[i].arrived = 0;
                        let index = this.cartArray.indexOf(viewData[i].id);
                        if (index > -1) {
                            this.cartArray.splice(index, 1);
                        }
                        let index1 = this.lotOrderValue.indexOf(viewData[i]);
                        if (index1 > -1) {
                            this.lotOrderValue.splice(index1, 1);
                        }

                        document.getElementById(viewData[i].id).checked = false;
                        this.cartArray.push(viewData[i].id)
                    }
                }
            }
        }
    }


    cookCheckAll(){
        let viewData = this.props.data
        let checkAll=[];
        for(let i=0; i<viewData.length;i++){
            if(viewData[i].TPackagingInstructions && (viewData[i].status == "CONFIRMED" || viewData[i].status == "UNCONFIRMED"|| viewData[i].status == "READY") && (viewData[i].arrived != 1)){
                this.props.data[i].arrived = 0;
            }
        }

        console.log(checkAll)
        this.setState({chekVals:checkAll})
    }


    updateCartArrival() {
        if (this.cartArray.length < 1 || (this.startDate == null || this.startDate === undefined || this.startDate.trim() === '' || this.startDate === false)) {
            swal('Info', 'Please select arrival date or row.', 'info')
            return
        }
        for (let j = 0; j < this.lotOrderValue.length; j++) {
            if (this.lotOrderValue[j].status == "CONFIRMED") {
                this.cartArray.forEach((id, index) => {
                    axios.put(Base_Url + "TPackagingInstructionLots/" + id, {
                        railcar_arrived_on: this.startDate,
                        status: "READY",
                        arrived: 1,
                        railcar_status: "ARRIVED"
                    }).then(function (response) {
                        swal({
                                title: "Success",
                                text: "Arrival submitted.",
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                hashHistory.push('/Packaging/packaginginstview/')
                            });
                    }).catch(function (err) {
                        //console.log("Error Is" + err)
                    })
                })
            }

            else if (this.lotOrderValue[j].status == "QUEUED") {
                this.cartArray.forEach((id, index) => {
                    axios.put(Base_Url + "TPackagingInstructionLots/" + id, {
                        railcar_arrived_on: this.startDate,
                        arrived: 1,
                        railcar_status: "ARRIVED"
                    }).then(function (response) {
                        swal({
                                title: "Success",
                                text: "Arrival submitted.",
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                hashHistory.push('/Packaging/packaginginstview/')
                            });
                    }).catch(function (err) {
                        //console.log("Error Is" + err)
                    })
                })
            }


            else if (this.lotOrderValue[j].status == "UNCONFIRMED") {
                this.cartArray.forEach((id, index) => {
                    axios.put(Base_Url + "TPackagingInstructionLots/" + id, {
                        railcar_arrived_on: this.startDate,
                        arrived: 1,
                        railcar_status: "ARRIVED"
                    }).then(function (response) {

                        swal({
                                title: "Success",
                                text: "Arrival submitted.",
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                hashHistory.push('/Packaging/packaginginstview/')
                            });

                    }).catch(function (err) {
                        console.log("Error Is" + err)
                    })
                })
            }


            else {
                swal("Info", "Railcar must be confirmed first.", 'info')
            }

        }
    }

    componentDidMount() {
        $(function () {
            setTimeout(function(){
                $("#tableRailCarArrival").tableHeadFixer({'head' : true})

            }, 2000);
        });
        this.cookCheckAll()

    }

    render() {
        var fiterData = undefined ;
        fiterData = this.state.viewData ? this.state.viewData : undefined ;

        if(fiterData != undefined){
            var railCarFilterData = _.map(fiterData , (view ,index)=>{
                if(view.TPackagingInstructions && (view.status == "CONFIRMED" || view.status == "UNCONFIRMED"|| view.status == "READY") && (view.arrived != 1) ){
                    return (
						<tr>
							<td>{view.TPackagingInstructions.TCompany? view.TPackagingInstructions.TCompany.name : ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.po_number : ''}</td>
							<td>{view.railcar_number ? view.railcar_number : ''}</td>
							<td>{view.weight?(this.state.selectedOption=='lbs'?view.weight:(view.weight/MUL_FACTOR).toFixed(2)):''}</td>
							<td>{view.lot_number ? view.lot_number: ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.material : ''}</td>
							<td> {view.status == "UNCONFIRMED"? "NO" : "YES"}</td>
							<td ref="arrived" id={"th"+index}> {view.arrived == 1 || this.checked==true ? "YES" : "NO"}</td>
							<td>
								<label className="checkBox">
									<input className="checkBox" type="checkbox" id={"row1"+ index} value={this.state.chekVals[index]} onChange={(e) => this.click(e,view,index)} />
									<label htmlFor={index}></label>
								</label>
							</td>
						</tr>
                    )
                }

            })
        }
        railCarFilterData = _.filter(railCarFilterData, function (param) {
            return param !== undefined;
        });


        const railCart = this.props.data
        var railcartData = _.map(railCart , (view ,index)=>{


            if(view.TPackagingInstructions && (view.status == "CONFIRMED" || view.status == "UNCONFIRMED"|| view.status == "READY") && (view.arrived != 1)) {

                return(
					<tr>
						<td>{view.TPackagingInstructions.TCompany? view.TPackagingInstructions.TCompany.name : ''}</td>
						<td>{view.TPackagingInstructions ? view.TPackagingInstructions.po_number : ''}</td>
						<td>{view.railcar_number ? view.railcar_number : ''}</td>
						<td>{view.weight?(this.state.selectedOption=='lbs'?view.weight:(view.weight/MUL_FACTOR).toFixed(2)):''}</td>
						<td>{view.lot_number ? view.lot_number: ''}</td>
						<td>{view.TPackagingInstructions ? view.TPackagingInstructions.material : ''}</td>
						<td> {view.status == "UNCONFIRMED" ? "NO" : "YES"}</td>
						<td ref="arrived" id={"th"+index}> {view.arrived == 1 || this.checked==true ? "YES" : "NO"}</td>
						<td>
							<input className="checkBox" type="checkbox"
								   onChange={(e) => this.click(e,view,index)}
								   value={view}
								   id={view.id}/>

							<label htmlFor={view.id}></label>
						</td>
					</tr>
                )
            }

        })
        return (

			<section className="side-filter">
				<div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
					<div className="">
						<h4 className="pull-left">REFINE YOUR RESULT </h4>
						<button type="button" className="btn btn-default collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
					</div>
				</div>
				<div className="container">
					<div className="row-fluid">
						<FilterComponent key={this.state.key} lotSearch={this.lotSearch}   onClickPo={this.onClickPo}  onClickli={this.onClickli} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter} parent={"RailcarArrivalEntry"}/>	 	<div id="filter-grid">
						<div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
							<div className="converiosnsMenu">
								<div className="pull-right margin-30-right">
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
								<div className="pull-right margin-30-right">
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
							</div>

							<div className="row">
								<FilterButton buttonDisplay = {this.buttonDisplay} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">

								</div>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><hr/></div>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="table-responsive view_table  mega" style={{"maxHeight":"390px","overflowY":"scroll"}}>
										<table id="tableRailCarArrival" className="table table-expandable" cellSpacing="0">
											<thead id="headerRailCarArrival" className="table_head header-fixed header red">
											<tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}}>
												<th>Customer</th>
												<th>PO# </th>
												<th>Railcar# </th>
												<th>weight</th>
												<th>Lot# </th>
												<th>Material </th>
												<th>Confirmed</th>
												<th>Arrived</th>
												<th>
                                                    <input className="checkbox" onClick={this.checkAll.bind(this)} type="checkbox" id="checkall"/>
                                                    </th>
											</tr>
											</thead>
											<tbody >

                                            {fiterData != undefined ? (railCarFilterData.length == 0)?
												<tr>
													<td colSpan="10" className="noresult">No results match your entered criteria.</td>
												</tr> :railCarFilterData:  railcartData}
											</tbody>
										</table>
									</div>



									<div className="pull-right padding-top-btm-xs col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="pull-right padding-10-last-r"><button type="button"  className="btn  btn-primary" onClick={this.updateCartArrival} >Arrived </button></div>
										<div className="pull-right padding-10-all"><button type="button"  className="btn  btn-gray" onClick={hashHistory.goBack}>Cancel </button></div>
										<div className="pull-right padding-10-all"><div className="right-inner-addon mw-200">
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
											<Datetime
												dateFormat="MM-DD-YYYY"
                                                defaultValue = "RailCar Arrival Date"
												selected={this.state.dateTime}
												vlaue={this.state.dateTime}
												onChange={(event) => this.handledate(event)}/></div>

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
