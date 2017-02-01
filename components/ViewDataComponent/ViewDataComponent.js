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
import './js/jquery.dataTables.min.js'
//import './js/fixed.js'
var Loader = require('react-loader');

class ViewDataComponent extends React.Component{

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
        var PIview = createDataLoader(ViewDataComponent,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
             }
        }]
      })
    console.log("I have recieved props")
    //////debugger

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
    //debugger;
    this.setState({
        queue_Sequence : response.data
    })
})




    }
   else {
    //debugger
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
            include : [
          {"relation":"TPackagingInstructionLots" ,
          "scope":{
          "include" :{
          "relation" : "TShipmentLots" ,
          "scope":{
          "include":{
          "relation":"TShipmentent" ,
          "scope":{"include" : "TShipmentInternational"}}}},
          "where":{active:1}
          }},
          "TLocation" ,
          "TCompany"]


        });
        console.log('sdsddsdsdssdssssssssssd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                //debugger
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
    //debugger;
    this.setState({
        queue_Sequence : response.data
    })
})


    }
  }
componentDidMount() {
  $(function () {
    setTimeout(function(){debugger;
      $("#Packaging_Instruction_View").tableHeadFixer({'head' : true})
    $('#Packaging_Instruction_View').DataTable( {

          paging:     false,
          colReorder: true
    });

  }, 1000);
      //$(".Packaging_Instruction_View").tableHeadFixer({'head' : true});
  });

}
checkclick(data , value)
{
    //debugger;
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
                //debugger
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
                //debugger
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
                //debugger
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
    //debugger;
    this.setState({
        queue_Sequence : response.data
    })
})
}*/

onToggel(e ,elm){
console.log('>>>>>>' , $(elm))

  //debugger;
  $( "button" ).click(function() {
  $( "p" ).slideToggle( "slow" );
});
}

onClickRow(e){

           var rowObj = $(this.refs.clickable)
            //var aa= rowObj.attr('data-target')
            var aa = e.target.getAttribute('data-target')
            //$('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')


      if($('#Packaging_Instruction_View').find('.'+aa).length >= 2)
      {
           $('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')
      }

       
         else{
           $('#Packaging_Instruction_View').find('.'+aa).toggleClass('hide')
         }
 }



render(){
  //debugger;

       var filterData = this.props.filterData ;

      if(filterData.constructor === Array)
      {
           this.state.viewData = filterData
       }

      var selectedWeight = this.props.weight;

      var listData =  _.map(this.state.viewData,(view,index)=>{

      var count = index
      return (

       <tbody key={index}>
       <tr  className="base_bg clickable" ref ="clickable">
       <th>
               <label className="control control--checkbox">
                   <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}} value={view.id}  id={view.id}/><div className="control__indicator"></div>
               </label>
           </th>
       <th style ={{display : this.props.showARB}}> <i className="fa fa-chevron-down" aria-hidden="false" data-target ={count}  onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''} </th>
           <th style ={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</th>
           <th style ={{display : this.props.showPO}}>{view.po_number} </th>
           <th style ={{display : this.props.Railcar}}></th>
           <th style ={{display : this.props.showMaterial}}></th>
           <th style ={{display : this.props.showConfmd}}></th>
           <th style ={{display : this.props.showArrvd}}></th>
           <th style ={{display : this.props.showRecd}}></th>
           <th style ={{display : this.props.showCutoff}}></th>
           <th style ={{display : this.props.showWeight}}></th>
           <th style ={{display : this.props.showBag}}></th>
           <th style ={{display : this.props.showInInvt}}></th>
           <th style ={{display : this.props.showStatus}}></th>
           <th style ={{display : this.props.showRailcarArr}}></th>
           <th style ={{display : this.props.showRailcarArrD}}></th>
           <th style ={{display : this.props.showRailcarDep}}></th>
           <th style ={{display : this.props.showRailcarDepDate}}></th>
           <th style ={{display : this.props.showDaysPresent}}></th>
            <th></th>

           <th style ={{display : this.props.showRailcarStatus}}></th>

       </tr>
       {
                    _.map(view.TPackagingInstructionLots,(data,index)=>{
            let diff;
            debugger
            var sdate = document.getElementById('startDate').value
            var edate = document.getElementById('endDate').value
            if( (sdate == "" || edate == "") || data.TShipmentLots.length>0 ){
              var t =false;
              var c= false;
              if(sdate != "" || edate != ""){
                t= true;
                if(
                  data.TShipmentLots[0].TShipmentent!=undefined
                  &&
                  data.TShipmentLots[0].TShipmentent.TShipmentInternational!=undefined
                  &&
                  data.TShipmentLots[0].TShipmentent.TShipmentInternational.length>0
                ){
                  if(
                    new Date(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate)>=new Date(sdate)
                    &&
                    new Date(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate)<=new Date(edate)
                  ){
                    c=true
                  }
                }
                else if(data.TShipmentLots[0].TShipmentent!=undefined && data.TShipmentLots[0].TShipmentent.TShipmentDomestic!=undefined &&
                data.TShipmentLots[0].TShipmentent.TShipmentDomestic.length>0){
                  if(new Date(data.TShipmentLots[0].TShipmentent.TShipmentDomestic[0].cargoCutoffDate)>=new Date(sdate)&&new Date(data.TShipmentLots[0].TShipmentent.TShipmentDomestic[0].cargoCutoffDate)<=new Date(edate)){
                    c=true;
                  }
                }
              }
            if((t && c)||(!t))
            {
            if(data.railcar_arrived_on != null && data.railcar_departed_on != null){
            let start = new Date(moment(data.railcar_arrived_on).format("MM-DD-YYYY"))
            let end = new Date(moment(data.railcar_departed_on).format("MM-DD-YYYY"))
             diff = parseInt((end-start ) / (1000*60*60*24))
          }
        debugger
          var bagShipped=0;
          if(data.TShipmentLots && data.TShipmentLots.length>0){
            for(var tempi in data.TShipmentLots){
                    bagShipped += data.TShipmentLots[tempi].noOfBags
                  }
        }

           //debugger
           return(
               <tr key={index} className ={count}>
                   <td>
                       <label className="control control--checkbox">
                           <input type="checkbox"  onClick={(e) => this.checkclick(e,data)}   onChange={(e)=>{this.props.checkboxChange(e,data)}} value={view.id} id={view.TPackagingInstructionLots[index].id}/><div className="control__indicator"></div>
                       </label>
                   </td>
                   <td style ={{display : this.props.showARB}}> </td>
                   <td style ={{display : this.props.showCustomer}}> </td>
                   <td style ={{display : this.props.showPO}}> </td>
                   <td style ={{display : this.props.Railcar}}>{data.railcar_number ?data.railcar_number : ''}</td>
                   <td style ={{display : this.props.showLot}}>{data.lot_number ? data.lot_number : ''}</td>
                   <td style ={{display : this.props.showMaterial}}>{view.material}</td>
                   <td style ={{display : this.props.showConfmd}}>{data.status == "UNCONFIRMED" ? 'NO': 'YES'}</td>
                   <td style ={{display : this.props.showArrvd}}>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
                   <td style ={{display : this.props.showRecd}}>{(data.TShipmentLots && data.TShipmentLots.length>0 && data.status!= "SHIPPED") ? "YES" : "NO"}</td>
                   <td style ={{display : this.props.showCutoff}}>{(data.TShipmentLots && data.TShipmentLots.length>0 && data.TShipmentLots[0].TShipmentent && data.TShipmentLots[0].TShipmentent.TShipmentInternational && data.TShipmentLots[0].TShipmentent.TShipmentInternational.length>0 )?moment(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY"):'NA'}</td>
                   <td style ={{display : this.props.showWeight}}>{selectedWeight == 'lbs' ? data.weight:(data.weight / 2.20462).toFixed(2)}</td>
                   <td style ={{display : this.props.showBag}}>{(data.TShipmentLots && data.TShipmentLots.length > 0 )?bagShipped : 'NA'}</td>
                   <td style ={{display : this.props.showInInvt}}>{(data.inInventory && (data.TShipmentLots && data.TShipmentLots.length>0)) ?(data.inInventory - bagShipped ):data.inInventory }</td>

                   <td style ={{display : this.props.showStatus}}>{data.status ? data.status : '' }</td>
                   <td style ={{display : this.props.showRailcarArr}}>{data.arrived != null && data.arrived == 1 ? "Yes" : "No"}</td>
                   <td style ={{display : this.props.showRailcarArrD}}>{data.railcar_arrived_on != null ? moment(data.railcar_arrived_on).format("MM-DD-YYYY") : "N/A"}</td>
                   <td style ={{display : this.props.showRailcarDep}}>{data.railcar_departed_on != null ? "YES" : "NO"}</td>
                   <td style ={{display : this.props.showRailcarDepDate}}>{data.railcar_departed_on != null ? moment(data.railcar_departed_on).format("MM-DD-YYYY") : "N/A"}</td>
                   <td style ={{display : this.props.showDaysPresent}}>{diff ? diff +1 : 'N/A'}</td>
                   <td style ={{display : this.props.showRailcarStatus}}>{data.railcar_status ? data.railcar_status : ''}</td>

               </tr>
                  )
            }}
          }
         )
       }

       </tbody>


           )
       }
  )
 return(
 <Loader loaded={this.state.loaded}>

        <table id="Packaging_Instruction_View" className="table table-expandable" cellSpacing="0">
                    <thead id="table_head1" className="table_head header-fixed header red">
                  <tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}} >
                     <th>

                      </th>
                      <th   style = {{display : this.props.showARB }} onClick={(e)=> this.onAscending(e,'location')}>ARB
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
                      <th style ={{display : this.props.showPO}} onClick={(e)=> this.onAscending(e,'po_number')}>PO
                        <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                      <th style ={{display : this.props.Railcar}} onClick={(e)=> this.onAscending(e,'railcar_number')}>Railcar#
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
                      <th style ={{display : this.props.showArrvd}} onClick={(e)=> this.onAscending(e,'po_number')}>Arrvd
                       <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                      </th>
                      <th style ={{display : this.props.showRecd}} onClick={(e)=> this.onAscending(e,'po_number')}>Recd
                       <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                      </th>
                      <th style ={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'po_number')}>Cutoff
                       <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                      </th>
                      <th style ={{display : this.props.showWeight}} onClick={(e)=> this.onAscending(e,'weight')}>Weight
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>


                      </th>
                      <th style ={{display : this.props.showBag}} onClick={(e)=> this.onAscending(e,'po_number')}>#Bags
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                      </th>
                      <th style ={{display : this.props.showInInvt}} onClick={(e)=> this.onAscending(e,'po_number')}>(In Invt.)
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

                       <th style ={{display : this.props.showRailcarArr}} >Railcar Arrival
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                       <th style ={{display : this.props.showRailcarArrD}} >Railcar Arrival Date
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                      <th style ={{display : this.props.showRailcarDep}} >Railcar Departure
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                      <th style ={{display : this.props.showRailcarDepDate}} >Railcar Departure Date
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                        <th style ={{display : this.props.showDaysPresent}} >Railcar Days Present
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>
                        <th style ={{display : this.props.showRailcarStatus}} >Railcar Status
                      <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x" ></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                      </th>

                    </tr>
                  </thead>
                  {listData}
               </table>

               {/*<table id="Packaging_Instruction_View" className="table table-expandable" cellSpacing="0">


                      </table>*/}


        </Loader>)
  }
}
export default ViewDataComponent;

