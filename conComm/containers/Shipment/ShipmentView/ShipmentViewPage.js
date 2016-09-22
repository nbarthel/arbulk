import React from 'react';
import ShipmentViewForm from './ShipmentViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer'
class ShipmentViewPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <ShipmentViewForm/>
                <Footer />
            </div>
        );


    }
}
export default ShipmentViewPage;