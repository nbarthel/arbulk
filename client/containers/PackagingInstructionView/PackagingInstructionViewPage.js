import React from 'react';
import PackagingInstructionViewForm from './PackagingInstructionViewForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default class PackagingInstructionViewPage extends React.Component {
  

  render() {
    return (
      <div className="wrapper">
      <Header />
      <PackagingInstructionViewForm />
		<Footer/>      
	     </div>
    );
  }
}
