import React from 'react';
import RailcarArrivalEntryForm from './RailcarArrivalEntryForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback'
var Loader = require('react-loader');
export default class RailcarArrivalEntryPage extends React.Component {
    constructor(props){
      super(props);
      this.state = { loaded : false,
      weight: 'lbs'}
    }
     componentDidMount() {
console.log("hgdhdg",this.props.routes)
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
            "where" : {"railcar_status": {"neq":"ARRIVED"},"active":1}
        });

        console.log('sdsddsdsdsdsd' , this.url);

        $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);

                this.setState(
                    {
                        viewRailcartData : data,
                        loaded:true
                    }
                )
                console.log( '>>>>>>>>>>>>raillcart' , this.state.viewRailcartData)
            }.bind(this)

        })
        debugger
    }

    setWeight(value) {
        console.log("set Weight", value);
        this.setState({
            weight: value
        });
    }

    render() {
      const viewRailData = this.state.viewRailcartData
    return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header routes = {this.props.routes} setWeight={this.setWeight.bind(this)}/>
      <Loader loaded={this.state.loaded} id="loaded">
      <RailcarArrivalEntryForm key="0" data={viewRailData} weight={this.state.weight}/>
      </Loader>
      </div>
      <Footer />
      </div>
    );
  }
}
