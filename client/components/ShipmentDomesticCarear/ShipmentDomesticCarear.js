import React from 'react';
var DatePicker = require('react-datepicker');
import { DateField, Calendar } from 'react-datepicker'
var moment = require('moment');


export default class ShipmentDomesticCarear  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate : '',
            startDate1:  ''
        }
    }


            render() {
        return (
            <div className="pddn-30-top">

                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier</label>

                    <div className="col-lg-6    col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Carrier"
                               name="Carrier"
                               onChange={this.props.onChange}
                        />

                        <div className="error"><span></span></div>
                    </div>

                </div>

                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier
                        Account Number</label>

                    <div className="col-lg-6   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Carrier Account Number"
                               name="Carrier Account Number"
                               onChange={this.props.onChange}
                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>
                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                        Payment Type</label>

                    <div className="col-lg-6   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Shipping Payment Type"
                               name="Shipping Payment Type"
                               onChange={this.props.onChange}

                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>

                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                        Paid By</label>

                    <div className="col-lg-6   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Shipping Paid By"
                               name="Shipping Paid By"
                               onChange={this.props.onChange}
                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>

                <div className="form-group">
                    <label for="No_of_Bages_Pallat"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Requested
                        Ship Date</label>

                    <div className="col-lg-6    col-sm-11 col-xs-11 ">
                        <div className="right-inner-addon "><i className="fa fa-calendar"
                                                               aria-hidden="true"></i>
                            <DatePicker
                                dateFormat="MM-DD-YYYY"
                                selected={this.state.startDate}
                                value={this.state.startDate}
                                name="RequestedShipDate"
                                onChange={(x, event) => this.DateChange(x,event)} placeholderText="Requested Ship Date"/>

                        </div>
                        <div className="error"><span></span></div>
                    </div>
                </div>


                <div className="form-group">
                    <label for="No_of_Bages_Pallat"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Requested
                        Delivery Date</label>

                    <div className="col-lg-6    col-sm-11 col-xs-11 ">
                        <div className="right-inner-addon "><i className="fa fa-calendar"
                                                               aria-hidden="true"></i>
                            <DatePicker
                                dateFormat="MM-DD-YYYY"
                                selected={this.state.startDate1}

                                name="RequestedDeliveryDate"
                                onChange={this.props.DateChange1}placeholderText="Requested Delivery Date"/>
                        </div>
                        <div className="error"><span></span></div>
                    </div>
                </div>

            </div>
        )
    }
}