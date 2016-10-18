import React from 'react';
import RailcarDepartureEntryForm from './RailcarDepartureEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
export default class RailcarDepartureEntryPage extends React.Component {
 
  render() {
    return (
      <div className="wrapper">
      <Header />
      <RailcarDepartureEntryForm />
      <Footer />
      </div>
    );
  }
}
