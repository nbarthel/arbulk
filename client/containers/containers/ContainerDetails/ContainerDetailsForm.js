import React from 'react';
import '../../public/stylesheets/style.css';
import '../../public/stylesheets/bootstrap.min.css';

class ContainerDetailsForm extends React.Component {
    render() {
        return (
            <section className="container_detils">
                <div className="container-fluid">


                    <div className="row ">
                        <div className="col-lg-12">
                            <div className="table-responsive border-bottom">
                                <table className="table table-striped">
                                    <thead className="base_bg">
                                    <tr >
                                        <th>ARB </th>
                                        <th>Customer</th>
                                        <th>Railcar# </th>
                                        <th>Booking# </th>
                                        <th>PO </th>
                                        <th>Material </th>
                                        <th>Confmd </th>
                                        <th>In Inventory? </th>
                                        <th>Cutoff Date  </th>
                                        <th>Quantity Requested</th>
                                        <th>Quantity Shipped</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>sc </td>
                                        <td>Ravago</td>
                                        <td>123456</td>
                                        <td>CCBX-73261</td>
                                        <td>3986755</td>
                                        <td>LLDPE 1647C</td>
                                        <td>Y</td>
                                        <td>Y</td>
                                        <td>5/6/16</td>
                                        <td>2970 Bags</td>
                                        <td>990 Bags</td>
                                    </tr>
                                    <tr>
                                        <td> </td>
                                        <td></td>
                                        <td></td>
                                        <td> </td>
                                        <td>3986755</td>
                                        <td> </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    <div className="label_details" >
                        <div className="row pddn-20-top">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <fieldset className="scheduler-border sameHeight">
                                    <legend className="scheduler-border">Container Info</legend>
                                    <ul className="no-space">
                                        <li>Chassis #</li>
                                        <li>Seal # </li>
                                        <li> Material  Net Weight</li>
                                        <li> Container Tare Weight</li>
                                        <li className=" pddn-10-top">
                                            <label className="control control--checkbox ">Container Type Confirmed?
                                                <input type="checkbox" checked="checked" /><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox ">Container Steamship Line Confirmed?
                                                <input type="checkbox" checked="checked" /><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox ">Confirmed Loaded?
                                                <input type="checkbox"  /><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox ">Confirmed In Transit?
                                                <input type="checkbox"/><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox ">Confirmed Delivered?
                                                <input type="checkbox"  /><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                    </ul>
                                </fieldset>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                <fieldset className="scheduler-border sameHeight">
                                    <legend className="scheduler-border">Shipment Summary </legend>
                                    <div className=" col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-6  col-sm-6 col-xs-12">
                                                <ul className="no-space">
                                                    <li>Container Type: <b>40’ HC </b></li>
                                                    <li>Number of Containers:<b> 14</b></li>
                                                    <li># of Bags / Container: <b>990</b></li>
                                                </ul>
                                                <span className="margin-top-10">&nbsp;</span>
                                                <fieldset className="scheduler-border  ">
                                                    <legend className="scheduler-border font-size-12">Lot Number Allowed </legend>
                                                    <ul className="no-space list-style-disc">
                                                        <li>333334</li>
                                                        <li>223452</li>
                                                        <li>2354664</li>
                                                        <li>2312355</li>
                                                    </ul>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6  col-sm-6  col-xs-12">
                                                <ul className="no-space" >
                                                    <li>Shipment Line:<b> XYZ </b></li>
                                                    <li>Steamline Vessel: <b>XYZ</b></li>
                                                    <li>Freight Forwarder:<b> XYZ</b></li>
                                                    <li>Earliest Return Date:<b> XYZ</b></li>
                                                    <li>Doc Cutoff Date: <b>XYZ</b></li>
                                                    <li>Pick Up Location:<b> XYZ</b></li>
                                                    <li>Return Location: <b>XYZ</b></li>
                                                    <li>Recipient:<b> XYZ</b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-4  col-sm-4 col-xs-12 ">
                                        <div className="form-group">
                                            <textarea className="form-control textarea-note" rows="3" id="Notes"placeholder="Notes"></textarea>
                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className=" col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                                        <ul className="no-space">
                                            <li>Body Type: <b>Ravago Bag</b></li>
                                            <li>Pallet Type:<b> H/T</b></li>
                                            <li>Bags per Pallet:<b> 60</b></li>
                                            <li>Stretch Wrap: <b>Full Wrap</b></li>
                                            <li>Origin: <b>Made in USA</b></li>
                                            <li className=" pddn-20-top">
                                                <label className="control control--checkbox ">Shipment Complete
                                                    <input type="checkbox" checked="checked" /><div className="control__indicator"></div>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>



                    <br className="clearfix"/>
                    <div className="row ">

                        <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
                            <div className="panel-group" id="CurrentInventoryaccordion">
                                <div className="panel panel-default">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#CurrentInventoryaccordion" href="#CurrentInventory">
                                        <h4 className="panel-title" >
                                            <a className="accordion-toggle" >Container Load Information <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>  </a>
                                        </h4>
                                    </div>
                                    <div id="CurrentInventory" className="panel-collapse collapse in ">

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead className="base_bg">
                                                <tr >
                                                    <th> nv. Loc.</th>
                                                    <th> Bags </th>
                                                    <th> Weight </th>
                                                    <th> PO # </th>
                                                    <th> Lot # </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Aisle 11</td>
                                                    <td>110 Bags</td>
                                                    <td>60626 lbs.</td>
                                                    <td>D030G2E02C</td>
                                                    <td>33334</td>
                                                </tr>
                                                <tr>
                                                    <td>Aisle 11</td>
                                                    <td>110 Bags</td>
                                                    <td>60626 lbs.</td>
                                                    <td>D030G2E02C</td>
                                                    <td>33334</td>
                                                </tr>
                                                <tr>
                                                    <td>Aisle 11</td>
                                                    <td>110 Bags</td>
                                                    <td>60626 lbs.</td>
                                                    <td>D030G2E02C</td>
                                                    <td>33334</td>
                                                </tr>
                                                <tr>
                                                    <td>Aisle 11</td>
                                                    <td>110 Bags</td>
                                                    <td>60626 lbs.</td>
                                                    <td>D030G2E02C</td>
                                                    <td>33334</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className=" col-lg-12 "><hr/></div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="text_left">
                                <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray text-uppercase"> BACK</button> </div>

                                <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray text-uppercase">Add to queue</button> </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-orange text-uppercase"> Edit</button> </div>
                            <div className="pull-right margin-10-all"><button type="button" id="edit_details"  className="btn  btn-primary text-uppercase">Print Load Order</button> </div>
                            <div className="pull-right margin-10-all"><button type="button" id="edit_details"  className="btn  btn-primary text-uppercase">Print BOL</button> </div>

                        </div>

                    </div>

                    </div>
                </section>
                )
    }
}
export default ContainerDetailsForm;