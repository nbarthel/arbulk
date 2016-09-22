import React from 'react';
import ContainerViewForm from './ContainerViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ContainerViewPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerViewForm/>
                </div>
               <Footer/>
            </div>
        );


    }
}
export default ContainerViewPage;