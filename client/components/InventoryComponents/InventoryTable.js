 import React, { Component } from 'react';
import _ from 'lodash';
import { createDataLoader } from 'react-loopback';
import axios from 'axios';
import { Base_Url } from '../../constants'
var moment = require('moment');
var Loader = require('react-loader');
 class InventoryTable extends Component {
 constructor(props){
 	super(props);
 	this.state = {
  containerLoadData : '' }
 	//this.onCheck =  this.onCheck.bind(this);
 }

 /*componentDidMount() {
 	var InventView = createDataLoader(InventoryTable,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props",)
    //

    var base = 'TPackagingInstructions'+'/'+this.props.id;
    this.url = InventView._buildUrl(base, {
      include: ['TPackagingInstructionLots',"TOrigin","TCompany"]
    })
    console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")

      $.ajax({
            url: this.url,
            success:function(data){
                console.log('Invent>>>>>>>>>>>>>>>',data);
              this.setState({
                  viewData : [data]
                })
          }.bind(this)

        })
   }*/

/*onCheck(e){
	var id = ''
	if(e.target.checked){
	id = e.target.id
	console.log(">>>>>>>>>>>>>>>>>>",id)}
	else if(!e.target.checked){
		id = undefined
	console.log(">>>>>>>>>>>>>>>>",id)
	}

}*/

 render() {

 	console.log("props>>>>>>>",this.props.viewData)
 	var tableData = _.map(this.props.viewData,(view,index)=>{
 		return(
 			<table key={index}  className="table table-expandable table-striped" cellSpacing="0" >
 			<thead className="base_bg">
						 <tr >
							<th>ARB </th>
							<th>Customer</th>
							<th>PO </th>
          	  <th>Material </th>
							<th>Railcar# </th>
							<th>Lot# </th>
							<th>Confmd </th>
							<th>Arrvd </th>
							<th>Recd </th>
							<th>Cutoff </th>
							<th>Weight</th>
							<th>#Bags</th>
							<th>(In Invt.) </th>
							<th>Status</th>
							<th>

							</th>
						  </tr>
				</thead>
				<thead className="base_bg " data-toggle="collapse" data-target="#head1" className="clickable" >
						         <tr  className="base_bg clickable" data-toggle="collapse" aria-expanded="false" aria-controls="collapseOne" >
      					 		<th > {view.TLocation ? view.TLocation.locationName : ''} </th>
          						 <th >{view.TCompany ? view.TCompany.name : ''}</th>
           						 <th>{view.po_number} </th>
                      <th>{view.material}</th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
						          <th></th>
					           <th>

           </th>
       </tr>
				</thead>
				{
					_.map(view.TPackagingInstructionLots,(data,index)=>{
            var bagsLoadedInContainer = 0
            if(this.props.containerLoadData && this.props.containerLoadData.length>0){
            for(var i=0;i<this.props.containerLoadData.length;i++){
              if(data.id==this.props.containerLoadData[i].lotId){
                bagsLoadedInContainer = bagsLoadedInContainer + this.props.containerLoadData[i].noOfBags
              }
            }}
						if(this.props.lotId == "null"){
debugger
					return(

					<tbody key={index}  id="head1" className="collapseIn">
							<tr >
								<td> </td>
								<td> </td>
								<td> </td>
                <td> </td>
								<td>{data.railcar_number}</td>
								<td>{data.lot_number}</td>
								<td>{data.status == 'UNCONFIRMED' ? 'NO': 'YES'}</td>
								<td>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
								<td>{(data.TShipmentLots && data.TShipmentLots.length>0 && data.status!= "SHIPPED") ? "YES" : "NO"}</td>
								<td>{(data.TShipmentInternational && data.TShipmentInternational.length>0) ?moment(data.TShipmentInternational[0].cargoCutoffDate).format('MM-DD-YYYY') : 'NA'}</td>
								<td>{data.weight}</td>
								<td>{bagsLoadedInContainer>0? bagsLoadedInContainer : 0}</td>
								<td>{data.inInventory ?(data.inInventory - bagsLoadedInContainer ):parseInt(data.inInventory)>0?parseInt(data.inInventory):0 }</td>
								<td>{data.status?data.status : ''}</td>
								<td>
									<label className="control control--checkbox" id={data.status}>
									  <input type="checkbox" ref={(e) => {this.props.onCheck(e,data.status,"1",data.stamp_confirmed,false)}} onClick={(e) => {this.props.onCheck(e,data.status,"0")}} value={data.status?data.status : ''} id={data.id}/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
					</tbody>
					)}
					else if(data.id == this.props.lotId){
						return(
							<tbody key={index}  id="head1" className="collapseIn">
							<tr >
								<td> </td>
								<td> </td>
								<td> </td>
                <td> </td>
                <td>{data.railcar_number}</td>
								<td>{data.lot_number}</td>
								<td>{data.status == 'UNCONFIRMED' ? 'NO': 'YES'}</td>
								<td>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
								<td>{(data.TShipmentLots && data.TShipmentLots.length>0 && data.status!= "SHIPPED") ? "YES" : "NO"}</td>
								<td>{(data.TShipmentInternational && data.TShipmentInternational.length>0) ?moment(data.TShipmentInternational[0].cargoCutoffDate).format('MM-DD-YYYY') : 'NA'}</td>
								<td>{data.weight}</td>
								<td>{bagsLoadedInContainer>0? bagsLoadedInContainer : 0}</td>
								<td>{data.inInventory ?(data.inInventory - bagsLoadedInContainer ):parseInt(data.inInventory)>0?parseInt(data.inInventory):0 }</td>
								<td>{data.status?data.status : ''}</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" ref={(e) => {this.props.onCheck(e,data.status,"1",data.stamp_confirmed,true)}} onClick={(e) => {this.props.onCheck(e,data.status,"0")}}  id={data.id}/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
					</tbody>			)
					}
				})}

 			</table>)
 	})
 	return (
				<div className=" table-responsive view_table">
				{tableData}
		</div>
		)

	}

}
export default InventoryTable;
