import React, { Component } from 'react';

 class DomesticShipmentSummary extends Component {
 	constructor(props){
 		super(props);
 		this.lotList
 		this.addressList
 	}
	render() {
			if(this.props.summaryData){
					   this.lotList = _.map(this.props.summaryData.TShipmentLots,(list,index) => {
			                    return (<li key = {index}>{list.TPackagingInstructionLots.lot_number}</li>)
			                })
			           this.addressList = _.map(this.props.summaryData.TShipmentAddress,(addr,index) => {
			           	return (<ul key = {index} className = "no-space">
			           		<li>Ship TO Address  :<b>{addr.shipToAddress} </b></li>
							<li>Ship TO Zip Code :<b>{addr.shipToZip} </b></li>
							<li>Ship TO City :<b> {addr.shipToCity}</b></li>
							<li>Ship TO State :<b> {addr.shipToState}</b></li>
			           	</ul>)
			           })
			           }

		return (
				<fieldset className="scheduler-border">
						<legend className="scheduler-border">Shipment Summary </legend>
						
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
							<ul className="no-space">
								<li>Number of Containers:<b>{this.props.summaryData ? this.props.summaryData.numberOfContainers : ''}</b></li>
								<li># of Bags / Container: <b>{this.props.summaryData ? this.props.summaryData.numberOfBags : ''}</b></li>
							</ul>
							<span className="margin-top-10">&nbsp;</span>
							<fieldset className="scheduler-border  ">
							 <legend className="scheduler-border font-size-12">Lot Number Allowed </legend>
							 <ul className="no-space list-style-disc">
								{this.lotList}
							</ul>
							</fieldset>
						</div>
						<div className=" col-lg-9 col-md-9 col-sm-9 col-xs-12 ">
							<div className="row">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
								<ul className="no-space" >
									<li>Recipient: <b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].recipent : ''}</b></li>
									<li>Recipient Contact: <b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].recipentContact : ''} </b></li>
									<li>Recipient Tel #:<b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].recipentTelNumber : ''} </b></li>							
								</ul>
								{this.addressList}
								</div>
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<ul className="no-space" >
										<li>Carrier :<b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].carrier : ''}</b></li>										
										<li>Carrier Acc Number :<b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].carrierAcNumber : ''} </b></li>
										<li>Shipping Payment Type :<b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].TPaymentType.type : ''}</b></li>
										<li>Shipping Paid By :<b>{this.props.summaryData ? this.props.summaryData.TShipmentDomestic[0].paidBy : ''} </b></li>
										<li>Requested Ship Date :<b>{this.props.summaryData ? moment(this.props.summaryData.TShipmentDomestic[0].requestedShipDate).format("MM-DD-YYYY") : ''} </b></li>
										<li>Requested Delivery Date :<b>{this.props.summaryData ? moment(this.props.summaryData.TShipmentDomestic[0].requestedDeliveryDate).format("MM-DD-YYYY") : ''} </b></li>
									</ul>
								</div>
								
								{/*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										 <textarea className="form-control textarea-note" rows="3" id="Notes"placeholder="Notes"></textarea>
										 <div className="error"><span></span></div>
									 </div>
								</div>*/}

								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<ul className="no-space">
										 <li>Body Type: <b>{this.props.pSumData ? (this.props.pSumData.TPackagingType != undefined ? this.props.pSumData.TPackagingType.packagingType : '') : ''}</b></li>
                                            <li>Pallet Type:<b> {this.props.pSumData ? this.props.pSumData.TPalletType.palletType : ''} </b></li>
                                            <li>Bags per Pallet:<b> {this.props.summaryData ? this.props.summaryData.TShipmentLots[0].TPackagingInstructions.bags_per_pallet : ''}</b></li>
                                            <li>Stretch Wrap: <b>{this.props.pSumData ? this.props.pSumData.TWrapType.name : ''}</b></li>
                                            <li>Origin: <b>Made in {this.props.pSumData ? this.props.pSumData.TOrigin.origin : ''}</b></li>		
										<li className=" pddn-20-top">
										   <label className="control control--checkbox "><b>Shipment Complete </b>
											  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
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