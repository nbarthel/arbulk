import React from 'react';
import ContainerViewForm from './ContainerViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ContainerViewPage  extends React.Component{
    render(){
        return(
            <div className="wrapper-inner">

            <Header routes = {this.props.routes}/>
                <ContainerViewForm/>

               <Footer/>
            </div>
        );


    }
}
export default ContainerViewPage;