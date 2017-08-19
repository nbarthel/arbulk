import React, { Component } from 'react';
import EditCustomersAndTruckersForm from './EditCustomersAndTruckersForm'
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback'
import axios from 'axios'
 class EditCustomersAndTruckersPage extends Component {
 	constructor(props){
 		super(props);
 		this.state = { }
 	}
 	componentWillMount() {
 		if(this.props.params.custId != undefined){
 			var EditView = createDataLoader(EditCustomersAndTruckersPage,{
 				queries:[{
 					endpoint:'TCompany',
 					filter: {
 						include: ['TAddress']
 					}
 				}]
 			})
 			var base = 'TCompanies'+'/'+this.props.params.custId 			
 			this.url = EditView._buildUrl(base,{
 				include: "TAddress"
 			})
 			axios.get(this.url).then((response)=>{
 				this.setState({
 					custData : response.data,
 					addrData : response.data.TAddress[0],
 					restData : delete response.data['TAddress']
 				})
 			})
 				
 		}
 	}
	render() {
		return (
			 <div className="wrapper-inner">
      		<div className="content-inside">
            <AdminHeader routes = {this.props.routes}/>
            {this.state.addrData && this.state.custData ? <EditCustomersAndTruckersForm addrData = {this.state.addrData} custData = {this.state.custData}/> : null}
             </div>
            }
       <Footer />
       </div>	   
		);
	}
}
export default EditCustomersAndTruckersPage