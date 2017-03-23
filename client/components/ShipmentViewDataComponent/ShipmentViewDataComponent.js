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
//import "./ShpmentViewData.json"
import './js/tableHeadFixer';
/*import './stylesheet/jquery.dataTables.min.css'*/
var Loader = require('react-loader');
var sortedDataflag = false
var sortedData = []
var flagSorting = false
class ShipmentViewDataComponent extends React.Component{

    constructor(props){
        super(props);
        this.isAsc = false
        this.state = {
         loaded : false ,
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
        var PIview = createDataLoader(ShipmentViewDataComponent,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props")
    //

    var base = 'TPackagingInstructions'+'/'+id;
    this.url = PIview._buildUrl(base, {
      include: ['TPackagingInstructionLots',"TLocation","TCompany"]
    })
    console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")

      $.ajax({
            url: this.url,
            success:function(data){
              this.setState({
                  viewData : [data],
                  loaded:true
                })
              var tableData = JSON.parse(localStorage.getItem('siViewData'))
              if(tableData && tableData.length>0){
                this.setState({
                    viewData : tableData
                  })
                }
          }.bind(this)

        })

   axios.get(Base_Url+"TShipmentLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
})




    }
   else {

  var PIview = createDataLoader(ShipmentViewDataComponent,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',
                   {"relation":"TPackagingInstructions",
                               "scope":{"include":
                                       ["TLocation"]
                                       }
                  }]
        }
      }]
    })
       var base = 'TShipmentents';

        this.url = PIview._buildUrl(base, {
                    "include" : ["TLocation" ,"TContainerAllocation","TCompany",

                                 {"relation" : "TContainerDomestic",
                                               "scope":{"include" : "TCompany"}
                                 },

                                {"relation" : "TContainerInternational",
                                              "scope":{"include" : "TCompany"}
                                },

                                {
                                  "relation" :"TShipmentDomestic",
                                              "scope":{
                                                        "include":["TShipmentType"],
                                                        "where":{"active":"1"}
                                                      }
                                },

                                {
                                  "relation" :"TShipmentInternational",
                                  "scope":{
                                            "include":["TSteamshipLine" ,"TContainerType"],
                                            "where":{"active":"1"}
                                          }
                                },

                                {"relation" : "TShipmentLots" ,
                                              "scope":{
                                                        "include":["TPackagingInstructionLots","TPackagingInstructions"],
                                                        "where":{"active":"1"}
                                                    }
                                }],
        });

      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
                for(var i in data){
                  if(data[i].TShipmentInternational && data[i].TShipmentInternational.length==0 && data[i].TShipmentDomestic.length==0){
                    data.splice(i,1)
                  }
                }
               this.setState(
                   {
                       viewData : data,
                       loaded:true
                   }
               )
               var tableData = JSON.parse(localStorage.getItem('siViewData'))
               if(tableData && tableData.length>0){
                 this.setState({
                     viewData : tableData
                   })
                 }
        }.bind(this)
        })

     axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
})
    }
  }
  componentDidMount() {
    $(function () {
      setTimeout(function(){ ;$("#Packaging_Instruction_View").tableHeadFixer({'head' : true})}, 2000);
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
  sortedDataflag = true;
  flagSorting = true;
  var switchvalue = head;

                            switch(switchvalue) {
                            case 'po_number':
                             sortedData = _.sortBy(this.state.viewData, function(item) {
                             if(item.TShipmentLots && item.TShipmentLots.length >0 && item.TShipmentLots[0].TPackagingInstructions){
                               return item.TShipmentLots[0].TPackagingInstructions.po_number.toLowerCase();
                             }
                             return 'z'

                           });
                             break;
                    case 'Release':
                      sortedData = _.sortBy(this.state.viewData, function(item) {
                      if(item.releaseNumber){
                        return item.releaseNumber.toLowerCase();
                      }

                    });
                      break;
                   case 'lot_number':
                   debugger
                     sortedData = _.sortBy(this.state.viewData, function(item) {
                     return ( item.TShipmentLots.length>0 ? (item.TShipmentLots[0].TPackagingInstructionLots? item.TShipmentLots[0].TPackagingInstructionLots.lot_number.toLowerCase() : 'z'):'z');
                     });
                       break;
                               case 'railcar_number':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return (item.TShipmentLots.length>0?(item.TShipmentLots[0].TPackagingInstructionLots? item.TShipmentLots[0].TPackagingInstructionLots.railcar_number.toLowerCase() : 'z'):'z');
                                });
                      break;
                       case 'weight':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                return (item.TShipmentLots.length>0?(item.TShipmentLots[0].TPackagingInstructionLots? item.TShipmentLots[0].TPackagingInstructionLots.weight : '0'):'0');
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
                      case 'Booking':
                               sortedData = _.sortBy(this.state.viewData, function(item){
                                 if(item.isDomestic==0 && item.TShipmentInternational && item.TShipmentInternational.length>0){
                                   return item.TShipmentInternational[0].bookingNumber.toLowerCase()
                                 }
                                 else if(item.TShipmentDomestic && item.TShipmentDomestic.length>0){
                                   return item.TShipmentDomestic[0].bookingNumber.toLowerCase()
                                 }
                               })
                      break;
                      case 'ShipmentType':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.isDomestic==1){
                                    return item
                                  }
                                });
                      break;
                      case 'Material':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentLots.length>0 && item.TShipmentLots[0].TPackagingInstructions!=undefined){
                                  return item.TShipmentLots[0].TPackagingInstructions.material.toLowerCase()
                                }
                                });
                      break;
                      case 'Confmd':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational && item.TShipmentInternational.length > 0){
                                    //if(item.TShipmentInternational[0].status == "CONFIRMED"){
                                      return item.TShipmentInternational[0].status.toLowerCase()
                                    //}
                                }
                                else if(item.TShipmentDomestic && item.TShipmentDomestic.length > 0){
                                  //if(item.TShipmentDomestic[0].status == "CONFIRMED"){
                                    return item.TShipmentDomestic[0].status.toLowerCase()
                                  //}
                              }
                              return item;
                                });
                      break;
                      case 'Forwarder':
                                sortedData = _.sortBy(this.state.viewData, function(item) {

                                  if(item.TShipmentInternational && item.TShipmentInternational.length > 0){
                                      return item.TShipmentInternational[0].freightForwarder.toLowerCase()
                                }
                              return item;
                                });
                      break;
                      case 'CntrSize':
                                sortedData = _.sortBy(this.state.viewData, function(item) {

                                  if(item.TShipmentInternational.length > 0 && item.TShipmentInternational[0].TContainerType){
                                      return item.TShipmentInternational[0].TContainerType.name.toLowerCase()
                                }
                              return item;
                                });
                      break;
                      case 'Qty':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  return item.numberOfContainers
                                });
                      break;
                      case 'Allocated':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TContainerAllocation.length>0){
                                    return item.TContainerAllocation[0]
                                  }
                                });
                      break;
                      case 'Enough':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  var total = 0
                                  for (var i=0;i<item.TContainerAllocation.length;i++){
                                    total = total+ item.TContainerAllocation[i].noOfContainer
                                  }
                                  if(total == item.numberOfContainers){
                                    return item
                                  }
                                });
                      break;
                      case 'bags':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  data.noOfBags
                                  if(item.TShipmentLots.length>0){
                                    return item.TShipmentLots[0].noOfBags
                                  }

                                });
                      break;
                      case 'ERD':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].earliestReturnDate
                                }
                                });
                      break;
                      case 'cuttOff':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].cargoCutoffDate
                                }
                                });
                      break;
                      case 'Vessel':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].steamshipVessel.toLowerCase()
                                }
                                });
                      break;
                      case 'SteamshipLine':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                    return item.TShipmentInternational[0].TSteamshipLine.name
                                  }
                                  else if(item.TShipmentDomestic.length>0){
                                    return item
                                  }
                                  return item
                                });
                      break;
                      case 'PULocation':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].containerPickupLocation.toLowerCase()
                                }
                                });
                      break;
                      case 'ReturnLocation':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].containerReturnLocation.toLowerCase()
                                }
                                });
                      break;
                      case 'DocsCutoff':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].docCutoffDate
                                }
                                });
                      case 'Status':
                                sortedData = _.sortBy(this.state.viewData, function(item) {
                                  if(item.TShipmentInternational.length>0){
                                  return item.TShipmentInternational[0].status.toLowerCase()
                                }
                                else if(item.TShipmentDomestic.length>0){
                                return item.TShipmentDomestic[0].status.toLowerCase()
                              }
                              else{
                                return item
                              }
                                });
                      break;
    default:
        sortedData = _.sortBy(this.state.viewData, function(item) {
                return item.id
        });
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
localStorage.setItem('siViewData', JSON.stringify(sortedData));
}

onToggel(e ,elm){
console.log('>>>>>>' , $(elm))

   ;
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
 allValuesSame(arr) {

    for(var i = 1; i < arr.length; i++)
    {
        if(arr[i] !== arr[0])
            return false;
    }

    return true;
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

      console.log("<<<<<^^>>>>>",this.state.viewData)
      // const data = this.state.xyz
      var listData =  _.map(this.state.viewData,(view,index)=>{
        if( sortedDataflag || (view.TShipmentInternational!=undefined&&view.TShipmentInternational.length>0) || (view.TShipmentInternational!=undefined&&view.TShipmentDomestic.length>0)){
        var alloc = "No"
        var count = index

        if(view.TContainerAllocation && view.TContainerAllocation.length > 0){
          alloc = "Yes"
        }
        var eno = 'N/A'
       if(view.TContainerAllocation && view.TContainerAllocation.length > 0){
       var containerCount = 0
       for(var i = 0; i < view.TContainerAllocation.length ; i++){
         containerCount = containerCount + view.TContainerAllocation[i].noOfContainer
       }
         if(containerCount == view.numberOfContainers){

           eno = "YES"
         }else{
           eno = "NO"
         }
       }
      var count = index
      debugger
      if(view.TShipmentLots.length>0){


      return (
       <tbody key={index} >
       <tr  className="base_bg clickable" ref ="clickable" style={{"backgroundColor": "#e5e5ff"}}>
            <th>
               <label className="control control--checkbox">
                   <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}} value={view.id}  id={view.id}/><div className="control__indicator"></div>
               </label>
           </th>
           <th style ={{display : this.props.showARB}}> <i className="fa fa-chevron-down" aria-hidden="false" data-target ={count}  onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''} </th>
           <th style ={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</th>
           <th style ={{display : this.props.showRelease}}>{view.releaseNumber ? view.releaseNumber : ''}</th>
           <th style ={{display : this.props.showShipmentType}}>{view.isDomestic == 1 ? 'DOMESTIC' : 'INTERNATIONAL'}</th>
           <th style ={{display : this.props.showBooking}}></th>
           <th style ={{display : this.props.showPO}}></th>
           <th style ={{display : this.props.showLot}}></th>
           <th style ={{display : this.props.showMaterial}}></th>
           <th style ={{display : this.props.showConfmd}}></th>
           <th style ={{display : this.props.showForwarder}}></th>
           <th style ={{display : this.props.showCntrSize}}></th>
           <th style ={{display : this.props.showQty}}></th>
           <th style ={{display :this.props.showAlloc}}></th>
           <th style ={{display : this.props.showEno}}></th>
           <th style ={{display : this.props.showBags}}></th>
           <th style ={{display : this.props.showInInvt}}></th>
           <th style ={{display : this.props.showERD}}></th>
           <th style ={{display : this.props.showCutoff}}></th>
           <th style ={{display : this.props.showVessel}}></th>
           <th style ={{display : this.props.showSteamShip}}></th>
           <th style ={{display : this.props.showPU}}></th>
           <th style ={{display : this.props.showRet}}></th>
           <th style ={{display : this.props.showDoc}}></th>
           <th style ={{display : this.props.showStatus}}></th>
           <th style ={{display : this.props.showTrucker}}></th>

       </tr>
       <tr>
       <td></td>
       <td style ={{display : this.props.showARB}}></td>
       <td style ={{display : this.props.showCustomer}}></td>
       <td style ={{display : this.props.showRelease}}></td>
       <td style ={{display : this.props.showShipmentType}}></td>
       <td style ={{display : this.props.showBooking}}></td>
       <td style ={{display : this.props.showPO}}></td>
       <td style ={{display : this.props.showLot}}></td>
       <td style ={{display : this.props.showMaterial}}></td>
       <td style ={{display : this.props.showConfmd}}></td>
       <td style ={{display : this.props.showForwarder}}></td>
       <td style ={{display : this.props.showCntrSize}}></td>
       <td style ={{display : this.props.showQty}}></td>
       <td style ={{display :this.props.showAlloc}}></td>
       <td style ={{display : this.props.showEno}}></td>
       <td style ={{display : this.props.showBags}}></td>
       <td style ={{display : this.props.showInInvt}}></td>
       <td style ={{display : this.props.showERD}}></td>
       <td style ={{display : this.props.showCutoff}}></td>
       <td style ={{display : this.props.showVessel}}></td>
       <td style ={{display : this.props.showSteamShip}}></td>
       <td style ={{display : this.props.showPU}}></td>
       <td style ={{display : this.props.showRet}}></td>
       <td style ={{display : this.props.showDoc}}></td>
       <td style ={{display : this.props.showStatus}}></td>
       <td style ={{display : this.props.showTrucker}}></td>

       </tr>

       {

          _.map(view.TShipmentLots,(data,index)=>{
            debugger
            if( sortedDataflag || (view.TShipmentInternational!=undefined&&view.TShipmentInternational.length>0) || (view.TShipmentInternational!=undefined&&view.TShipmentDomestic.length>0)){
            this.statusArray = []
            if(view.TContainerDomestic && view.TContainerDomestic.length > 0){
                for(var k in view.TContainerDomestic){
                  this.statusArray.push(view.TContainerDomestic.status)
                }
            }
            else if(view.TContainerInternational && view.TContainerInternational.length > 0){
              for(var k in view.TContainerDomestic){
                this.statusArray.push(view.TContainerInternational.status)
              }
            }

              this.sameValue = this.allValuesSame(this.statusArray)

                   if(view.isDomestic == 0){
                    var vessel = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].steamshipVessel :''
                    var freightForwarder = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].freightForwarder : ''
                    var erd = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].earliestReturnDate).format("MM-DD-YYYY") : ''
                    var cutOff = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY HH:MM") : ''
                    var puLocation = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].containerPickupLocation : ''
                    var returnLocation = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].containerReturnLocation : ''
                    var docCutoff = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].docCutoffDate).format("MM-DD-YYY HH:MM") : ''
                    var steamShipline = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].TSteamshipLine.name : ''
                    var status = (view.TShipmentInternational && view.TShipmentInternational.length > 0 ) ?view.TShipmentInternational[0].status : 'NA'
                    var CType = ((view.TShipmentInternational && view.TShipmentInternational.length > 0) ? (view.TShipmentInternational[0].TContainerType ? view.TShipmentInternational[0].TContainerType.name : "N/A"):"N/A")
                    var confd = (view.TShipmentInternational && view.TShipmentInternational.length > 0)? (view.TShipmentInternational[0].status == "UNCONFIRMED" ? "NO" : "YES"):"NO"


                  }
                  else if(view.isDomestic == 1){
                    var status = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0 ) ?view.TShipmentDomestic[0].status : 'NA'
                    var confd = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0)? (view.TShipmentDomestic[0].status == "UNCONFIRMED" ? "NO" : "YES"):"NO"

                  }
           return(
                   <tr key={index} className ={count}>
                   <td>
                   <label className="control control--checkbox">
                   <input type="checkbox"  onClick={(e) => this.checkclick(e,data)} id = {data.TPackagingInstructionLots ? data.TPackagingInstructionLots.id : ''} value = {view.id}  onChange={(e)=>{this.props.checkboxChange(e,view,data)}} /><div className="control__indicator"></div>
                   </label>
                   </td>
                   <td style ={{display : this.props.showARB}}> </td>
                   <td style ={{display : this.props.showCustomer}}> </td>
                   <td style ={{display : this.props.showRelease}}> </td>
                   <td style ={{display : this.props.showShipmentType}}>{}</td>
                   <td style ={{display : this.props.showBooking}}>{(view.isDomestic == 1 && view.TShipmentDomestic && view.TShipmentDomestic.length>0)?view.TShipmentDomestic[0].bookingNumber :((view.TShipmentInternational && view.TShipmentInternational.length>0) ?view.TShipmentInternational[0].bookingNumber : '')}</td>
                   <td style ={{display : this.props.showPO}}>{data.TPackagingInstructions ? data.TPackagingInstructions.po_number : 'N/A'}</td>
                   <td style ={{display : this.props.showLot}}>{data.TPackagingInstructionLots.length != 0 ? data.TPackagingInstructionLots.lot_number : 'N/A'}</td>
                   <td style ={{display : this.props.showMaterial}}>{data.TPackagingInstructions ? data.TPackagingInstructions.material : ''}</td>
                   <td style ={{display : this.props.showConfmd}}>{confd ? confd : "NO"}</td>
                   <td style ={{display : this.props.showForwarder}}>{view.isDomestic ==1 ? 'N/A' : freightForwarder}</td>
                   <td style ={{display : this.props.showCntrSize}}>{CType ? CType : "N/A"}</td>
                   <td style ={{display : this.props.showQty}}>{view.numberOfContainers ? view.numberOfContainers : ''}</td>
                   <td style ={{display : this.props.showAlloc}}>{alloc ? alloc : "N/A"}</td>
                   <td style ={{display : this.props.showEno}}>{eno}</td>
                   <td style ={{display : this.props.showBags}}>{data.noOfBags ? data.noOfBags : ''}</td>
                  {/*<td style ={{display : this.props.showInInvt}}>{}</td>*/}
                   <td style ={{display : this.props.showERD}}>{view.isDomestic == 1 ? 'N/A' : erd}</td>
                   <td style ={{display : this.props.showCutoff}}>{view.isDomestic == 1 ? 'N/A' : cutOff}</td>
                   <td style ={{display : this.props.showVessel}}>{view.isDomestic == 1 ? 'N/A' : vessel}</td>
                   <td style ={{display : this.props.showSteamShip}}>{view.isDomestic == 1 ? 'N/A' : steamShipline}</td>
                   <td style ={{display : this.props.showPU}}>{view.isDomestic == 1 ? 'N/A' : puLocation}</td>
                   <td style ={{display : this.props.showRet}}>{view.isDomestic == 1 ? 'N/A' : returnLocation}</td>
                   <td style ={{display : this.props.showDoc}}>{view.isDomestic == 1 ? 'N/A' : docCutoff}</td>
                   <td style ={{display : this.props.showStatus}}>{status== null? "UNCONFIRMED" :status}</td>
                  { /*<td style ={{display : this.props.showTrucker}}>N/A</td>*/}

                   </tr>
                  )
            }}
         )

    }

       </tbody>


    )}}
  }
  )
 return(
 <Loader loaded={this.state.loaded}>
 <div className="loadedContentNew">
 <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0" >
             <thead className="table_head header-fixed header">
           <tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}}>
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
               <th style = {{display : this.props.showRelease}} onClick={(e)=> this.onAscending(e,'Release')}>Release

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
              <th style ={{display : this.props.showShipmentType}} onClick={(e)=> this.onAscending(e,'ShipmentType')}>Shipment Type
              <span className="fa-stack ">
                      <i className="fa fa-sort-asc fa-stack-1x" ></i>
                      <i className="fa fa-sort-desc fa-stack-1x"></i>
              </span>

             </th>
               <th style = {{display : this.props.showBooking}} onClick={(e)=> this.onAscending(e,'Booking')}>Booking

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
               <th style ={{display : this.props.showPO}} onClick={(e)=> this.onAscending(e,'po_number')}>PO
                 <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
                <th style ={{display : this.props.showLot}} onClick={(e)=> this.onAscending(e,'lot_number')}>Lot#
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>

               <th style ={{display : this.props.showMaterial}} onClick={(e)=> this.onAscending(e,'Material')}>Material
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               <th style ={{display : this.props.showConfmd}} onClick={(e)=> this.onAscending(e,'Confmd')}>Confmd
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
                <th style ={{display : this.props.showForwarder}} onClick={(e)=> this.onAscending(e,'Forwarder')}>Forwarder
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
                <th style ={{display : this.props.showCntrSize}} onClick={(e)=> this.onAscending(e,'CntrSize')}>Cntr Size
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
                <th style ={{display : this.props.showQty}} onClick={(e)=> this.onAscending(e,'Qty')}>Qty
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
                <th style ={{display : this.props.showAlloc}} onClick={(e)=> this.onAscending(e,'Allocated')}>Allocated
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               <th style ={{display : this.props.showEno}} onClick={(e)=> this.onAscending(e,'Enough')}>Enough?
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               <th style ={{display : this.props.showBags}} onClick={(e)=> this.onAscending(e,'Bags')}>#Bags(To Ship)
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               {/*
                <th style ={{display : this.props.showInInvt}} onClick={(e)=> this.onAscending(e,'lot_number')}>(InInvt.)
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
             */}
               <th style ={{display : this.props.showERD}} onClick={(e)=> this.onAscending(e,'ERD')}>ERD
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               <th style ={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'CutOff')}>CutOff
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>


               </th>
               <th style ={{display : this.props.showVessel}} onClick={(e)=> this.onAscending(e,'Vessel')}>Vessel
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
                <th style ={{display : this.props.showPU}} onClick={(e)=> this.onAscending(e,'PULocation')}>PU Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
                <th style ={{display : this.props.showRet}} onClick={(e)=> this.onAscending(e,'ReturnLocation')}>Return Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
                <th style ={{display : this.props.showDoc}} onClick={(e)=> this.onAscending(e,'DocsCutoff')}>Docs Cutoff
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

               </th>
               <th style ={{display : this.props.showStatus}} onClick={(e)=> this.onAscending(e,'Status')} >Status
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
               {/*
                 <th style ={{display : this.props.showTrucker}} >Trucker
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
               </th>
             */}

             </tr>
           </thead>
                {listData}
        </table>
        </div>
        </Loader>)
  }
}
export default ShipmentViewDataComponent;
