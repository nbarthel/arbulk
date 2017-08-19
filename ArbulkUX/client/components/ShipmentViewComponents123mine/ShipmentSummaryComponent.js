import React, { Component } from 'react';

 class ShipmentSummaryComponent extends Component {
	constructor(props){
        super(props)
        this.lotList
    }
    render() {
        if(this.props.summaryData){
                this.lotList = _.map(this.props.summaryData.TShipmentLots,(list,index) => {
                    return (<li key = {index}>{list.TPackagingInstructionLots.lot_number}</li>)
                })


                if(this.props.summaryData.isDomestic == 1){
                    var contType = this.props.summaryData.TShipmentDomestic[0].TContainerType.name
                    
                }else{
                    var contType = this.props.summaryData.TShipmentInternational[0].TContainerType.name
                }


            }
		return (
			 <fieldset className="scheduler-border">
                                    <legend className="scheduler-border">Shipment Summary</legend>
                                    <div className=" col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-6  col-sm-6 col-xs-12">
                                                <ul className="no-space">
                                                    <li>Container Type: <b>{contType ? contType : ''}</b></li>
                                                    <li>Number of Containers:<b>{this.props.summaryData ? this.props.summaryData.numberOfContainers : ''}</b></li>
                                                    <li># of Bags / Container: <b>{this.props.summaryData ? this.props.summaryData.numberOfBags : ''}</b></li>
                                                </ul>
                                                <span className="margin-top-10">&nbsp;</span>
                                                <fieldset className="scheduler-border  ">
                                                    <legend className="scheduler-border font-size-12">Lot Number Allowed
                                                    </legend>
                                                    <ul className="no-space list-style-disc">
                                                        {this.lotList}
                                                    </ul>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6  col-sm-6  col-xs-12">
                                                <ul className="no-space">
                                                    <li>Shipment Line:<b> {this.props.summaryData ? this.props.summaryData.TShipmentInternational[0].TSteamshipLine.name : ''}</b></li>
                                                    <li>Steamline Vessel: <b> {this.props.summaryData ? this.props.summaryData.TShipmentInternational[0].steamshipVessel : ''}</b></li>
                                                    <li>Freight Forwarder:<b> {this.props.summaryData ? this.props.summaryData.TShipmentInternational[0].freightForwarder : ''}</b></li>
                                                    <li>Earliest Return Date:<b> {this.props.summaryData ? moment(this.props.summaryData.TShipmentInternational[0].earliestReturnDate).format("MM-DD-YYYY") : ''}</b></li>
                                                    <li>Doc Cutoff Date: <b> {this.props.summaryData ? moment(this.props.summaryData.TShipmentInternational[0].docCutoffDate).format("MM-DD-YYYY") : ''}</b></li>
                                                    <li>Pick Up Location:<b> {this.props.summaryData ? this.props.summaryData.TShipmentInternational[0].containerPickupLocation : ''}</b></li>
                                                    <li>Return Location: <b> {this.props.summaryData ? this.props.summaryData.TShipmentInternational[0].containerReturnLocation : ''}</b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-5  col-sm-5 col-xs-12 ">
                                        <div className="form-group">
                                            <textarea className="form-control textarea-note" rows="3" id="Notes"
                                                      placeholder="Notes"></textarea>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-2 col-md-2 col-sm-6 col-xs-12 ">
                                        <ul className="no-space">
                                            <li>Body Type: <b>{this.props.pSumData ? (this.props.pSumData.TPackagingType != undefined ? this.props.pSumData.TPackagingType.packagingType : '') : ''}</b></li>
                                            <li>Pallet Type:<b> {this.props.pSumData ? this.props.pSumData.TPalletType.palletType : ''} </b></li>
                                            <li>Bags per Pallet:<b> {this.props.summaryData ? this.props.summaryData.TShipmentLots[0].TPackagingInstructions.bags_per_pallet : ''}</b></li>
                                            <li>Stretch Wrap: <b>{this.props.pSumData ? this.props.pSumData.TWrapType.name : ''}</b></li>
                                            <li>Origin: <b>Made in {this.props.pSumData ? this.props.pSumData.TOrigin.origin : ''}</b></li>
                                            <li className=" pddn-20-top">
                                                <label className="control control--checkbox "><b>Shipment Complete </b>
                                                <input type="checkbox"  id="row1"/>

                                                <div className="control__indicator"></div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </fieldset>
		);
	}
}
export default ShipmentSummaryComponent