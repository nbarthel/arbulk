import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';

class ModifyUserForm extends React.Component {
    render() {
        return (
            <section className="admin">
                <div className="container-fluid">
                    <div className="row-fluid">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Modify User</legend>
                            <div className="col-md-6 ">
                                <div className="pull-left margin-30-right">
                                    <label className="control control--radio ">Admin
                                        <input type="radio" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                                <div className="pull-left margin-30-right">
                                    <label className="control control--radio ">Employee
                                        <input type="radio" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p align="right">Total Records Founds : 17</p>
                                </div>
                                </fieldset>


                                <div className="table-responsive ">
                                    <table className="table table-striped">
                                        <thead className="base_bg">
                                        <tr >
                                            <th>Email Address </th>
                                            <th>Employee Name</th>
                                            <th>Role </th>
                                            <th className="text_right">Action </th>

                                        </tr>
                                        </thead>
                                        <tbody className="mody-user">
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td className="td" style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sample@sample.com </td>
                                            <td>Employee Name</td>
                                            <td>Admin</td>
                                            <td style={{textAlign:'right'}}>
                                                <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </span>
                                                <span className="text-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</span>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>

                    </section>
            );
            }
            }
            export default ModifyUserForm;

