import React from  'react';
import _ from 'lodash';
class StatusFilterPage extends React.Component {
    constructor(props){
        super(props);
       this.status = [
        {name:"ALLOCATED",id:0},
         {name:"QUEUED",id:1},
        {name:"LOADED",id:2},
           {name:"INTRANSIT",id:3},{name:"DELIVERED",id:4}]
        this.checkedStatus = { }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.statusSelected && nextProps.statusSelected!==""){
            for(let i =0;i<nextProps.statusSelected.length;i++){
                this.refs[nextProps.statusSelected[i]].checked = true;
            }
        }
    }
    render() {
        var stats = _.map(this.status,(status) => {
            return (<li key={status.id}>
                     <label className="control control--checkbox">{status.name}
                     <input type="checkbox" value={status.name} onChange={(e) => this.props.onStatusFilter(e,status)}  id={status.id} ref = {status.name} /><div className="control__indicator"></div>
                     </label>
                        </li>)
        })
        return (
            < div className="status">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">STATUS  </h6>
                   </div>
                    <ul className="scroll">
                       {stats} 
                       
                    </ul>
                </div>


        )
    }
}
export default StatusFilterPage;
