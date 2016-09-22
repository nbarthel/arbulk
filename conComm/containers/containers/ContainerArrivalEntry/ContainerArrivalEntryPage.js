import React from 'react';
import ContainerArrivalEntryForm from './ContainerArrivalEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ContainerArrivalEntryPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerArrivalEntryForm/>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ContainerArrivalEntryPage;