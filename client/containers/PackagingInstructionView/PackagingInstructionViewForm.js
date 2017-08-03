import React from 'react';

export default class PackagingInstructionViewForm extends React.Component {
  render() {
    return (
   <section className="side-filter">
    <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
        <div className="">
          <h4 className="pull-left">REFINE YOUR RESULT </h4>
          <button type="button" className="btn collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
        </div>
    </div>
<div className="container">
    <div className="row-fluid">
    <div className="">
        <div className="well filter_bg collapse navbar-collapse" id="filter-menu">
            <h4> REFINE YOUR RESULT </h4>
            <div>
                <hr/>
                <div className="pddn-25-btm ">
                    <h6 className="pull-left">AR BULK  </h6>
                    <a href=""  className="pull-right text_right"> Show All</a>
                </div>
                <ul>
                    <li>
                        <label className="control control--checkbox">SC
                          <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">NG
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                </ul>
            </div>

            <div className="customer">
                <hr/>
                <div className="pddn-25-btm ">
                    <h6 className="pull-left text_left">CUSTOMER  </h6>
                    <a href=""  className="pull-right text_right"> Show All</a>
                </div>
                <ul className="scroll">
                    <li>
                        <label className="control control--checkbox">AA Customers
                          <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Dow
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Exxon
                          <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Ravago
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Dow
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                </ul>
            </div>

            <div className="">
                <hr/>
                <div className="">
                    <h6 className="pull-left text_left">PO#  </h6>
                    <a href=""  className="pull-right text_right"> Show All</a>

                    <div id="search" className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search"className="form-control" placeholder="Search" />
                        </div>
                    </div>


                </div>
            </div>
            <div className="">
                <hr/>
                    <h6 className="pull-left text_left">RAIL CAR#  </h6>
                    <a href=""   className="pull-right text_right"> Show All</a>
                    <div id="search" className="">
                    <div className="left-inner-addon ">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input type="search"className="form-control" placeholder="Search" />
                    </div>
                    </div>
            </div>
            <div className="">
                <hr/>
                    <h6 className="pull-left text_left">LOT#  </h6>
                    <a href=""   className="pull-right text_right"> Show All</a>
                    <div id="search" className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search"className="form-control" placeholder="Search" />
                        </div>
                    </div>
            </div>
            <div className="">
                <hr/>
                    <h6 className="pull-left text_left">CUT OFF DATE </h6>
                    <a href=""   className="pull-right text_right"> Show All</a>
                    <div id="search" className="">
                        <div id="date" className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6">

                     <input type="text" id="date" name="date" className="form-control pull-left "  placeholder="From"/>

                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">

                     <input type="text" className="form-control  "  id="date" name="date"  placeholder="To" />
                    </div>
                </div>
                    </div>
            </div>


            <div className="status">
                <hr/>
                <div className=" pddn-25-btm ">
                    <h6 className="pull-left text_left">STATUS  </h6>
                    <a href=""  className="pull-right text_right"> Show All</a>
                </div>
                <ul className="scroll">
                    <li>
                        <label className="control control--checkbox">Unconfirmed
                          <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Confirmed
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Arrived
                          <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Queued
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Partially Packaged
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">In Invetory
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li>
                        <label className="control control--checkbox">Shipped
                          <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                        </label>
                    </li>
                </ul>
            </div>




        </div>
    </div>

    <div id="filter-grid">
        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
            <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 filter-btn">
                <button type="button"  className="btn  btn-default">sc <span aria-hidden="true">&times;</span></button>
                <button type="button"  className="btn  btn-default">AA Customers<span aria-hidden="true">&times;</span></button>
                <button type="button"  className="btn  btn-default">Exxon <span aria-hidden="true">&times;</span></button>
                <button type="button"  className="btn  btn-default">Arrived <span aria-hidden="true">&times;</span></button>
                <a href="javascript:void(0)"  className="underline base_color"> Clear Filter</a>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">
                    <div className="pull-right ">
                         <select className="form-control"   id="customer_name" name="customer_name">
                             <option value="">Save View</option>
                             <option value="View1">View 1</option>
                             <option value="View2">View 2</option>
                             <option value="View3">View 3</option>
                             <option value="View4">View 4</option>
                             <option value="View5">View 5</option>
                        </select>
                    </div>
                    <div className="pull-right btn_right_margin">
                        <select className="form-control"  id="customer_name" name="customer_name">
                             <option value="">Group By</option>
                             <option value="Date">Date</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><hr/></div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className=" table-responsive view_table">

                    <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellspacing="0" >

                        <thead className="table_head">
                          <tr >
                            <th>ARB </th>
                            <th>Customer</th>
                            <th>PO </th>
                            <th>Railcar# </th>
                            <th>Lot# </th>
                            <th>Material </th>
                            <th>Confmd </th>
                            <th>Arrvd </th>
                            <th>Recd </th>
                            <th>Cutoff </th>
                            <th>Weight</th>
                            <th>#Bags</th>
                            <th>(In Invt.) </th>
                            <th>Status</th>
                            <th>
                                <label className="control control--checkbox">
                                  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                </label>
                            </th>
                          </tr>
                        </thead>
                        <thead className="base_bg" data-toggle="collapse" data-target="#head1" className="clickable" >
                           <tr >
                                <th colspan="2"><i className="fa fa-chevron-down" aria-hidden="true"></i> SC </th>
                                <th colspan="12"><span>Ravago</span><span>123456</span>  </th>
                                <th>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </th>
                            </tr>
                        </thead>
                        <tbody  id="head1" className="collapseIn">

                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>CCBX-73261</td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                           </tbody>


                        <thead className="base_bg"data-toggle="collapse" data-target="#head2" className="clickable">
                           <tr >
                                <th colspan="2"><i className="fa fa-chevron-down" aria-hidden="true"></i> NJ </th>
                                <th colspan="12"><span>Ravago</span><span>123456</span>  </th>
                                <th>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </th>
                            </tr>
                        </thead>
                        <tbody   id="head2" className="collapse">
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>CCBX-73261</td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            </tbody>
                        <thead className="base_bg"data-toggle="collapse" data-target="#head3" className="clickable">
                           <tr >
                                <th colspan="2"><i className="fa fa-chevron-down" aria-hidden="true"></i> SC </th>
                                <th colspan="12"><span>Ravago</span><span>123456</span>  </th>
                                <th>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" checked="checked"  id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </th>
                            </tr>
                        </thead>
                        <tbody   id="head3" className="collapse">
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>CCBX-73261</td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            </tbody>
                        <thead className="base_bg"data-toggle="collapse" data-target="#head4" className="clickable">
                           <tr >
                                <th colspan="2"><i className="fa fa-chevron-down" aria-hidden="true"></i> NJ </th>
                                <th colspan="12"><span>Ravago</span><span>123456</span>  </th>
                                <th>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </th>
                            </tr>
                        </thead>
                        <tbody   id="head4" className="collapse">
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>CCBX-73261</td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                            <tr >
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>D030G2E03</td>
                                <td>LLDPE 1647C</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>5/6/16</td>
                                <td>150000</td>
                                <td>900</td>
                                <td>0</td>
                                <td>Unconfirmed</td>
                                <td>
                                    <label className="control control--checkbox">
                                      <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="row-fluid pddn-50-btm padding-top-btm-xs">

                        <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button></div>
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Add To Queue</button></div>
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Confirm</button></div>


                        <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-primary">PRINT</button></div>
                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn"  className="btn  btn-orange">EDIT</button></div>
                        <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-default">VIEW</button></div>


                </div>

               <div className="row pddn-50-btm">
                    <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                        <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name " />
                    </div>

                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                        <button type="button"   className="btn  btn-success margin-left-xs">SAVE CUSTOMER VIEW</button>
                    </div>

                </div>
            </div>
    </div>
        </div>

            </div>






</section>
    );
  }
}
