import React from 'react';

import InventoryCardForm from './InventoryCardForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
class InventoryCardPage extends InventoryCardForm{

	render(){
		return(
			<div className="wrapper">
			<Header />
			<InventoryCardForm />
			<Footer />
			</div>
			)
	}

}
export default InventoryCardPage;