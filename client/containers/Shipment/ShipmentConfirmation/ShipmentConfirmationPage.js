import React from 'react';
import ShipmentConfirmationForm from './ShipmentConfirmationForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback'
var Loader = require('react-loader');
//var shpData = require('./ShpmentViewData.json')
import ShipmentConfirmDomestic from './ShipmentConfirmDomestic'
class ShipmentConfirmationPage  extends React.Component{
    constructor(props){
        super(props);
      
        this.id = this.props.params.id
        this.state = {loaded : true,
        }
    }
    componentDidMount(){
        var PIview = createDataLoader(ShipmentConfirmationForm,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TShipmentents'+'/'+this.id;
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
                    "include" : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine","TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots"]}}]

        });
        console.log('sdsddsdsdssdssssssssssd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
               this.setState(
                   {
                       confirmData : data,
                        loaded : true
                   }
               )
               //console.log( this.state.xyz)
        }.bind(this)
        })
    }
    render(){
        console.log("confirmData",this.state.confirmData)
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
                <Header />
                <Loader loaded = {this.state.loaded}>
               {(this.state.confirmData === undefined) ? null : this.state.confirmData.isDomestic == 0 ? <ShipmentConfirmationForm data = {this.state.confirmData}/> : <ShipmentConfirmDomestic data = {this.state.confirmData}/>}
                </Loader>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ShipmentConfirmationPage;