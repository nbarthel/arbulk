import React, { Component } from 'react';
var moment = require('moment')
 class ShipmentSummaryComponent extends Component {
	render() {
        debugger
        var containerType = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational &&  this.props.shipInfo.TShipmentent.TShipmentInternational.length > 0 && this.props.shipInfo.TShipmentent.TShipmentInternational[0].TContainerType) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].TContainerType.name : 'NA'
        var numberOfContainer = (this.props.shipInfo && this.props.shipInfo.TShipmentent) ? this.props.shipInfo && this.props.shipInfo.TShipmentent.numberOfContainers : 'NA'
        //var numberOfBags = (this.props.shipInfo && this.props.shipInfo.TShipmentent) ? this.props.shipInfo && this.props.shipInfo.TShipmentent.numberOfBags : 'NA'
        var shipMentLine = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational &&  this.props.shipInfo.TShipmentent.TShipmentInternational.length > 0 && this.props.shipInfo.TShipmentent.TShipmentInternational[0].TSteamshipLine) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].TSteamshipLine.name : 'NA'
        var shipvessel = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].steamshipVessel : 'NA'
        var FrFor = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].freightForwarder : 'NA'
        var erDate = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].earliestReturnDate : 'NA'
        var docCutOffDate = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].docCutoffDate: 'NA'
        var pickUpLocation = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].containerPickupLocation : 'NA'
        var returnLocation = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].containerReturnLocation : 'NA'
        var recipient = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentDomestic && this.props.shipInfo.TShipmentent.TShipmentDomestic.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentDomestic[0].recipent : 'NA'
        var notes = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentInternational && this.props.shipInfo.TShipmentent.TShipmentInternational.length>0 ) ? this.props.shipInfo.TShipmentent.TShipmentInternational[0].notes : 'NA'

        //var bodyType = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions.railcar_number : 'NA'
        var palletType = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentLots && this.props.shipInfo.TShipmentent.TShipmentLots.length>0 && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TPalletType) ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TPalletType.palletType : 'NA'
        //var bagsperpallet = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions.railcar_number : 'NA'
        var wrap = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentLots && this.props.shipInfo.TShipmentent.TShipmentLots.length>0 && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TWrapType) ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TWrapType.name : 'NA'
        var origin = (this.props.shipInfo && this.props.shipInfo.TShipmentent && this.props.shipInfo.TShipmentent.TShipmentLots && this.props.shipInfo.TShipmentent.TShipmentLots.length>0 && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions && this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TOrigin) ? this.props.shipInfo.TShipmentent.TShipmentLots[0].TPackagingInstructions.TOrigin.origin : 'NA'


        if(this.props.shipInfo && this.props.shipInfo.TShipmentent.TShipmentLots) {
          var numberOfBags = 0
          var bagType = ""
          var noOfBagsPerPallet
            var list = _.map(this.props.shipInfo.TShipmentent.TShipmentLots, (data, index)=> {
              numberOfBags = numberOfBags + data.noOfBags
              bagType = data.TPackagingInstructions.TPackagingMaterial.packagingName
              noOfBagsPerPallet = data.TPackagingInstructions.bags_per_pallet
                return (
                    <li>{data.TPackagingInstructionLots.lot_number}</li>
                )
            })
        }

		return (
			<fieldset className="scheduler-border sameHeight">
                                    <legend className="scheduler-border">Shipment Summary </legend>
                                    <div className=" col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-6  col-sm-6 col-xs-12">
                                                <ul className="no-space">
                                                    <li>Container Type: <b>{containerType} </b></li>
                                                    <li>Number of Containers:<b> {numberOfContainer}</b></li>
                                                    <li># of Bags / Container: <b>{numberOfBags}</b></li>
                                                </ul>
                                                <span className="margin-top-10">&nbsp;</span>
                                                <fieldset className="scheduler-border  ">
                                                    <legend className="scheduler-border font-size-12">Lot Number Allowed </legend>
                                                    <ul className="no-space list-style-disc">
                                                        {

                                                           list
                                                        }


                                                    </ul>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6  col-sm-6  col-xs-12">
                                                <ul className="no-space" >
                                                    <li>Steamship Line:<b> {shipMentLine} </b></li>
                                                    <li>Steamline Vessel: <b>{shipvessel}</b></li>
                                                    <li>Freight Forwarder:<b> {FrFor}</b></li>
                                                    <li>Earliest Return Date:<b>{(erDate !='NA') ?moment(erDate).format('MM-DD-YYYY'): 'NA' }</b></li>
                                                    <li>Doc Cutoff Date: <b>{ (docCutOffDate !='NA') ?moment(docCutOffDate).format('MM-DD-YYYY'): 'NA' }</b></li>
                                                    <li>Pick Up Location:<b> {pickUpLocation}</b></li>
                                                    <li>Return Location: <b>{returnLocation}</b></li>
                                                    <li>Recipient:<b> {recipient}</b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-4  col-sm-4 col-xs-12 ">
                                        <div className="form-group">
                                            <textarea className="form-control textarea-note" rows="3" id="Notes"placeholder="Notes" value={notes}></textarea>
                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                                        <ul className="no-space">
                                            <li>Body Type: <b>{bagType}</b></li>
                                            <li>Pallet Type:<b> {palletType}</b></li>
                                            <li>Bags per Pallet:<b> {noOfBagsPerPallet}</b></li>
                                            <li>Stretch Wrap: <b>{wrap}</b></li>
                                            <li>Origin: <b>Made in {origin}</b></li>
                                            <li className=" pddn-20-top">
                                                <label className="control control--checkbox ">Shipment Complete
                                                    <input type="checkbox"  /><div className="control__indicator"></div>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </fieldset>
		);
	}
}
export default ShipmentSummaryComponent
