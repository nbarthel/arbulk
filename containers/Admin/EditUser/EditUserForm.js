import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';

class EditUserForm extends React.Component {
    render() {
        return (
            <section className="admin">
                <div className="container">
                    <div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <form className="form-horizontal bs-component">
                            <fieldset className="scheduler-border">
                                <legend className="scheduler-border">Create User</legend>


                                <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group ">
                                        <label for="First_Name">First Name</label>
                                        <input type="text" className="form-control" id="First_Name" placeholder="Joe" disabled/>
                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-group ">
                                            <label for="Last_Name">Last Name</label>
                                            <input type="text" className="form-control" id="Last_Name" placeholder="Smith" disabled/>
                                                <div className="error"><span></span></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                            <div className="form-group ">
                                                <label for="">Email Address</label>
                                                <input type="email" className="form-control" id="" placeholder="Sample@sample.com" disabled/>
                                                    <div className="error"><span></span></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                                <div className="form-group ">
                                                    <label for="">Confirm Email Address</label>
                                                    <input type="email" className="form-control" id="" placeholder="Sample@sample.com" disabled/>
                                                        <div className="error"><span></span></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                                    <div className="form-group ">
                                                        <label for="">Role</label>
                                                        <select className="form-control" id="" name="">
                                                            <option value="">Select Role</option>
                                                            <option value="">Select Role 1</option>
                                                            <option value="">Select Role 2</option>
                                                            <option value="">Select Role 3</option>
                                                            <option value="">Select Role 4</option>
                                                            <option value="">Select Role 5</option>
                                                        </select>
                                                        <div className="error"><span></span></div>
                                                    </div>
                                                </div>

                                            </fieldset>
                                            <div className="form-group">
                                                <div className="col-lg-12 padding-20-last-l">
                                                    <button type="submit" className="btn  btn-primary text-uppercase">Update User</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </section>
            );
            }
            }
            export default EditUserForm;