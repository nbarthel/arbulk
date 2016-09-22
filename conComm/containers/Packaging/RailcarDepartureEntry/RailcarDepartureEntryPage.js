import React from 'react';
import RailcarDepartureEntryForm from './RailcarDepartureEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
export default class RailcarDepartureEntryPage extends React.Component {

  constructor(){
    super()
    this.state = {}

  }




  componentDidMount() {

    var PIview = createDataLoader(RailcarDepartureEntryForm, {
      queries: [{
        endpoint: 'TPackagingInstructionLots',
        filter: {
          include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}]
        }
      }]
    });
    var base = 'TPackagingInstructionLots';
    //TPackagingInstructionLots
    this.url = PIview._buildUrl(base, {
      include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}]


    });

    console.log('sdsddsdsdsdsd' , this.url);


    $.ajax({
      url: this.url,
      success:function(data){
        console.log('ajax ',data);

        this.setState(
            {
              viewRailcartData : data
            }
        )
        console.log( '>>>>>>>>>>>>raillcart' , this.state.viewRailcartData)
      }.bind(this)

    })

  }


  render() {
    const viewRailData = this.state.viewRailcartData
    return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header />
      <RailcarDepartureEntryForm key="0" data={viewRailData}/>
      </div>
      <Footer />
      </div>
    );
  }
}
