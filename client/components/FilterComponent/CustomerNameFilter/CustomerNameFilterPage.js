import React from  'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from  'lodash';
import {Base_Url} from '../../../constants';
class CustomerNameFilterPage extends React.Component {
    constructor(props){
        super(props);
        this.checkedCustomer = { }
       this.state = { 
        }           
    }
    componentDidMount() {
        axios.get( Base_Url +"TCompanies").then((response) => {
        this.setState({
            name: response.data
        })
    })
    .catch(function(err){
        console.log('eroor>>>>' , err)
    })

           

    }


 /* onClick(e,customer){
        if(e.target.checked){
            this.props.checkedCustomer[e.target.id] = e.target.value;
            this.props.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCustomer)
        }
        else if (!e.target.checked){
         delete this.props.checkedCustomer[e.target.id]
       
            //console.log(this.props.checkedCustomer)
        }
    }*/
    render() {
        var customers = _.map(this.state.name,(customer) => {
return  (<li key={customer.id}>
                    <label className="control control--checkbox">{customer.name}
                    <input type="checkbox" value={customer.name} id={customer.id} onChange={(e) => this.props.onCustomerFilter(e,customer)}/><div className="control__indicator"></div>
                    </label>
                    </li>)})            
        return (
            <div className="customer">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">CUSTOMER  </h6>
                        <a href="javascript:void()"  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul className="scroll ht">
                        {customers}
                    </ul>
                </div>
        )
    }
}
export default CustomerNameFilterPage;