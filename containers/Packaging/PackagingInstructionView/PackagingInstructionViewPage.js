import React from 'react';
import './stylesheet/jquery.dataTables.min.css';
import './js/jquery.dataTables.min.js';
import PackagingInstructionViewForm from './PackagingInstructionViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
export default class PackagingInstructionViewPage extends React.Component {
  

  render() {
    return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header />
      <PackagingInstructionViewForm />
		</div>
		<Footer/>      
	     </div>
    );
  }
}
