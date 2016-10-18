import React from 'react';
import EditUserForm from './EditUserForm';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
class EditUserPage  extends React.Component{
    render(){
        return(
            <div>
            	<AdminHeader />
                <EditUserForm/>
                <Footer />
            </div>
        );


    }
}
export default EditUserPage;