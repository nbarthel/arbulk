/**
 * Created by ankit on 18/8/17.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import {Base_Url} from '../../constants';
import _ from 'lodash';
import '../../../public/stylesheets/style.css'
class showColumn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            allCoulmns: {},
            visibleColumns: {},
            recvdColumns: false
        }
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.OnAddColumn = this.OnAddColumn.bind(this);
        this.OnRemoveColumn = this.OnRemoveColumn.bind(this);
        this.AddOrRemove = this.AddOrRemove.bind(this);
        this.tempVisibleColumn = [];
        this.tempAllcolumns = [];
    }
    componentWillReceiveProps(nextProps){
        var userId = localStorage.getItem("userId")
        if(nextProps.Name && nextProps.Name!="" && !this.state.recvdColumns){
            axios.get( Base_Url+`TColumnShowHides/getAllColumns?name=${nextProps.Name}&userId=${userId}`).then(response =>{
                this.setState({
                    allCoulmns:response.data,
                    recvdColumns : true
                })
            }).catch(err=>{
                console.log(err);
            })
            axios.get(Base_Url+`TColumnShowHides/getAllVisibleColumnName?name=${nextProps.Name}&userId=${userId}`).then(response=>{
                this.setState({
                    visibleColumns:response.data,
                    recvdColumns : true
                })
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    submit(){
        this.setState({
            recvdColumns : false
        });
        var data = {
            name: this.props.Name,
            userId : localStorage.getItem("userId"),
            columns:this.tempVisibleColumn
        }
        axios.post(Base_Url+"TColumnShowHides/updateColumns",data).then(response=>{
            debugger
            console.log("done");
        }).catch(err=>{
            console.log("err");
        })
        this.props.onRequestClose(1);
    }
    cancel(){
        this.setState({
            recvdColumns : false
        });
        this.props.onRequestClose(0);
    }
    OnAddColumn(e) {
        debugger
        var flag = false;
        this.tempVisibleColumn = this.state.visibleColumns;
        var lis = document.getElementById("ULForVisibleColumn").getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = ""
        }
        if(document.getElementById(e.target.id).style.backgroundColor===""){
            document.getElementById(e.target.id).style.backgroundColor = "#cbd3ff"
        }
        else{
            document.getElementById(e.target.id).style.backgroundColor = ""
        }
        document.getElementById("btnAdd").disabled = false
        document.getElementById("btnAdd").onclick = this.AddOrRemove
        document.getElementById("btnRemove").disabled = true

        var data = this.tempVisibleColumn;
        var obj = {"columnName":e.target.innerText}
        data.push(obj);
        this.tempVisibleColumn = data;
        this.tempAllcolumns = this.state.allCoulmns
        for(var i =0;i<this.tempAllcolumns.length;i++){
            if(this.tempAllcolumns[i].columnName==e.target.innerText){
                this.tempAllcolumns.splice(i,1)
                break;
            }
        }
    }

    OnRemoveColumn(e){
        debugger
        this.tempVisibleColumn = this.state.visibleColumns;
        var lis = document.getElementById("ULForAllColumn").getElementsByTagName("li");
        for(var i=0;i<lis.length;i++){
            lis[i].style.backgroundColor=""
        }
        if(document.getElementById(e.target.id).style.backgroundColor===""){
            document.getElementById(e.target.id).style.backgroundColor = "#cbd3ff"
        }
        else{
            document.getElementById(e.target.id).style.backgroundColor = ""
        }
        document.getElementById("btnRemove").disabled = false;
        document.getElementById("btnRemove").onclick = this.AddOrRemove;
        document.getElementById("btnAdd").disabled = true;
        var data = this.tempVisibleColumn
        for (var i = 0; i < data.length; i++) {
            if (data[i].columnName && e.target.innerText.toUpperCase() === data[i].columnName.toUpperCase()) {
                data.splice(i,1);
                this.tempVisibleColumn = data;
                break;
            }
        }
        var tempAllColumn = this.state.allCoulmns;
        tempAllColumn.push({"columnName":e.target.innerText});
    }
    AddOrRemove(e){
        debugger
        var data = this.tempVisibleColumn;
        var allColumnData = this.tempAllcolumns;
        this.setState({
            recvdColumns : true,
            visibleColumns:data,
            allCoulmns:allColumnData
        });
        this.forceUpdate();
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.cancel}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submit}
            />,
        ];
        var listOfAllcolumn = _.map(this.state.allCoulmns,(data,index)=>{
            return(
                <li
                    key={"A:"+data.columnName}
                    id={"A:"+data.columnName}
                    ref = {"A:"+data.columnName}
                    name={data.columnName}
                    onClick={(e)=>{this.OnAddColumn(e)}}>
                    {data.columnName}
                </li>
            )

        })
        var listOfVisibleColumn = _.map(this.state.visibleColumns,(data,index)=>{
            return(
                <li
                    key ={"V:"+data.columnName}
                    id={"V:"+data.columnName}
                    name={data.columnName}
                    ref = {"V:"+data.columnName}
                    onClick={(e)=>{this.OnRemoveColumn(e)}}>
                    {data.columnName}
                </li>
            )

        })
        return(
        <MuiThemeProvider>
            <Dialog
                title="Show Columns"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                titleClassName="ModelHEading"
            >
                <div className="row wrapperModelNew">
                    <div className="col-md-5">
                        <ul key="ULForAllColumn" id="ULForAllColumn">
                            {listOfAllcolumn}
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn  text-uppercase btn-primary" id="btnAdd" onClick={(e)=>{this.AddOrRemove(e)}} disabled>Add <i className="fa fa-angle-double-right"></i></button>
                        <button type="button" className="btn  text-uppercase btn-danger" id="btnRemove" onClick={(e)=>{this.AddOrRemove(e)}} disabled><i className="fa fa-angle-double-left"></i> Remove </button>
                    </div>
                    <div className="col-md-5">
                        <ul key="ULForVisibleColumn" id="ULForVisibleColumn">
                            {listOfVisibleColumn}
                        </ul>
                    </div>
                </div>


            </Dialog>
        </MuiThemeProvider>
        )
    }
}
export default showColumn;