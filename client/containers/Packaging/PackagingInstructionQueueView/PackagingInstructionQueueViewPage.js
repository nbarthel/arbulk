import React from 'react';

import PackagingInstructionQueueViewForm from './PackagingInstructionQueueViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class PackagingInstructionQueueViewPage extends React.Component{
    render(){
        return(
            <div className="wrapper">
            <Header />
                <PackagingInstructionQueueViewForm/>             
                <Footer/>
                </div>
        );


    }
}
export default PackagingInstructionQueueViewPage;