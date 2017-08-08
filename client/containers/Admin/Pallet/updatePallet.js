/**
 * Created by manoj on 8/8/17.
 */
import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import { hashHistory } from 'react-router';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
class updatePallet extends React.Component {

    constructor(props){
        super(props);
        this.createUsrObj = {
            "id":0,
            "weight" : '',
            "palletType" : '',
            'active':1
        }
        this.state = {
            errors : { },
            createUsrObj : {
                "id":0,
                "weight" : '',
                "palletType" : '',
                'active':1
            },
            pallets : []
        }
        this.error = false;
        this.onUserInfoChange = this.onUserInfoChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount()
    {
        axios.get(Base_Url+"TPalletTypes/"+this.props.params.palletId).then((response)=>{
            if(response.data)
            {
                this.createUsrObj.id =response.data.id;
                this.createUsrObj.weight =response.data.weight;
                this.createUsrObj.palletType =response.data.palletType;
                this.createUsrObj.active =response.data.active;
                this.setState({
                    createUsrObj: this.createUsrObj
                });
            }
        })
    }
    onUserInfoChange(e){
        this.createUsrObj[e.target.id] = e.target.value
        this.setState({
            createUsrObj: this.createUsrObj
        });
        console.log(this.state.createUsrObj)
    }
    isValid(){
        this.error = false;
        let errors = { }
        if(this.state.createUsrObj.palletType == "")
        {
            errors.palletType = "Pallet Type is Required.";
            this.error = true;
        }
        if(this.state.createUsrObj.weight == "")
        {
            errors.weight = "Weight is Required."
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
            axios.put(Base_Url+"TPalletTypes/"+this.props.params.palletId,this.state.createUsrObj).then((response)=>{
                swal({
                    title: "Success",
                    text: "Pallet Updated Successfully",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                }, function(){
                    window.location.reload();
                    //hashHistory.push("/Admin/addPallet/");
                });
            })

        }
        //onSubmit
    }
    render() {
        return (
            <div className="wrapper-inner">
                <div className="content-inside">
                    <AdminHeader routes = {this.props.routes}/>

                    <div className="wrapper-inner">
                        <div className="content-inside">
                            <section className="admin">
                                <div className="container">
                                    <div className="create_user col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <form className="form-horizontal bs-component">
                                            <fieldset className="scheduler-border">
                                                <legend className="scheduler-border">Update Pallet</legend>
                                                <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                                    <label htmlFor="Weight">Weight</label>
                                                    <div className={this.state.errors.weight ? "form-group has error" : "form-group"}>
                                                        <input type="text"
                                                               className="form-control"
                                                               id="weight"
                                                               value={this.state.createUsrObj.weight}
                                                               onChange = {this.onUserInfoChange}
                                                               placeholder="Enter Weight"/>
                                                        { this.state.errors.weight &&
                                                        <span>{this.state.errors.weight}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-6  col-md-6 col-sm-6 col-xs-12">
                                                    <label htmlFor="Pallet_Type">Pallet Type</label>
                                                    <div className={this.state.errors.palletType ? "form-group has error" : "form-group"}>
                                                        <input type="text"
                                                               className="form-control"
                                                               value={this.state.createUsrObj.palletType}
                                                               onChange = {this.onUserInfoChange}
                                                               id="palletType"
                                                               placeholder="Enter Pallet Type"/>
                                                        { this.state.errors.palletType &&
                                                        <span>{this.state.errors.palletType}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-lg-12 ">
                                                        <button   type="submit"
                                                                  onClick = {this.onSubmit}
                                                                  className="btn  btn-primary text-uppercase"
                                                        >Update Pallet</button>
                                                    </div>
                                                </div>
                                            </fieldset>

                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <Footer />
                    </div>
                </div>
                <Footer /></div>
        );
    }
}
export default updatePallet;
