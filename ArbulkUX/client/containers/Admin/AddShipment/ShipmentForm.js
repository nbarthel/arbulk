/**
 * Created by kailash on 24/8/17.
 */
import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
class ShipmentForm extends React.Component {

    constructor(props){
        super(props);

        this.createUsrObj = {
            "id":0,
            "shipmentType" : '',
            'active':1
        }
        this.state = {
            errors : { }
        }
        this.error = false;
        this.onUserInfoChange = this.onUserInfoChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onUserInfoChange(e){
        this.createUsrObj[e.target.id] = e.target.value
        console.log(this.createUsrObj)
    }
    isValid(){
        this.error = false;
        let errors = { }
        if(this.createUsrObj.shipmentType == "")
        {
            errors.name = "Type is Required.";
            this.error = true;
        }
        if(this.error){
            this.setState({
                errors : errors
            })
        }
        return this.error;
    }
    onSubmit(e){
        e.preventDefault()
        if(this.isValid() == false){
            console.log(this.createUsrObj);
            axios.post(Base_Url+"TShipmentTypes",this.createUsrObj).then((response)=>{
                swal({
                    title: "Success",
                    text: "Shipment type added.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                }, function(){
                    window.location.reload();
                });
            })

        }
        //onSubmit
    }
    render() {
        return (
            <section className="admin">
                <div className="container">
                    <div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <form className=" bs-component">
                            <fieldset className="scheduler-border">
                                <legend className="scheduler-border">Add Shipment Type</legend>
                                <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                    <label htmlFor="Weight">Name</label>
                                    <div className={this.state.errors.name ? "form-group has error" : "form-group"}>
                                        <input type="text"
                                               className="form-control"
                                               id="shipmentType"
                                               onChange = {this.onUserInfoChange}
                                               placeholder="Enter shipment type"/>
                                        { this.state.errors.name &&
                                        <span>{this.state.errors.name}</span>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 ">
                                        <button  type="submit"
                                                 onClick = {this.onSubmit}
                                                 className="btn  btn-primary text-uppercase"
                                        >Add Type</button>
                                    </div>
                                </div>
                            </fieldset>

                        </form>
                    </div>
                </div>
            </section>
        );
    }
}
export default ShipmentForm;
