import React, { Component } from 'react';
import { createDataLoader } from 'react-loopback'
class InventoryLocationHistory extends Component {
	constructor(props){
		super(props);
		this.state = { }
	}

componentDidMount() {
	var InView = createDataLoader(InventoryLocationHistory,{
		queries:[{
			endpoint: 'TPiInventoryHistories',
			filter:{
				"include" : "TInventoryLocation"
			}
		}]
	})
	var base = "TPiInventoryHistories"+'/'+this.props.id
	this.url = InView._buildUrl(base,{
		"include" : 'TInventoryLocation'
	});
	console.log(">>>>>>>>>>>>>>>>>>>InViewURL",this.url)
	$.ajax({
			url: this.url,
			success:function(data){
				this.setState({
						InvtLocationHistory : [data]
				})

			}.bind(this)
	})
}
	
	render() {
		console.log("INVTLOCATIONHISTORY>>>>>>>>>>>>>>>>>>>>",this.state.InvtLocationHistory)
		let invt = _.map(this.state.InvtLocationHistory,(invent)=>{
			debugger
			return (
				<tr key={invent.id}>
				<td>{invent.TInventoryLocation.locationName}</td>
				<td>{invent.noOfBags}</td>
				<td>{invent.weight}</td>
				<td>{moment(invent.createdOn).format("YYYY-MM-DD")}</td>
				<td></td>
				</tr>)
		})
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
				<th>Time</th> 				
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