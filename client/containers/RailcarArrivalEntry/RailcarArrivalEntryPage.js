import React from 'react';
import RailcarArrivalEntryForm from './RailcarArrivalEntryForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default class RailcarArrivalEntryPage extends React.Component {
   
    render() {
    return (
      <div className="wrapper">
      <Header />
      <RailcarArrivalEntryForm />
      <Footer />
      </div>
    );
  }
}
