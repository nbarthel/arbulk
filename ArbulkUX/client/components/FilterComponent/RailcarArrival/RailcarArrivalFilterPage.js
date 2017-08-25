/**
 * Created by ankit on 3/8/17.
 */

import React, { Component } from 'react';

class RailcarArrivalFilterPage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps){
        debugger
        if(nextProps.railcarArrived){
            this.refs["R"+nextProps.railcarArrived].checked = true
        }
    }

    render() {
        return (
            <div>

                <div className="head_bg">
                    <h6 className="pull-left">Arrived</h6>
                    <a href=""  className="pull-right text_right"> </a>
                </div>
                <ul>
                    <li>
                        <label className="control control--radio">Yes
                            <input type="radio" ref="RARRIVED"  name="arrived_yes" value="1" id="arrived_yes" onClick={(e)=>this.props.onRailCarArrivalFilter(e,1)}/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--radio">No
                            <input type="radio"  name="arrived_yes" ref="RINTRANSIT" id="arrived_no"  value="0" onClick={(e)=>this.props.onRailCarArrivalFilter(e,0)} /><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--radio">All
                            <input type="radio"  name="arrived_yes" id="arrived_all"  value="2" onClick={(e)=>this.props.onRailCarArrivalFilter(e,0)} /><div className="control__indicator"></div>
                        </label>
                    </li>
                </ul>
            </div>
        );
    }
}
export default RailcarArrivalFilterPage
