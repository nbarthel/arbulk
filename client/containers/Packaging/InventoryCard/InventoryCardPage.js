import React from 'react';

import InventoryCardForm from './InventoryCardForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback';
class InventoryCardPage extends InventoryCardForm{
  constructor(props){
    super(props);
   
  }
componentDidMount(){
  
var InventView = createDataLoader(InventoryCardPage,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :["TShipmentLots"]}},{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props")
    //debugger
   
    var base = 'TPackagingInstructions'+'/'+this.props.params.id;
    this.url = InventView._buildUrl(base, {
      include: [{"relation":"TPackagingInstructionLots" ,"scope":{"include" :["TShipmentLots" ,"TShipmentInternational"]}},"TLocation","TCompany","TPackagingMaterial","TPalletType","TWrapType","TOrigin"]
    })
    console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")
     debugger
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('Invent>>>>>>>>>>>>>>>',data);
              this.setState({
                  viewData : [data],
                  lots : data.TPackagingInstructionLots,
                  LocationId : data.TLocation.id
                  })
               this.length = this.state.viewData.length
          }.bind(this)
          
        })
      
     }
   
	render(){
    let lots
    let length
    if(this.state.viewData != undefined){
      lots = this.state.viewData.TPackagingInstructionLots
      
    console.log(lots)
    }

    console.log("$$$$$$$$$$$$$",this.state.viewData,this.state.lots)
		return(
			<div className="wrapper">
			<div className="content-inside">
			<Header routes = {this.props.routes} />
			<InventoryCardForm length = {this.length}  id = {this.props.params.id} cId = {this.props.params.cID} lid={this.state.LocationId}	viewData = {this.state.viewData} lots = {this.state.lots} />
			</div>
			<Footer />
			</div>
			)
	}

}
export default InventoryCardPage;