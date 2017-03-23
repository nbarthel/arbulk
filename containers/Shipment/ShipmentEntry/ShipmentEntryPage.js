import React from 'react';
import ShipmentEntryForm from './ShipmentEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
var Loader = require('react-loader')
class ShipmentEntryPage  extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Loader loaded={this.props.routes?true:false}>
            	<Header routes = {this.props.routes} />
                <ShipmentEntryForm />
                <Footer />
                </Loader>
            </div>
        );


    }
}
export default ShipmentEntryPage;
