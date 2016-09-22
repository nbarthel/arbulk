import React from 'react';

import PackagingInstructionQueueViewForm from './PackagingInstructionQueueViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
class PackagingInstructionQueueViewPage extends React.Component{

    constructor(){
        super()
        this.state = {}

    }




    componentDidMount() {

        var PIview = createDataLoader(PackagingInstructionQueueViewForm, {
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




    render(){



   const viewRailQueue = this.state.viewRailcartData
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
                <PackagingInstructionQueueViewForm key="0" data={viewRailQueue}/>
                </div>
                <Footer/>
                </div>
        );


    }
}
export default PackagingInstructionQueueViewPage;