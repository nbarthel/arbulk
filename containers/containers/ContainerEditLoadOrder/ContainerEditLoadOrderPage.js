import React from 'react';
import ContainerEditLoadOrderForm from './ContainerEditLoadOrderForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

class ContainerEditLoadOrderPage  extends React.Component{
    render(){
        return(
        	<div className="wrapper-inner">
            <div className="content-inside">
            <Header />
            <ContainerEditLoadOrderForm/>
                </div>
               <Footer/>
            </div>
            );


    }
}
export default ContainerEditLoadOrderPage;