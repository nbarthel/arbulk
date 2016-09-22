import React from 'react';
import ShipmentDetailsEditForm from './ShipmentDetailsEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ShipmentDetailsEditPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <ShipmentDetailsEditForm/>
            <Footer />
            </div>
        );


    }
}
export default ShipmentDetailsEditPage;