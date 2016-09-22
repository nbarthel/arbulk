import React from  'react';
import _ from 'lodash';
class StatusFilterPage extends React.Component {
    constructor(props){
        super(props);
        this.status = [{name:"Unconfirmed",id: 0},
        {name:"Confirmed",id:1},
        {name:"Arrived",id:2},
        {name:"Queued",id:3},
        {name:"Partially Packaged",id:4},
        {name:"In Inventory",id:5},
        {name:"Shipped",id:6}]
        
    }
    render() {
        var stats = _.map(this.status,(status) => {
            return ( <li>
                     <label className="control control--checkbox">{status.name}
                     <input type="checkbox" value={status.name} onClick={(e) => this.props.onClick(e,status)} id={status.id}  id="row1"/><div className="control__indicator"></div>
                     </label>
                        </li>)
        })
        return (
            < div className="status">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">STATUS  </h6>
                        <a href=""  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul className="scroll">
                       {stats} 
                       
                    </ul>
                </div>


        )
    }
}
export default StatusFilterPage;
