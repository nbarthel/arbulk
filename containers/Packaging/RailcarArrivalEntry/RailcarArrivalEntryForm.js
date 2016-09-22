import React from 'react';
var DatePicker = require('react-datepicker');
import { DateField, Calendar } from 'react-datepicker'
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');
import {Base_Url} from '../../../constants';
import axios from 'axios';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import FilterComponent from '../../../components/FilterComponent';
import FilterButton from '../../../components/FilterComponent/FilterButton';
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
		this.state = {
			startDate : ''
		}
		this.updateCartArrival = this.updateCartArrival.bind(this);
		this.handleChange1 = this.handleChange1.bind(this)
		this.click = this.click.bind(this)
	
            this.click = this.click.bind(this);
            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
        }
         onTextChange(e){
          this.Query[e.target.id] = e.target.value
          console.log(this.Query)
        }
        handleChange1(x,event) {
		debugger;
		this.setState({
			startDate:x
		});
	}
	onSearch(e){
		debugger;
		if(this.Query != undefined){
			Object.defineProperty(this.Where,"Query",{enumerable:true ,
				writable: true,
				configurable: true,
				value:this.Query})
		}
		console.log(this.Where)
		var serachObj = []
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
					objCompany = {"origin_id" : this.Where.Company[j] }
					company.push(objCompany);
				}
				serachObj.push(company)
			}

			if(this.Where.status && this.Where.status.length){
				var status = [];
				var objStatus = {};
				for(var z in this.Where.status){
					objStatus = {"packaging_status" : this.Where.status[z]}
					status.push(objStatus)
				}
				serachObj.push(status)
			}

			if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && his.Where.Query.POSearch!= undefined ){
				serachObj =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
				serachObj.push(serachObj)
			}


			if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
				var serachObjLots = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
			}

			if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
				var serachObjLots =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
			}

			var serachObj = [].concat.apply([], serachObj);

			var PIview = createDataLoader(FilterComponent, {
				queries: [{
					endpoint: 'TPackagingInstructions',
					filter: {
						include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
					}
				}]
			});
			var base = 'TPackagingInstructionLots';
			//TPackagingInstructionLots

			if(serachObj && serachObj != undefined ){
				debugger;
				this.urlSearch = PIview._buildUrl(base, {

					include : {"relation": "TPackagingInstructions", "scope":{  where:{  "or":serachObj} ,"include": ["TOrigin" , "TCompany"]}},
		         where:
					{  "or":
						[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
					}
				})
			}
			else {
				this.urlSearch = PIview._buildUrl(base, {
					include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}],

					"where":
					{  "or":
						[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
					}
				});
			}

			console.log(this.urlSearch , ">>>>>>>>>>>d,lpwkdlwjldjwlkdjwo");
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
					console.log( "ajax>>>>>>>")
				}.bind(this)

			})
		}
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
         onRemove(e){
        console.log("clicked")
         this.buttonDisplay = [];
         //this.buttonDisplay = []
            this.checkedCustomer = { }
            this.checkedStatus = { }
            this.checkedCompany = { }
         this.forceUpdate();

    }
  
 	onTap() {
  	$(document).ready(function(){
		var date_input=$('input[name="date"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		date_input.datepicker({
			format: 'mm/dd/yyyy',
			container: container,
			todayHighlight: true,
			autoclose: true,
		})
	})
  }
  	click(data , value)
	{

		var cartDataArray = []
		this.cartArray.push(value.id)


		console.log("clicked" , data , value)
	};
		updateCartArrival(){
		var option = {
			railcar_arrived_on : this.state.startDate._d.getMonth()+'/'+this.state.startDate._d.getDate()+'/' +this.state.startDate._d.getFullYear()
		}
     	this.cartArray.forEach((id)=>{
		 axios.put(Base_Url+"TPackagingInstructionLots/" + id , option).then(function(response){
          console.log('CartArrivaladte Submitted' , response)
		 }).catch(function(err){
			 console.log("Error Is" + err)
		 })
	 })

	}
    render() {
    	const railCart = this.props.data
		console.log("raillllllllllll>>>>>>" , railCart)
		var railcartData = _.map(railCart , (view)=>{
		return(
		<tr>
			<td>{view.TPackagingInstructions.TCompany.name}</td>
			<td>{view.TPackagingInstructions.po_number}</td>
			<td>{view.railcar_number}</td>
			<td>{view.lot_number}</td>
			<td>{view.TPackagingInstructions.material}</td>
			<td> {view.TPackagingInstructions.stamp_confirmed == 1? 'Y':'N'}</td>
			<td>
				<label className="control control--checkbox">
					<input type="checkbox" id="row1" value = {view} onChange = {(e) => this.click(e,view)}/><div className="control__indicator"></div>
				</label>
			</td>
		</tr>
		)
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
	<FilterComponent onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter}/>        
	 	<div id="filter-grid">
		<div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">			
			<div className="row">			
			<FilterButton buttonDisplay = {this.buttonDisplay} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/> 
				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">
					<div className="pull-right ">
						 <select className="form-control"   id="customer_name" name="customer_name">
							 <option value="">Save View</option>
							 <option value="View1">View 1</option>
							 <option value="View2">View 2</option>
							 <option value="View3">View 3</option>
							 <option value="View4">View 4</option>
							 <option value="View5">View 5</option>
						</select>
					</div>					
					<div className="pull-right btn_right_margin">
						<select className="form-control"  id="customer_name" name="customer_name">
							 <option value="">Group By</option>
							 <option value="Date">Date</option>
						</select>
					</div>	
				</div>	
				
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><hr/></div>	
			
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="table-responsive ">	
					<table className="table table-striped">
						<thead className="base_bg">
						  <tr >
							
							<th>Customer</th>
							<th>PO# </th>
							<th>Railcar# </th>
							<th>Lot# </th>
							<th>Material </th>
							<th>In Inventiry?</th>
							<th>
								<label className="control control--checkbox">
								  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
								</label>									
							</th>
						</tr>
						</thead>
						<tbody>
							{railcartData}
						</tbody>
					</table>
				</div>
										
				
				<div className=" ">				
					<div className="pull-left pddn-10-top ">					
						 <div className="padding-10-last-l" >
						 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>				
							<DatePicker
								 dateFormat="MM-DD-YYYY"
								 selected={this.state.startDate}
								 value={this.state.startDate}
								 onChange={(x, event) => this.handleChange1(x,event)} placeholderText="RailCar Arrival Date"/>	</div>
						</div>
						</div>						
					</div>					
				    <div className="pull-right padding-top-btm-xs"> 					
						<div className="pull-right padding-10-last-r"><button type="button"  className="btn  btn-primary" onClick={this.updateCartArrival} >ARRIVAL </button></div>
						<div className="pull-right padding-10-all"><button type="button"  className="btn  btn-gray">BACK </button></div>						
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
