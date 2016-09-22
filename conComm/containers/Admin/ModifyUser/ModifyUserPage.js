import React from 'react';
import ModifyUserForm from './ModifyUserForm';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
class ModifyUserPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <AdminHeader />
                <ModifyUserForm/>
                <Footer />
            </div>
        );


    }
}
export default ModifyUserPage;