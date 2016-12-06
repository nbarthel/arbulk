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
/*import './js/jquery.dataTables.min.js';
*//*import './stylesheet/jquery.dataTables.min.css'*/
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
             "include" : [{"relation":"TContainerDomestic" ,"scope":{"include" : "TCompany"}},{"relation":"TContainerInternational" ,"scope":{"include" : "TCompany"}},"TCompany" ,"TLocation","TShipmentDomestic",{"relation":"TShipmentInternational" , "scope":{"include":["TContainerType" , "TSteamshipLine"]}}]


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
    debugger;
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
var PIview = createDataLoader(ContainerViewDataComponent,{
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
var PIview = createDataLoader(ContainerViewDataComponent,{
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
        debugger;

        var filterData = this.props.filterData

         if(filterData.constructor === Array)
         {
         this.state.viewData = filterData
         }

        var selectedWeight = this.props.weight;

        debugger
        console.log("<<<<<^^>>>>>",this.state.viewData)

        var listData =  _.map(this.state.viewData,(view,index) => {
                if(view.isDomestic == 1){
                               if(view.TContainerDomestic.length > 0){
                                 var bookingNumber = (view.TShipmentDomestic && view.TShipmentDomestic.length>0 )? view.TShipmentDomestic[0].bookingNumber : ''            
                                 var count = index
                                   var shipType = view.isDomestic == 1 ? "DOMESTIC" : "INTERNATIONAL"
                                   return (
                                        <thead key={index}>
                                        <tr className="base_bg clickable" ref="clickable">
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
                                            {
                                                <th>
                                                <label className="control control--checkbox">
                                                    <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                                           value={view.id} id={view.id}/>
                
                                                    <div className="control__indicator"></div>
                                                </label>
                                            </th>
                                            }
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
                                                    <td>
                                                        <label className="control control--checkbox">
                                                            <input type="checkbox" onClick={(e) => this.checkclick(e,view)}
                                                                   onChange={(e)=>{this.props.onCheckboxChange(e,view,data)}} value={view.id}
                                                                   id={''}/>
                
                                                            <div className="control__indicator"></div>
                                                        </label>
                                                    </td>
                                                </tr>
                                            )
                                        })
                
                                        }
                
                
                                        </thead>
                                 )}
                              }
                  else if(view.isDomestic == 0){
                  if(view.TContainerInternational.length > 0) {
                  var shipType = view.isDomestic == 0 ? "INTERNATIONAL" : "DOMESTIC"
                  var bookingNumber = view.TShipmentInternational[0].bookingNumber
                  var type = view.TShipmentInternational[0].TContainerType ? view.TShipmentInternational[0].TContainerType.name:'N/A'
                  var steamship = view.TShipmentInternational[0].TSteamshipLine? view.TShipmentInternational[0].TSteamshipLine.name : 'N/A'               
                  var count = index
                       return (
                           <thead key={index}>
                           <tr className="base_bg clickable" ref="clickable">
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
                               <th>
                                   <label className="control control--checkbox">
                                       <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                              value={view.id} id={view.id}/>

                                       <div className="control__indicator"></div>
                                   </label>
                               </th>
                           </tr>
                           {
                          _.map(view.TContainerInternational , (data ,index)=>{
                             if(data.containerArrived == 1){
                                      var Arr = 'YES'
                                          } else{
                                            var Arr = 'NO'
                                          }

                                   return(
                                       <tr key={index} className={count}>
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


                                           <td>
                                               <label className="control control--checkbox">
                                                   <input type="checkbox" onClick={(e) => this.checkclick(e,view)}
                                                          onChange={(e)=>{this.props.onCheckboxChange(e,view,data)}} value={view.id}
                                                          id={''}/>

                                                   <div className="control__indicator"></div>
                                               </label>
                                           </td>
                                       </tr>
                                   )
                               })

                           }

                           </thead>


                       )
                   }

               }

            })

        
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
                        <th style ={{display : this.props.showTrucker}} onClick={(e)=> this.onAscending(e,'po_number')}>Trucker
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showArrived}} onClick={(e)=> this.onAscending(e,'po_number')}>Arrived?
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
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'po_number')}>Type
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'po_number')}>Status
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

                        </th>
                        <th style ={{display : this.props.showType}} onClick={(e)=> this.onAscending(e,'po_number')}>Shipment Type
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
export default ContainerViewDataComponent;
