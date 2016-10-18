import React from 'react';
import ShipmentConfirmationForm from './ShipmentConfirmationForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ShipmentConfirmationPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <ShipmentConfirmationForm/>
                <Footer />
            </div>
        );


    }
}
export default ShipmentConfirmationPage;