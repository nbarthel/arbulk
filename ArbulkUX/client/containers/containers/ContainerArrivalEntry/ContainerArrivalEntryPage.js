import React from 'react';
import ContainerArrivalEntryForm from './ContainerArrivalEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ContainerArrivalEntryPage  extends React.Component{

    componentWillMount(){
        debugger;
        if(this.props.params) {
            this.params = this.props.params
        }
        else{
            this.params = undefined
        }

    }


    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header routes = {this.props.routes}/>
                <ContainerArrivalEntryForm paramsValue = {this.params}/>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ContainerArrivalEntryPage;