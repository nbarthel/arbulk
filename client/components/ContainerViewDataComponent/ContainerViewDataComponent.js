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
import './js/tableHeadFixer.js';
import './js/tableHeadFixer';
import './js/jquery.dataTables.min.js';
import './js/jquery.dragtable.js';
import './stylesheet/dragtable.css';
import './js/jquery-sortable-min.js'
import './js/colResizable-1.6.min.js';
import './stylesheet/main.css';

//*import './stylesheet/jquery.dataTables.min.css'*/
var flagSorting = false;
var sortedData = [];
var Loader = require('react-loader');

class ContainerViewDataComponent extends React.Component{

    constructor(props){
        super(props);
        this.isAsc = false
        this.state = {
            loaded: false,
            headerArray: ["ARB", "Customer", "Release#", "Booking#","Container","Trucker","Arrived?","SteamShip Line","Type","Status","Shipment Type"]
            //viewData : shipmentViewData
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



    var base = 'TPackagingInstructions'+'/'+id;
    this.url = PIview._buildUrl(base, {
      include: ['TPackagingInstructionLots',"TLocation","TCompany"]
    })

      $.ajax({
            url: this.url,
            success:function(data){

              this.setState({
                  viewData : [data],
                  loaded:true
                })
                var tableData = JSON.parse(localStorage.getItem('conViewData'))
                if(tableData && tableData.length>0){
                  this.setState({
                      viewData : tableData
                    })
                  }
          }.bind(this)

        })

    }
   else {

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


               this.setState(
                   {
                       viewData : data,
                       loaded:true
                   }
               )
               var tableData = JSON.parse(localStorage.getItem('conViewData'))
               if(tableData && tableData.length>0){
                 this.setState({
                     viewData : tableData
                   })
                 }
        }.bind(this)
        })

     axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
      ;
    this.setState({
        queue_Sequence : response.data
    })
})


    }
  }
componentDidMount() {

    var ContainerState = this;
    $(function () {
        setTimeout(function () {
            //$("table").colResizable();
            $("#Packaging_Instruction_View").tableHeadFixer({'head': true});
            var oldIndex;
            $('.sorted_head tr').sortable({
                containerSelector: 'tr',
                itemSelector: 'th',
                vertical: false,
                exclude: ".exclude-drag",
                placeholder: '<th class="placeholder"/>',
                onDragStart: function ($item, container, _super) {
                    oldIndex = $item.index();
                    $item.appendTo($item.parent());
                    _super($item, container);
                },
                onDrop: function ($item, container, _super) {
                    var headerArray = ContainerState.state.headerArray;
                    var field, tmp,
                        newIndex = $item.index();
                    if (newIndex != oldIndex) {
                        let dragHeaderValue = headerArray.splice(oldIndex - 1, 1);
                        headerArray.splice(newIndex - 1, 0, dragHeaderValue[0]);
                    }

                    _super($item, container);
                    ContainerState.setState({
                        headerArray: headerArray
                    });
                }
            });
        }, 3000);

    });

}
checkclick(data , value)
{

    var queueArray = []
    this.qArray.push(value.id)
    localStorage.setItem('qArray',this.qArray)
    localStorage.setItem('queue_Sequence',this.state.queue_Sequence[0].max_mark)

}

onAscending(e,head){

  flagSorting = true;


var switchvalue = head;

                            switch(switchvalue) {
                            case 'po_number':
                           sortedData = _.sortBy(this.state.viewData, function(item) {
                            return item.releaseNumber.toLowerCase();
                           });

                             break;
                   case 'lot_number':
                     sortedData = _.sortBy(this.state.viewData, function(item) {
                     if(item.TContainerDomestic.length>0){
                       return item.TContainerDomestic[0].containerNumber.toLowerCase()
                     }
                     else if(item.TContainerInternational.length>0){
                       return item.TContainerInternational[0].containerNumber.toLowerCase()
                     }
                     });

                       break;
                               case 'railcar_number':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                    return item.TShipmentInternational[0].bookingNumber.toLowerCase()
                                  }
                                  else if(item.TShipmentDomestic.length>0){
                                    return item.TShipmentDomestic[0].bookingNumber.toLowerCase()
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
                                return item.TLocation.locationName.toLowerCase();
                                });

                      break;
                      case 'company':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return item.TCompany.name.toLowerCase();
                                });

                      break;
                      case 'Trucker':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TContainerDomestic.length>0){
                                    return item.TContainerDomestic[0].TCompany.name.toLowerCase()
                                  }
                                  else if(item.TContainerInternational.length>0){
                                    return item.TContainerInternational[0].TCompany.name.toLowerCase()
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

                                if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].TSteamshipLine.name.toLowerCase()
                                }
                                else if(item.TShipmentDomestic.length>0){
                                  return item
                                }
                                return item
                                });

                      break;
                      case 'Type':
                                sortedData = _.sortBy(this.state.viewData, function(item) {

                                if(item.TContainerInternational.length>0){
                                  return item.TShipmentInternational[0].TContainerType.name.toLowerCase()
                                }
                                else{
                                  return 'z'
                                }

                                });

                      break;
                      case 'status':
                                sortedData = _.sortBy(this.state.viewData, function(item) {

                                if(item.TContainerInternational.length>0){
                                  return item.TContainerInternational[0].status.toLowerCase()
                                }
                                else if(item.TContainerDomestic.length>0){
                                  return item.TContainerDomestic[0].status.toLowerCase()
                                }
                                return item
                                });

                      break;
                      case 'shipmentType':
                                sortedData = _.sortBy(this.state.viewData, function(item) {

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
localStorage.setItem('conViewData', JSON.stringify(sortedData));
}


onToggel(e ,elm){



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

        var dataState=this;
        var listData =  _.map(this.state.viewData,(view,index) => {
                if(view.isDomestic == 1){
                               if(view.TContainerDomestic && view.TContainerDomestic.length > 0){
                                 var bookingNumber = (view.TShipmentDomestic && view.TShipmentDomestic.length>0 )? view.TShipmentDomestic[0].bookingNumber : ''
                                 var count = index
                                   var shipType = view.isDomestic == 1 ? "DOMESTIC" : "INTERNATIONAL";

                                   var subheaderObj = {};
                                   subheaderObj["ARB"] = (
                                       <td  key="Arb" style={{display : this.props.showARB}}>
                                           <i className="fa fa-chevron-down"
                                              aria-hidden="false" data-target={count}
                                              onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                                       </td>);
                                   subheaderObj["Customer"] = (
                                       <td key ="Customer "style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</td>
                                   );
                                   subheaderObj["Release#"] = (
                                       <td key ="Release"  style={{display : this.props.showRelease}}></td>
                                   );
                                   subheaderObj["Booking#"] = (
                                       <td key ="Booking"style={{display : this.props.showBooking}}></td>
                                   );
                                   subheaderObj["Container"] = (
                                       <td key ="container" style={{display : this.props.showContainer}}></td>
                                   );
                                   subheaderObj["Trucker"] = (
                                       <td key="Trucker" style={{display : this.props.showTrucker}}></td>
                                   );
                                   subheaderObj["Arrived?"] = (
                                       <td key=" Arrived" style={{display : this.props.showArrived}}></td>
                                   );
                                   subheaderObj["SteamShip Line"] = (
                                       <td key="steam" style={{display : this.props.showSteamShip}}></td>
                                   );
                                   subheaderObj["Type"] = (
                                       <td key="type" style = {{display : this.props.showType}}></td>
                                   ); subheaderObj["Status"] = (
                                       <td key =" status"style = {{display : this.props.showType}}></td>
                                   ); subheaderObj["Shipment Type"] = (
                                       <td key ="shipment" style = {{display : this.props.showType}}></td>
                                   );

                                   return (
                                        <tbody key={index}>
                                        <tr className="base_bg clickable" ref="clickable" style={{"backgroundColor": "#e5e5ff"}}>

                                                <td>
                                                <label className="control control--checkbox">
                                                    <input type="checkbox" onChange={(e)=>{this.props.onCheckboxChange(e,view)}}
                                                           value={view.id} id={view.id}/>

                                                    <div className="control__indicator"></div>
                                                </label>
                                            </td>
                                            {dataState.state.headerArray.map(obj => {
                                                return subheaderObj[obj];
                                            })}

                                        </tr>
                                        {
                                        _.map(view.TContainerDomestic , (data ,index)=>{
                                          if(data.containerArrived == 1){
                                            var Arr = 'YES'
                                          } else{
                                            var Arr = 'NO'
                                          }

                                            var cellObj = {};
                                            cellObj["ARB"] = (
                                                <td key="Arb" style={{display : this.props.showARB}}></td>
                                            );
                                            cellObj["Customer"] = (
                                                <td key ="customer" style={{display : this.props.showCustomer}}></td>
                                            );
                                            cellObj["Release#"] = (
                                                <td key="Release" style={{display : this.props.showRelease}}>{view.releaseNumber} </td>
                                            );
                                            cellObj["Booking#"] = (
                                                <td key="Booking" style={{display : this.props.showBooking}}>{bookingNumber ? bookingNumber : 'N/A'}</td>
                                            );
                                            cellObj["Container"] = (
                                                <td key="container" style={{display : this.props.showContainer}}>{data.containerNumber}</td>
                                            );
                                            cellObj["Trucker"] = (
                                                <td key=" trucker" style={{display : this.props.showTrucker}}>{(view.TContainerDomestic && view.TContainerDomestic.length > 0)?(view.TContainerDomestic[index].TCompany?view.TContainerDomestic[index].TCompany.name:'') : "N/A"}</td>
                                            );
                                            cellObj["Arrived?"] = (
                                                <td key="Arrived" style={{display : this.props.showArrived}}>{Arr ? Arr : 'No'}</td>
                                            );
                                            cellObj["SteamShip Line"] = (
                                                <td style={{display : this.props.showSteamShip}}>{'N/A'}</td>
                                            );
                                            cellObj["Type"] = (
                                                <td key="Type" style={{display : this.props.showType}}>{'N/A'}</td>
                                            );
                                            cellObj["Status"] = (
                                               <td key="status" style={{display : this.props.showType}}>{(view.TContainerDomestic && view.TContainerDomestic.length > 0) ? (view.TContainerDomestic[index].status == null ? "ALLOCATED" : view.TContainerDomestic[index].status) : 'ALLOCATED'}</td>
                                            );
                                            cellObj["Shipment Type"] = (
                                            <td key="ship" style={{display : this.props.showType}}>{shipType}</td>
                                            );
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
                                                    {dataState.state.headerArray.map(obj => {
                                                        return cellObj[obj];
                                                    })}
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
                      var subheaderObj = {};
                      subheaderObj["ARB"] = (
                          <td key="arb" style={{display : this.props.showARB}}><i className="fa fa-chevron-down"
                                                                        aria-hidden="false" data-target={count}
                                                                        onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                          </td>);
                      subheaderObj["Customer"] = (
                          <td key="customer" style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</td>
                      );
                      subheaderObj["Release#"] = (
                          <td key="release" style={{display : this.props.showRelease}}></td>
                      );
                      subheaderObj["Booking#"] = (
                          <td key ="Booking"style={{display : this.props.showBooking}}></td>
                      );
                      subheaderObj["Container"] = (
                          <td key ="Container" style={{display : this.props.showContainer}}></td>
                      );
                      subheaderObj["Trucker"] = (
                          <td key ="Trucker" style={{display : this.props.showTrucker}}></td>
                      );
                      subheaderObj["Arrived?"] = (
                          <td key="Arrived" style={{display : this.props.showArrived}}></td>
                      );
                      subheaderObj["SteamShip Line"] = (
                          <td key=""style={{display : this.props.showSteamShip}}></td>
                      );
                      subheaderObj["Type"] = (
                          <td key="type"style = {{display : this.props.showType}}></td>
                      ); subheaderObj["Status"] = (
                          <td style = {{display : this.props.showType}}></td>
                      ); subheaderObj["Shipment Type"] = (
                          <td key="ship"style = {{display : this.props.showType}}></td>
                      );
                       return (
                           <tbody key={index}>
                           <tr className="base_bg clickable" ref="clickable" style={{"backgroundColor": "#e5e5ff"}}>
                               <td>
                                   <label className="control control--checkbox">
                                       <input type="checkbox" onChange={(e)=>{this.props.onCheckboxChange(e,view)}}
                                              value={view.id} id={view.id}/>

                                       <div className="control__indicator"></div>
                                   </label>
                               </td>

                               {dataState.state.headerArray.map(obj => {
                                   return subheaderObj[obj];
                               })}

                           </tr>
                           {
                          _.map(view.TContainerInternational , (data ,index)=>{

                             if(data.containerArrived == 1){
                                      var Arr = 'YES'
                                          } else{
                                            var Arr = 'NO'
                                          }
                              var cellObj = {};
                              cellObj["ARB"] = (
                                  <td key="ar"style={{display : this.props.showARB}}></td>
                              );
                              cellObj["Customer"] = (
                                  <td key="customer" style={{display : this.props.showCustomer}}></td>
                              );
                              cellObj["Release#"] = (
                                  <td key= "release" style={{display : this.props.showRelease}}>{view.releaseNumber} </td>
                              );
                              cellObj["Booking#"] = (
                                  <td key="booking"style={{display : this.props.showBooking}}>{bookingNumber ? bookingNumber : 'N/A'}</td>
                              );
                              cellObj["Container"] = (
                                  <td key ="container" style={{display : this.props.showContainer}}>{data.containerNumber}</td>
                              );
                              cellObj["Trucker"] = (
                                  <td key="trucker" style={{display : this.props.showTrucker}}>{(view.TContainerDomestic && view.TContainerDomestic.length > 0)?(view.TContainerDomestic[index].TCompany?view.TContainerDomestic[index].TCompany.name:'') : "N/A"}</td>
                              );
                              cellObj["Arrived?"] = (
                                  <td key="arrived" style={{display : this.props.showArrived}}>{Arr ? Arr : 'No'}</td>
                              );
                              cellObj["SteamShip Line"] = (
                                  <td key= "steamShip" style={{display : this.props.showSteamShip}}>{steamship ? steamship : 'N/A'}</td>
                              );
                              cellObj["Type"] = (
                                  <td key="type" style={{display : this.props.showType}}>{type}</td>
                              );
                              cellObj["Status"] = (
                                  <td key= "status" style={{display : this.props.showType}}>{(view.TContainerInternational && view.TContainerInternational.length > 0) ?
                                      (view.TContainerInternational[index].status == null ?"ALLOCATED" : view.TContainerInternational[index].status ): 'NA'}</td>
                              );
                              cellObj["Shipment Type"] = (
                                  <td key="shipType"style={{display : this.props.showType}}>{shipType}</td>
                              );
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

                                           {dataState.state.headerArray.map(obj => {
                                               return cellObj[obj];
                                           })}


                                       </tr>
                                   )
                               })

                           }

                           </tbody>
                       )
                   }

               }
            })

        listData = _.filter(listData, function (param) {
            return param !== undefined;
        });
var headerObj={};
        headerObj["ARB"]=( <th key="Arb" className="exclude-drag" style = {{display : this.props.showARB}} onClick={(e)=> this.onAscending(e,'location')}>ARB
                    <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                    </span>
        </th>);
        headerObj["Customer"]=(  <th key ="customer" style = {{display : this.props.showCustomer}} onClick={(e)=> this.onAscending(e,'company')}>Customer

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

        </th>);
        headerObj["Release#"] = (
            <th key ="Release#" style={{display : this.props.showRelease}} onClick={(e)=> this.onAscending(e,'po_number')}>Release#
                 <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>);
        headerObj["Booking#"] = (
            <th key ="Booking#" style={{display : this.props.showBooking}} onClick={(e)=> this.onAscending(e,'railcar_number')}>Booking#
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>);
        headerObj["Container"] = (
            <th key="Container" style={{display : this.props.showContainer}} onClick={(e)=> this.onAscending(e,'lot_number')}>Container#
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>);
        headerObj["Trucker"] = (
            <th key="Trucker" style ={{display : this.props.showTrucker}} onClick={(e)=> this.onAscending(e,'Trucker')}>Trucker
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>);
        headerObj["Arrived?"]=( <th  key ="Arrived" style ={{display : this.props.showArrived}} onClick={(e)=> this.onAscending(e,'Arrived')}>Arrived?
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
        </th>)
        headerObj["SteamShip Line"]=(
            <th key ="SteamShip" style ={{display : this.props.showSteamShip}} onClick={(e)=> this.onAscending(e,'SteamshipLine')}>Steamship Line
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Type"]=( <th key=" type" style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'Type')}>Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

        </th>);
        headerObj["Status"]=(<th key ="status" style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'status')}>Status
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

        </th>);
        headerObj["Shipment Type"]=(<th key="Shipment" style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'shipmentType')}>Shipment Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

        </th>);



        return(
            <Loader loaded={this.state.loaded}>
            <div className="loadedContentNew">
                <table id="Packaging_Instruction_View" className="table table-expandable table-striped sorted_head" cellSpacing="0" >
                    <thead className="table_head">
                    <tr className="sorting_head"  style={{"backgroundColor" : "#2e6da4"}}>
                        <th className="exclude-drag">

                        </th>
                        {this.state.headerArray.map(obj => {
                            return headerObj[obj];
                        })}
                        </tr>
                    </thead>
                    { ( listData == undefined || listData.length == 0)
                        ?
                        <tbody>
                        <tr>
                            <td colSpan="12" className="noresult">No results match your entered criteria.</td>
                        </tr>
                        </tbody> : listData
                    }
                </table>
                </div>
            </Loader>)
    }
}
export default ContainerViewDataComponent;
