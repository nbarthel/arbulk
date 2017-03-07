import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
//import PackagingInstructionViewForm from '../../containers/Packaging/PackagingInstructionView/PackagingInstructionViewForm';



import { Base_Url } from '../../constants'
 class InventoryHistory extends Component {

constructor(props){
  super(props)
  this.state = {}
}
componentWillReceiveProps(next){

  var PIview = createDataLoader(InventoryHistory,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation","TPiInventory"]}}]
        }
      }]
    })
       var base = 'TPackagingInstructions/' + next.pID;
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
           // include : [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :["TShipmentLots" ,"TShipmentInternational"]}},"TLocation" , "TCompany"]
            include : [{"relation":"TPackagingInstructionLots" ,
                        "scope":{
                                  "include":{"relation":"TPiInventory",
                                   "scope":{"include":{"relation":"TPackagingInstructionLots",
                                   "scope":{"include" :{
                                                        "relation" : "TShipmentLots",
                                                        "scope":{
                                                                 "include":{
                                                                             "relation":"TShipmentent" ,
                                                                             "scope":{
                                                                                       "include" : ["TShipmentInternational","TShipmentDomestic"]
                                                                                      }
                                                                            }
                                                                 }
                                                        }  }} }}
                                }
                      },"TLocation" , "TCompany"]


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
    var PO_number = this.state.historyData && this.state.historyData.po_number ? this.state.historyData.po_number : ''
    if(this.state.historyData && this.state.historyData.TPackagingInstructionLots && this.state.historyData.TPackagingInstructionLots.length > 0)
    {
      var bagBalnce = 0
      var tempthis = this
		var history = _.map(this.state.historyData.TPackagingInstructionLots , function(view , index){
    return _.map(view.TPiInventory,function(viewI,index){
      var releaseNumber
      if(tempthis!=undefined && tempthis.props!=undefined && tempthis.props.lotIdArray.length > 0 &&  tempthis.props.lotIdArray.indexOf(parseInt(viewI.piLotId))!=-1 ){
      if(viewI.TPackagingInstructionLots && viewI.TPackagingInstructionLots.TShipmentLots.length>0 && viewI.TPackagingInstructionLots.TShipmentLots[0].TShipmentent){
        releaseNumber = viewI.TPackagingInstructionLots.TShipmentLots[0].TShipmentent.releaseNumber
      }
        bagBalnce = viewI.noOfBags + bagBalnce
        return(
          <tr key={index}>
          <td>{moment(view.createdOn).format("MM-DD-YYYY")}	</td>
          <td>{PO_number}</td>
          <td>{view.lot_number}</td>
          <td> {releaseNumber?releaseNumber:""}</td>
          <td>{viewI.noOfBags>0?"+ "+viewI.noOfBags:viewI.noOfBags}</td>
          <td>{bagBalnce>0?"+ "+bagBalnce:bagBalnce}</td>
        </tr>

    )
  }

  })
    })
  }
		return (
			<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	 <div className="table-responsive">
	  <h5>Inventory History</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >
				<th>Date</th>
				<th>PO#</th>
        <th>Lot #</th>
				<th>Release#</th>
				<th># of Bags</th>
				<th>Bag Balance</th>
            </tr>
			</thead>
			<tbody>
				{history}
				<tr style={{visibility : "hidden"}}>
					<th colSpan="4">Total </th>
					<th>660 </th>
				</tr>
			</tbody>
	    </table>
	</div>

	</div>

		);
	}
}


export default InventoryHistory;
