import React, { Component } from 'react';

 class ContainerLoadComponent extends Component {
	constructor(props){
        super(props);
        this.contLoadTable
    }
    render() {
        if(this.props.contLoadData && this.props.contLoadData.length>0){
            let totalBags=0;
            let totalWeight=0;
            this.contLoadTable = _.map(this.props.contLoadData,(data,index)=>{
                    totalBags = totalBags+parseInt(data.noOfBags)
                    totalWeight = totalWeight+parseInt(data.weight)
                return(
                    <tr key={index}>
                                                    <td>{data.TInventoryLocation.locationName}</td>
                                                    <td>{data.noOfBags}</td>
                                                    <td>{data.weight}</td>
                                                    <td>{data.TPackagingInstructionLots.TPackagingInstructions.po_number}</td>
                                                    <td>{data.TPackagingInstructionLots.lot_number}</td>
                                                     <td>
                                     <label className="control control--checkbox">
                                    <input type="checkbox" onClick = {(e) => this.props.handleContainerLoadChecks(e,data)} id="row1"/>
                                  <div className="control__indicator"></div>
                        </label>
                        </td>
                    </tr>
                    )

            })

            this.contLoadTable.push(<tr><td >Total</td><td >{totalBags}</td><td >{totalWeight}</td><td ></td><td ></td></tr>);
        }
		return (
			 <table className="table table-striped">
                                                <thead className="base_bg">
                                                <tr >
                                                    <th> Inv. Loc.</th>
                                                    <th> Bags </th>
                                                    <th> Weight </th>
                                                    <th> PO # </th>
                                                    <th> Lot # </th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.contLoadTable}                                            
                                                </tbody>
                                            </table>
		);
	}
}
export default ContainerLoadComponent