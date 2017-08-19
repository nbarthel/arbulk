import React from 'react';
import ModifyUserForm from './ModifyUserForm';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import axios from 'axios'
import { Base_Url } from '../../../constants'
class ModifyUserPage  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
        
    }
    componentDidMount() {
        axios.get(Base_Url+"TUsers").then((response)=>{
            this.setState({
                users : response.data
            })       
         })
        
    }
    render(){
        return(
                <div className="wrapper-inner">
    			  <div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
                <ModifyUserForm userData = {this.state.users}/>
              </div>
                <Footer />
            </div>
        );


    }
}
export default ModifyUserPage;