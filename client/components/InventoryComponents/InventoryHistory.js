import React, { Component } from 'react';
 class InventoryHistory extends Component {
	render() {
		var history = _.map(this.props.data,(hist,index)=>{
			return(
					<tr key={index}>
					<td>{moment(hist.createdOn).format("YYYY-MM-DD")}	</td>
					<td>{hist.po_number}</td>
					<td> </td>					
					<td>{null}</td>					
					<td>{null}</td>					
				</tr>
				)
		})
		return (
			<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	 <div className="table-responsive">	
	  <h5>Inventory History</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >				
				<th>Date</th>
				<th>PO</th>
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