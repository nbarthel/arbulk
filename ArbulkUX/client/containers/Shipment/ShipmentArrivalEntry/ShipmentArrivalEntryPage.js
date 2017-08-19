import React from 'react';
import ShipmentArrivalEntryForm from './ShipmentArrivalEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer'
class ShipmentArrivalEntryPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            	<Header routes = {this.props.routes} />
                <ShipmentArrivalEntryForm/>
                <Footer />
            </div>
        );


    }
}
export default ShipmentArrivalEntryPage;