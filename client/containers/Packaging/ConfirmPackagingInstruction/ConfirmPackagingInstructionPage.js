import React from 'react';

import ConfirmPackagingInstructionForm from './ConfirmPackagingInstructionForm';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
class ConfirmPackagingInstructionPage extends React.Component{

render(){
	return(
		<div className="wrapper">
		<Header />
		<ConfirmPackagingInstructionForm />
		<Footer />
		</div>
		)
}
}
export default ConfirmPackagingInstructionPage;