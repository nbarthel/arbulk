import React from 'react';
import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
 export default class EnterPackagingInstructionPage extends React.Component {
    render() {
          return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header />
      <EnterPackagingInstructionForm/>
     	</div>
      <Footer />
      </div>

    );
  }
}
