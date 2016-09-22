import React from 'react';
import PackagingInstructionEditForm from './PackagingInstructionEditForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class PackagingInstructionEditPage extends React.Component{

	render(){
		return(
		<div className="wrapper-inner">
		<div className="content-inside">
		<Header />
		<PackagingInstructionEditForm />
		</div>
		<Footer />
		</div>
			)
	}
}

export default PackagingInstructionEditPage;