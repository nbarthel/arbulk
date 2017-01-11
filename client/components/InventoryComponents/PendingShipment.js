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
	       var base = 'TPackagingInstructions/' + next.pID;
	        //TPackagingInstructionLots
	        this.url = PIview._buildUrl(base, {
	           // include : [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :["TShipmentLots" ,"TShipmentInternational"]}},"TLocation" , "TCompany"]
	            include : [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :{"relation" : "TShipmentLots" , "scope":{"include":{"relation":"TShipmentent" , "scope":{"include" : "TShipmentInternational"}}}}}},"TLocation" , "TCompany"]


	        });
	        console.log('sdsddsdsdssdssssssssssd' , this.url);
	      $.ajax({
	            url: this.url,
	            success:function(data){
	                console.log('ajax ',data);
	                //debugger
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

		var inventoryBags = (this.state.historyData && this.state.historyData.TPackagingInstructionLots && this.state.historyData.TPackagingInstructionLots.length > 0 )?this.state.historyData.TPackagingInstructionLots[this.state.historyData.TPackagingInstructionLots.length - 1].inInventory : 0

		if(this.state.historyData && this.state.historyData.TPackagingInstructionLots && this.state.historyData.TPackagingInstructionLots.length > 0 && this.state.historyData.TPackagingInstructionLots[0].TShipmentLots && this.state.historyData.TPackagingInstructionLots[this.state.historyData.TPackagingInstructionLots.length - 1].status != "SHIPPED")
		{
		var history = _.map(this.state.historyData.TPackagingInstructionLots[this.state.historyData.TPackagingInstructionLots.length - 1].TShipmentLots , function(view , index){
			debugger;
		return(
			<tr key={index}>
			<td>{moment(view.createdOn).format("YYYY-MM-DD")}	</td>
			<td> {view.TShipmentent.releaseNumber}</td>
			<td>{view.noOfBags}</td>
			<td>{inventoryBags -view.noOfBags}</td>
		</tr>

	)

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
