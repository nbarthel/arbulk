import React from 'react';
import ContainerArrivalEditForm from './ContainerArrivalEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

class ContainerArrivalEditPage  extends React.Component{
    render(){
        return(
             <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerArrivalEditForm/>
                </div>
               <Footer/>
            </div>
        );


    }
}
export default ContainerArrivalEditPage;