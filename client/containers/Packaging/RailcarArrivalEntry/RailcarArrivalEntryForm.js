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
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css'
import { hashHistory } from 'react-router'
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
		    this.dateArray = [ ]
		this.state = {
			startDate : '',
			key:0,
            selectedOption: 'lbs'
		}
		this.updateCartArrival = this.updateCartArrival.bind(this);
		this.handleChange1 = this.handleChange1.bind(this)

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
            this.onTap = this.onTap.bind(this)
			this.onChnage = this.onChnage.bind(this)
            this.handleOptionChange = this.handleOptionChange.bind(this)
			this.handleOptionChange1 = this.handleOptionChange1.bind(this)
        }
         onformat(inputDate) {
        var datear = inputDate.split('-')
       return (datear[1] +'-'+ datear[2] +'-'+ datear[0])
   }
         onTextChange(e){
          this.Query[e.target.id] = e.target.value
          console.log(this.Query)
        }
        handleChange1(x,event) {

        	var dateValue = this.onformat(x.target.value)
					console.log("date value is" , dateValue)

		document.getElementById('row1'+ x.target.id).disabled = false

		this.dateArray.push(dateValue)

	}

	 onClickPo(e){
        //debugger;
           this.Query[e.target.id] = e.target.getAttribute('value')

          document.getElementById('POSearch').value = e.target.getAttribute('value')
           console.log(this.Query)
           console.log('>>>>>> target Value' , e.target.value)
      }

      lotSearch(e){
          //debugger;
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

	onSearch(e){
		//debugger;
		if(this.Query != undefined){
			Object.defineProperty(this.Where,"Query",{enumerable:true ,
				writable: true,
				configurable: true,
				value:this.Query})
		}
		console.log(this.Where)
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

			var serachObj = [].concat.apply([], serachObj);
			var serachObjLots = [].concat.apply([], serachObjLots);

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

			if(serachObj && serachObj != undefined && serachObjLots.length == 0){
				//debugger;
				this.urlSearch = PIview._buildUrl(base, {

					include : {"relation": "TPackagingInstructions", "scope":{  where:{  "or":serachObj} ,"include": ["TOrigin" , "TCompany"]}},
					//       where:
					// {  "or":
					// 	[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
					// }
				})
			}
			else if(serachObjLots.length > 0 && serachObj.length > 0) {
				//debugger;
				this.urlSearch = PIview._buildUrl(base, {
					include : {"relation": "TPackagingInstructions", "scope":{where:{  "or":serachObj} ,"include": ["TOrigin" , "TCompany"]}},
					"where":
					{  "or":
						[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
					}
				});
			}
			else{
				//debugger;
				this.urlSearch = PIview._buildUrl(base, {
					include : {"relation": "TPackagingInstructions", "scope":{"include": ["TOrigin" , "TCompany"]}},
					"where":
					{
						"or":
						serachObjLots
							//[ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
					}
				});
			}

			console.log(this.urlSearch , ">>>>>>>>>>>d,lpwkdlwjldjwlkdjwo");
			$.ajax({
				url: this.urlSearch,
				success:function(data){
					//debugger;
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

  	handleOptionChange(changeEvent) {
    	var selectedOption = changeEvent.target.value
    	this.setState({
			selectedOption: changeEvent.target.value
			});
		console.log( selectedOption);
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
  click(data,value,index)
	{

		if(data.target.checked){
			//this.checked = true

			document.getElementById('th'+ index).value = "YES"
			this.props.data[index].arrived = 1
			this.forceUpdate()
		}
		else if(!data.target.checked){
			// this.checked = false
			document.getElementById('th'+index).value = "NO"
			this.props.data[index].arrived = 0
			this.forceUpdate()
		}

		var cartDataArray = []
	//	var dateArray = []
		this.cartArray.push(value.id)

         this.lotOrderValue = value

		console.log("clicked" , data , value)
	};


	updateCartArrival(){
	//debugger;
      if(this.cartArray.length < 1 && (this.state.startDate=null || this.state.startDate=== undefined || this.state.startDate=== '' || this.state.startDate=== false)){
         swal('Info' , 'Please select arrival Date and or row' , 'info')
         return
      }

   // var option = {
   //    railcar_arrived_on : parseInt(this.state.startDate._d.getMonth())+parseInt('1')+'/'+this.state.startDate._d.getDate()+'/' +this.state.startDate._d.getFullYear(),
   //    status : 'ARRIVED'
   // }

  if(this.lotOrderValue.status == "CONFIRMED")
{
   this.cartArray.forEach((id ,index)=>{
	  axios.put(Base_Url+"TPackagingInstructionLots/" + id , {railcar_arrived_on : this.dateArray[index] , status:"READY" , arrived : 1,railcar_status:"ARRIVED"}).then(function(response){
         swal({
                      title: "Success",
                      text: "Arrival Submitted",
                      type: "success",
                      showCancelButton: true,
                        },
                     function(isConfirm){
                      hashHistory.push('/Packaging/packaginginstview/')
                 });
    }).catch(function(err){
       console.log("Error Is" + err)
    })
 })
}

else if(this.lotOrderValue.status == "QUEUED")
{
 this.cartArray.forEach((id ,index)=>{
	axios.put(Base_Url+"TPackagingInstructionLots/" + id , {railcar_arrived_on : this.dateArray[index], arrived : 1,railcar_status:"ARRIVED"}).then(function(response){
			 swal({
										title: "Success",
										text: "Arrival Submitted",
										type: "success",
										showCancelButton: true,
											},
									 function(isConfirm){
										hashHistory.push('/Packaging/packaginginstview/')
							 });
	}).catch(function(err){
		 console.log("Error Is" + err)
	})
})
}




else if(this.lotOrderValue.status == "UNCONFIRMED")
{
this.cartArray.forEach((id ,index)=>{
    axios.put(Base_Url+"TPackagingInstructionLots/" + id , {railcar_arrived_on : this.dateArray[index] , arrived : 1,railcar_status:"ARRIVED"}).then(function(response){

                    swal({
                      title: "Success",
                      text: "Arrival Submitted",
                      type: "success",
                      showCancelButton: true,
                        },
                     function(isConfirm){
                      hashHistory.push('/Packaging/packaginginstview/')
                 });

 }).catch(function(err){
       console.log("Error Is" + err)
    })
 })
}


else{
	swal("Info" , "Railcar must be confirmed first" , 'info')
}

}



onChnage(e){

}
    render() {
	//debugger;
		var fiterData = undefined ;
		fiterData = this.state.viewData ? this.state.viewData : undefined ;

        if(fiterData != undefined){
			var railCarFilterData = _.map(fiterData , (view ,index)=>{
				if(view.TPackagingInstructions && (view.status == "CONFIRMED" || view.status == "UNCONFIRMED"|| view.status == "READY") ){
					return (
						<tr>
							<td>{view.TPackagingInstructions.TCompany? view.TPackagingInstructions.TCompany.name : ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.po_number : ''}</td>
							<td>{view.railcar_number ? view.railcar_number : ''}</td>
                      		<td>{view.weight?(this.state.selectedOption=='lbs'?view.weight:(view.weight/2.54).toFixed(2)):''}</td>
							<td>{view.lot_number ? view.lot_number: ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.material : ''}</td>
							<td> {view.status == "UNCONFIRMED"? "NO" : "YES"}</td>
								<td ref="arrived" id={"th"+index}> {view.arrived == 1 || this.checked==true ? "YES" : "NO"}</td>
							<td>
								<label className="control control--checkbox">
								<input type="checkbox" id={"row1"+ index} value={view} onChange={(e) => this.click(e,view,index)} disabled/>

									<div className="control__indicator"></div>
								</label>
							</td>
							<td>
							<input type="date" onChange={(e, x,) => this.handleChange1(e,x)}  id={index}/>
					</td>
						</tr>
					)
				}
				//else{
				//	return (
				//		<tr>
				//			<td>{view.TPackagingInstructions.TCompany.name}</td>
				//			<td>{view.TPackagingInstructions.po_number}</td>
				//			<td>{view.railcar_number}</td>
				//			<td>{view.lot_number}</td>
				//			<td>{view.TPackagingInstructions.material}</td>
				//			<td> {view.TPackagingInstructions.stamp_confirmed == 1 ? 'Y' : 'N'}</td>
				//			<td>
				//				<label className="control control--checkbox">
				//					<input type="checkbox" id="row1" value={view} onChange={(e) => this.click(e,view)}/>
                //
				//					<div className="control__indicator"></div>
				//				</label>
				//			</td>
				//		</tr>
				//	)
				//}
			})
		}

  	const railCart = this.props.data
		var railcartData = _.map(railCart , (view ,index)=>{
		//debugger;

			if(view.TPackagingInstructions && (view.status == "CONFIRMED" || view.status == "UNCONFIRMED" || view.status == "QUEUED")) {
		return(
	              	<tr>
							<td>{view.TPackagingInstructions.TCompany? view.TPackagingInstructions.TCompany.name : ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.po_number : ''}</td>
							<td>{view.railcar_number ? view.railcar_number : ''}</td>
          					<td>{view.weight?(this.state.selectedOption=='lbs'?view.weight:(view.weight/2.54).toFixed(2)):''}</td>
							<td>{view.lot_number ? view.lot_number: ''}</td>
							<td>{view.TPackagingInstructions ? view.TPackagingInstructions.material : ''}</td>
							<td> {view.status == "UNCONFIRMED" ? "NO" : "YES"}</td>
							<td ref="arrived" id={"th"+index}> {view.arrived == 1 || this.checked==true ? "YES" : "NO"}</td>
							<td>
								<label className="control control--checkbox">
									<input type="checkbox" id={"row1"+ index} value={view} onChange={(e) => this.click(e,view,index)} disabled/>

									<div className="control__indicator"></div>
								</label>
							</td>
							<td>
							<input type="date" className="calender"  onChange={(e, x) => this.handleChange1(e,x)}  id={index}   />
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
<FilterComponent key={this.state.key} lotSearch={this.lotSearch}   onClickPo={this.onClickPo}  onClickli={this.onClickli} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter}/>	 	<div id="filter-grid">
	<div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
		<div className="pull-right margin-30-right">
			<label className="control control--radio ">LBS
                <input id="Modify_User" name="Modify_User" type="radio"
                type="radio"
                id="ADDCustomers"
                name="ADDCustomers"
                value="lbs"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption==='lbs'}/>
      			<div className="control__indicator"></div>
			</label>
		</div>
    <div className="pull-right margin-30-right">
      	<label className="control control--radio ">Kg
      		<input id="Modify_User" name="Modify_User" type="radio"
            id="ADDCustomers"
            name="ADDCustomers"
            value="kg"
            onChange={this.handleOptionChange1}
            checked={this.state.selectedOption==='kg'}/>
      			<div className="control__indicator"></div>
      </label>
   </div>
			<div className="row">
			<FilterButton buttonDisplay = {this.buttonDisplay} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>
				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">

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
      						<th>weight</th>
							<th>Lot# </th>
							<th>Material </th>
							<th>Confirmed</th>
							<th>Arrived</th>
							<th></th>
							<th>Arrival Date</th>
							<th>
								<label className="control control--checkbox">
								</label>
							</th>
						</tr>
						</thead>
						<tbody>
							{fiterData != undefined ? railCarFilterData :  railcartData}
						</tbody>
					</table>
				</div>



				    <div className="pull-right padding-top-btm-xs">
						<div className="pull-right padding-10-last-r"><button type="button"  className="btn  btn-primary" onClick={this.updateCartArrival} >Save </button></div>
						<div className="pull-right padding-10-all"><button type="button"  className="btn  btn-gray" onClick={hashHistory.goBack}>Cancel </button></div>
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
