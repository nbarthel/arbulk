import React from 'react';
import RailcarArrivalEntryForm from './RailcarArrivalEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
export default class RailcarArrivalEntryPage extends React.Component {
    constructor(props){
      super(props);
      this.state = { }
    }
     componentDidMount() {

        var PIview = createDataLoader(RailcarArrivalEntryForm, {
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
            include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}],
            "where" : {"railcar_status": {"neq":"ARRIVED"}
          }
        });

        console.log('sdsddsdsdsdsd' , this.url);
        debugger

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
        debugger
    }

    render() {
      const viewRailData = this.state.viewRailcartData
    return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header routes = {this.props.routes}/>
      <RailcarArrivalEntryForm key="0" data={viewRailData}/>
      </div>
      <Footer />
      </div>
    );
  }
}
