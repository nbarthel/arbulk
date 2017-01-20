import React from  'react';
import _ from 'lodash';
class StatusFilterPage extends React.Component {
    constructor(props){
        super(props);
       this.status = [{name:"UNCONFIRMED",id: 0},
        {name:"CONFIRMED",id:1},
        {name:"READY",id:2},
        {name:"QUEUED",id:3},
        {name:"PARTIALLYPACKED",id:4},
        {name:"In Inventory",id:5},
        {name:"SHIPPED",id:6}]
        
        this.checkedStatus = { }

    
        
    }
    /*onClick(e,status){
        if(e.target.checked){
            this.props.checkedStatus[e.target.id] = e.target.value;
            this.props.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedStatus)
        }
        else if (!e.target.checked){
         delete this.props.checkedStatus[e.target.id]
         //console.log(this.props.checkedStatus)
            
        }
    }*/
    render() {
        var stats = _.map(this.status,(status) => {
            return (<li key={status.id}>
                     <label className="control control--checkbox">{status.name}
                     <input type="checkbox" value={status.name} onChange={(e) => this.props.onStatusFilter(e,status)}  id={status.id} /><div className="control__indicator"></div>
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
