import React, { Component } from 'react';

class CurrentInventoryComponent extends Component {
    constructor(props){
        super(props)
        this.CiList

    }
    componentWillReceiveProps(nextProps){
     console.log("next props" , nextProps)

    }

componentDidMount(){
    this.CurrentIndata = this.props.currentInventory
    console.log('>>>>>>>>>>>>>>>.datfay a' , this.CurrentIndata)
    //if(this.CurrentIndata.TPiInventory && this.CurrentIndata.TPiInventory.length > 0) {
    //    this.CiList = _.map(this.CurrentIndata.TPiInventory, (data, index)=> {
    //        return (
    //            <tr key={index}>
    //                <td>{data.TInventoryLocation ? data.TInventoryLocation.locationName : ''}</td>
    //                <td>{data.noOfBags}</td>
    //                <td>{data.weight}</td>
    //            </tr>
    //        )
    //    })
    //}
}




	render() {
        if(this.props.currentInventory!= undefined)
        {
          var CiList = _.map(this.props.currentInventory, (view, index)=>{
console.log(view)

            return _.map(view.TPiInventory, (data, index)=> {
                        if(data.noOfBags>0){
                        return (
                            <tr key={index}>
                                <td>{view.lot_number}</td>
                                <td>{data.TInventoryLocation ? data.TInventoryLocation.locationName : ''}</td>
                                <td>{data.noOfBags}</td>
                                <td>{data.weight}</td>
                            </tr>
                        )
                      }
                    })
                      })
        }


	return (
			  <table className="table table-striped">
                                                <thead className="base_bg">
                                                <tr >
                                                    <th> Lot # </th>
                                                    <th> Inv. Loc.</th>
                                                    <th> Bags</th>
                                                    <th> Weight</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {CiList}


                                                </tbody>
                                            </table>
		);
	}
}
export default CurrentInventoryComponent
