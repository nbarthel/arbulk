/**
 * Created by Anurag on 15-09-2016.
 */
'use strict';

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
//import PackagingInstructionViewForm from '../../containers/Packaging/PackagingInstructionView/PackagingInstructionViewForm';
import HeadBody from './HeadBody';
import NestedRows from './NestedRows'
import request from '../../utils/request';
import { Base_Url } from '../../constants'
var moment = require('moment');
import './js/tableHeadFixer.js'
//*import './stylesheet/jquery.dataTables.min.css'*/
var flagSorting = false
var sortedData = []
var Loader = require('react-loader');

class ContainerViewDataComponent extends React.Component{

    constructor(props){
        super(props);
        this.isAsc = false
        this.state = {
        loaded : false
        }

        this.PIData = { }
        this.myObj = { }
        this.qArray = []
        this.checkclick = this.checkclick.bind(this);
        //this.onAscending = this.onAscending.bind(this)
        this.onToggel = this.onToggel.bind(this)
        this.onClickRow = this.onClickRow.bind(this)
      }
componentWillMount(){
   let id = this.props.id
      if(this.props.id != undefined){
        var PIview = createDataLoader(ContainerViewDataComponent,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props")
    //debugger

    var base = 'TPackagingInstructions'+'/'+id;
    this.url = PIview._buildUrl(base, {
      include: ['TPackagingInstructionLots',"TLocation","TCompany"]
    })
    console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")

      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
              this.setState({
                  viewData : [data],
                  loaded:true
                })
          }.bind(this)

        })

    }
   else {
    debugger
  var PIview = createDataLoader(ContainerViewDataComponent,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TShipmentents';
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
             "include" : [
               {"relation":"TContainerDomestic" ,
                            "scope":{"include" : "TCompany"}},
                {"relation":"TContainerInternational" ,
                            "scope":{"include" : "TCompany"}},
                "TCompany" ,
                "TLocation",
                "TShipmentDomestic",
                {"relation":"TShipmentInternational" ,
                            "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]


        });

      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
               this.setState(
                   {
                       viewData : data,
                       loaded:true
                   }
               )
               //console.log( this.state.xyz)
        }.bind(this)
        })

     axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    debugger;
    this.setState({
        queue_Sequence : response.data
    })
})


    }
  }
componentDidMount() {
  $(function () {
    setTimeout(function(){debugger;$("#Packaging_Instruction_View").tableHeadFixer({'head' : true})}, 1000);
      //$(".Packaging_Instruction_View").tableHeadFixer({'head' : true});
  });
}
checkclick(data , value)
{
    debugger;
    var queueArray = []
    this.qArray.push(value.id)
    localStorage.setItem('qArray',this.qArray)
    localStorage.setItem('queue_Sequence',this.state.queue_Sequence[0].max_mark)

}

onAscending(e,head){
  debugger
  flagSorting = true;


var switchvalue = head;

                            switch(switchvalue) {
                            case 'po_number':
                           sortedData = _.sortBy(this.state.viewData, function(item) {
                            return item.releaseNumber;
                           });

                             break;
                   case 'lot_number':
                     sortedData = _.sortBy(this.state.viewData, function(item) {
                     if(item.TContainerDomestic.length>0){
                       return item.TContainerDomestic[0].containerNumber
                     }
                     else if(item.TContainerInternational.length>0){
                       return item.TContainerInternational[0].containerNumber
                     }
                     });

                       break;
                               case 'railcar_number':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                    return item.TShipmentInternational[0].bookingNumber
                                  }
                                  else if(item.TShipmentDomestic.length>0){
                                    return item.TShipmentDomestic[0].bookingNumber
                                  }
                                });

                      break;
                       case 'weight':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].weight : '');
                                });

                      break;
                      case 'location':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return item.TLocation.locationName;
                                });

                      break;
                      case 'company':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return item.TCompany.name;
                                });

                      break;
                      case 'Trucker':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TContainerDomestic.length>0){
                                    return item.TContainerDomestic[0].TCompany.name
                                  }
                                  else if(item.TContainerInternational.length>0){
                                    return item.TContainerInternational[0].TCompany.name
                                  }
                                  else{
                                    return item
                                  }


                                });
                      break;
                      case 'Arrived':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                if(item.TContainerDomestic.length>0){
                                return item.TContainerDomestic[0].containerArrived
                              }
                              else if(item.TContainerInternational.length>0){
                                return item.TContainerInternational[0].containerArrived
                              }
                              else{
                                return item
                              }
                                });

                      break;//view.TShipmentInternational[0].TSteamshipLine
                      case 'SteamshipLine':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  debugger
                                if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].TSteamshipLine.name
                                }
                                else if(item.TShipmentDomestic.length>0){
                                  return item
                                }
                                return item
                                });

                      break;
                      case 'Type':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  debugger
                                if(item.TContainerInternational.length>0){
                                  return item.TContainerInternational[0].staus
                                }
                                else{
                                  return item
                                }

                                });

                      break;
                      case 'status':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  debugger
                                if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].TSteamshipLine.name
                                }
                                else if(item.TShipmentDomestic.length>0){
                                  return item
                                }
                                return item
                                });

                      break;
                      case 'shipmentType':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  debugger
                                if(item.isDomestic==1){
                                  return item
                                }
                              });

                      break;
    default:
        this.state.viewData
}

if(this.isAsc == false)
{
  this.isAsc = true;
}
else{
  sortedData = sortedData.reverse()
  this.isAsc = false;
}
this.setState({
     viewData  : sortedData
             })
}


onToggel(e ,elm){
console.log('>>>>>>' , $(elm))

  debugger;
  $( "button" ).click(function() {
  $( "p" ).slideToggle( "slow" );
});
}

onClickRow(e){

           var rowObj = $(this.refs.clickable)
            //var aa= rowObj.attr('data-target')
            var aa = e.target.getAttribute('data-target')
            //$('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')


      if($('#Packaging_Instruction_View').find('.'+aa).length > 2)
      {
        $('#Packaging_Instruction_View').find('.'+aa).each(function(index){
           $('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')


        })
      }

        else if($('#Packaging_Instruction_View').find('.'+aa).length ==2)
{
        for(var i in $('#Packaging_Instruction_View').find('.'+aa))
        {

         $('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')
             }
         }
         else{
           $('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')
         }
 }



    render(){
        debugger;
        var filterData
        if(!flagSorting){
        filterData = this.props.filterData

         if(filterData.constructor === Array)
         {
         this.state.viewData = filterData
         }
       }
       else{
         filterData = sortedData

         flagSorting =false
       }

        var selectedWeight = this.props.weight;

        debugger
        console.log("<<<<<^^>>>>>",this.state.viewData)

        var listData =  _.map(this.state.viewData,(view,index) => {
                if(view.isDomestic == 1){
                               if(view.TContainerDomestic && view.TContainerDomestic.length > 0){
                                 var bookingNumber = (view.TShipmentDomestic && view.TShipmentDomestic.length>0 )? view.TShipmentDomestic[0].bookingNumber : ''
                                 var count = index
                                   var shipType = view.isDomestic == 1 ? "DOMESTIC" : "INTERNATIONAL"
                                   return (
                                        <tbody key={index}>
                                        <tr className="base_bg clickable" ref="clickable" style={{"backgroundColor": "#e5e5ff"}}>
                                            {
                                                <th>
                                                <label className="control control--checkbox">
                                                    <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                                           value={view.id} id={view.id}/>

                                                    <div className="control__indicator"></div>
                                                </label>
                                            </th>
                                            }
                                            <th style={{display : this.props.showARB}}><i className="fa fa-chevron-down"
                                                                                          aria-hidden="false" data-target={count}
                                                                                          onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                                            </th>
                                            <th style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</th>
                                            <th style={{display : this.props.showRelease}}></th>
                                            <th style={{display : this.props.showBooking}}></th>
                                            <th style={{display : this.props.showContainer}}></th>
                                            <th style={{display : this.props.showTrucker}}></th>
                                            <th style={{display : this.props.showArrived}}></th>
                                            <th style={{display : this.props.showSteamShip}}></th>
                                            <th style = {{display : this.props.showType}}></th>
                                            <td style={{display : this.props.showType}}></td>
                                            <td style={{display : this.props.showType}}></td>

                                        </tr>
                                        {
                                        _.map(view.TContainerDomestic , (data ,index)=>{
                                          if(data.containerArrived == 1){
                                            var Arr = 'YES'
                                          } else{
                                            var Arr = 'NO'
                                          }
                                            return(
                                                <tr key={index} className={count}>
                                                  <td>
                                                        <label className="control control--checkbox">
                                                            <input type="checkbox" onClick={(e) => this.checkclick(e,view)}
                                                                   onChange={(e)=>{this.props.onCheckboxChange(e,view,data)}} value={view.id}
                                                                   id={''}/>

                                                            <div className="control__indicator"></div>
                                                        </label>
                                                    </td>
                                                    <td style={{display : this.props.showARB}}></td>
                                                    <td style={{display : this.props.showCustomer}}></td>
                                                    <td style={{display : this.props.showRelease}}>{view.releaseNumber} </td>
                                                    <td style={{display : this.props.showBooking}}>{bookingNumber ? bookingNumber : 'N/A'}</td>
                                                    <td style={{display : this.props.showContainer}}>{data.containerNumber}</td>
                                                    <td style={{display : this.props.showTrucker}}>{(view.TContainerDomestic && view.TContainerDomestic.length > 0)?(view.TContainerDomestic[index].TCompany?view.TContainerDomestic[index].TCompany.name:'') : "N/A"}</td>
                                                    <td style={{display : this.props.showArrived}}>{Arr ? Arr : 'No'}</td>
                                                    <td style={{display : this.props.showSteamShip}}>{'N/A'}</td>
                                                    <td style={{display : this.props.showType}}>{'N/A'}</td>
                                                    <td style={{display : this.props.showType}}>{(view.TContainerDomestic && view.TContainerDomestic.length > 0) ? (view.TContainerDomestic[index].status == null ? "ALLOCATED" : view.TContainerDomestic[index].status) : 'ALLOCATED'}</td>
                                                    <td style={{display : this.props.showType}}>{shipType}</td>

                                                </tr>
                                            )
                                        })

                                        }


                                        </tbody>
                                 )}
                              }
                  else if(view.isDomestic == 0){
                  if(view.TContainerInternational && view.TContainerInternational.length > 0) {
                  var shipType = view.isDomestic == 0 ? "INTERNATIONAL" : "DOMESTIC"
                  var bookingNumber = (view.TShipmentInternational && view.TShipmentInternational.length>0)? view.TShipmentInternational[0].bookingNumber : 'NA'
                  var type = (view.TShipmentInternational && view.TShipmentInternational.length > 0 && view.TShipmentInternational[0].TContainerType) ? view.TShipmentInternational[0].TContainerType.name:'N/A'
                  var steamship = (view.TShipmentInternational && view.TShipmentInternational.length > 0 && view.TShipmentInternational[0].TSteamshipLine)? view.TShipmentInternational[0].TSteamshipLine.name : 'N/A'
                  var count = index
                       return (
                           <tbody key={index}>
                           <tr className="base_bg clickable" ref="clickable" style={{"backgroundColor": "#e5e5ff"}}>
                               <th>
                                   <label className="control control--checkbox">
                                       <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                              value={view.id} id={view.id}/>

                                       <div className="control__indicator"></div>
                                   </label>
                               </th>
                               <th style={{display : this.props.showARB}}><i className="fa fa-chevron-down"
                                                                             aria-hidden="false" data-target={count}
                                                                             onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                               </th>
                               <th style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</th>
                               <th style={{display : this.props.showRelease}}></th>
                               <th style={{display : this.props.showBooking}}></th>
                               <th style={{display : this.props.showContainer}}></th>
                               <th style={{display : this.props.showTrucker}}></th>
                               <th style={{display : this.props.showArrived}}></th>
                               <th style={{display : this.props.showSteamShip}}></th>
                               <th style = {{display : this.props.showType}}></th>
                               <td style={{display : this.props.showType}}></td>
                               <td style={{display : this.props.showType}}></td>

                           </tr>
                           {
                          _.map(view.TContainerInternational , (data ,index)=>{
                            debugger
                             if(data.containerArrived == 1){
                                      var Arr = 'YES'
                                          } else{
                                            var Arr = 'NO'
                                          }

                                   return(
                                       <tr key={index} className={count}>
                                           <td>
                                               <label className="control control--checkbox">
                                                   <input type="checkbox" onClick={(e) => this.checkclick(e,view)}
                                                          onChange={(e)=>{this.props.onCheckboxChange(e,view,data)}} value={view.id}
                                                          id={''}/>

                                                   <div className="control__indicator"></div>
                                               </label>
                                           </td>
                                           <td style={{display : this.props.showARB}}></td>
                                           <td style={{display : this.props.showCustomer}}></td>
                                           <td style={{display : this.props.showRelease}}>{view.releaseNumber} </td>
                                           <td style={{display : this.props.showBooking}}>{bookingNumber ? bookingNumber : 'N/A'}</td>
                                           <td style={{display : this.props.showContainer}}>{data.containerNumber}</td>
                                           <td style={{display : this.props.showTrucker}}>{(view.TContainerInternational && view.TContainerInternational.length > 0) ? (view.TContainerInternational[index].TCompany ? view.TContainerInternational[index].TCompany.name:'') : "N/A"}</td>
                                           <td style={{display : this.props.showArrived}}>{Arr ? Arr : 'No'}</td>
                                           <td style={{display : this.props.showSteamShip}}>{steamship ? steamship : 'N/A'}</td>
                                           <td style={{display : this.props.showType}}>{type}</td>
                                           <td style={{display : this.props.showType}}>{(view.TContainerInternational && view.TContainerInternational.length > 0) ? (view.TContainerInternational[index].status == null ?"ALLOCATED" : view.TContainerInternational[index].status ): 'NA'}</td>
                                           <td style={{display : this.props.showType}}>{shipType}</td>



                                       </tr>
                                   )
                               })

                           }

                           </tbody>


                       )
                   }

               }

            })


        return(
            <Loader loaded={this.state.loaded}>
                <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0" >
                    <thead className="table_head">
                    <tr className="sorting_head"  style={{"backgroundColor" : "#2e6da4"}}>
                        <th>

                        </th>
                        <th style = {{display : this.props.showARB}} onClick={(e)=> this.onAscending(e,'location')}>ARB
                    <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                    </span>
                        </th>
                        <th style = {{display : this.props.showCustomer}} onClick={(e)=> this.onAscending(e,'company')}>Customer

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showRelease}} onClick={(e)=> this.onAscending(e,'po_number')}>Release#
                 <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
                        </th>
                        <th style ={{display : this.props.showBooking}} onClick={(e)=> this.onAscending(e,'railcar_number')}>Booking#
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
                        </th>
                        <th style ={{display : this.props.showContainer}} onClick={(e)=> this.onAscending(e,'lot_number')}>Container#
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showTrucker}} onClick={(e)=> this.onAscending(e,'Trucker')}>Trucker
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showArrived}} onClick={(e)=> this.onAscending(e,'Arrived')}>Arrived?
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
                        </th>
                        <th style ={{display : this.props.showSteamShip}} onClick={(e)=> this.onAscending(e,'SteamshipLine')}>Steamship Line
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'Type')}>Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'status')}>Status
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'shipmentType')}>Shipment Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>

                    </tr>
                    </thead>
                    {listData}
                </table>
            </Loader>)
    }
}
export default ContainerViewDataComponent;
