/**
 * Created by manoj on 8/8/17.
 */

import React from 'react';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import PalletForm from './PalletForm';
import PalletList from './PalletList';
import axios from 'axios';
import { Base_Url } from '../../../constants'

class palletView  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pallets : []
        }

    }
    componentDidMount() {
        axios.get(Base_Url+"TPalletTypes/?filter=%7B%22where%22%3A%7B%22active%22%3A1%7D%7D").then((response)=>{
            this.setState({
                pallets : response.data
            })
        })

    }
    render(){
        return(
            <div className="wrapper-inner">
                <div className="content-inside">
                    <AdminHeader routes = {this.props.routes}/>
                    <PalletForm />
                </div>
            <PalletList pallets = {this.state.pallets}/>
                <Footer />
            </div>
        );
    }
}
export default palletView;
