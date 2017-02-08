import React, { Component } from 'react';

export class TotalComponent extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let totalRailCarWeight = this.props.totalRailcarWeight
		let totalPackagedWeight = this.props.totalWeight
		let totalGainOrLoss = totalPackagedWeight - (totalRailCarWeight/2.20).toFixed(2)
		return (
			<table className="table table-striped">
						<thead className="base_bg">
						  <tr >
							<th></th>
							<th>lbs</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>Railcar Weight</td>
								<td>{this.props.lotIdArray.length<2?totalRailCarWeight:0} </td>
							</tr>
							<tr>
								<td>Packaged Weight </td>
								<td>{this.props.lotIdArray.length<2?(totalPackagedWeight*2.20).toFixed(0):0} </td>
							</tr>
							<tr>
								<td>Gain / Loss</td>
								<td>{this.props.lotIdArray.length<2?(totalGainOrLoss ? (totalGainOrLoss*2.20).toFixed(0) : 0):0 } </td>
							</tr>

						</tbody>
						<div className="form-group">
							<label htmlFor="No_of_Bags_Pallat" className="col-lg-12 control-label">Notes</label>
							<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
							<textarea
							 className="form-control textarea"
               ref="notes"
							 onChange = {this.props.notesChange}

							 name="notes"
							 rows="3"
							 id="notes"></textarea>
               <div className="error"><span></span></div>
							</div>
										</div>


					</table>
		);
	}
}
