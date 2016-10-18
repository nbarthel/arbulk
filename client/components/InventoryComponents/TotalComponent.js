import React, { Component } from 'react';

export class TotalComponent extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let totalRailCarWeight = this.props.totalRailcarWeight
		let totalPackagedWeight = this.props.totalWeight
		let totalGainOrLoss = totalRailCarWeight - totalPackagedWeight
		return (
			<table className="table table-striped">
						<thead className="base_bg">
						  <tr >				
							<th> &nbsp; </th>
							<th> &nbsp; </th>				
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>Railcar Weight</td>
								<td>{totalRailCarWeight} </td>				
							</tr>
							<tr>
								<td>Packaged Weight </td>
								<td>{totalPackagedWeight} </td>				
							</tr>
							<tr>
								<td>Gain / Loss</td>
								<td>{totalGainOrLoss ? totalGainOrLoss : 0 } </td>				
							</tr>
											
						</tbody>
					</table>
		);
	}
}
