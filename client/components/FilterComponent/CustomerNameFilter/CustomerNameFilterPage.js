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
    componentDidMount() {

        console.log("I have recieved props")
        //debugger
        this.collesp(8);

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
        var base = 'TCompanies'
        if(limit===8){
            this.urlCustomer = PIview._buildUrl(base, {
                "where" : {type : "CUSTOMER"},"order": "name",limit:limit
            })
        }else {
            this.urlCustomer = PIview._buildUrl(base, {
                "where" : {type : "CUSTOMER"},"order": "name"
            })
        }

        axios.get(this.urlCustomer).then((response) => {
            console.log("customer", response)
            this.setState({
                name: response.data
            })
        })
            .catch(function(err){
                console.log('eroor>>>>' , err)
            })





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
        var customers = _.map(this.state.name,(customer,i) => {
            return  (<li key={customer.id}>
                    <label className="control control--checkbox">{customer.name}
                    <input type="checkbox" value={customer.name} id={customer.id} onChange={(e) => this.props.onCustomerFilter(e,customer)}/><div className="control__indicator"></div>
                    </label>
                    </li>)
       })
        return (
            <div className="customer">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">CUSTOMER  </h6>
                        <a href="javascript:void(0)" onClick={this.collespeRec.bind(this)}  className="pull-right text_right"> {this.state.records>8? "Show Default": "Show All"}</a>
                    </div>
                    <ul className="scroll ht">
                        {customers}
                    </ul>
                </div>
        )
    }
}
export default CustomerNameFilterPage;