import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';

class ShipmentEntryForm extends React.Component {
    render() {
        return (
            <section className="shipment_edit">
                <div className="container">
                    <div className="row">
                        <form className="form-horizontal">
                            <div className=" col-lg-6  col-sm-6 col-xs-12">


                                <fieldset className="scheduler-border no-right-border">
                                    <legend className="scheduler-border">Shipment Info</legend>

                                    <div className="form-group">
                                        <label for="customer_name"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Customer
                                            Name</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="" placeholder="Customer Name"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="ar_bulk_location"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Release
                                            #</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="" placeholder="Release #"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="Purchase_Order"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of
                                            Containers</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id=""
                                                   placeholder="No. of Containers"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="Purchase_Order"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of
                                            Bags</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="" placeholder="No. of Bags"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>
                                    <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span>Number of Bags / Container = 990</span>
                                    </div>
                                </fieldset>


                                <fieldset className="scheduler-border no-right-border">
                                    <legend className="scheduler-border">Material Info</legend>
                                    <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span>
                                    </div>
                                    <div className="form-group ">
                                        <label for="Rail_Car_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Purchase
                                            Order Number</label>

                                        <div className="col-lg-6  col-sm-11  col-xs-11">
                                            <select className="form-control" id="">
                                                <option value="">Purchase Order Number</option>
                                                <option value="">Purchase Order Number 1</option>
                                                <option value="">Purchase Order Number 2</option>
                                                <option value="">Purchase Order Number 3</option>
                                                <option value="">Purchase Order Number 4</option>
                                                <option value="">Purchase Order Number 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label for="Weight"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot
                                            Number</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <select className="form-control" id="">
                                                <option value="">Lot Number</option>
                                                <option value="">Lot Number 1</option>
                                                <option value="">Lot Number 2</option>
                                                <option value="">Lot Number 3</option>
                                                <option value="">Lot Number 4</option>
                                                <option value="">Lot Number 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of Bags
                                            for Lot</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="Lot_Number"
                                                   placeholder="No. of Bags  for Lot"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot
                                            Number</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <select className="form-control" id="">
                                                <option value="">Container Type</option>
                                                <option value="">Container Type 1</option>
                                                <option value="">Container Type 2</option>
                                                <option value="">Container Type 3</option>
                                                <option value="">Container Type 4</option>
                                                <option value="">Container Type 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                            <i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of Bags
                                            for Lot</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="Lot_Number"
                                                   placeholder="No. of Bags  for Lot"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span>Bags in Inventory = 1000</span>
                                    </div>


                                    <div className="form-group ">
                                        <label for="Rail_Car_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Purchase
                                            Order Number</label>

                                        <div className="col-lg-6  col-sm-11  col-xs-11">
                                            <select className="form-control" id="">
                                                <option value="">Purchase Order Number</option>
                                                <option value="">Purchase Order Number 1</option>
                                                <option value="">Purchase Order Number 2</option>
                                                <option value="">Purchase Order Number 3</option>
                                                <option value="">Purchase Order Number 4</option>
                                                <option value="">Purchase Order Number 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left" tital="">
                                            <i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label for="Weight"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot
                                            Number</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <select className="form-control" id="">
                                                <option value="">Lot Number</option>
                                                <option value="">Lot Number 1</option>
                                                <option value="">Lot Number 2</option>
                                                <option value="">Lot Number 3</option>
                                                <option value="">Lot Number 4</option>
                                                <option value="">Lot Number 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of Bags
                                            for Lot</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="Lot_Number"
                                                   placeholder="No. of Bags  for Lot"/>

                                            <div className="error"><span></span></div>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot
                                            Number</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <select className="form-control" id="">
                                                <option value="">Container Type</option>
                                                <option value="">Container Type 1</option>
                                                <option value="">Container Type 2</option>
                                                <option value="">Container Type 3</option>
                                                <option value="">Container Type 4</option>
                                                <option value="">Container Type 5</option>
                                            </select>

                                            <div className="error"><span></span></div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                            <i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="Lot_Number"
                                               className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">No. of Bags
                                            for Lot</label>

                                        <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                            <input type="text" className="form-control" id="Lot_Number"
                                                   placeholder="No. of Bags  for Lot"/>

                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                </fieldset>
                            </div>


                            <div className=" col-lg-6  col-sm-6 col-xs-12">

                                <ul className="nav nav-pills nav-justified tab-bg text-uppercase tab-width" id="tabs">
                                    <li className=""><a data-target="#Domestic" data-toggle="tab">Domestic / Canadian
                                        Options</a></li>
                                    <li className="active"><a data-target="#International" data-toggle="tab">International
                                        Options</a></li>
                                </ul>

                                <div className="tab-content">
                                    <fieldset className="scheduler-border  tab-pane active" id="International">
                                        <div className="form-group ">
                                            <label for="Material"
                                                   className="col-lg-5 col-md-5 col-sm-11  col-xs-11 control-label">Booking
                                                Number</label>

                                            <div className="col-lg-6  col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="Material"
                                                       placeholder="Booking Number"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Origin"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Freight
                                                Forwarder</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="Material"
                                                       placeholder="Freight Forwarder"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Type_of_Packaging"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container
                                                Type</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <select className="form-control" id="Type_of_Packaging"
                                                        name="Type_of_Packaging">
                                                    <option value="">Container Type</option>
                                                    <option value="">Container Type 1</option>
                                                    <option value="">Container Type 2</option>
                                                    <option value="">Container Type 3</option>
                                                    <option value="">Container Type 4</option>
                                                    <option value="">Container Type 5</option>
                                                </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Type_of_Bag"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Steamship
                                                Line</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <select className="form-control" id="Type_of_Bag" name="Type_of_Bag">
                                                    <option value="">Steamship Line</option>
                                                    <option value="">Steamship LineSteamship LineSteamship LineSteamship
                                                        LineSteamship Line 1
                                                    </option>
                                                    <option value="">Steamship LineSteamship LineSteamship LineSteamship
                                                        Line 2
                                                    </option>
                                                    <option value="">Steamship LineSteamship LineSteamship Line 3
                                                    </option>
                                                    <option value="">Steamship LineSteamship Line 4</option>
                                                    <option value="">Steamship Line 5</option>
                                                </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Type_of_Pallet"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Steamship
                                                Vessel</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="SteamshipVessel"
                                                       placeholder="Steamship Vessel"/>

                                                <div className="error"><span></span></div>

                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="No_of_Bages_Pallat"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Earliest
                                                Return Date</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                   aria-hidden="true"></i>
                                                    <input className="form-control" id="date" name="date"
                                                           placeholder="Earliest Return Date" type="text"/>
                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Stretch_wrap"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Cargo
                                                Cutoff Date</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                   aria-hidden="true"></i>
                                                    <input className="form-control" id="date" name="date"
                                                           placeholder="Cargo Cutoff Date" type="text"/>
                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Stretch_wrap"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label"># of
                                                Free Days per Container</label>

                                            <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                <div className="right-inner-addon "><i className="fa fa-calendar"
                                                                                   aria-hidden="true"></i>
                                                    <input className="form-control" id="date" name="date"
                                                           placeholder="# of Free Days per Container" type="text"/>
                                                </div>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="Stretch_wrap"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container
                                                Pick Up Location</label>

                                            <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                       placeholder="Cargo Cutoff Date"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="Stretch_wrap"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container
                                                Return Location</label>

                                            <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                       placeholder="Cargo Cutoff Date"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="No_of_Bages_Pallat"
                                                   className="col-lg-12 control-label">Notes</label>

                                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                                <textarea className="form-control textarea-entry" rows="3"
                                                          id="Notes"></textarea>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                    </fieldset>


                                    <fieldset className="scheduler-border tab-pane " id="Domestic">

                                        <div className="form-group ">
                                            <label for="Material"
                                                   className="col-lg-5 col-md-5 col-sm-11  col-xs-11 control-label">Type of
                                                Shipment</label>

                                            <div className="col-lg-6  col-sm-11 col-xs-11 ">
                                                <select className="form-control" id="Type_of_Packaging"
                                                        name="Type_of_Packaging">
                                                    <option value="">Type of Shipment</option>
                                                    <option value="">Type of Shipment 1</option>
                                                    <option value="">Type of Shipment 2</option>
                                                    <option value="">Type of Shipment 3</option>
                                                    <option value="">Type of Shipment 4</option>
                                                    <option value="">Type of Shipment 5</option>
                                                </select>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Origin"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                                                Ref Number</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id=""
                                                       placeholder="Shipping Ref Number"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Type_of_Packaging"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Container
                                                Type</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id=""
                                                       placeholder="Shipping Ref Number"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Type_of_Bag"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="" placeholder="Reciepient"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="No_of_Bages_Pallat"
                                                   className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient
                                                Contact</label>

                                            <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                       placeholder="Cargo Cutoff Date"/>

                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="pddn-30-top">

                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                                    to Address 1</label>

                                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Ship to Address 1"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                                    <i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                                    to Zip Code</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Ship to Zip Code"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                                    to City</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Ship to City"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Ship
                                                    to State</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Ship to State"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <label for="No_of_Bages_Pallat"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Reciepient
                                                    Telephone</label>

                                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Reciepient Telephone"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="pddn-30-top">

                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier</label>

                                                <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Carrier"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                                    <i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Carrier
                                                    Account Number</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Carrier Account Number"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                                                    Payment Type</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Shipping Payment Type"/>

                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="Stretch_wrap"
                                                       className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Shipping
                                                    Paid By</label>

                                                <div className="col-lg-6   col-sm-11 col-xs-11 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Shipping Paid By"/>

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
                                                        <input className="form-control" id="date" name="date"
                                                               placeholder="Requested Ship Date" type="text"/>
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
                                                        <input className="form-control" id="date" name="date"
                                                               placeholder="Requested Delivery Date" type="text"/>
                                                    </div>
                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                        </div>

                                    </fieldset>


                                </div>


                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pddn-30-btm padding-top-btm-xs">
                                <div className="pull-left margin-10-last-l">
                                    <button type="button" className="btn  btn-orange text-uppercase">Save  Allocate
                                        Container
                                    </button>
                                </div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" className="btn  btn-primary text-uppercase">Save</button>
                                </div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" className="btn  btn-gray text-uppercase">Cancel</button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>


            </section>
        )
    }
}
export default ShipmentEntryForm;