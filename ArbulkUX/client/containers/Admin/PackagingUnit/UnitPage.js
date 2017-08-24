/**
 * Created by kailash on 24/8/17.
 */
/**
 * Created by kailash on 24/8/17.
 */

import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import PackagingForm from './packagingForm';
import  UnitList from './UnitList';
import axios from 'axios';
import { Base_Url } from '../../../constants'

class UnitPage  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            wraps : []
        }

    }
    componentDidMount() {
        axios.get(Base_Url+"TPackagingTypes?filter=%7B%22where%22%3A%7B%22active%22%3A1%7D%7D").then((response)=>{
            this.setState({
                wraps : response.data
            })
        })

    }
    render(){
        return(
            <div className="wrapper-inner">
                <div className="content-inside">
                    <AdminHeader routes = {this.props.routes}/>
                    <PackagingForm/>
                </div>
                <UnitList wraps={this.state.wraps}/>
                <Footer />
            </div>
        );
    }
}
export default UnitPage;
