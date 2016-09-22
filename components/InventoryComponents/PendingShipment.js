import React, { Component } from 'react';

class PendingShipment extends Component {
	render() {
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
				
                <tr>
					<td>11/1/2014 </td>
					<td> </td>					
					<td>+3508</td>					
					<td>3508</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td>-990</td>					
					<td>2518</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td>-990</td>					
					<td>1528</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td> -888</td>					
					<td>880</td>					
				</tr>
				<tr>
					<th colSpan="3">Total </th>
					<th>660 </th>					
				</tr>					
			</tbody>
	    </table>
	</div>
	<p className="error">There are not enough bags in inventory for pending shipment.</p>
	</div>
		);
	}
}
export default PendingShipment