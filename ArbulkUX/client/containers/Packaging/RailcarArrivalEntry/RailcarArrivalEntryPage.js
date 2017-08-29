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
        this.state = { loaded : false}
    }
    getLotsData(url){
        $.ajax({
            url: url,
            success:function(data){
                console.log('ajax lots data',data);
                if(data[0].TPackagingInstructions.TCompany){
                    this.setState({
                        viewRailcartData : data,
                        loaded:true
                    })
                }else {
                    this.getLotsData(url);

                }
            }.bind(this)

        })
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
            "where" : {"railcar_status": {"neq":"ARRIVED"},"active":1}
        });

        this.getLotsData(this.url);
    }

    render() {
        const viewRailData = this.state.viewRailcartData
        return (
            <div className="wrapper-inner">
                <div className="content-inside">
                    <Header routes = {this.props.routes}/>
                    <Loader loaded={this.state.loaded} id="loaded">
                        <RailcarArrivalEntryForm key="0" data={viewRailData}/>
                    </Loader>
                </div>
                <Footer />
            </div>
        );
    }
}
