import React from  'react';
import _ from 'lodash';
class StatusFilterPage extends React.Component {
    constructor(props){
        super(props);
       this.status = [{name:"UNCONFIRMED",id: 0},
        {name:"CONFIRMED",id:1},{name:"QUEUED",id:2},{name:"LOADED",id:3},{name:"COMPLETED",id:4}]


        this.checkedStatus = { }



    }
    componentWillReceiveProps(nextProps){
         
        if(nextProps.statusSelected && nextProps.statusSelected!==""){
            for(let i =0;i<nextProps.statusSelected.length;i++){
                this.refs[nextProps.statusSelected[i].status].checked = true;
            }
        }
    }
    /*onClick(e,status){
        if(e.target.checked){
            this.props.checkedStatus[e.target.id] = e.target.value;
            this.props.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedStatus)
        }
     {name:"READY",id:2},
     {name:"QUEUED",id:3},
     {name:"PARTIALLY PACKED",id:4},
     {name:"ININVENTORY",id:5},
     {name:"SHIPPED",id:6}


        else if (!e.target.checked){
         delete this.props.checkedStatus[e.target.id]
         //console.log(this.props.checkedStatus)

        }
    }*/
    render() {
        var stats = _.map(this.status,(status) => {
            return (<li key={status.id}>
                     <label className="control control--checkbox">{status.name}
                     <input type="checkbox" ref = {status.name} value={status.name} onChange={(e) => this.props.onStatusFilter(e,status)}  id={status.id} /><div className="control__indicator"></div>
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
