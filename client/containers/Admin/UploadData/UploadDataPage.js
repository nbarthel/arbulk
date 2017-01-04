import React, { Component } from 'react';
import UploadDataForm from './UploadDataForm'
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
class UploadDataPage extends Component {
	render() {
		return (
			     <div className="wrapper-inner">
      <div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
            	<UploadDataForm />
            	</div>
                <Footer />
            </div>
		);
	}
}
export default UploadDataPage