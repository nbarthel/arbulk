import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import CreateUserForm from './CreateUserForm';

class CreateUserPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
      <div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
                <CreateUserForm/>
                </div>
                <Footer />
            </div>
        );


    }
}
export default CreateUserPage;