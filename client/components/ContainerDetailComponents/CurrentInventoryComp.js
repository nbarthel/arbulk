import React, { Component } from 'react';

 class CurrentInventoryComp extends Component {
	render() {
        if(this.props.currentInventory!= undefined)
        {
            var CiList = _.map(this.props.currentInventory.TPiInventory, (data, index)=> {
                return (
                    <tr key={index}>
                        <td>{data.TInventoryLocation ? data.TInventoryLocation.locationName : ''}</td>
                        <td>{data.noOfBags}</td>
                        <td>{data.weight}</td>
                        <td>
                         <label className="control control--checkbox">
                                    <input type="checkbox" onClick = {(e) => this.props.handleCurrentInvChecks(e,data)} id="row1"/>
                                  <div className="control__indicator"></div>
                        </label>
                        </td>
                    </tr>
                )
            })
        }


        return (
            <table className="table table-striped">
                <thead className="base_bg">
                <tr >
                    <th> Inv. Loc.</th>
                    <th> Bags</th>
                    <th> Weight</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {CiList}


                </tbody>
            </table>
        );
    }
}
export default CurrentInventoryComp