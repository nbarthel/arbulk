import React from 'react';
import ContainerQueueViewForm from './ContainerQueueViewForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import {createDataLoader} from 'react-loopback'
import { Base_Url} from '../../../constants/index.js'
import axios from 'axios'
var Loader = require('react-loader')
class ContainerQueueViewPage  extends React.Component{

    constructor(props){
        super(props)
        this.state = {
                      loaded : false
        }

    }
    componentWillMount(){
      debugger
        var seq = 0
        var CDView = createDataLoader(ContainerQueueViewPage, {
            queries:[{
                endpoint: 'TPackagingIntstructions',
                filter:{
                    include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                }
            }]
        })

        var base = "TContainerInternationals"
        this.url = CDView._buildUrl(base,{
            "include":["TCompany",{"relation":"TShipmentent" ,"scope":{"include" :["TCompany" ,{"relation":"TShipmentInternational" , "scope":{"include" : ["TContainerType","TSteamshipLine"]}}, "TLocation",{"relation" : "TShipmentLots" ,"scope":{"include" : ["TPackagingInstructionLots" ,{"relation":"TPackagingInstructions" , "scope":{"include":["TOrigin","TPalletType","TWrapType","TPackagingType"]}}]} }]}}],
            where:{isqueued : 1}

        })


        axios.get(this.url).then((response)=>{
            this.queuwViewData = response.data

            this.setState({
                queueData : this.queuwViewData,
                loaded : true
            })
        })

        console.log('queue view url' , this.url)

    }
    render(){
        return(
            <div className="wrapper-inner">
            <div className="content-inside">
            <Header routes = {this.props.routes}/>
            <Loader loaded = {this.state.loaded}>
                <ContainerQueueViewForm queueData = {this.state.queueData}/>
            </Loader>
                </div>
                <Footer />
            </div>
        );


    }
}
export default ContainerQueueViewPage;
