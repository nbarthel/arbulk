import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import CustomersAndTruckersForm from './CustomersAndTruckersForm';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import { createDataLoader } from 'react-loopback'

class CustomersAndTruckersPage extends React.Component {
	constructor(props){
        super(props);
        this.state = { }
    }
    getCustomerData(){
        var CustView = createDataLoader(CustomersAndTruckersPage,{
            queries:[{
                endpoint: 'TAddress',
                filter:{
                    include: "TCompany"
                }
            }]
        })
        var base = 'TCompanies'
        this.url = CustView._buildUrl(base,{
            include : "TAddress"
        })
        console.log(this.url)
        axios.get(this.url).then((response)=>{
            this.setState({
                custData : response.data
            })
            
        })
                
    }

    componentWillMount() {
        this.getCustomerData()
    }
    render() {

		return (
			   <div className="wrapper-inner">
      			<div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
                <CustomersAndTruckersForm  custData = {this.state.custData} />
                </div>
                <Footer />
            </div>
		);
	}
}

export default CustomersAndTruckersPage