import React from 'react';
import ShipmentDetailsForm from './ShipmentDetailsForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ShipmentDetailsPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <ShipmentDetailsForm/>
           <Footer />
            </div>
        );


    }
}
export default ShipmentDetailsPage;