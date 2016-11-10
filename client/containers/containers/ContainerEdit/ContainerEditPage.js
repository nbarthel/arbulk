import React, { Component } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import DomesticContainerEditForm from './DomesticContainerEditForm'
import { createDataLoader } from 'react-loopback';
import InternationalContainerEditForm from './InternationalContainerEditForm';
var Loader = require('react-loader')
 class ContainerEditPage extends Component {
 	constructor(props){
 		super(props);
 		this.state = {loaded : false}
 		this.id = this.props.params.id
 	}
 	componentDidMount() {
 	var CIview = createDataLoader(ContainerEditPage,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TShipmentents'+ '/' + this.id;
        //TPackagingInstructionLots
        this.url = CIview._buildUrl(base, {
             "include" : ["TContainerDomestic","TContainerInternational","TCompany" ,"TLocation","TShipmentDomestic",{"relation":"TShipmentInternational","scope":{"include":["TContainerType" , "TSteamshipLine"]}}]


        });
        console.log('sdsddsdsdssdssssssssssd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
               this.setState(
                   {
                       editData : data,
                       loaded : true
                   }
               )
               //console.log( this.state.xyz)
        }.bind(this)
        })
 	}
	render() {
		return (
			 <div className="wrapper-inner">
            <div className="content-inside">
            <Header />
             <Loader loaded={this.state.loaded}>
   {this.state.editData != undefined ? (this.state.editData.isDomestic == 1 ? <DomesticContainerEditForm editData = {this.state.editData}/> : <InternationalContainerEditForm editData = {this.state.editData}/>) : null} 
               </Loader>
                </div>

                <Footer />
            </div>
		);
	}
}
export default ContainerEditPage