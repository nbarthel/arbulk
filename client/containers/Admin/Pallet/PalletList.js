/**
 * Created by manoj on 8/8/17.
 */
import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import { hashHistory } from 'react-router';
import { Base_Url } from '../../../constants'
import axios from 'axios'
class PalletList extends React.Component {
    constructor(props){
        super(props);
        this.state = { }
        this.palletrow
        this.rad = false
        this.total = 0
    }
    updatePallet(palletID)
    {
        hashHistory.push("/Admin/updatePallet/"+palletID);
    }



    deactivate(ID)
    {
        axios.put(Base_Url+"TPalletTypes/"+ID,{"active": 0}).then((response)=>{
            swal({
                title: "Success",
                text: "Pallet Deleted Successfully!",
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
    reactivate(ID)
    {
        axios.put(Base_Url+"TPalletTypes/"+ID,{"active": 1}).then((response)=>{
            swal({
                title: "Success",
                text: "Pallet Reactivated Successfully!",
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
    render() {

        this.palletrow = _.map(this.props.pallets,(pallet,index)=>{
            this.total = this.total + 1
            return (

                <tr key = {index}>
                    <td>{pallet.weight}</td>
                    <td>{pallet.palletType}</td>
                    <td>{pallet.active == 1 ? "Active":"Non-Active"}</td>
                    { pallet.active == 1 &&
                    <td className="td" style={{textAlign:'right'}}>
                        <span className="text-success" onClick = {this.updatePallet.bind(this, pallet.id)} ><i className="fa fa-pencil" aria-hidden="true" ></i> Edit </span>
                        <span className="text-danger" onClick = {this.deactivate.bind(this, pallet.id)} ><i className="fa fa-times" aria-hidden="true" ></i> Delete</span>
                    </td>
                    }
                </tr>

            )
        })

        return (
            <section className="admin">
                <div className="container-fluid">
                    <div className="row-fluid">
                        <div className="table-responsive ">
                            <table className="table table-striped">
                                <thead className="base_bg">
                                <tr >
                                    <th>Weight</th>
                                    <th>Pallet Type</th>
                                    <th>Status</th>
                                    <th className="text_right">Action</th>
                                </tr>
                                </thead>
                                <tbody className="mody-user">
                                {this.palletrow}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>

            </section>
        );
    }
}
export default PalletList;
