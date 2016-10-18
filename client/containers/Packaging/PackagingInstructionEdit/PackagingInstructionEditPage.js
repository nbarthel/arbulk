import React from 'react';
import PackagingInstructionEditForm from './PackagingInstructionEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class PackagingInstructionEditPage extends React.Component{

	render(){
		return(
		<div className="wrapper">
		<Header />
		<PackagingInstructionEditForm />
		<Footer />
		</div>
			)
	}
}

export default PackagingInstructionEditPage;