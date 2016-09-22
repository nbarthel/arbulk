import React from 'react';
import ShipmentEntryForm from './ShipmentEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ShipmentEntryPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            	<Header />
                <ShipmentEntryForm />
                <Footer />
            </div>
        );


    }
}
export default ShipmentEntryPage;