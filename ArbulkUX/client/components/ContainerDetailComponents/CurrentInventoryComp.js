import React, { Component } from 'react';

 class CurrentInventoryComp extends Component {
	render() {
        if(this.props.currentInventory!= undefined)
        {
            let totalBags=0;
            let totalWeight=0;
            var CiList = _.map(this.props.currentInventory.TPiInventory, (data, index)=> {
                totalBags = totalBags+parseInt(data.noOfBags)
                totalWeight = totalWeight+parseInt(data.weight)
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
            CiList.push(<tr><td >Total</td><td >{totalBags}</td><td >{totalWeight}</td><td ></td><td ></td></tr>);
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