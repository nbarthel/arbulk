/*TODO change service*/

var Loader = require('react-loader');
import React from 'react';

import ConfirmPackagingInstructionForm from './ConfirmPackagingInstructionForm';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback';
class ConfirmPackagingInstructionPage extends React.Component{
constructor(props){
super(props);
this.state = {loaded : false }
this.id = this.props.params.id
console.log("id>>>>>>>>>>>>>>>>>>.",this.props.params.id)
}
componentDidMount() {

        var PIview = createDataLoader(ConfirmPackagingInstructionPage, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter: {
                    include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany","TOrigin","TWrapType","TPalletType"]}}]
                }
            }]
        });
        var base = 'TPackagingInstructionLots'+'/'+this.id;
        this.url = PIview._buildUrl(base, {
            include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany","TOrigin","TWrapType","TPalletType"]}}]


        });


        console.log('sdsddsdsdsdsd' , this.url);


        $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);

                this.setState(
                    {
                        viewConfirmData : data,
                        loaded:true
                    }
                )
                console.log( '>>>>>>>>>>>>ConfirmData' , this.state.viewConfirmData)
            }.bind(this)

        })
}
render(){
	console.log("xyz>>>>>>>>>>>",this.state.viewConfirmData)
	return(
		<div className="wrapper-inner">
		<div className="content-inside">
		<Header />
        <Loader loaded={this.state.loaded}>
		{this.state.viewConfirmData === undefined ? null : <ConfirmPackagingInstructionForm data={this.state.viewConfirmData} id={this.props.params.id}/>}
		</Loader>
        </div>
		<Footer />
		</div>
		)
}
}
export default ConfirmPackagingInstructionPage;