import React, { Component } from 'react';
import '../../../public/stylesheets/sweetalert.css';
import SweetAlert from 'sweetalert-react';
import axios from 'axios'
import { Base_Url } from '../../../constants'
import { hashHistory } from 'react-router'
 class ShipmentConfirmDomestic extends Component {
	     constructor(props){
	          super(props);
	     	  this.count = 0
       		  this.userName = localStorage.getItem('userName')
       		  this.userId = localStorage.getItem('userId')
      		  this.onCheck = this.onCheck.bind(this)
      		  this.onSubmit = this.onSubmit.bind(this)
	     }


    onCheck(e){
        if(e.target.checked){
            this.count = this.count + 1
        }
        else if(!e.target.checked){
            this.count = this.count - 1
        }
        console.log("COUNT",this.count)
    }
    onSubmit(e){
		var shipmentId = this.props.data.TShipmentent.TShipmentDomestic[0].id
        if(this.count == 23){
			axios.put(Base_Url+"TShipmentDomestics/"+ shipmentId , {status : "CONFIRMED"}).then((response)=>{
				swal("Confirmed","Shipment Has Been Confirmed","info")
				hashHistory.push("/Shipment/shipmentview")
			})
        }
        else{
			swal("Missing Checks","Please Check All The Checkboxes","error")
        }
    }
	render() {
		return (
			<section className="confirm_shipment">
<div className="container-fluid">
<div className="row">
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<fieldset className="scheduler-border sameHeight-Domestic ">
				<legend className="scheduler-border">PACKAGING ORDER INFO </legend>
				<div className="form-group base_color text-uppercase">
					<div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold">Information</p></div>
					<div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right bold">Confirmed by {this.userName}</p></div>
				</div>
				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Customer Name</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					<select className="form-control" id="" name="Type_of_Packaging" disabled>
						<option value = {this.props.data.TShipmentent.TCompany.id}>{this.props.data.TShipmentent.TCompany.name}</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>


				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Purchase_Order" className=" control-label">Release #</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" value = {this.props.data.TShipmentent.releaseNumber} disabled id="Purchase_Order" placeholder="Release #"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group ">
					<div className="col-lg-3 "><label htmlFor="Rail_Car_Number" className=" control-label">Purchase Order Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" disabled className="form-control" value = {this.props.data.TPackagingInstructions.po_number} id="Rail_Car_Number" placeholder="Purchase Order Number"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>
			    <div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Lot_Number" className="control-label">Lot Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					     <input type="text" className="form-control" disabled value = {this.props.data.TPackagingInstructionLots.lot_number} id="Lot_Number" placeholder="Lot Number"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="pddn-10-top">
						<div className="form-group">

							<div className="col-lg-3 "><label htmlFor="Material" className=" control-label">Material</label></div>
							<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							   <input type="text" disabled value = {this.props.data.TPackagingInstructions.material} className="form-control" id="" placeholder="Material"/>
							  <div className="error"><span></span></div>
							</div>
							<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
								<label className="control control--checkbox ">Confirmed
								  <input type="checkbox"  onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
								</label>
							</div>
						</div>

						<div className="form-group ">
							<div className="col-lg-3 "><label htmlFor="Material" className="control-label">Number of Containers</label></div>
							<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							   <select className="form-control" disabled  id="Type_of_Packaging" name="Type_of_Packaging">
								<option value = {this.props.data.TShipmentent.numberOfContainers}>{this.props.data.TShipmentent.numberOfContainers}</option>
							  </select>
							  <div className="error"><span></span></div>
							</div>
							<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
								<label className="control control--checkbox ">Confirmed
								  <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
								</label>
							</div>
						</div>

						<div className="form-group">
							<div className="col-lg-3 "><label htmlFor="" className=" control-label">Number of Bags</label></div>
							<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							   <input type="text" disabled value = {this.props.data.noOfBags} className="form-control" id="" placeholder="Number of Bags"/>
							  <div className="error"><span></span></div>
							</div>
							<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
								<label className="control control--checkbox ">Confirmed
								  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
								</label>
							</div>
						</div>

				</div>

			</fieldset>
	</div>


    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">

	    <fieldset className="scheduler-border sameHeight-Domestic">
				<legend className="scheduler-border">PURCHASE ORDER INFO</legend>
				<div className="form-group base_color text-uppercase">
					<div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold ">Information</p></div>
					<div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right bold">Confirmed by {this.userName}</p></div>
				</div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Booking Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" value = {this.props.data.TShipmentent.TShipmentDomestic[0].bookingNumber} disabled id="" placeholder="Booking Numbere"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Type of Shipment</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					<select className="form-control" id="" name="" disabled>
						<option value="">{this.props.data.TShipmentent.TShipmentDomestic[0].TShipmentType.shipmentType}</option>

					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Type_of_Bag" className=" control-label">Shipping Ref Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" value = {this.props.data.TShipmentent.TShipmentDomestic[0].shippingReferenceNumber} disabled id="" placeholder="Shipping Ref Number"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Type_of_Pallet" className=" control-label">Reciepient</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" value = {this.props.data.TShipmentent.TShipmentDomestic[0].recipent} disabled id="" placeholder="Reciepient"/>
					  <div className="error"><span></span></div>
					</div>
				<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="No_of_Bages_Pallat" className=" control-label">Reciepient Contact</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentDomestic[0].recipentContact} disabled placeholder="Reciepient Contact"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="Stretch_wrap" className=" control-label">Reciepient Telephone</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					    <input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentDomestic[0].recipentTelNumber} disabled placeholder="Reciepient Telephone"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>


				<div className="pddn-50-top">

					<div className="form-group">
						<div className="col-lg-3 "><label htmlFor="" className=" control-label">Ship to Address</label></div>
						<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							<input type="text" className="form-control" value = {this.props.data.TShipmentent.TShipmentAddress.length > 0 ? this.props.data.TShipmentent.TShipmentAddress[0].shipToAddress : ''} disabled  id="" placeholder="Ship to Address 1"/>
						  <div className="error"><span></span></div>
						</div>
						<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
							<label className="control control--checkbox ">Confirmed
							  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
							</label>
						</div>
					</div>

					<div className="form-group">
						<div className="col-lg-3 "><label htmlFor="" className=" control-label">Ship to Zip Code</label></div>
						<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							<input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentAddress.length > 0 ? this.props.data.TShipmentent.TShipmentAddress[0].shipToZip : ''} disabled placeholder="Ship to Zip Code"/>
						  <div className="error"><span></span></div>
						</div>
						<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
							<label className="control control--checkbox ">Confirmed
							  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
							</label>
						</div>
					</div>

					<div className="form-group">
						<div className="col-lg-3 "><label htmlFor="" className=" control-label"> Ship to City</label></div>
						<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							<input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentAddress.length > 0 ? this.props.data.TShipmentent.TShipmentAddress[0].shipToCity : ''} disabled placeholder="Ship to City"/>
						  <div className="error"><span></span></div>
						</div>
						<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
							<label className="control control--checkbox ">Confirmed
							  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
							</label>
						</div>
					</div>

					<div className="form-group">
						<div className="col-lg-3 "><label htmlFor="" className=" control-label">Ship to State</label></div>
						<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
							<input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentAddress.length > 0 ? this.props.data.TShipmentent.TShipmentAddress[0].shipToState : ''} disabled placeholder="Ship to State"/>
						  <div className="error"><span></span></div>
						</div>
						<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
							<label className="control control--checkbox ">Confirmed
							  <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
							</label>
						</div>
					</div>

				</div>
				<div className="pddn-50-top">

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label"> Carrier</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					    <input type="text" value = {this.props.data.TShipmentent.TShipmentDomestic[0].carrier} disabled className="form-control" id="" placeholder="Carrier"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Carrier Account Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					    <input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentDomestic[0].carrierAcNumber} disabled  placeholder="Carrier Account Number"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Shipping Payment Type</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					    <input type="text" className="form-control" id="" value = {this.props.data.TShipmentent.TShipmentDomestic[0].TPaymentType.type} disabled placeholder="Shipping Payment Type"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Shipping Paid By</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					    <input type="text" className="form-control" value = {this.props.data.TShipmentent.TShipmentDomestic[0].paidBy} disabled id="" placeholder="Shipping Paid By"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				</div>


				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Requested Ship Date</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					   <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
						<input className="form-control" id="date" value = {moment(this.props.data.TShipmentent.TShipmentDomestic[0].requestedShipDate).format("MM-DD-YYYY")}  disabled name="date" placeholder="Requested Ship Date" type="text"/>
					</div>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>

				<div className="form-group">
					<div className="col-lg-3 "><label htmlFor="" className=" control-label">Requested Delivery Date</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
						<input className="form-control" id="date" name="date" value = {moment(this.props.data.TShipmentent.TShipmentDomestic[0].requestedDeliveryDate).format("MM-DD-YYYY")} disabled placeholder="Requested Delivery Date" type="text"/>
					</div>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
						</label>
				    </div>
                </div>


		</fieldset>


	</div>
</form>
 </div>

	<div className="label_info row pddn-30-btm" >
		<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-4">
			 <div className="pull-left padding-20-last-l"><button type="button"  className="btn  btn-orange hidden">DELETE</button> </div>
		</div>


		<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-8">
			<div className="text_left">
			 <div className="pull-right padding-20-last-r"><button type="button" onClick = {this.onSubmit} className="btn  btn-primary">SUBMIT</button> </div>
			 <div className="pull-right padding-20-all"><button type="button"  className="btn  btn-gray">CANCEL</button> </div>

			</div>
		</div>
	</div>



 </div>

</section>
		);
	}
}
export default ShipmentConfirmDomestic;
