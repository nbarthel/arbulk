/**
 * Created by manoj on 8/8/17.
 */
/**
 * Created by manoj on 8/8/17.
 */
import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import { hashHistory } from 'react-router';
import { Base_Url } from '../../../constants'
import axios from 'axios'
class StretchWrapList extends React.Component {
    constructor(props){
        super(props);
        this.state = { }
        this.wraprow
        this.rad = false
        this.total = 0
    }
    updatePallet(scratchID)
    {
        hashHistory.push("/Admin/updateUnit/"+scratchID);
    }



    deactivate(ID)
    {
        axios.put(Base_Url+"TPackagingTypes/"+ID,{"active": 0}).then((response)=>{
            swal({
                title: "Success",
                text: "Packaging unit deleted successfully.",
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

        this.wraprow = _.map(this.props.wraps,(wrap,index)=>{
            this.total = this.total + 1
            return (

                <tr key = {index}>
                    <td>{wrap.packagingType}</td>
                    <td>{wrap.active == 1 ? "Active":"Non-Active"}</td>
                    { wrap.active == 1 &&
                    <td className="td" style={{textAlign:'right'}}>
                        <span className="text-success" onClick = {this.updatePallet.bind(this, wrap.id)} ><i className="fa fa-pencil" aria-hidden="true" ></i> Edit </span>
                        <span className="text-danger" onClick = {this.deactivate.bind(this, wrap.id)} ><i className="fa fa-times" aria-hidden="true" ></i> Delete</span>
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
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th className="text_right">Action</th>
                                </tr>
                                </thead>
                                <tbody className="mody-user">
                                {this.wraprow}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>

            </section>
        );
    }
}
export default StretchWrapList;
