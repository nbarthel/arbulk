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
/*import './js/jquery.dataTables.min.js';
*//*import './stylesheet/jquery.dataTables.min.css'*/
var Loader = require('react-loader');
//var shipmentViewData = require('./ShpmentViewData.json');
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

   axios.get(Base_Url+"TShipmentLots/getMaxQueue").then(response=>{
    debugger;
    this.setState({
        queue_Sequence : response.data
    })
})




    }
   else {
    debugger
  var PIview = createDataLoader(ShipmentViewDataComponent,{
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
                    "include" : ["TLocation" , "TCompany" ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine" ,"TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots","TPackagingInstructions"]}}]

        });

      $.ajax({
            url: this.url,
            success:function(data){
             
              debugger;
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
  debugger
   $(document).ready(function()
   { 
    var table = $('#Packaging_Instruction_View').DataTable({
      colReorder: true
    });
    
   } );
}
checkclick(data , value)
{

    var queueArray = []
    this.qArray.push(value.id)
    localStorage.setItem('qArray',this.qArray)
    localStorage.setItem('queue_Sequence',this.state.queue_Sequence[0].max_mark)

}



onAscending(e,head){
   var sortedData;
   if(this.isAsc == false)
    {
    var switchvalue = head;
var PIview = createDataLoader(ShipmentViewDataComponent,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TPackagingInstructions';
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
            include : ['TPackagingInstructionLots',"TLocation" , "TCompany"]


        });
        console.log('sdsddsdsdssdssssssssssd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
               this.sortedadta = 
                   {
                       viewData : data
                   }
               
               this.isAsc = true;

                            switch(switchvalue) {
                            case 'po_number':
                           sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                            return item.po_number;
                           });
                           this.setState({
                           viewData  : sortedData
                                   }) 
                             break;
                   case 'lot_number':
                     sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                     return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].lot_number : '');
                     });
                     this.setState({
                           viewData  : sortedData
                                   }) 
                       break;
                               case 'railcar_number':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].railcar_number : '');
                                });
                      this.setState({
                           viewData  : sortedData
                                   }) 
                      break;
                       case 'weight':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].weight : '');
                                });
                      this.setState({
                           viewData  : sortedData
                                   }) 
                      break;
                      case 'location':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return item.TLocation.locationName;
                                });
                      this.setState({
                           viewData  : sortedData
                                   }) 
                      break;
                      case 'company':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return item.TCompany.name;
                                });
                      this.setState({
                           viewData  : sortedData
                                   }) 
                      break;
    default:
        this.state.viewData
}



        }.bind(this)
        })

    axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    
    this.setState({
        queue_Sequence : response.data
    })
})
}

else{

var switchvalue = head;
var PIview = createDataLoader(ShipmentViewDataComponent,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
       var base = 'TPackagingInstructions';
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
            include : ['TPackagingInstructionLots',"TLocation" , "TCompany"]


        });
        console.log('sdsddsdsdssdssssssssssd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
               this.sortedadta = 
                   {
                       viewData : data
                   }
               
               this.isAsc = false;

                            switch(switchvalue) {
                            case 'po_number':
                           sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                            return item.po_number;
                           });
                           this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                             break;
                   case 'lot_number':
                     sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                     return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].lot_number : '');
                     });
                     this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                       break;
                      case 'railcar_number':
                      sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                     return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].railcar_number : '');
});
                      this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                      break;
                      case 'weight':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return (item.TPackagingInstructionLots[0]? item.TPackagingInstructionLots[0].weight : '');
                                });
                      this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                      break;
                       case 'location':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return item.TLocation.locationName;
                                });
                      this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                      break;
                      case 'company':
                                sortedData = _.sortBy(this.sortedadta.viewData, function(item) {
                                return item.TCompany.name;
                                });
                      this.setState({
                           viewData  : sortedData.reverse()
                                   }) 
                      break;
    default:
        this.state.viewData
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

        
       var filterData = this.props.filterData ;

      if(filterData.constructor === Array)
      {
           this.state.viewData = filterData
       }
      
      var selectedWeight = this.props.weight;

      console.log("<<<<<^^>>>>>",this.state.viewData)
      // const data = this.state.xyz
      var listData =  _.map(this.state.viewData,(view,index)=>{
      
      var count = index
      return (
       <thead key={index} >
       <tr  className="base_bg clickable" ref ="clickable">
       <th style ={{display : this.props.showARB}}> <i className="fa fa-chevron-down" aria-hidden="false" data-target ={count}  onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''} </th>
           <th style ={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</th>           
           <th style ={{display : this.props.showRelease}}></th>
           <th style ={{display : this.props.showBooking}}></th>
           <th style ={{display : this.props.showPO}}></th>
           <th style ={{display : this.props.showLot}}></th>
           <th style ={{display : this.props.showShipmentType}}></th>
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
           <th>
               <label className="control control--checkbox">
                   <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}} value={view.id}  id={view.id}/><div className="control__indicator"></div>
               </label>
           </th>
       </tr>
       <tr>
       <td style ={{display : this.props.showARB}}></td>
       <td style ={{display : this.props.showCustomer}}></td>
       <td style ={{display : this.props.showRelease}}>{view.releaseNumber ? view.releaseNumber : ''}</td>
       <td style ={{display : this.props.showBooking}}></td>
       <td style ={{display : this.props.showPO}}></td>
       <td style ={{display : this.props.showLot}}></td>
       <td style ={{display : this.props.showShipmentType}}>{view.isDomestic == 1 ? 'DOMESTIC' : 'INTERNATIONAL'}</td>
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
       <td></td>
       </tr>

       {    

          _.map(view.TShipmentLots,(data,index)=>{
            debugger;
                  if(view.isDomestic == 0){
                    var vessel = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].steamshipVessel :''
                    var freightForwarder = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].freightForwarder : ''
                    var erd = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].earliestReturnDate).format("YYYY-MM-DD") : ''
                    var cutOff = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].cargoCutoffDate).format("YYYY-MM-DD") : ''
                    var puLocation = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].containerPickupLocation : ''
                    var returnLocation = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].containerReturnLocation : ''
                    var docCutoff = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? moment(view.TShipmentInternational[0].docCutoffDate).format("YYYY-MM-DD") : ''
                    var steamShipline = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].TSteamshipLine.name : ''
                    var status = (view.TShipmentInternational && view.TShipmentInternational.length >0) ? view.TShipmentInternational[0].status : ''

                  }
                  else if(view.isDomestic == 1){
                      var status = (view.TShipmentDomestic && view.TShipmentDomestic.length >0) ? view.TShipmentDomestic[0].status : ''

                  }
           return(
                   <tr key={index} className ={count}>
                   <td style ={{display : this.props.showARB}}> </td>
                   <td style ={{display : this.props.showCustomer}}> </td>
                   <td style ={{display : this.props.showRelease}}> </td>
                   <td style ={{display : this.props.showBooking}}>{(view.isDomestic == 1 && view.TShipmentDomestic && view.TShipmentDomestic.length>0)?view.TShipmentDomestic[0].bookingNumber :((view.TShipmentInternational && view.TShipmentInternational.length>0) ?view.TShipmentInternational[0].bookingNumber : '')}</td>
                   <td style ={{display : this.props.showPO}}>{data.TPackagingInstructions ? data.TPackagingInstructions.po_number : 'N/A'}</td>
                   <td style ={{display : this.props.showLot}}>{data.TPackagingInstructionLots.length != 0 ? data.TPackagingInstructionLots.lot_number : 'N/A'}</td>
                   <td style ={{display : this.props.showShipmentType}}>{}</td>
                   <td style ={{display : this.props.showMaterial}}>{'N/A'}</td>
                   <td style ={{display : this.props.showConfmd}}>N/A</td>
                   <td style ={{display : this.props.showForwarder}}>{view.isDomestic ==1 ? 'N/A' : freightForwarder}</td>
                   <td style ={{display : this.props.showCntrSize}}>N/A</td>
                   <td style ={{display : this.props.showQty}}>N/A</td>
                   <td style ={{display : this.props.showAlloc}}>N/A</td>
                   <td style ={{display : this.props.showEno}}>N/A</td>
                   <td style ={{display : this.props.showBags}}>{data.noOfBags ? data.noOfBags : ''}</td>
                   <td style ={{display : this.props.showInInvt}}>{}</td>
                   <td style ={{display : this.props.showERD}}>{view.isDomestic == 1 ? 'N/A' : erd}</td>
                   <td style ={{display : this.props.showCutoff}}>{view.isDomestic == 1 ? 'N/A' : cutOff}</td>
                   <td style ={{display : this.props.showVessel}}>{view.isDomestic == 1 ? 'N/A' : vessel}</td>
                   <td style ={{display : this.props.showSteamShip}}>{view.isDomestic == 1 ? 'N/A' : steamShipline}</td>
                   <td style ={{display : this.props.showPU}}>{view.isDomestic == 1 ? 'N/A' : puLocation}</td>
                   <td style ={{display : this.props.showRet}}>{view.isDomestic == 1 ? 'N/A' : returnLocation}</td>
                   <td style ={{display : this.props.showDoc}}>{view.isDomestic == 1 ? 'N/A' : docCutoff}</td>
                   <td style ={{display : this.props.showStatus}}>{status== null? "UNCONFIRMED" :status}</td>
                   <td style ={{display : this.props.showTrucker}}>N/A</td>
                   <td>
                   <label className="control control--checkbox">
                   <input type="checkbox"  onClick={(e) => this.checkclick(e,data)} id = {data.TPackagingInstructionLots ? data.TPackagingInstructionLots.id : ''} value = {view.id}  onChange={(e)=>{this.props.checkboxChange(e,view,data)}} /><div className="control__indicator"></div>
                   </label>
                   </td>
                   </tr>
                  )
            }
         )
       }

       </thead>

    
    )}
  )
 return(
 <Loader loaded={this.state.loaded}>
 <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0" >
             <thead className="table_head">
           <tr className="sorting_head" >
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
               <th style = {{display : this.props.showRelease}} onClick={(e)=> this.onAscending(e,'company')}>Release 

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
               <th style = {{display : this.props.showBooking}} onClick={(e)=> this.onAscending(e,'company')}>Booking

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
                 <th style ={{display : this.props.showShipmentType}} onClick={(e)=> this.onAscending(e,'lot_number')}>Shipment Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>                    
               <th style ={{display : this.props.showMaterial}} onClick={(e)=> this.onAscending(e,'po_number')}>Material
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showConfmd}} onClick={(e)=> this.onAscending(e,'po_number')}>Confmd 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>                
               </th>
                <th style ={{display : this.props.showForwarder}} onClick={(e)=> this.onAscending(e,'lot_number')}>Forwarder
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showCntrSize}} onClick={(e)=> this.onAscending(e,'lot_number')}>Cntr Size
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showQty}} onClick={(e)=> this.onAscending(e,'lot_number')}>Qty
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showAlloc}} onClick={(e)=> this.onAscending(e,'lot_number')}>Allocated
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showEno}} onClick={(e)=> this.onAscending(e,'po_number')}>Enough?
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showBags}} onClick={(e)=> this.onAscending(e,'po_number')}>#Bags(To Ship)
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showInInvt}} onClick={(e)=> this.onAscending(e,'lot_number')}>(InInvt.)
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showERD}} onClick={(e)=> this.onAscending(e,'po_number')}>ERD 
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'weight')}>CutOff 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                

               </th>
               <th style ={{display : this.props.showVessel}} onClick={(e)=> this.onAscending(e,'po_number')}>Vessel
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showSteamShip}} onClick={(e)=> this.onAscending(e,'po_number')}>Steamship Line
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
                <th style ={{display : this.props.showPU}} onClick={(e)=> this.onAscending(e,'po_number')}>PU Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showRet}} onClick={(e)=> this.onAscending(e,'po_number')}>Ret'n Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
                <th style ={{display : this.props.showDoc}} onClick={(e)=> this.onAscending(e,'po_number')}>Docs Cutoff
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th style ={{display : this.props.showStatus}} >Status 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
                 <th style ={{display : this.props.showTrucker}} >Trucker 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
              <th>
                 
               </th>
             </tr>
           </thead>
                {listData}
        </table>
        </Loader>)
  }
}
export default ShipmentViewDataComponent;