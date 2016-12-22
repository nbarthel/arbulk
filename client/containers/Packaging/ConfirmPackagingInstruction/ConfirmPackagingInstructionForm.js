import React from 'react';
import _ from 'lodash';
import '../../../public/stylesheets/sweetalert.css';
import SweetAlert from 'sweetalert-react';
import axios from 'axios'
import { Base_Url } from '../../../constants'
import { hashHistory } from 'react-router'
class ConfirmPackagingInstructionForm extends React.Component{
constructor(props){
	super(props);
	this.check = [ ]
	this.state = {
	display : 'none' }
	this.onClick = this.onClick.bind(this)
	this.onSubmit = this.onSubmit.bind(this)
	this.userName = localStorage.getItem('userName')
	this.userId = localStorage.getItem('userId')
}
componentDidMount() {
	if(this.props.data.TPackagingInstructions.bag_id == 1){
		this.setState({
			display: 'block'
		})
	}
}
onClick(e){
	if(e.target.checked){
		this.check.push(e.target.id)
		console.log(this.check)
		}
	else if(!e.target.checked){
		let id = e.target.id
		this.check = _.without(this.check,id)
		console.log(this.check)
	}
}
onSubmit(e){
	if(this.check.length < 12){
		sweetAlert("Submit","Please Select All The Fields!!!","error")
	}
	else {
		let confirmation = {status:"CONFIRMED"}
		//console.log(confirmation)
		var putUrl = Base_Url + "TPackagingInstructionLots/"+this.props.id
	axios.put(putUrl , confirmation).then((response)=>{
		 swal({
                      title: "Success",
                      text: "Order has been Confirmed",
                      type: "success",
                      showCancelButton: true,
      },
              function(isConfirm){
              hashHistory.push('/Packaging/packaginginstview/')

}
);
	})

	}

}
render(){

		return(


<section className="confirm_Packaging">
<div className="container-fluid">
<div className="row">
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">

			<fieldset className="scheduler-border sameHeight ">
				<legend className="scheduler-border">PACKAGING ORDER INFO </legend>
				<div className="form-group ">
						<div className="col-md-12"><p className="text_right">Confirmed by {this.userName}</p></div>
					</div>
				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="customer_name" className=" control-label">Customer Name</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text"
					   className="form-control"
					   id="customer_name"
					   value={this.props.data.TPackagingInstructions.TCompany? this.props.data.TPackagingInstructions.TCompany.name : ''}
					   disabled/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick={this.onClick} id={this.props.data.TPackagingInstructions.TCompany ? this.props.data.TPackagingInstructions.TCompany.name : ''}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="ar_bulk_location" className=" control-label">AR Bulk Location</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					   <select className="form-control"
					    id="ar_bulk_location"
					    name="ar_bulk_location"
					    disabled>
						<option value={this.props.data.TPackagingInstructions.TLocation? this.props.data.TPackagingInstructions.TLocation.locationName :''}>{this.props.data.TPackagingInstructions.TLocation? this.props.data.TPackagingInstructions.TLocation.locationName : ''}</option>
						</select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick={this.onClick} id={this.props.data.TPackagingInstructions.TLocation.locationName}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Purchase_Order" className=" control-label">Purchase Order</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text"
					   className = "form-control"
					   id = "Purchase_Order"
					   value = {this.props.data.TPackagingInstructions ? this.props.data.TPackagingInstructions.po_number : ''}
					   disabled/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick={this.onClick} id={this.props.data.TPackagingInstructions.po_number}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>
				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Rail_Car_Number" className=" control-label">Rail Car Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input
					  type="text"
					  className="form-control"
					  id="Rail_Car_Number"
					  value = {this.props.data ? this.props.data.railcar_number : '' }
					  disabled/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick={this.onClick} id={this.props.data.railcar_number}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>
			    <div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Lot_Number" className="control-label">Lot Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					     <input type="text"
					     className="form-control"
					     id="Lot_Number"
					     value = {this.props.data ? this.props.data.lot_number : ''}
					     disabled/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick={this.onClick} id={this.props.data.lot_number}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>
								<div className="form-group">
								<div className="col-lg-3 "><label htmlFor="Lot_Number" className="control-label">RailCar Weight</label></div>
								<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
										 <input type="text"
										 className="form-control"
										 id="Lot_Number"
										 value = {this.props.data ? this.props.data.weight : ''}
										 disabled/>
									<div className="error"><span></span></div>
								</div>
								<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
									<label className="control control--checkbox ">Confirmed
										<input type="checkbox" onClick={this.onClick} id={this.props.data.weight}/><div className="control__indicator"></div>
									</label>
									</div>
											</div>

			</fieldset>
			</div>


    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border sameHeight">
				<legend className="scheduler-border">PURCHASE ORDER INFO</legend>
				<div className="form-group ">
					<div className="col-md-12"><p className="text_right">Confirmed by {this.userName}</p></div>
				</div>
				<div className="form-group ">
					<div className="col-lg-3 "><label htmlFor="Material" className="control-label">Material</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input
					  type="text"
					  className="form-control"
					  id="Material"
					  value = {this.props.data.TPackagingInstructions ? this.props.data.TPackagingInstructions.material : ''}
					  disabled />
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick}  id={this.props.data.TPackagingInstructions.material}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Origin" className=" control-label">Origin</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					   <input
					   type="text"
					   className="form-control"
					   id="Origin"
					   value = {this.props.data.TPackagingInstructions.TOrigin ? this.props.data.TPackagingInstructions.TOrigin.origin : ''}
					   disabled />
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick}  id={this.props.data.TPackagingInstructions.TOrigin.origin}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Type_of_Packaging" className=" control-label">Type of Packaging</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Packaging" name="Type_of_Packaging" disabled>
						<option value="">{this.props.data.TPackagingInstructions.TPackagingType ? this.props.data.TPackagingInstructions.TPackagingType.packagingType : 'N/A'}</option>
						</select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick} id="Type_of_Packaging"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group" style = {{display : this.state.display}}>
					<div className="col-lg-3 "><label htmlFor="Type_of_Bag" className=" control-label">Type of Bag</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Bag" name="Type_of_Bag" disabled>
						<option value={this.props.data.TPackagingInstructions.TPackagingMaterial.packagingName ? this.props.data.TPackagingInstructions.TPackagingMaterial.packagingName : '' }>{this.props.data.TPackagingInstructions.TPackagingMaterial.packagingName}</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick}  id="Type_of_Bag"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Type_of_Pallet" className=" control-label">Type of Pallet</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Pallet" name="Type_of_Pallet" disabled>
						<option value={this.props.data.TPackagingInstructions.TPalletType ? this.props.data.TPackagingInstructions.TPalletType.palletType : ''}>{this.props.data.TPackagingInstructions.TPalletType ? this.props.data.TPackagingInstructions.TPalletType.palletType : ''}</option>
						</select>
					  <div className="error"><span></span></div>
					</div>
				<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick}  id={this.props.data.TPackagingInstructions.TPalletType.palletType}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="No_of_Bages_Pallat" className=" control-label">No of Bages/Pallat</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					 <select className="form-control" id="No_of_Bages_Pallat" name="No_of_Bages_Pallat" disabled>
						<option value={this.props.data.TPackagingInstructions ? this.props.data.TPackagingInstructions.bags_per_pallet : ''}>{this.props.data.TPackagingInstructions ? this.props.data.TPackagingInstructions.bags_per_pallet : ''}</option>
						<option value="">Pallet 1</option>
						<option value="">Pallet 2</option>
						<option value="">Pallet 3</option>
						<option value="">Pallet 4</option>
						<option value="">Pallet 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick} id={this.props.data.TPackagingInstructions.number_of_bags}/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Stretch_wrap" className=" control-label">Stretch wrap</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Stretch_wrap" name="Stretch_wrap" disabled>
						{this.props.data.TPackagingInstructions.TWrapType != undefined ? <option value={this.props.data.TPackagingInstructions.TWrapType.name}>{this.props.data.TPackagingInstructions.TWrapType.name}</option> : <option value="WrongValue">Wrong Value</option> }
						<option value="">Stretch_wrap 1</option>
						<option value="">Stretch_wrap 2</option>
						<option value="">Stretch_wrap 3</option>
						<option value="">Stretch_wrap 4</option>
						<option value="">Stretch_wrap 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onClick}  id="id"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>


		</fieldset>


	</div>
</form>
 </div>
	<div className="label_info row" >
				<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
					<fieldset className="scheduler-border">
						<legend className="scheduler-border">LABEL INFORMATION</legend>
						<div>{this.props.data ? this.props.data.TPackagingInstructions.custom_label : ''} </div>
					</fieldset>
					<fieldset className="scheduler-border">
						<legend className="scheduler-border">Notes</legend>
						<div>{this.props.data ? this.props.data.TPackagingInstructions.notes : ''} </div>
					</fieldset>
				</div>
				<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 pddn-10-top">
  	</div>


		<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-8">
			<div className="text_left">
			<div className="pull-right padding-20-all"><button type="button" className="btn  btn-primary" onClick = {this.onSubmit}>SUBMIT</button> </div>
			<div className="pull-right padding-20-last-r"><button type="button"  className="btn  btn-gray" onClick={hashHistory.goBack}>CANCEL</button> </div>

			</div>
		</div>
	</div>




 </div>
</section>
			)
	}
}
export default ConfirmPackagingInstructionForm;
