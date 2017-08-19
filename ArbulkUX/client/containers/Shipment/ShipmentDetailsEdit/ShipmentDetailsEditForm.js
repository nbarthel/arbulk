import React from 'react';
//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';
import { Link } from 'react-router';
class   ShipmentDetailsEditForm extends React.Component {
    render() {
        return (

            <section className="shipment">
                < div className="container-fluid">
                    
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

                    <div className="" >
                        <div className="row pddn-20-top">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <fieldset className="scheduler-border">
                                    <legend className="scheduler-border">Shipment Summary </legend>
                                    <div className=" col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6  col-sm-6 col-xs-12">
                                                <ul className="no-space">
                                                    <li>Container Type: <b>40’ HC </b></li>
                                                    <li>Number of Containers:<b> 14</b></li>
                                                    <li># of Bags / Container: <b>990</b></li>
                                                </ul>
                                                <span className="margin-top-10">&nbsp;</span>
                                                <fieldset className="scheduler-border" >
				         <legend className="scheduler-border font-size-12">Lot Number Allowed </legend>
						 <ul className="no-space list-style-disc">
							<li>333334</li>
							<li>223452</li>
							<li>2354664</li>
							<li>2312355</li>
						</ul>
						</fieldset>
						
					</div>
					<div className="col-lg-6 col-md-6 col-sm-6  col-xs-12">
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
				<div className=" col-lg-5 col-md-6 col-sm-5 col-xs-12 ">
					<div className="form-group">						
						 <textarea className="form-control textarea-note" rows="3" id="Notes"placeholder="Notes"></textarea>
                                                <div className="error"><span></span></div>
                                            </div>

                                        </div>

                                        <div className=" col-lg-2 col-md-2 col-sm-6 col-xs-12 ">
                                            <ul className="no-space">
                                                <li>Body Type: <b>Ravago Bag</b></li>
                                                <li>Pallet Type:<b> H/T</b></li>
                                                <li>Bags per Pallet:<b> 60</b></li>
                                                <li>Stretch Wrap: <b>Full Wrap</b></li>
                                                <li>Origin: <b>Made in USA</b></li>
                                                <li className=" pddn-20-top">
                                                    <label className="control control--checkbox "><b>Shipment Complete </b>
                                                    <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
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

                        <div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12">
                            <div className="panel-group" id="ContainerSummaryaccordion">
                                <div className="panel panel-default">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#ContainerSummaryaccordion" href="#ContainerSummary">
                                        <h4 className="panel-title"  >
                                            <a className="accordion-toggle" >
                                                Container Summary</a>
                                            <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>
                                        </h4>
                                    </div>
                                    <div id="ContainerSummary" className="panel-collapse collapse in">

                                        <div id="edit" className="edit row pddn-10-btm">
                                            <form action="" method="post">
                                                <div className="form-group">
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                        <input type="text" className="form-control " id="Purchase_Order" placeholder="# of bags"/>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                            <input type="text" className="form-control" id="" placeholder="# of Containers"/>
                                                                <div className="error"><span></span></div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group ">
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6  padding-top-btm-xs ">
                                                                <button type="button"  className="btn btn-success btn_right_no_margin">ADD</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="table-responsive " id="shipment-detail-edit">
                                                    <table className="table table-striped">
                                                        <thead className="base_bg">
                                                        <tr >
                                                            <th>Status</th>
                                                            <th>Trucker</th>
                                                            <th># of Containers</th>
                                                            <th>Container #</th>
                                                            <th>Chassis #</th>
                                                            <th>Seat #</th>
                                                            <th># of Bags</th>
                                                            <th>Weight</th>
                                                            <th id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>Unallocated</td>
                                                            <td></td>
                                                            <td>1</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Allocated</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>11</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Allocated</td>
                                                            <td>MF Incorp.</td>
                                                            <td>2</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>14</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th id="checked"></th>
                                                        </tr>

                                                        <tr>
                                                            <td>&nbsp;</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked"></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Not Arrived</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>7</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>7</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th id="checked"></th>
                                                        </tr>

                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Arrived</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>1</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>1</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th id="checked"></th>
                                                        </tr>

                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loaded</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>1</td>
                                                            <td>12345-A4568</td>
                                                            <td>HJ331-2</td>
                                                            <td>F44334</td>
                                                            <td>990 Bags</td>
                                                            <td>54550 lbs.</td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loaded</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>1</td>
                                                            <td>12345-A4568</td>
                                                            <td>HJ331-2</td>
                                                            <td>F44334</td>
                                                            <td>990 Bags</td>
                                                            <td>54550 lbs.</td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>2</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th>1980 Bags</th>
                                                            <th>109100 lbs.</th>
                                                            <th id="checked"></th>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loaded</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>1</td>
                                                            <td>12345-A4568</td>
                                                            <td>HJ331-2</td>
                                                            <td>F44334</td>
                                                            <td>990 Bags</td>
                                                            <td>54550 lbs.</td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loaded</td>
                                                            <td>A Trucker Corp.</td>
                                                            <td>1</td>
                                                            <td>12345-A4568</td>
                                                            <td>HJ331-2</td>
                                                            <td>F44334</td>
                                                            <td>990 Bags</td>
                                                            <td>54550 lbs.</td>
                                                            <td id="checked">
                                                                <label className="control control--checkbox">
                                                                    <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>2</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th>1980 Bags</th>
                                                            <th>109100 lbs.</th>
                                                            <th id="checked"></th>
                                                        </tr>

                                                        </tbody>
                                                    </table>
                                                    <div className="more_load">More containers are required to be allocated to this shipment!</div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                    <div className="panel-group" id="CurrentInventoryaccordion">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" data-toggle="collapse" data-parent="#CurrentInventoryaccordion" href="#CurrentInventory">
                                                <h4 className="panel-title" >
                                                    <a className="accordion-toggle" >
                                                        Current Inventory
                                                        <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>  </a>
                                                </h4>
                                            </div>
                                            <div id="CurrentInventory" className="panel-collapse collapse ">
                                                <div className="">


                                                    <div className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead className="base_bg">
                                                            <tr >
                                                                <th> nv. Loc.</th>
                                                                <th> Bags </th>
                                                                <th> Weight </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Aisle 11</td>
                                                                <td>110 Bags</td>
                                                                <td>60626 lbs.</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Aisle 44</td>
                                                                <td>550 Bags</td>
                                                                <td>30313 lbs.</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Aisle 44</td>
                                                                <td>10 Bags</td>
                                                                <td>550 lbs.</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Total</th>
                                                                <th>660 Bags</th>
                                                                <th>91039 lbs.</th>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="row">
                                <div className=" col-lg-12 "><hr/></div>
                                <div className=" col-lg-12 ">
                                    <div className="pull-left margin-10-last-l"><Link to="shipmentdetails"><button type="button" id="save_and_back"  className="btn  btn-orange text-uppercase">Save  & Back</button></Link></div>
                                </div>
                            </div>
                    </div>




            </section>
            );
            }
            }
            export default ShipmentDetailsEditForm;