import React from 'react';
import ContainerQueueViewForm from './ContainerQueueViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ContainerQueueViewPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <ContainerQueueViewForm/>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ContainerQueueViewPage;