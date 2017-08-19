import React, { Component } from 'react';
class LotTableCompoenent extends Component {
	render() {
		return (
			  <table className="table table-striped">
                            <thead className="base_bg">
                              <tr >             
                                <th>Location</th>
                                <th># of Bags</th>              
                                <th>Weight</th>             
                                <th>PO #</th>               
                                <th>Lot #</th>              
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Aisle 11</td>
                                    <td>110 Bags</td>               
                                    <td>60626 lbs.</td>             
                                    <td>D030G2E02C</td>             
                                    <td>33334</td>              
                                </tr>
                                <tr>
                                    <td>Aisle 11</td>
                                    <td>110 Bags</td>               
                                    <td>60626 lbs.</td>             
                                    <td>D030G2E02C</td>             
                                    <td>33334</td>              
                                </tr>
                                <tr>
                                    <td>Aisle 11</td>
                                    <td>110 Bags</td>               
                                    <td>60626 lbs.</td>             
                                    <td>D030G2E02C</td>             
                                    <td>33334</td>              
                                </tr>
                                
                                <tr>
                                    <th>Total</th>
                                    <th>660 Bags</th>               
                                    <th>91039 lbs.</th>             
                                    <th></th>               
                                    <th></th>               
                                </tr>
                            </tbody>
                        </table>
		);
	}
}
export default LotTableCompoenent