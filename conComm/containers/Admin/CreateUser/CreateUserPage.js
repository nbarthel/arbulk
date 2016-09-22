import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import CreateUserForm from './CreateUserForm';
class CreateUserPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            	<AdminHeader />
                <CreateUserForm/>
                <Footer />
            </div>
        );


    }
}
export default CreateUserPage;