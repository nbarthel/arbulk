import React, { Component } from 'react';
var moment = require('moment')
class ContainerTable extends Component {

    constructor(props){
     super(props)
    }
    componentDidMount(){

    }

	render() {
        var railcar_Number = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots.railcar_number : 'NA'
		var booking_Number = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentDomestic && this.props.table.TShipmentent.TShipmentDomestic.length>0) ? this.props.table.TShipmentent.TShipmentDomestic[0].bookingNumber : 'NA'
        var booking_Number_Int = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentInternational && this.props.table.TShipmentent.TShipmentInternational.length>0) ? this.props.table.TShipmentent.TShipmentInternational[0].bookingNumber : 'NA'
        var PO = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions.po_number : 'NA'
        var material = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructions.material : 'NA'
        var cutOffDate = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentInternational && this.props.table.TShipmentent.TShipmentInternational.length>0) ? this.props.table.TShipmentent.TShipmentInternational[0].cargoCutoffDate : 'NA'
        var inInventory = (this.props.table && this.props.table.TShipmentent && this.props.table.TShipmentent.TShipmentLots && this.props.table.TShipmentent.TShipmentLots.length>0 && this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots) ? this.props.table.TShipmentent.TShipmentLots[0].TPackagingInstructionLots.status : 'NA'
        return (
			 <table className="table table-striped">
                                    <thead className="base_bg">
                                    <tr >
                                        <th>ARB </th>
                                        <th>Customer</th>
                                        <th>Railcar# </th>
                                        <th>Booking# </th>
                                        <th>PO </th>
                                        <th>Material </th>
                                        <th>Confmd </th>
                                        <th>In Inventory? </th>
                                        <th>Cutoff Date  </th>
                                        <th>Quantity Requested</th>
                                        <th>Quantity Shipped</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{(this.props.table && this.props.table.TShipmentent) ?this.props.table.TShipmentent.TLocation.locationName : 'NA' }</td>
                                        <td>{(this.props.table && this.props.table.TShipmentent) ?this.props.table.TShipmentent.TCompany.name : 'NA' }</td>
                                        <td>{railcar_Number}</td>
                                        <td>{(booking_Number == "NA") ? booking_Number_Int : booking_Number}</td>
                                        <td>{PO}</td>
                                        <td>{material}</td>
                                        <td>{'NO'}</td>
                                        <td>{(inInventory == "ININVENTORY")? 'YES' : 'NO'}</td>
                                        <td>{(cutOffDate!= "NA") ? moment(cutOffDate).format('MM-DD-YYYY'):"NA"}</td>
                                        <td>2970 Bags</td>
                                        <td>990 Bags</td>
                                    </tr>

                                    </tbody>
                                </table>

		);
	}
}
export default ContainerTable