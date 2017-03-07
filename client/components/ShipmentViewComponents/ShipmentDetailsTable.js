import React, { Component } from 'react';

 class ShipmentDetailsTable extends Component {
	constructor(props){
        super(props);

        this.Table
    }
    componentDidMount() {

    }
    render() {
        if(this.props.tabledata){
          var statusConfirmed = 'UNCONFIRMED'


          if(this.props.tabledata.isDomestic ==0 && this.props.tabledata.TShipmentInternational.length > 0){
            statusConfirmed = this.props.tabledata.TShipmentInternational[0].status
          }
          else if(this.props.tabledata.isDomestic ==1 && this.props.tabledata.TShipmentDomestic.length > 0){
            statusConfirmed = this.props.tabledata.TShipmentDomestic[0].status
          }
                 this.Table = _.map(this.props.tabledata.TShipmentLots,(tble,index) =>{
                   var inInventory = 'UNCONFIRMED'
                   if(tble.TPackagingInstructionLots!=undefined){
                     inInventory = tble.TPackagingInstructionLots.status
                   }
                   var releaseNumber = this.props.tabledata.releaseNumber
                    if(this.props.tabledata.isDomestic == 1){
                        var bookingNumber = this.props.tabledata.TShipmentDomestic[0].bookingNumber
                        var cutOff = 'N/A'

                    }
                    else
                    {
                        var bookingNumber = this.props.tabledata.TShipmentInternational[0].bookingNumber
                        var cutOff = moment(this.props.tabledata.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY")
                    }
                    return (<tbody key = {index}>
                              <tr>
                                                 <td>{this.props.tabledata ? this.props.tabledata.TLocation.locationName : ''}</td>
                                                <td>{this.props.tabledata ? this.props.tabledata.TCompany.name : ''}</td>
                                                <td>{releaseNumber}</td>
                                                <td>{bookingNumber}</td>
                                                <td>{tble.TPackagingInstructions ? tble.TPackagingInstructions.po_number : ''}</td>
                                                <td>{tble.TPackagingInstructions ? tble.TPackagingInstructions.material : ''}</td>
                                                <td>{statusConfirmed == "UNCONFIRMED" ? 'N' : 'Y'}</td>
                                                <td>{(inInventory.toUpperCase() == "IN INVENTORY" || inInventory.toUpperCase() =="SHIPPED")? 'Y' : 'N'}</td>
                                                <td>{cutOff}</td>
                                                <td>{tble.TPackagingInstructionLots ? (tble.TPackagingInstructionLots.inInventory ? tble.TPackagingInstructionLots.inInventory : '') : ''} Bags</td>
                                                  <td>{tble.noOfBags ? tble.noOfBags : ''} Bags</td>
                                                <td><label className="control control--checkbox" >
                                                          <input type="checkbox" onClick = {(e) => this.props.tableCheckBoxChange(e,tble)}/><div className = "control__indicator"></div>
                                                     </label>
                                                </td>
                            </tr>
                        </tbody>)
                })}
		return (
			<table className="table table-striped">
                                    <thead className="base_bg">
                                    <tr >
                                        <th>ARB</th>
                                        <th>Customer</th>
                                        <th>Release#</th>
                                        <th>Booking#</th>
                                        <th>PO</th>
                                        <th>Material</th>
                                        <th>Confmd</th>
                                        <th>In Inventory?</th>
                                        <th>Cutoff Date</th>
                                        <th>Quantity Requested</th>
                                        <th>Quantity Shipped</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                   {this.Table}
                                </table>
		);
	}
}
export default ShipmentDetailsTable
