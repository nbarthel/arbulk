import React, { Component } from 'react';

class InventoryLocationHistory extends Component {
	render() {
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
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Broken Bag</td>					
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td></td>								
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Rel #11635</td>									
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Rel #11635</td>								
				</tr>
								
			</tbody>
	    </table>
	</div>
	</div>
		);
	}
}
export default InventoryLocationHistory