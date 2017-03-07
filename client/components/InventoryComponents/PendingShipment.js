import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
//import PackagingInstructionViewForm from '../../containers/Packaging/PackagingInstructionView/PackagingInstructionViewForm';



import { Base_Url } from '../../constants'


class PendingShipment extends Component {

	constructor(props){
	  super(props)
	  this.state = {}
	}
	componentWillReceiveProps(next){

	  var PIview = createDataLoader(PendingShipment,{
	      queries:[{
	        endpoint: 'TPackagingInstructions',
	        filter: {
	          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
	        }
	      }]
	    })
	       var base = 'TPackagingInstructions/'

	        this.url = PIview._buildUrl(base, {
	           // include : [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :["TShipmentLots" ,"TShipmentInternational"]}},"TLocation" , "TCompany"]
	            include : [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :{"relation" : "TShipmentLots" , "scope":{"include":{"relation":"TShipmentent" , "scope":{"include" : "TShipmentInternational"}}}}}},"TLocation" , "TCompany"],
							"where":{"id": next.pID}

	        });
	        console.log('sdsddsdsdssdssssssssssd' , this.url);
	      $.ajax({
	            url: this.url,
	            success:function(data){
	                console.log('ajax ',data);
	                debugger
	               this.setState(
	                   {
	                       historyData : data,
	                       loaded:true
	                   }
	               )
	               //console.log( this.state.xyz)
	        }.bind(this)
	        })
	}





	render() {

		//var inventoryBags = (this.state.historyData && this.state.historyData[0].TPackagingInstructionLots && this.state.historyData[0].TPackagingInstructionLots.length > 0 )?this.state.historyData[0].TPackagingInstructionLots[this.state.historyData[0].TPackagingInstructionLots.length - 1].inInventory : 0

		if(this.state.historyData && this.state.historyData[0].TPackagingInstructionLots && this.state.historyData[0].TPackagingInstructionLots.length > 0 && this.state.historyData[0].TPackagingInstructionLots[0].TShipmentLots )
		{
			var PO_number = this.state.historyData && this.state.historyData[0].po_number ? this.state.historyData[0].po_number : ''
			var tempthis = this
			var inventoryBags=0
			var history = _.map(this.state.historyData[0].TPackagingInstructionLots , function(view , index){
			var temp = view.inInventory
			debugger
			if(tempthis!=undefined && tempthis.props!=undefined && tempthis.props.lotIdArray.length > 0 &&  tempthis.props.lotIdArray.indexOf(parseInt(view.id))!=-1 ){
			if(!isNaN(parseInt(temp))){
				inventoryBags =parseInt(temp)+ inventoryBags
			}
			else{
				inventoryBags = inventoryBags + 0
			}
			return _.map(view.TShipmentLots,function(viewTShipLot,index){
				inventoryBags = inventoryBags - viewTShipLot.noOfBags
				return(
					<tr key={index}>
					<td>{moment(viewTShipLot.createdOn).format("MM-DD-YYYY")}	</td>
					<td>{PO_number}</td>
					<td>{view.lot_number}</td>
					<td> {viewTShipLot.TShipmentent.releaseNumber}</td>
					<td>{"- "+viewTShipLot.noOfBags}</td>
					<td>{inventoryBags}</td>
				</tr>

			)
			})
		}
		})
	}



		return (
				<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	 <div className="table-responsive">
	 <h5>Pending Shipment</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >
				<th>Date Entered</th>
				<th>PO#</th>
				<th>Lot#</th>
				<th>Release#</th>
				<th># of Bags</th>
				<th>Bag Balance</th>
            </tr>
			</thead>
			<tbody>
			{history}
            </tbody>
	    </table>
	</div>
	<p className="error"></p>
	</div>
		);
	}
}
export default PendingShipment
