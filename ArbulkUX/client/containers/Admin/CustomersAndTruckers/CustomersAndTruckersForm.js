import React from 'react';
import AddCustomersAndTruckers from './AddCustomersAndTruckers'
import { hashHistory } from 'react-router'
import axios from 'axios';
import { Base_Url } from '../../../constants'

class CustomersAndTruckersForm extends React.Component {
	constructor(props){
		super(props)
		this.onAddCustAndTruck = this.onAddCustAndTruck.bind(this)
		//this.getCustomerData = this.getCustomerData.bind(this)
		this.custTable
		this.onRadioChange = this.onRadioChange.bind(this)
		this.radChecked = false
		this.onEdit = this.onEdit.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}
	
	onEdit(e){
		hashHistory.push('/Admin/EditCustAndTruck'+"/"+e.target.id)
	}
	onDelete(e){
		  var delId = e.target.id
		  var addrId = e.target.getAttribute('value')
		 // console.log(e.target.getAttribute('value'))
     swal({   
            title: "You are about to delete a entry?", 
            text: "Are you sure ?",
            type: "warning", 
            showCancelButton: true,  
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it.",
            closeOnConfirm: false }, 
              function(){ 
                 axios.delete(Base_Url + "TAddresses/"+addrId).then((newRespnse)=>{
                 axios.delete(Base_Url+"TCompanies/"+delId).then((response)=>{
                     swal({
                      title: "Success",
                      text: "Entry has been deleted.",
                      type: "success",
                      showCancelButton: false,
      },
              function(isConfirm){
            
                  window.location.reload();
}
);  

                 }) 
                   })	    
                }


                );

                    
       
	}
	onAddCustAndTruck(e){
		hashHistory.push("/Admin/AddCustAndTruck")
	}
	onRadioChange(e){
		this.radChecked = true
		if(e.target.value == "Customer"){
			this.custTable = _.map(this.props.custData,(cust,index)=>{
				if(cust.type == "CUSTOMER")
					{return(
									<tr key ={index}>
										<td>{cust.name}</td>
										<td>{cust.phoneNumber}</td>
										<td>{cust.emailAddress}</td>
										<td className="action">
										<span  onClick = { this.onEdit } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id }><i className="fa fa-pencil text-success" aria-hidden="true"></i>&nbsp; Edit </span>
										<span onClick = { this.onDelete } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id }><i className="fa fa-times text-danger" aria-hidden="true"></i> &nbsp; Delete </span>
										</td>					
									</tr>)}
			})
		}
		else if(e.target.value == "Trucker"){
			this.custTable = _.map(this.props.custData,(cust,index)=>{
				if(cust.type == "TRUCKER")
					{return(
									<tr key ={index}>
										<td>{cust.name}</td>
										<td>{cust.phoneNumber}</td>
										<td>{cust.emailAddress}</td>
										<td className="action">
										<span  onClick = { this.onEdit } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id }><i className="fa fa-pencil text-success" aria-hidden="true"></i>&nbsp; Edit </span>
										<span onClick = { this.onDelete } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id } ><i className="fa fa-times text-danger" aria-hidden="true"></i> &nbsp; Delete </span>
										</td>					
									</tr>)}
			})
		}
		this.forceUpdate()
	}

	render() {
		if(this.props.custData && this.radChecked == false){
			this.custTable = _.map(this.props.custData,(cust,index)=>{
			return(
				<tr key ={index}>
						<td>{cust.name}</td>
						<td>{cust.phoneNumber}</td>
						<td>{cust.emailAddress}</td>
						<td className="action">
						<span  onClick = { this.onEdit } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id }><i className="fa fa-pencil text-success" aria-hidden="true"></i>&nbsp; Edit </span>
						<span onClick = { this.onDelete } value = { cust.TAddress.length > 0 ? cust.TAddress[0].id : null } id = { cust.id }><i className="fa fa-times text-danger" aria-hidden="true"></i> &nbsp; Delete </span>
						</td>					
					</tr>	)
		})
		}
		return (
			<section className="admin">  
		<div className="container-fluid">
		 <div className="row-fluid">
			<div className="col-md-12">
				<div className="row pddn-20-btm">	
					<form action="" method="post">
						<div className="col-md-6 ">
							<div className="pull-left margin-30-right">
								<label className="control control--radio "><b>Customers</b>
									<input type="radio" value = "Customer" onChange = {this.onRadioChange} id="ADDCustomers" name="ADDCustomers"/><div className="control__indicator"></div>
								</label>
							</div>
							<div className="pull-left margin-30-right">
								<label className="control control--radio "><b>Truckers</b>
									<input type="radio" id="ADDCustomers" value = "Trucker" onChange = {this.onRadioChange} name="ADDCustomers" /><div className="control__indicator"></div>
								</label>	
							</div>
						</div>
						
						<div className="col-md-6">
						   <div className="form-group">
								<div className="col-lg-12 ">
								  <button type="button" id="add-customer" onClick = {this.onAddCustAndTruck} className="btn  btn-primary text-uppercase pull-right btn_right_no_margin">Add Customer / Trucker</button>
								</div>
							</div>	
						</div>				
					</form>
				</div>	
			</div>
			<div className="col-md-12">
			<div className="table-responsive mody-user ">
				<table className="table table-striped">
				<thead className="base_bg">
				  <tr >
					<th>Company Name </th>
					<th>Phone Number</th>
					<th>Email Address</th>
					<th className="action"> Action </th>				
				  </tr>
				</thead>
				<tbody>
					{this.custTable}
					
					</tbody>
			</table>
		</div>	
		</div>
		
		</div>	
	    </div>      

	</section>	

		);
	}
}
export default CustomersAndTruckersForm