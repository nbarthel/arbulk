import React from 'react';
import ShipmentEditForm from './ShipmentEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ShipmentEditPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <ShipmentEditForm/>
                <Footer />
            </div>
        );


    }
}
export default ShipmentEditPage;