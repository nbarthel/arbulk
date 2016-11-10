import React from 'react';
/*import './stylesheet/jquery.dataTables.min.css';
import './js/jquery.dataTables.min.js';*/
import PackagingInstructionViewForm from './PackagingInstructionViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback'
import axios from 'axios';
var Loader = require('react-loader')
import '../../../public/stylesheets/style.css'
export default class PackagingInstructionViewPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      viewData : undefined,
      
    }
    
  }

  render() { 
    debugger
      console.log("ajx data>>>>>>>>>>",this.state.viewData)
    return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header />
      {this.props.params.id != undefined ? <PackagingInstructionViewForm id = {this.props.params.id}/> : <PackagingInstructionViewForm />}
		 </div>

		<Footer/>      
	     </div>
    );
  }
}
