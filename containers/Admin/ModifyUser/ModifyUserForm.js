import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import EditUser from './EditUser'
import { hashHistory } from 'react-router';
import { Base_Url } from '../../../constants'
import axios from 'axios'
class ModifyUserForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { }
        this.usersTable
        this.rad = false
        this.total = 0
        this.handleRadio = this.handleRadio.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    onEdit(e){
        this.empId = e.target.id
       hashHistory.push("/Admin/editUser"+'/'+this.empId)
    }
    onDelete(e){debugger
        var delId = e.target.id

     swal({
            title: "You are about to delete a entry?",
            text: "Are You Sure ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false },
              function(){
                 axios.delete(Base_Url+"TUsers/"+delId).then((response)=>{
                     swal({
                      title: "Success",
                      text: "Entry has been deleted",
                      type: "success",
                      showCancelButton: false,
      },
              function(isConfirm){
            window.location.reload();

}
);

                 })
                }


                );



    }
    handleRadio(e){
        this.total = 0
        if(e.target.value == "Adm"){
            this.rad = true
            this.usersTable = _.map(this.props.userData,(user,index)=>{
                if(user.role == "Admin"){
                    this.total = this.total + 1
                    return (
                        <tr key = {index}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName  +" "+  user.lastName}</td>
                                            <td>{user.role}</td>
                                            <td className="td" style={{textAlign:'right'}}>
                                                <span className="text-success" onClick = {this.onEdit} id = {user.id}><i className="fa fa-pencil" aria-hidden="true" ></i> Edit </span>
                                                <span className="text-danger" onClick = {this.onDelete} id = {user.id}><i className="fa fa-times" aria-hidden="true" ></i> Delete</span>
                                            </td>
                                    </tr>
                        )
                }
            })
            this.forceUpdate();
        }else if(e.target.value == "Emp"){
            this.rad = true
            this.usersTable = _.map(this.props.userData,(user,index)=>{
                if(user.role == "Employee"){
                    this.total = this.total + 1
                    return (
                        <tr key = {index}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName  +" "+  user.lastName}</td>
                                            <td>{user.role}</td>
                                            <td className="td" style={{textAlign:'right'}}>
                                                <span className="text-success" onClick = {this.onEdit} id = {user.id}><i className="fa fa-pencil" aria-hidden="true" ></i> Edit </span>
                                                <span className="text-danger" onClick = {this.onDelete} id = {user.id}><i className="fa fa-times"  aria-hidden="true" ></i> Delete</span>
                                            </td>
                                    </tr>
                        )
                }
            })
            this.forceUpdate();
        }

    }
    render() {

        if(this.props.userData && this.rad == false){

            this.usersTable = _.map(this.props.userData,(user,index)=>{
                this.total = this.total + 1
                return (

                                        <tr key = {index}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName  +" "+  user.lastName}</td>
                                            <td>{user.role}</td>
                                            <td className="td" style={{textAlign:'right'}}>
                                               <span className="text-success" onClick = {this.onEdit} id = {user.id}><i className="fa fa-pencil" aria-hidden="true" ></i> Edit </span>
                                                <span className="text-danger" id = {user.id} onClick = {this.onDelete} ><i className="fa fa-times"  aria-hidden="true" ></i> Delete</span>
                                            </td>
                                        </tr>

                    )
            })
        }
        return (
            <section className="admin">
                <div className="container-fluid">
                    <div className="row-fluid">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Modify User</legend>
                            <div className="col-md-6 ">
                                <div className="pull-left margin-30-right">
                                    <label className="control control--radio ">Admin
                                        <input  onChange = {this.handleRadio} type="radio" value = "Adm" id="row1" name="rad"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                                <div className="pull-left margin-30-right">
                                    <label className="control control--radio ">Employee
                                        <input type="radio" onChange = {this.handleRadio} value = "Emp" name = "rad" id="row1"/><div className="control__indicator"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p >Total Records Founds : {this.total}</p>
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
                                     {this.usersTable}
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
