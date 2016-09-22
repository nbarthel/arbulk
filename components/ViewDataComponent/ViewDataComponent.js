/**
 * Created by Anurag on 15-09-2016.
 */


import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import PackagingInstructionViewForm from '../../containers/Packaging/PackagingInstructionView/PackagingInstructionViewForm';
import HeadBody from './HeadBody';
import NestedRows from './NestedRows'


class ViewDataComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        this.PIData = {}
        this.myObj = {}
            }
    //TPackagingInstructionLots
    componentWillMount() {
        var PIview = createDataLoader(PackagingInstructionViewForm, {
            queries: [{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                }
            }]
        });
        var base = 'TPackagingInstructions';
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
            include : ['TPackagingInstructionLots',"TOrigin" , "TCompany"]


        });
        console.log('sdsddsdsdsdsd' , this.url);
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);

               this.setState(
                   {
                       viewData : data
                   }
               )
               console.log( this.state.viewData)
        }.bind(this)

        })
}
  render(){

      var filterData = this.props.filterData ;

      if(filterData.constructor === Array)
      {
          this.state.viewData = filterData
      }
      debugger;
      var listData =  _.map(this.state.viewData , (view)=>{
           return (
           <tbody >
       <tr  className="base_bg clickable"  data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
           <th colSpan="2"><i className="fa fa-chevron-down" aria-hidden="true"></i> {view.TOrigin.origin} </th>
           <th colSpan="12"><span>{view.po_number}</span></th>
           <th>
               <label className="control control--checkbox">
                   <input type="checkbox" checked="false"  value={view} id="row1"/><div className="control__indicator"></div>
               </label>
           </th>
       </tr>{
       _.map(view.TPackagingInstructionLots , (data)=>{
           return(<tr>

           <td> </td>
           <td> </td>
           <td> </td>
           <td>{data.railcar_number}</td>
           <td>{data.lot_number}</td>
           <td>{data.material}</td>
           <td>{data.status == 'CONFIRMED' ? 'Y': 'N'}</td>
           <td>Y</td>
           <td>Y</td>
           <td>5/6/16</td>
           <td>{data.weight}</td>
           <td>{data.bags_to_ship}</td>
           <td>0</td>
           <td>{}</td>
           <td>
           <label className="control control--checkbox">
           <input type="checkbox" id="row1"/><div className="control__indicator"></div>
           </label>
           </td>
           </tr>)})}


       </tbody>
           )
       }
)

  return(

            <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0" >

                <HeadBody/>

                {listData}

            </table>

        )
    }
}
export default ViewDataComponent;