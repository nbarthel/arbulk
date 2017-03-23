import React from 'react';
import ShipmentDetailsForm from './ShipmentDetailsForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createDataLoader } from 'react-loopback'
import axios from 'axios'
var Loader = require('react-loader')
class ShipmentDetailsPage  extends React.Component{
   constructor(props){
    super(props)
    this.state = { loaded : false}
    debugger
    this.id = this.props.params.id
    this.lotId = this.props.params.lotID
    console.log(this.lotId)
   }
  componentDidMount() {
           var SDview = createDataLoader(ShipmentDetailsPage,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TShipmentents'+'/'+this.id;
        if(parseInt(this.lotId)!=-1){
          this.url = SDview._buildUrl(base, {
                      "include" : ["TLocation" , "TCompany" ,"TShipmentAddress",{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine","TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots","TPackagingInstructions"],"where":{"piLotsId":this.lotId}}}]

          });
        }
        else{
          this.url = SDview._buildUrl(base, {
                      "include" : ["TLocation" , "TCompany" ,"TShipmentAddress",{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine","TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots","TPackagingInstructions"]}}]

          });
        }

        console.log('sdsddsdsdssdssssssssssd' , this.url);

        axios.get(this.url).then((response)=>{
          this.setState({
            allData : response.data
          })
        }).then((response)=>{
          debugger
          var id = this.state.allData.TShipmentLots[0].TPackagingInstructions.id
          console.log("ID",id)
          var Pbase = 'TPackagingInstructions'+'/'+id
          this.PUrl = SDview._buildUrl(Pbase,{
            "include" : ["TOrigin","TPalletType","TWrapType","TPackagingType"]
          });
          axios.get(this.PUrl).then((response)=>{
            console.log(response)
            this.setState({
              packData : response.data,
              loaded : true
            })
          })

        })
       //console.log(this.state.allData)
    }

    render(){
      if(this.state.allData !=  undefined){
        var isDomestic =  this.state.allData.isDomestic
      }
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header routes = {this.props.routes} />
            <Loader loaded={this.state.loaded}>
                <ShipmentDetailsForm lotId={this.lotId} data = {this.state.allData} id = {this.id} allocShipment = {this.props.params.isDomestic} isDomestic = {isDomestic} pckData = {this.state.packData}/>
            </Loader>
                </div>
           <Footer />
            </div>
        );


    }
}
export default ShipmentDetailsPage;
