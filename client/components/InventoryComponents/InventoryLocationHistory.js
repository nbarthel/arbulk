import React, { Component } from 'react';
import { createDataLoader } from 'react-loopback'
import { Base_Url } from '../../constants'
import axios from 'axios'
class InventoryLocationHistory extends Component {
	constructor(props){
		super(props);
		this.state = { }
	}
	componentWillReceiveProps(nextProps) {

debugger
   	let id = this.props.lID
	   	let lotId = this.props.lotId
	   	var PIview = createDataLoader(InventoryLocationHistory, {
	            queries: [{
	                endpoint: 'TPiInventoryHistories'


	            }]
	        });
	//"include": {"relation": "classes", "scope": {"include": ["teachers","students"]}}
	var base1 = 'TPiInventoryHistories';
	if(this.props.lotIdArray.length>0){
		this.urlnew = PIview._buildUrl(base1, {
		 "where":{"piLotId":{"inq":this.props.lotIdArray}},
"include":['TInventoryLocation']
		 //include : ['TPiInventory',{"relation":'TPiInventory',"scope":{"include":["TInventoryLocation"]}}]
	});
	}
	else{
	          this.urlnew = PIview._buildUrl(base1, {
	           "where":{"piLotId":"-1"},
				"include":['TInventoryLocation']
	           //include : ['TPiInventory',{"relation":'TPiInventory',"scope":{"include":["TInventoryLocation"]}}]
	        });
				}

	           	 $.ajax({
	            url: this.urlnew,
	            success:function(data){
								debugger
	            	console.log('ajax>>>>>>>>>>>>>> ',data);

	              	if(data.stamp_confirmed){
	                     document.getElementById('rowstamp').checked = true
					}
	              //	console.log("lengthandindexandarr",length,index,arr)
	                this.setState({
	                	InvtLocationHistory : data,
	                	rows : data.TInventoryLocation
	                })
	                if(this.orignalTble === undefined){

	                this.orignalTble = _.cloneDeep(this.state.rows)
	               }
	                console.log("OrignalTable",this.orignalTble)
	               }.bind(this)

	        })
	}

componentDidMount() {
	// var InView = createDataLoader(InventoryLocationHistory,{
	// 	queries:[{
	// 		endpoint: 'TPiInventoryHistories',
	// 		filter:{
	// 			"include" : "TInventoryLocation"
	// 		}
	// 	}]
	// })
	// var base = "TPiInventoryHistories"+'/'+this.props.id
	// this.url = InView._buildUrl(base,{
	// 	"include" : 'TInventoryLocation'
	// });
	// console.log(">>>>>>>>>>>>>>>>>>>InViewURL",this.url)
	// $.ajax({
	// 		url: this.url,
	// 		success:function(data){
	// 			this.setState({
	// 					InvtLocationHistory : [data]
	// 			})
	//
	// 		}.bind(this)
	// })
}

	render() {

		// var inventory = _.map(this.state.InvtLocationHistory.TPiInventory,(invent,index) => {
		// if(invent.TInventoryLocation)
		// {      	return (
		// 	<tr key={index}>
		// 	<td>{invent.TInventoryLocation? invent.TInventoryLocation.locationName : ''}</td>
		// 	<td>{invent.noOfBags}</td>
		// 	<td>{invent.weight}</td>
		// 	<td>{this.state.currentInventory.lot_number}</td>
		// 	<td>{this.state.currentInventory.lot_number}</td>
		// 	</tr>
		// )
		// }
		//
		// })


		//console.log("INVTLOCATIONHISTORY>>>>>>>>>>>>>>>>>>>>",this.state.InvtLocationHistory)
		var invt ;
		if(this.state.InvtLocationHistory )
		{
		 invt = _.map(this.state.InvtLocationHistory,(invent)=>{
			debugger
			return (
				<tr key={invent.id}>
				<td>{invent.TInventoryLocation.locationName}</td>
				<td>{invent.noOfBags}</td>
				<td>{invent.weight}</td>
				<td>{moment(invent.createdOn).format("MM-DD-YYYY HH:MM")}</td>
				<td>{invent.notes}</td>
				</tr>)
		})
	}
		return (
			<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	 <div className="table-responsive">
	 <h5>Inventory Location History</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >
				<th>Inv. Location</th>
				<th>Bags</th>
				<th>Weight</th>
				<th>Date</th>
				<th>Note</th>
            </tr>
			</thead>
			<tbody>
{invt}
			</tbody>
	    </table>
	</div>
	</div>
		);
	}
}
export default InventoryLocationHistory
