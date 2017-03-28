import React, { Component } from 'react';
import { createDataLoader } from 'react-loopback'
import axios from 'axios'
import _ from 'lodash'
class ContainerSummaryComponent extends Component {
    constructor(props){
        super(props);
        this.shipmentId = null
        this.CSummaryTable
        this.allocatedTruckersTable
        this.arrivedTruckersTable
        this.notArrivedTruckersTable
        this.state = {

        }
        this.arrivedTruckers = []
        this.notArrivedTruckers = []
        this.allocatedTruckers = []
        this.unAllocatedContainers = 0
        this.allocatedContainers = 0
        this.arrivedContainers = 0
        this.notArrivedContainers = 0
    }
    componentWillReceiveProps(nextProps) {
            if(nextProps.SId != null){
                    this.shipmentId = nextProps.SId


                               var CSView = createDataLoader(ContainerSummaryComponent,{
                              queries:[{
                                endpoint: 'TPackagingInstructions',
                                filter: {
                                  include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                                }
                              }]
                            })
                               var base = "TShipmentents" + '/' + this.shipmentId
                               this.url = CSView._buildUrl(base,{
                                "include" : [{"relation": "TContainerAllocation","scope":{"relation":"TCompany" , "scope":{"where" : {"type":"TRUCKER"}}}},{"relation": "TContainerDomestic","scope":{"include":["TCompany","TContainerLoad"]}},{"relation": "TContainerInternational","scope":{"include":["TCompany","TContainerLoad"]}}]
                               })
                               console.log(this.url)
                               axios.get(this.url).then((response)=>{
                                this.setState({
                                    CSummaryData : response.data
                                })
                               })
            }            }
	render() {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" , this.arrivedTruckersList)
        this.arrivedLength = (this.arrivedTruckersList && this.arrivedTruckersList.length > 0) ? this.arrivedTruckersList.length : 0
        this.allocatedTruckersTable
        this.arrivedTruckersTable
        this.notArrivedTruckersTable
        this.arrivedTruckers = []
        this.notArrivedTruckers = []
        this.allocatedTruckers = []
        this.unAllocatedContainers = 0
        this.allocatedContainers = 0
        this.arrivedContainers = 0
        this.notArrivedContainers = 0
        console.log("props" , this.props.allocated)
        if(this.props.SId != null){
            console.log("CSUMMDATA",this.state.CSummaryData)
            if(this.state.CSummaryData != undefined && (this.state.CSummaryData.TContainerDomestic.length == 0 || this.state.CSummaryData.TContainerInternational.length ==0) ){
                this.unAllocatedContainers = this.state.CSummaryData.numberOfContainers
            }

            if(this.state.CSummaryData != undefined && (this.state.CSummaryData.TContainerDomestic.length != 0 || this.state.CSummaryData.TContainerInternational.length != 0 || this.props.allocatedTruckers.length > 0 || this.state.CSummaryData.TContainerAllocation.length>0)){
                if(this.props.isDomestic == 0) {
                   // this.unAllocatedContainers = this.state.CSummaryData.numberOfContainers - this.state.CSummaryData.TContainerInternational.length
                    this.truckerCount = _.toArray(_.countBy(this.state.CSummaryData.TContainerInternational, 'truckerId'))
                    this.sortedTruckerList = _.sortBy(this.state.CSummaryData.TContainerInternational, 'truckerId')
                    console.log("sorted", this.sortedTruckerList)
                    for (var k = 0; k < this.sortedTruckerList.length; k++) {
                        if (this.sortedTruckerList[k].containerArrived == 0) {
                            this.notArrivedTruckers.push(this.sortedTruckerList[k])
                        }
                        else if (this.sortedTruckerList[k].containerArrived == 1) {
                            this.arrivedTruckers.push(this.sortedTruckerList[k])
                        }
                    }
                    this.arrivedTruckersCount = _.toArray(_.countBy(this.arrivedTruckers, 'truckerId'))
                    this.notArrivedTruckersCount = _.toArray(_.countBy(this.notArrivedTruckers, 'truckerId'))
                    this.notArrivedTruckersList = _.uniqBy(this.notArrivedTruckers, 'truckerId')
                    this.arrivedTruckersList = _.uniqBy(this.arrivedTruckers, 'truckerId')
                    console.log(this.notArrivedTruckers)
                    this.allocatedTruckers = _.uniqBy(this.sortedTruckerList, 'truckerId')


                    if (this.state.CSummaryData && this.state.CSummaryData.TContainerInternational && this.state.CSummaryData.TContainerInternational.length > 0) {

                        this.LoadedTruckerList = _.map(this.state.CSummaryData.TContainerInternational, (contLoaded, loadedIndex) => {
                            return (<tr key={loadedIndex}>
                                    <td>{contLoaded.status}</td>
                                    <td>{contLoaded.TCompany.name}</td>
                                    <td>{1}</td>
                                    <td>{contLoaded.containerNumber}</td>
                                    <td>{contLoaded.chasisNumber}</td>
                                    <td>{contLoaded.sealNumber}</td>
                                    <td>{contLoaded.TContainerLoad.length == 1 ? contLoaded.TContainerLoad[0].noOfBags : (contLoaded.TContainerLoad.length == 2 ? (parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ) : (contLoaded.TContainerLoad.length == 3) ? (parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ) + +parseInt(contLoaded.TContainerLoad[2].noOfBags) : (contLoaded.TContainerLoad.length == 4) ? (parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ) + parseInt(contLoaded.TContainerLoad[2].noOfBags) + parseInt(contLoaded.TContainerLoad[3].noOfBags) : '')}</td>
                                    <td>{contLoaded.TContainerLoad.length == 1 ? contLoaded.TContainerLoad[0].weight : (contLoaded.TContainerLoad.length == 2 ? (parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ) : (contLoaded.TContainerLoad.length == 3) ? (parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ) + +parseInt(contLoaded.TContainerLoad[2].weight) : (contLoaded.TContainerLoad.length == 4) ? (parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ) + parseInt(contLoaded.TContainerLoad[2].weight) + parseInt(contLoaded.TContainerLoad[3].weight) : '')}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }


                    if (this.notArrivedTruckersList.length > 0) {
                      this.arr = ["anurag"]
                        this.notArrivedTruckersTable = _.map(this.arr, (notArr, index) => {
                            return (<tr key={index}>
                                <td>NOT ARRIVED</td>
                                <td></td>
                                <td>{this.unAllocatedContainers - this.arrivedTruckersCount}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>)
                        })
                    }




                    // if (this.arrivedTruckersList.length > 0) {
                    //     this.arrivedTruckersTable = _.map(this.arrivedTruckersList, (arrTr, index) => {
                    //         return ( <tr key={index}>
                    //             <td>ARRIVED</td>
                    //             <td>{arrTr.TCompany.name}</td>
                    //             <td>{this.arrivedTruckersCount[index]}</td>
                    //             <td></td>
                    //             <td></td>
                    //             <td></td>
                    //             <td></td>
                    //             <td></td>
                    //
                    //         </tr>)
                    //     })
                    // }


                    if (this.props.allocatedTruckers.length == 0) {
   console.log("alloctrucker", this.props.allocatedTruckers);
   this.allocTruckers = []
                        // if (this.state.CSummaryData != undefined && this.state.CSummaryData.TContainerAllocation.length > 0) {
                        //       this.allocTruckers = _.map(this.state.CSummaryData.TContainerAllocation, (allocTruck, index)=> {
                        //         return (<tr>
                        //                 <td ></td>
                        //                 <td></td>
                        //                 <td></td>
                        //               <td></td>
                        //                 <td></td>
                        //                 <td></td>
                        //                 <td></td>
                        //                 <td></td>
                        //
                        //             </tr>
                        //         )
                        //     })
                        // }
                    }
                    else if (this.props.allocatedTruckers.length > 0) {

                        this.state.CSummaryData.TContainerAllocation = []

                            console.log("alloctrucker" , this.props.allocatedTruckers)
                            this.allocatedTruckersTable = _.map(this.props.allocatedTruckers,(allocTable,index) => {
                                return(<tr key = {allocTable.truckerId} >
                                    <td >ALLOCATED</td>
                                    <td>{allocTable.truckerName}</td>
                                    <td>{allocTable.noOfContainer}</td>
                                  <td><a style={{display : this.props.hide ==1 ? "block" : "none"}} href="javascript:void(0)"><i onClick={this.props.deleteClick} value={index} className="fa fa-times" aria-hidden="true"></i></a></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                </tr>)
                            })

                    }


                }
                else {
                   //  this.unAllocatedContainers = this.state.CSummaryData.numberOfContainers - this.state.CSummaryData.TContainerDomestic.length
                       this.truckerCount =_.toArray(_.countBy(this.state.CSummaryData.TContainerDomestic,'truckerId'))
                        this.sortedTruckerList = _.sortBy(this.state.CSummaryData.TContainerDomestic,'truckerId')
                          console.log("sorted",this.sortedTruckerList)
                        for(var k = 0; k < this.sortedTruckerList.length; k++){
                          debugger
                            if(this.sortedTruckerList[k].containerArrived == 0){
                                this.notArrivedTruckers.push(this.sortedTruckerList[k])
                            }
                            else if(this.sortedTruckerList[k].containerArrived == 1){
                                this.arrivedTruckers.push(this.sortedTruckerList[k])
                            }
                        }
                        this.arrivedTruckersCount = _.toArray(_.countBy(this.arrivedTruckers,'truckerId'))
                        this.notArrivedTruckersCount = _.toArray(_.countBy(this.notArrivedTruckers,'truckerId'))
                        this.notArrivedTruckersList = _.uniqBy(this.notArrivedTruckers,'truckerId')
                        this.arrivedTruckersList = _.uniqBy(this.arrivedTruckers,'truckerId')
                        console.log(this.notArrivedTruckers)
                        this.allocatedTruckers = _.uniqBy(this.sortedTruckerList,'truckerId')

                        console.log(this.allocatedTruckers,this.truckerCount)
                       if(this.state.CSummaryData && this.state.CSummaryData.TContainerDomestic && this.state.CSummaryData.TContainerDomestic.length > 0)
                    {
                      //  this.LoadedTruckerList = _.map(this.sortedTruckerList,(loadedArr,index) => {
                        var addBags = []
                        var addWeight = []

                      for(var z in this.state.CSummaryData.TContainerDomestic.TContainerLoad){
                          addBags.push(this.state.CSummaryData.TContainerDomestic.TContainerLoad[z].noOfBags)
                          addWeight.push(this.state.CSummaryData.TContainerDomestic.TContainerLoad[z].weight)
                      }
                        console.log("addBags" , addBags)
                        console.log("addBags" , addWeight)
                         //   if(loadedArr.containerLoaded == 1 || loadedArr.containerInTransit == 1 || loadedArr.containerDelivered == 1){
                            this.LoadedTruckerList =    _.map(this.state.CSummaryData.TContainerDomestic,(contLoaded,loadedIndex) => {
                                        return (<tr key = {loadedIndex}>
                                                <td>{contLoaded.status}</td>
                                                <td>{contLoaded.TCompany.name}</td>
                                                <td>{1}</td>
                                                <td>{contLoaded.containerNumber}</td>
                                                <td>{contLoaded.chasisNumber}</td>
                                                <td>{contLoaded.sealNumber}</td>
                                                <td>{contLoaded.TContainerLoad.length==1 ?contLoaded.TContainerLoad[0].noOfBags : (contLoaded.TContainerLoad.length ==2 ? (parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ): (contLoaded.TContainerLoad.length ==3)?(parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ) + + parseInt(contLoaded.TContainerLoad[2].noOfBags) :(contLoaded.TContainerLoad.length ==4)?(parseInt(contLoaded.TContainerLoad[0].noOfBags) + parseInt(contLoaded.TContainerLoad[1].noOfBags) ) + parseInt(contLoaded.TContainerLoad[2].noOfBags)  + parseInt(contLoaded.TContainerLoad[3].noOfBags) :'')}</td>
                                                <td>{contLoaded.TContainerLoad.length==1 ?contLoaded.TContainerLoad[0].weight : (contLoaded.TContainerLoad.length ==2 ? (parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ): (contLoaded.TContainerLoad.length ==3)?(parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ) + + parseInt(contLoaded.TContainerLoad[2].weight) :(contLoaded.TContainerLoad.length ==4)?(parseInt(contLoaded.TContainerLoad[0].weight) + parseInt(contLoaded.TContainerLoad[1].weight) ) + parseInt(contLoaded.TContainerLoad[2].weight)  + parseInt(contLoaded.TContainerLoad[3].weight) :'')}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })

                            //}
                       // })
                    }

                        if(this.notArrivedTruckersList.length > 0){
                          this.arr = ["anurag"]
                          this.notArrivedTruckersTable = _.map(this.arr,(notArr,index) => {
                                                    return(<tr key = {index}>
                                                                                                  <td>NOT ARRIVED</td>
                                                                                                 <td></td>
                                                                                                  <td>{this.unAllocatedContainers - this.arrivedTruckersCount}</td>
                                                                                                  <td></td>
                                                                                                  <td></td>
                                                                                                  <td></td>
                                                                                                  <td></td>
                                                                                                  <td></td>

                                                                                                  </tr>)
                                                })}

  // if(this.arrivedTruckersList.length > 0){this.arrivedTruckersTable = _.map(this.arrivedTruckersList,(arrTr,index) => {
  //                                                  return( <tr key = {index}>
  //                                                                                                                            <td>ARRIVED</td>
  //                                                                                                                            <td>{arrTr.TCompany.name}</td>
  //                                                                                                                            <td>{this.arrivedTruckersCount[index]}</td>
  //                                                                                                                            <td></td>
  //                                                                                                                            <td></td>
  //                                                                                                                            <td></td>
  //                                                                                                                            <td></td>
  //                                                                                                                            <td></td>
  //
  //                                                                                                                            </tr>)
  //                                               })}
                    if (this.props.allocatedTruckers.length == 0) {

                        if (this.state.CSummaryData != undefined && this.state.CSummaryData.TContainerAllocation.length > 0) {
                            this.allocTruckers = _.map(this.state.CSummaryData.TContainerAllocation, (allocTruck, index)=> {
                                return (<tr >
                                        <td ></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                )
                            })
                        }
                    }
                    else if (this.props.allocatedTruckers.length > 0) {

                        this.state.CSummaryData.TContainerAllocation = []

                        console.log("alloctrucker" , this.props.allocatedTruckers)
                        this.allocatedTruckersTable = _.map(this.props.allocatedTruckers,(allocTable,index) => {
                            return(<tr key = {allocTable.truckerId}>
                                <td >ALLOCATED</td>
                                <td>{allocTable.truckerName}</td>
                                <td>{allocTable.noOfContainer}</td>
                                <td><a onClick={this.props.deleteClick}   style={{display : this.props.hide ==1 ? "block" : "none"}}   href="javascript:void(0)"><i  value={index} className="fa fa-times" aria-hidden="true"></i></a></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>)
                        })

                    }
                }

            }
        }
		return (
			  <table className="table table-striped">
                                            <thead className="base_bg">
                                            <tr >
                                                <th>Status</th>
                                                <th>Trucker</th>
                                                <th># of Containers</th>
                                                <th>Container #</th>
                                                <th>Chassis #</th>
                                                <th>Seal #</th>
                                                <th># of Bags</th>
                                                <th>Weight</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                          <td>UNALLOCATED</td>
                                            <td></td>
                                            <td style={{display :(this.props.allocated > 0) ?'block' : 'none' }}>{parseInt(this.unAllocatedContainers) - parseInt(this.props.allocated) }</td>
                                            <td style={{display :(this.props.allocated == 0) ? 'block' : 'none' }}>{(this.props.total !=undefined && this.props.total !=0) ? (parseInt(this.unAllocatedContainers)-parseInt(this.props.total)):parseInt(this.unAllocatedContainers) - parseInt(this.props.allocated) }</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                            </tr>
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                            {(this.allocatedTruckersTable  && this.props.allocatedTruckers.length >0 ) ? this.allocatedTruckersTable :  ''}
                                            {(this.allocTruckers && this.props.allocatedTruckers.length >0) ? this.allocTruckers :  ''}
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                            {this.notArrivedTruckersTable ? this.notArrivedTruckersTable : <tr>
                                                                          <td>NOT ARRIVED</td>
                                                                          <td></td>
                                                                          <td>{(this.arrivedLength && this.arrivedLength >0) ? parseInt(this.unAllocatedContainers) - parseInt(this.arrivedLength) : this.unAllocatedContainers}</td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>

                                                                          </tr>}
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                            {(this.props.CSummaryData && (this.props.CSummaryData.TContainerDomestic || this.props.CSummaryData.TContainerInternational) && (this.props.CSummaryData.TContainerDomestic.length == 0 && this.props.CSummaryData.TContainerInternational.length == 0)) ? <tr>
                                                                          <td>ARRIVED</td>
                                                                          <td></td>
                                                                          <td>0</td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>
                                                                          <td></td>

                                                                          </tr> : ''}
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                            {this.LoadedTruckerList}
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                            {this.InTransitTruckerList}
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>

                                            </tr>
                                          {this.deliveredTruckerList}
                                            </tbody>
                                        </table>
		);
	}
}
export default ContainerSummaryComponent
