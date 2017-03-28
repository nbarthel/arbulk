import React from 'react';

export default class DomesticShip  extends React.Component {

    render() {
        return (
            <div className="pddn-30-top">

                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                        to Address</label>

                    <div className="col-lg-7   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Ship to Address"
                               name="shippingAddress"
                               onChange={this.props.onChange}
                            />

                        <div className="error"><span></span></div>
                    </div>

                </div>

                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                        to Zip Code</label>

                    <div className="col-lg-7   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Ship to Zip Code"
                               name="zipCode"
                               onChange={this.props.onChange}
                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>
                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                        to City</label>

                    <div className="col-lg-7   col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Ship to City"
                               name="shippingCity"
                               onChange={this.props.onChange}
                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>
                <div className="form-group">
                    <label for="Stretch_wrap"
                           className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Ship
                        to State</label>

                    <div className="col-lg-7 col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="No_of_Bages_Pallat"
                               placeholder="Ship to State"
                               name="shippingState"
                               onChange={this.props.onChange}

                        />

                        <div className="error"><span></span></div>
                    </div>
                </div>


               </div>
        )
    }
}