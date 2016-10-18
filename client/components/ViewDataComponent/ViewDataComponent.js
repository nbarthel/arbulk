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
/*import './js/jquery.dataTables.min.js';
import './stylesheet/jquery.dataTables.min.css'*/
var Loader = require('react-loader');

class ViewDataComponent extends React.Component{
    
    constructor(props){
        super(props);
        this.isAsc = false
        this.state = {
        loaded : false }
        this.PIData = { }
        this.myObj = { }
        this.qArray = []
        this.checkclick = this.checkclick.bind(this);
        //this.onAscending = this.onAscending.bind(this)    
      }
componentWillMount(){
   let id = this.props.id
      if(this.props.id != undefined){
        var PIview = createDataLoader(ViewDataComponent,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props",)
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

   axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    debugger;
    this.setState({
        queue_Sequence : response.data
    })
})




    }
   else {
    debugger
  var PIview = createDataLoader(ViewDataComponent,{
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
/*componentDidMount() {
   $(document).ready(function()
   { 
   //alert("hello kamal");
    $('#Packaging_Instruction_View').DataTable();  
  
   } );
}*/
checkclick(data , value)
{
    debugger;
    var queueArray = []
    this.qArray.push(value.id)
    localStorage.setItem('qArray',this.qArray)
    localStorage.setItem('queue_Sequence',this.state.queue_Sequence[0].max_mark)
    console.log("clicked>>>>>>>>" ,value)
}

onAscending(e,head){
var sortedData;
if(this.isAsc == false)
{
var switchvalue = head;
var PIview = createDataLoader(ViewDataComponent,{
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
var PIview = createDataLoader(ViewDataComponent,{
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
/*onDescending(e,h){
  console.log(">>>>",h)
var PIview = createDataLoader(ViewDataComponent,{
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
}*/


render(){
  debugger;
        
       var filterData = this.props.filterData ;

      if(filterData.constructor === Array)
      {
           this.state.viewData = filterData
       }
      
      var selectedWeight = this.props.weight;
      
debugger
      console.log("<<<<<^^>>>>>",this.state.viewData)
      // const data = this.state.xyz
      var listData =  _.map(this.state.viewData,(view,index)=>{
      debugger
      return (
       <tbody key={index}>
       <tr  className="base_bg clickable"  >
       <th > {view.TLocation ? view.TLocation.locationName : ''} </th>
           <th >{view.TCompany ? view.TCompany.name : ''}</th>           
           <th>{view.po_number} </th>
           <th></th>
           <th></th>
           <th>{view.material}</th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>   
           <th>
               <label className="control control--checkbox">
                   <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}} value={view.id}  id={view.id}/><div className="control__indicator"></div>
               </label>
           </th>
       </tr>
       {
          _.map(view.TPackagingInstructionLots,(data,index)=>{
           debugger
           return(
                   <tr key={index}>
                   <td> </td>
                   <td> </td>
                   <td> </td>
                   <td>{data.railcar_number ?data.railcar_number : ''}</td>
                   <td>{data.lot_number ? data.lot_number : ''}</td>
                   <td></td>
                   <td>{data.status == 'CONFIRMED' || data.status == 'ARRIVED' ? 'YES': 'NO'}</td>
                   <td>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
                   <td></td>
                   <td></td>
                   <td>{selectedWeight == 'lbs' ? data.weight:(data.weight/2.20462).toFixed(2)}</td>
                   <td>{}</td>
                   <td>0</td>
                   <td>{data.status ? data.status : '' }</td>
                   <td>
                   <label className="control control--checkbox">
                   <input type="checkbox"  onClick={(e) => this.checkclick(e,data)}   onChange={(e)=>{this.props.checkboxChange(e,data)}} value={view.id} id={view.TPackagingInstructionLots[index].id}/><div className="control__indicator"></div>
                   </label>
                   </td>
                   </tr>
                  )
            }
         )
       }


       </tbody>
           )
       }
  )
 return(
 <Loader loaded={this.state.loaded}>
 <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0" >
             <thead className="table_head">
           <tr className="sorting_head" >
               <th onClick={(e)=> this.onAscending(e,'location')}>ARB 
                    <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                    </span>
               </th>
               <th onClick={(e)=> this.onAscending(e,'company')}>Customer 

                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 

               </th>
               <th onClick={(e)=> this.onAscending(e,'po_number')}>PO
                 <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
               <th  onClick={(e)=> this.onAscending(e,'railcar_number')}>Railcar#
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                </th>
               <th  onClick={(e)=> this.onAscending(e,'lot_number')}>Lot#
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>Material
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th onClick={(e)=> this.onAscending(e,'po_number')}>Confmd 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>Arrvd
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>Recd 
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>Cutoff 
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'weight')}>Weight 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                

               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>#Bags 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  onClick={(e)=> this.onAscending(e,'po_number')}>(In Invt.) 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
                
               </th>
               <th  >Status 
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x" ></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span> 
               </th>
               <th>
                   <label className="control control--checkbox">
                       <input type="checkbox" id="row1"/>

                       <div className="control__indicator"></div>
                   </label>
               </th>
             </tr>
           </thead>
                {listData}
        </table>
        </Loader>)
  }
}
export default ViewDataComponent;