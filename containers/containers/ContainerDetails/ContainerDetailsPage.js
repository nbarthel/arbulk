import React from 'react';
import ContainerDetailsForm from './ContainerDetailsForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

class ContainerDetailsPage  extends React.Component{
    render(){
        return(
        	<div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerDetailsForm/>
                </div>
               <Footer/>
            </div>
        );


    }
}
export default ContainerDetailsPage;