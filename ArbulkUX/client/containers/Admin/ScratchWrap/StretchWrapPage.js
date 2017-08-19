/**
 * Created by manoj on 8/8/17.
 */
/**
 * Created by manoj on 8/8/17.
 */

import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import StretchWrapFrom from './StretchWrapFrom';
import  StretchWrapList from './StretchWrapList';
import axios from 'axios';
import { Base_Url } from '../../../constants'

class StretchWrapPage  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            wraps : []
        }

    }
    componentDidMount() {
        axios.get(Base_Url+"TWrapTypes?filter=%7B%22where%22%3A%7B%22activee%22%3A1%7D%7D").then((response)=>{
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
                    <StretchWrapFrom/>
                </div>
                <StretchWrapList wraps={this.state.wraps}/>
                <Footer />
            </div>
        );
    }
}
export default StretchWrapPage;
