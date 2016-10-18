import React from 'react';
//import '../../../public/stylesheets/style.css';
//import '../../../public/stylesheets/bootstrap.min.css';

class  ShipmentConfirmationForm extends React.Component {
    render() {
        return (
            <section className="confirm_shipment">
                <div className="container-fluid">
                    <div className="row">
                        <form className="form-horizontal">
                            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <fieldset className="scheduler-border sameHeight ">
                                    <legend className="scheduler-border">PACKAGING ORDER INFO </legend>
                                    <div className="form-group ">
                                        <div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold">Information</p></div>
                                        <div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right">Confirmed by Joe Smith</p></div>
                                    </div>
                                    <div className="form-group has-error">
                                        <div className="col-lg-3 "><label for="customer_name" className=" control-label">Customer Name</label></div>
                                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                            <input type="text" className="form-control" id="customer_name" placeholder="Customer Name"/>
                                                <div className="error"><span>Error occur required field</span></div>
                                            </div>
                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                <label className="control control--checkbox ">Confirmed
                                                    <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                                </label>
                                            </div>
                                        </div>



                                        <div className="form-group">
                                            <div className="col-lg-3 "><label for="Purchase_Order" className=" control-label">Release #</label></div>
                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                <input type="text" className="form-control" id="Purchase_Order" placeholder="Release #"/>
                                                    <div className="error"><span></span></div>
                                                </div>
                                                <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                    <label className="control control--checkbox ">Confirmed
                                                        <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-lg-3 "><label for="Rail_Car_Number" className=" control-label">Purchase Order Number</label></div>
                                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                    <input type="text" className="form-control" id="Rail_Car_Number" placeholder="Purchase Order Number"/>
                                                        <div className="error"><span></span></div>
                                                    </div>
                                                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                        <label className="control control--checkbox ">Confirmed
                                                            <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-lg-3 "><label for="Lot_Number" className="control-label">Lot Number</label></div>
                                                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                        <input type="text" className="form-control" id="Lot_Number" placeholder="Lot Number"/>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                        <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                            <label className="control control--checkbox ">Confirmed
                                                                <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                </fieldset>
                                            </div>
                                            
                                            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <fieldset className="scheduler-border sameHeight">
                                                    <legend className="scheduler-border">PURCHASE ORDER INFO</legend>
                                                    <div className="form-group ">
                                                        <div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold">Material</p></div>
                                                        <div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right">Confirmed by Joe Smith</p></div>
                                                    </div>
                                                    <div className="form-group ">
                                                        <div className="col-lg-3 "><label for="Material" className="control-label">Number of Containers</label></div>
                                                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                            <select className="form-control" id="Type_of_Packaging" name="Type_of_Packaging">
                                                                <option value="">Number of Containers</option>
                                                                <option value="">Number of Containers 1</option>
                                                                <option value="">Number of Containers 2</option>
                                                                <option value="">Number of Containers 3</option>
                                                                <option value="">Number of Containers 4</option>
                                                                <option value="">Number of Containers 5</option>
                                                            </select>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                        <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                            <label className="control control--checkbox ">Confirmed
                                                                <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-lg-3 "><label for="Origin" className=" control-label">Number of Bags</label></div>
                                                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                            <input type="text" className="form-control" id="" placeholder="Number of Bags"/>
                                                                <div className="error"><span></span></div>
                                                            </div>
                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                <label className="control control--checkbox ">Confirmed
                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <div className="col-lg-3 "><label for="Type_of_Packaging" className=" control-label">Freight Forwarder</label></div>
                                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                <input type="text" className="form-control" id="" placeholder="Freight Forwarder"/>
                                                                    <div className="error"><span></span></div>
                                                                </div>
                                                                <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                    <label className="control control--checkbox ">Confirmed
                                                                       <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="col-lg-3 "><label for="Type_of_Bag" className=" control-label">Container Type</label></div>
                                                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                    <input type="text" className="form-control" id="" placeholder="Container Type"/>
                                                                        <div className="error"><span></span></div>
                                                                    </div>
                                                                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                        <label className="control control--checkbox ">Confirmed
                                                                            <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <div className="col-lg-3 "><label for="Type_of_Pallet" className=" control-label">Steamline  Vessel</label></div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                        <select className="form-control" id="Type_of_Pallet" name="Type_of_Pallet">
                                                                            <option value="">Steamline  Vessel</option>
                                                                            <option value="">Steamline  Vessel 1</option>
                                                                            <option value="">Steamline  Vessel 2</option>
                                                                            <option value="">Steamline  Vessel 3</option>
                                                                            <option value="">Steamline  Vessel 4</option>
                                                                            <option value="">Steamline  Vessel 5</option>
                                                                        </select>
                                                                        <div className="error"><span></span></div>
                                                                    </div>
                                                                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                        <label className="control control--checkbox ">Confirmed
                                                                            <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <div className="col-lg-3 "><label for="No_of_Bages_Pallat" className=" control-label">Shipment FInal  Destination</label></div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                        <input type="text" className="form-control" id="" placeholder="Shipment FInal  Destination"/>
                                                                            <div className="error"><span></span></div>
                                                                        </div>
                                                                        <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                            <label className="control control--checkbox ">Confirmed
                                                                                <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Receiving Customer</label></div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                            <input type="text" className="form-control" id="" placeholder="Receiving Customer"/>
                                                                                <div className="error"><span></span></div>
                                                                            </div>
                                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                <label className="control control--checkbox ">Confirmed
                                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Earlieast Return Date </label></div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                                                                    <input className="form-control" id="date" name="date" placeholder="Earlieast Return Date" type="text"/>
                                                                                </div>
                                                                                <div className="error"><span></span></div>
                                                                            </div>
                                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                <label className="control control--checkbox ">Confirmed
                                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Doc Cutoff Date</label></div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                                                                    <input className="form-control" id="date" name="date" placeholder="Doc Cutoff Date" type="text"/>
                                                                                </div>
                                                                                <div className="error"><span></span></div>
                                                                            </div>
                                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                <label className="control control--checkbox ">Confirmed
                                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Cutoff Date </label></div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                                                                                    <input className="form-control" id="date" name="date" placeholder="Cutoff Date" type="text"/>
                                                                                </div>
                                                                                <div className="error"><span></span></div>
                                                                            </div>
                                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                <label className="control control--checkbox ">Confirmed
                                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Pick Up Location</label></div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                <input type="text" className="form-control" id="" placeholder="Pick Up Location"/>
                                                                                    <div className="error"><span></span></div>
                                                                                </div>
                                                                                <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                    <label className="control control--checkbox ">Confirmed
                                                                                        <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="form-group">
                                                                                <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Return Location </label></div>
                                                                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                    <input type="text" className="form-control" id="" placeholder="Return Location"/>
                                                                                        <div className="error"><span></span></div>
                                                                                    </div>
                                                                                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                        <label className="control control--checkbox ">Confirmed
                                                                                            <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="form-group">
                                                                                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label"> Trucker</label></div>
                                                                                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                        <input type="text" className="form-control" id="" placeholder="Trucker"/>
                                                                                            <div className="error"><span></span></div>
                                                                                        </div>
                                                                                        <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                            <label className="control control--checkbox ">Confirmed
                                                                                                <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="form-group">
                                                                                        <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Note </label></div>
                                                                                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                                                                                            <input type="text" className="form-control" id="" placeholder="Note"/>
                                                                                                <div className="error"><span></span></div>
                                                                                            </div>
                                                                                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">
                                                                                                <label className="control control--checkbox ">Confirmed
                                                                                                    <input type="checkbox"  id=""/><div className="control__indicator"></div>
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>


                                                                                    </fieldset>


                                                                                </div>
                                                                            </form>
                                                                        </div>

                                                                        <div className="label_info row pddn-30-btm" >
                                                                            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-4">
                                                                                <div className="pull-left padding-20-all"><button type="button"  className="btn  btn-orange">DELETE</button> </div>
                                                                            </div>


                                                                            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-8">
                                                                                <div className="text_left">
                                                                                    <div className="pull-right padding-20-all"><button type="button"  className="btn  btn-primary">SUBMIT</button> </div>
                                                                                    <div className="pull-right padding-20-last-r"><button type="button"  className="btn  btn-gray">CANCEL</button> </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                    </div>

                                                            </section>

                                                            );
    }
}
export default ShipmentConfirmationForm;
   