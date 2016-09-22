import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';

class  ContainerQueueViewForm extends React.Component {
    render() {
        return (
            <section className="view_table-queue">
                <div className="container-fluid">
                    <div className="row-fluid">

                        <div className="table-responsive ">
                            <table className="table table-striped">
                                <thead className="base_bg">
                                <tr >
                                    <th>ARB </th>
                                    <th>Customer</th>
                                    <th>Railcar# </th>
                                    <th>Booking # </th>
                                    <th>Container #</th>
                                    <th>Trucker </th>
                                    <th>Arrived? </th>
                                    <th>Steamship Line </th>
                                    <th>Type </th>
                                    <th>Count </th>
                                    <th >
                                        <label className="control control--checkbox">
                                            <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Maersk</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                   ContainerQueueViewForm <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Zim</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Maersk</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Zim</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Maersk</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Maersk</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sc </td>
                                    <td>Ravago</td>
                                    <td>123456</td>
                                    <td>CCBX-73261</td>
                                    <td>D030G2E03</td>
                                    <td>IP</td>
                                    <td> Y</td>
                                    <td>Maersk</td>
                                    <td>40 ft. HC</td>
                                    <td>3 of 20</td>
                                    <td>
                                        <label className="control control--checkbox">
                                            <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </td>
                                </tr>


                                </tbody>
                            </table>
                        </div>



                        <div className="row-fluid pddn-50-btm">

                            <div className="padding-top-btm-xs">
                                <div className="padding-20-last-l pull-left"><button type="button"    className="btn  btn-gray text-uppercase">Back</button></div>
                                <div className="padding-20-all pull-left"><button type="button"    className="btn  btn-primary text-uppercase">Mark Loaded</button></div>

                                <div className="padding-20-last-r pull-right"><button type="button"   id="view"  className="btn  btn-success text-uppercase">View</button></div>
                                <div className="padding-20-all pull-right"><button type="button"   id="edit_btn"  className="btn  btn-orange text-uppercase">Edit</button></div>
                                <div className="padding-20-all pull-right"><button type="button"     className="btn  btn-primary text-uppercase">Print Container Load Order</button></div>

                            </div>
                        </div>

                        <div className="row pddn-50-btm">

                            <div  className="col-md-12"> <hr/></div>

                            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                                <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name "/>
                                </div>

                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                                    <button type="button"   className="btn  btn-success margin-left-xs">SAVE CUSTOMER VIEW</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>	
            )
            }
            }
            export default ContainerQueueViewForm;