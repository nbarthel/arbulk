import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';

class  ShipmentArrivalEntryForm extends React.Component {
    render() {
        return (
            <section className="shipment">
                <div className="container-fluid">
                    <div className="row">
                        <form className="form-horizontal">
                            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                
                                <div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <fieldset className="scheduler-border sameHeight">
                                        <legend className="scheduler-border">SHIPMENT INFO</legend>

                                        <div className="form-group has-error">
                                            <div  className="col-lg-6"><label for="Booking" className=" control-label">Booking #</label></div>
                                            <div className="col-lg-6">
                                                <select className="form-control" id="Booking" name="Booking">
                                                    <option value="">Booking </option>
                                                    <option value="">Booking 1</option>
                                                    <option value="">Booking 2</option>
                                                    <option value="">Booking 3</option>
                                                    <option value="">Booking 4</option>
                                                    <option value="">Booking 5</option>
                                                </select>
                                                <div className="error"><span>Error occur required field</span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="Dropoff_Trucker" className="col-lg-6 control-label">Dropoff Trucker</label>
                                            <div className="col-lg-6">
                                                <select className="form-control" id="Dropoff_Trucker" name="Dropoff_Trucker">
                                                    <option value="">Dropoff Trucker</option>
                                                    <option value="">Dropoff Trucker 1</option>
                                                    <option value="">Dropoff Trucker 2</option>
                                                    <option value="">Dropoff Trucker 3</option>
                                                    <option value="">Dropoff Trucker 4</option>
                                                    <option value="">Dropoff Trucker 5</option>
                                                </select>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="P_U_Trucker" className="col-lg-6 control-label">P/U Trucker</label>
                                            <div className="col-lg-6">
                                                <select className="form-control" id="P_U_Trucker" name="P_U_Trucker">
                                                    <option value="">P/U Trucker</option>
                                                    <option value="">P/U Trucker 1</option>
                                                    <option value="">P/U Trucker 2</option>
                                                    <option value="">P/U Trucker 3</option>
                                                    <option value="">P/U Trucker 4</option>
                                                    <option value="">P/U Trucker 5</option>
                                                </select>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>

                                        <div className="form-group ">

                                            <label for="Container" className="col-lg-6 control-label">Container #</label>
                                            <div className="col-lg-6">
                                                <input type="text" className="form-control" id="Container" placeholder="Container"/>
                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="Chassis" className="col-lg-6 control-label">Chassis #</label>
                                                <div className="col-lg-6">
                                                    <input type="text" className="form-control" id="Chassis" placeholder="Chassis #"/>
                                                        <div className="error"><span></span></div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label for="Container_Tare_Weight" className="col-lg-6 control-label">Container Tare Weight</label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="Container_Tare_Weight" placeholder="Container Tare Weight"/>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                    </div>



                                                    <div className="form-group pddn-10-top">
                                                        <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                                            <label className="control control--checkbox ">Container Type Confirmed?
                                                                <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
                                                            <label for="Container_Type" className="">Container Type</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                                            <label className="control control--checkbox ">Container Steamship Line Type Confirmed?
                                                                <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right">
                                                            <label for="Steamship_Line" className=" ">Steamship Line</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className=" col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                                                            <label className="control control--checkbox ">Container Arrived?
                                                                <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 text_right  ">
                                                            <label for="Container_Type" className="">&nbsp; </label>
                                                        </div>
                                                    </div>

                                                </fieldset>

                                                <div className="text_left">
                                                    <div className="pull-left padding-20-last-l "><button type="button"  className="btn  btn-gray">CANCEL </button>  </div>
                                                    <div className="pull-left padding-20-all"><button type="button" className="btn  btn-primary"> SAVE </button> </div>

                                                </div>

                                            </div>
                                        </div>
                                        

                                        <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <fieldset className="scheduler-border sameHeight">
                                                    <legend className="scheduler-border">SHIPMENT INFO</legend>

                                                    <div className="form-group">
                                                        <label for="Material" className="col-lg-6 ">Booking #:   </label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="Origin" className="col-lg-6 ">Container Type:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="Type_of_Packaging" className="col-lg-6 ">Number of Containers:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="Type_of_Bag" className="col-lg-6 "># of Bags per Container:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="Type_of_Pallet" className="col-lg-6 ">Steamship Line:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="No_of_Bages_Pallat" className="col-lg-6 ">Steamship Vessel:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="Stretch_wrap" className="col-lg-6 ">Earliest Return Date:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="Stretch_wrap" className="col-lg-6 ">Doc Cutoff Date:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="Stretch_wrap" className="col-lg-6 ">Cutoff Date:</label>
                                                        <div className="col-lg-6"><p>*******************</p></div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        </form>
                                    </div>

                                </div>



                                </section>


                                );
    }
}
export default ShipmentArrivalEntryForm;
           