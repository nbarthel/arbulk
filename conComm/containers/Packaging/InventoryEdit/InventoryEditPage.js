import React from 'react';
import InventoryEditForm from './InventoryEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class InventoryEditPage extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <InventoryEditForm/>
             </div>
                <Footer />
                </div>
        );


    }
}
export default InventoryEditPage;