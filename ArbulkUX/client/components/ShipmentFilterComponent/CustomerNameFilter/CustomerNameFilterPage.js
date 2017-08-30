import React from  'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from  'lodash';
import {Base_Url} from '../../../constants';
import { createDataLoader } from 'react-loopback';
class CustomerNameFilterPage extends React.Component {
    constructor(props){
        super(props);
        this.checkedCustomer = { }
        this.state = { records:8}
    }
    collesp(limit){
        var PIview = createDataLoader(CustomerNameFilterPage,{
            queries:[{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        console.log("I have recieved props")
        //debugger

        var base = 'TCompanies/getCustomers'

        if(limit===8){
            this.urlCustomer = PIview._buildUrl(base+"/?id="+parseInt(limit))
        }else {
            this.urlCustomer = PIview._buildUrl(base)
        }
        axios.get( this.urlCustomer).then((response) => {
            this.setState({
                name: response.data
            })
        })
            .catch(function(err){
                console.log('eroor>>>>' , err)
            })
    }
    componentDidMount() {
        this.collesp(8);
    }
    componentDidUpdate(){
        if(this.props && this.props.customerSelected){
            for(let i =0;i<this.props.customerSelected.length;i++){
                let customer_id = this.props.customerSelected[i];
                if(this.refs["c"+customer_id]){
                    this.refs["c"+customer_id].checked = true;
                }
            }
        }
    }
    collespeRec(){
        if(this.state.records===8){
            this.setState({records:9})
            this.forceUpdate()
            this.collesp(9);
        }else {
            this.setState({records:8})
            this.forceUpdate()
            this.collesp(8);
        }

    }


    render() {
        var customers = _.map(this.state.name,(customer) => {
return  (<li key={customer.id} className="checkboxCustomer inline">
                    <label className="control control--checkbox">
                    <input type="checkbox" value={customer.name} ref={"c"+customer.id} id={customer.id} onChange={(e) => this.props.onCustomerFilter(e,customer)}/><div className="control__indicator"></div>
                    </label>
    <span className="displayonlyFilter" title ={customer.name} id = {"c:"+customer.id} onClick={(e) => this.props.onCustomerFilter(e,customer,true)}>{"  Only  "}</span>
    <span className="labText">{customer.name.substring(0,10)+'..'}</span>
                    </li>)})            
        return (
            <div className="customer">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">CUSTOMER  </h6>
                        <a href="javascript:void(0)" onClick={this.collespeRec.bind(this)}  className="pull-right text_right">{this.state.records>8? "Show Default": "Show All"}</a>
                    </div>
                    <ul className="scroll ht">
                        {customers}
                    </ul>
                </div>
        )
    }
}
export default CustomerNameFilterPage;