import React from 'react';
import ShipmentEditForm from './ShipmentEditForm';
import InternationalShipementEdit from './InternationalShipementEdit'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback'
var Loader = require('react-loader');
class ShipmentEditPage  extends React.Component{
	constructor(props){
		super(props);
		 this.id = this.props.params.id
        this.state = {loaded : true,
        }
	}
     componentDidMount(){
        var PIview = createDataLoader(ShipmentEditPage,{
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
                    "include" : ["TLocation" , "TCompany" ,"TShipmentAddress",{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine","TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots","TPackagingInstructions"]}}]

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
    render(){
        return(
            <div className="wrapper">
            <Header routes = {this.props.routes}/>
              <Loader loaded = {this.state.loaded}>
                {this.state.editData != undefined ? (this.state.editData.isDomestic == 1 ? <ShipmentEditForm editData = {this.state.editData}/> : <InternationalShipementEdit editData = {this.state.editData}/>) : null}
                </Loader>
                <Footer />
            </div>
        );


    }
}
export default ShipmentEditPage;