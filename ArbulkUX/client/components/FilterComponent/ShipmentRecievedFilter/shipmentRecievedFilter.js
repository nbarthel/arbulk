/**
 * Created by ankit on 3/8/17.
 */

import React, { Component } from 'react';

class RailcarArrivalFilterPage extends Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
         
        if(nextProps.selectedShipmentRecieved && nextProps.selectedShipmentRecieved.shipmentRecieved){
            this.refs["arrived_yes"].checked = true
        }
        else if(nextProps.selectedShipmentRecieved && !nextProps.selectedShipmentRecieved.shipmentRecieved){
            this.refs["arrived_no"].checked = true
        }
    }
    render() {
        return (
            <div>
                <div className="head_bg">
                    <h6 className="pull-left">Shipment Received</h6>
                    <a href=""  className="pull-right text_right"> </a>
                </div>
                <ul>
                    <li>
                        <label className="control control--radio">Yes
                            <input type="radio"  name="arrived_yes" value="1" id="arrived_yes" ref="arrived_yes" onClick={(e)=>this.props.shipmentRecived(e,1)}/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--radio">No
                            <input type="radio"  name="arrived_yes" id="" ref="arrived_no"  value="0" onClick={(e)=>this.props.shipmentRecived(e,0)} /><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--radio">All
                            <input type="radio"  name="arrived_yes" id=""  value="2" onClick={(e)=>this.props.shipmentRecived(e,2)} /><div className="control__indicator"></div>
                        </label>
                    </li>
                </ul>
            </div>
        );
    }
}
export default RailcarArrivalFilterPage
