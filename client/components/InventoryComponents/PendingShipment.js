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
			Data Not Found	
            </tbody>
	    </table>
	</div>
	<p className="error"></p>
	</div>
		);
	}
}
export default PendingShipment