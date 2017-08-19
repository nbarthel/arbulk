import React from 'react';
/*import '../../public/stylesheets/bootstrap.min.css';
import '../../public/stylesheets/style.css';*/
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContainerDetailsForm from './ContainerDetailsForm';
import {Base_Url} from '../../../constants';
import { createDataLoader } from 'react-loopback';
import axios from 'axios'
var Loader = require('react-loader')
class ContainerDetailsPage  extends React.Component{

 constructor(props){
     super(props)
     this.conatinerObj = {}
     this.state = {loaded:false}
 }


    componentDidMount(){


      this.containerId= this.props.params.id
        this.type = this.props.params.isDomestic
        var CDView = createDataLoader(ContainerDetailsPage, {
            queries:[{
                endpoint: 'TPackagingIntstructions',
                filter:{
                    include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        if(this.type == 1){
        var base = "TContainerDomestics" + '/' + this.containerId
            this.url = CDView._buildUrl(base,{
                "include": {"relation":"TShipmentent" ,"scope":{"include" :["TCompany" ,{"relation" : "TShipmentDomestic" , "scope" : {"include" : "TPaymentType"}},"TShipmentAddress", "TLocation",{"relation" : "TShipmentLots" ,"scope":{"include" : ["TPackagingInstructionLots" ,{"relation":"TPackagingInstructions" , "scope":{"include":["TOrigin","TPalletType","TWrapType","TPackagingType","TPackagingMaterial"]}}]} }]}}
            })
            console.log(this.url)
        }
        else if(this.type == 0){
            var base = "TContainerInternationals" +'/'+this.containerId
            this.url = CDView._buildUrl(base,{
            "include":{"relation":"TShipmentent" ,"scope":{"include" :["TCompany" ,{"relation":"TShipmentInternational" , "scope":{"include" : ["TContainerType","TSteamshipLine"]}}, "TLocation",{"relation" : "TShipmentLots" ,"scope":{"include" : ["TPackagingInstructionLots" ,{"relation":"TPackagingInstructions" , "scope":{"include":["TOrigin","TPalletType","TWrapType","TPackagingType","TPackagingMaterial"]}}]} }]}}
            })
            console.log(this.url)
        }

        axios.get(this.url).then((response)=>{

            this.setState({
                result : response.data,
                loaded:true
            })

        })

    }
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header routes = {this.props.routes}/>
            <Loader loaded={this.state.loaded}>
                <ContainerDetailsForm isDomestic={this.type}  shipID = {(this.state.result && this.state.result.TShipmentent )?this.state.result.TShipmentent.id : undefined}   containerTable ={this.state.result} containerId ={this.containerId} isDomestic = {this.props.params.isDomestic}/>
            </Loader>
          </div>

                <Footer />
            </div>
        );


    }
}
export default ContainerDetailsPage;
