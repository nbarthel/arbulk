import React from 'react';
import ContainerQueueViewEditForm from './ContainerQueueViewEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

class ContainerQueueViewEditPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerQueueViewEditForm/>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ContainerQueueViewEditPage;