import React from 'react';
import InventoryEditForm from './InventoryEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class InventoryEditPage extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <InventoryEditForm/>
                <Footer />
                </div>
        );


    }
}
export default InventoryEditPage;