import React, { Component } from 'react';

 class DomesticShipmentSummary extends Component {
 	constructor(props){
 		super(props);
 		this.lotList
 		this.addressList
 	}
	render() {
		if(this.props.shipInfo){
      var numberOfBags = 0
      var bagType = ""
      var noOfBagsPerPallet
					   this.lotList = _.map(this.props.shipInfo.TShipmentent.TShipmentLots,(list,index) => {
               debugger
               numberOfBags = numberOfBags + list.noOfBags
               bagType = list.TPackagingInstructions.TPackagingMaterial.packagingName
               noOfBagsPerPallet = list.TPackagingInstructions.bags_per_pallet
			                    return (<li key = {index}>{list.TPackagingInstructionLots.lot_number}</li>)
			                })
			           this.addressList = _.map(this.props.shipInfo.TShipmentent.TShipmentAddress,(addr,index) => {

                  return (<ul key = {index} className = "no-space">
			           		<li>Ship TO Address  :<b>{addr.shipToAddress} </b></li>
							<li>Ship TO Zip Code :<b>{addr.shipToZip} </b></li>
							<li>Ship TO City :<b> {addr.shipToCity}</b></li>
							<li>Ship TO State :<b> {addr.shipToState}</b></li>
			           	</ul>)
			           })

			           }

		return (
				<fieldset className="scheduler-border sameHeight">
							<legend className="scheduler-border">Shipment Summary </legend>
							<div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
								<ul className="no-space">
									<li>Domestic Type of Shipment <b> </b></li>
									<li>Reference #<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].shippingReferenceNumber : ''}</b></li>
									<li># of Bags : <b>{this.props.shipInfo? numberOfBags : ''}</b></li>
								</ul>
								<span className="margin-top-10">&nbsp;</span>
								<fieldset className="scheduler-border  ">
								 <legend className="scheduler-border font-size-12">Lot Number Allowed </legend>
								 <ul className="no-space ">
							        <li>	{this.lotList}</li>
								</ul>
								</fieldset>
							</div>
							<div className=" col-lg-9 col-md-9 col-sm-9 col-xs-12 ">
								<div className="row">
									<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
										<ul className="no-space" >
										<li>Recipient:<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].recipent : ''}</b></li>
										<li>Recipient Contact: <b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].recipentContact : ''} </b></li>
										<li>Recipient Tel #:<b> {this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].recipentTelNumber : ''}</b></li>
										</ul>
										{this.addressList}
									</div>
									<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12 nopadding ">
										<ul className="no-space" >
											<li>Carrier : <b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].carrier : ''}</b></li>
											<li>Carrier AC Number :<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].carrierAcNumber :''} </b></li>
											<li>Shipping Payment Type :<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].TPaymentType.type:''} </b></li>
											<li>Shipping Paid By :<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].paidBy:''} </b></li>
											<li>Requested Ship Date :<b>{this.props.shipInfo ? moment(this.props.shipInfo.TShipmentent.TShipmentDomestic[0].requestedShipDate).format("MM-DD-YYYY"):''} </b></li>
											<li>Requested Delivery Date :<b>{this.props.shipInfo ? moment(this.props.shipInfo.TShipmentent.TShipmentDomestic[0].requestedDeliveryDate).format("MM-DD-YYYY"):''} </b></li>
										</ul>
									</div>

									<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
										<ul className="no-space">
											<li>Body Type: <b>{bagType}</b></li>
											<li>Pallet Type:<b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TPalletType.palletType: ''} </b></li>
											<li>Bags per Pallet:<b> {noOfBagsPerPallet}</b></li>
											<li>Stretch Wrap: <b>{this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TWrapType.name:''}</b></li>
											<li>Origin: <b>Made in {this.props.shipInfo ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TOrigin.origin:''}</b></li>
											<li className=" pddn-20-top">
											   <label className="control control--checkbox ">Shipment Complete
												  <input type="checkbox"  /><div className="control__indicator"></div>
												</label>
											</li>
										</ul>
									</div>






								</div>
							</div>





						</fieldset>
		);
	}
}
export default DomesticShipmentSummary
