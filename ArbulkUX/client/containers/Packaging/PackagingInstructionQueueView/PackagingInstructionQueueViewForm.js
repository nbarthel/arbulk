import React from 'react';
import { Link } from 'react-redux';
import { hashHistory } from 'react-router';
import './arrayclean.js';
import ReactDOM from 'react-dom'
import SweetAlert from 'sweetalert-react';
import axios from 'axios'
import { Base_Url} from '../../../constants'
import { createDataLoader } from 'react-loopback';

var Scroll  = require('react-scroll');
var scroll     = Scroll.animateScroll;
var i =0;
var clickOnEdit = false
var initialY = 0;
var goTop = true;
var goDown = false;
const MUL_FACTOR = 2.204625
class  PackagingInstructionQueueViewForm extends React.Component
{
    constructor(){
            super()
           this.state ={
           selectedOption: 'lbs',
           selectedOption1: 'kg',
           viewRailcartData : undefined
     }
        this._throttledMouseMove = _.throttle(this._throttledMouseMove.bind(this));
        this.handleSortableUpdate  = this.handleSortableUpdate.bind(this)
        this.callonEdit = this.callonEdit.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleOptionChange1 = this.handleOptionChange.bind(this)
        this.onCompanyFilter = this.onCompanyFilter.bind(this)
        this.locationFilter = []
        this.locId = {}
        this.ScrollUp = this.ScrollUp.bind(this)
        this.Print = this.Print.bind(this)
 }

componentWillMount(){
  axios.get(Base_Url+"TLocations").then((response) => {
      this.setState({
          location: response.data
      })
  })
  .catch(function(err){
      console.log(err)
  })

}
_throttledMouseMove(e){

   if(clickOnEdit&&e.buttons){

     if(initialY==0)
     {
       initialY = e.clientY
     }
if(i>4){
     if(initialY - e.clientY > 300){

       this.ScrollUp(e.clientY-initialY-150)
       initialY = e.clientY
       i =0;
       goTop = true;
       goDown = false;
     }
      else if(e.clientY-initialY > 300){

            this.ScrollUp(initialY-e.clientY+250)
            initialY = e.clientY
            i =0;
            goTop = false;
            goDown = true;
      }
      else if(i>4){
        i++;
        if(i>12){
        if(goTop){
          this.ScrollUp(-200)
        }
        else{
          this.ScrollUp(200)
        }
      }
      }

    }
    else {
      i++;
    }
 }
 }
ScrollUp(a)
{
  scroll.scrollMore(a);

}

  handleOptionChange1(e) {

        this.setState({
            selectedOption: e.target.value
        });

    }

    handleOptionChange(changeEvent) {

        var selectedOption = changeEvent.target.value

        this.setState({
            selectedOption: changeEvent.target.value

        });

         console.log( selectedOption);
    }
Print(){
  document.getElementById('radioButtons').style.display = 'none'
  document.getElementById('buttons').style.display = 'none'
  window.print()
  window.location.reload()
}
    callonEdit(){
      clickOnEdit = true;
         $(ReactDOM.findDOMNode(this)).sortable({
            items: 'tr',
            update: this.handleSortableUpdate
        } );
    }


    handleSortableUpdate() {
        // clickOnEdit = false;
        initialY = 0;
        var newItems = _.clone(this.props.data, true);
        var $node = $(ReactDOM.findDOMNode(this));
        var ids = $node.sortable('toArray', { attribute: 'data-id' });
        var keys = $node.sortable('toArray', { attribute: 'id' });
         ids = ids.clean("");
         keys = keys.clean("")
         var newSequence = []
        ids.forEach((id, index) => {
            newSequence.push(index +1 )
            // this.props.data.queue_sequence = index;
        });
         console.log('>>>>>>>' , newSequence)


        for(var j in ids)
        {
            axios.put(Base_Url+"TPackagingInstructionLots/" + ids[j] , {queue_sequence : newSequence[j] }).then((response)=>{

              console.log('response>>>>>>' , response)
            });
        }

  // Lets React reorder the DOM
        // swal("Success" , 'Successfully updated Qsequence' , 'success')
        // $node.sortable('cancel');
        // this.setState({ items: newItems });
        // this.props.data = this.state.items
        // this.forceUpdate();

    }


    onCompanyFilter(e, loc){
       debugger;
       var PIview = createDataLoader(PackagingInstructionQueueViewForm, {
           queries: [{
               endpoint: 'TPackagingInstructionLots',
               filter: {
                   include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}]
               }
           }]
       });


       var objCompany;
       var serachObj = []
      if(e.target.checked){
        this.locationFilter.push(e.target.getAttribute('id'))
        Object.defineProperty(this.locId,"Company",{enumerable: true ,
                    writable: true,
                    configurable:true,
                    value:this.locationFilter})
                    for(var j in this.locationFilter)
                    {
              objCompany = {"location_id" : this.locationFilter[j] }
              serachObj.push(objCompany);
                  }
        serachObj.splice(serachObj.length -1 , 1)
    var base = 'TPackagingInstructionLots';
    this.url = PIview._buildUrl(base, {
               include : {"relation": "TPackagingInstructions",
                   "scope": {"include": ["TLocation","TCompany"] ,"where" :{"or" :serachObj}} }
          });
     console.log("locationIDiffffffffffffff" , this.locationFilter , serachObj , this.url)
     }
      else if (!e.target.checked){
        let index = this.locationFilter.indexOf(e.target.getAttribute('id'))
        this.locationFilter.splice(index,1)
        if(this.locationFilter && this.locationFilter.length > 0)
        {
        for(var j in this.locationFilter)
            {
                objCompany = {"location_id" : this.locationFilter[j] }
                serachObj.push(objCompany);
            }
            serachObj.splice(serachObj.length -1 , 1)
            var base = 'TPackagingInstructionLots';

            this.url = PIview._buildUrl(base, {

                 include : [{"relation": "TPackagingInstructions",
           "scope": {"include": ["TLocation","TCompany"],"where" :{"or" :serachObj}}}]

               });
               console.log("locationID" , this.locationFilter , serachObj , this.url)

     }
     else{
       var base = 'TPackagingInstructionLots';

       this.url = PIview._buildUrl(base, {

            include : ['TPackagingInstructions',{"relation": "TPackagingInstructions",
      "scope": {"include": ["TLocation","TCompany"]}}]

          });
          console.log("locationID" , this.locationFilter , serachObj , this.url)
     }
   }

   $.ajax({
       url: this.url,
       success:function(data){
         debugger
           console.log('ajax ',data);

           this.setState(
               {
                   viewRailcartData : data
               }
           )
           console.log( '>>>>>>>>>>>>raillcart' , this.state.viewRailcartData)
       }.bind(this),

       Error : function(err){
         debugger;
         console.log("the error is" , err)
       }

   })



    }

    render()

        {
     const queueViewProp = this.state.viewRailcartData == undefined ? this.props.data : this.state.viewRailcartData
     var newArr = _.sortBy(queueViewProp, 'queue_sequence', function(n) {
          return Math.sin(n);
});
     console.log('queueViewProp' , queueViewProp)

            var counter = 0;
     var queueView = _.map(newArr ,(queueView)=>{
        if(queueView.queue_sequence > 0 && queueView.TPackagingInstructions)
        {
            counter++;
         return(
   <tr onDoubleClick = {(e) => {this.props.onDoubleClick(e,queueView)}} data-id={queueView.id}

       key = {counter}
       id = {counter} className="item">
         <td>{queueView.TPackagingInstructions.TLocation ? queueView.TPackagingInstructions.TLocation.locationName : ''} </td>
         <td>{queueView.TPackagingInstructions.TCompany ? queueView.TPackagingInstructions.TCompany.name : ''}</td>
         <td>{queueView.TPackagingInstructions ? queueView.TPackagingInstructions.po_number : ''}</td>
         <td>{queueView.railcar_number ? queueView.railcar_number : ''}</td>
         <td>{queueView.lot_number ? queueView.lot_number : ''}</td>
         <td>{queueView.TPackagingInstructions.material}</td>
         <td>{}</td>
         <td>{}</td>
         <td>{queueView.weight ? (this.state.selectedOption=='kg' ?(queueView.weight/MUL_FACTOR).toFixed(2) :queueView.weight.toFixed(2)) : ''}</td>
         <td>{queueView.bags_to_ship}</td>
         <td>{}</td>
         <td>
             <label className="control control--checkbox">
                 <input type="checkbox" id="row1"/><div className="control__indicator"></div>
             </label>
         </td>
     </tr>
         )
     }
 })

 let locations = _.map(this.state.location,(location) => {
         return (
             <li key={location.id}>
                         <label className="control control--checkbox">{location.locationName}
                             <input type="checkbox" value={location.locationName} onChange={(e) => this.onCompanyFilter(e,location)} id={location.id}/><div className="control__indicator"></div>

                         </label>
                     </li>

             )
     });


    return(

<section className="view_table-queue  side-filter" onMouseMove={this._onMouseMove}>
    <div className="container">
    <div className="row-fluid">

        <div className="well filter_bg collapse navbar-collapse" id="filter-menu">
            <div className="head_bg">
                <h6 className="pull-left">ARB LOCATION</h6>
                <a href="javascript:void(0)" className="pull-right text_right"> Show All</a>
            </div>
             <ul>
                {locations}
             </ul>
        </div>


        <div id="filter-grid">
            <div  className=" col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right" onMouseMove={this._throttledMouseMove}>

            <div className="converiosnsMenuQViewForm">
                <div className="pull-right ">
                    <label className="control control--radio ">LBS
                        <input id="Modify_User" name="Modify_User" type="radio"
                               type="radio"
                               id="ADDCustomers"
                               name="ADDCustomers"
                               value="lbs"
                               onChange={this.handleOptionChange}
                               checked={this.state.selectedOption==='lbs'}
                        /><div className="control__indicator"></div>
                    </label>
                </div>
                <div className="pull-right margin-30-right">
                    <label className="control control--radio ">Kg
                        <input id="Modify_User" name="Modify_User" type="radio"
                               id="ADDCustomers"
                               name="ADDCustomers"
                               value="kg"
                               onChange={this.handleOptionChange1}
                               checked={this.state.selectedOption==='kg'}
                        /><div className="control__indicator">
                        </div>
                    </label>
                </div>
            </div>

            <div className="">
                <div className="table-responsive ">
                    <table className="table table-striped sortable" id= "simpleList" >
                        <thead className="base_bg">
                          <tr >
                            <th>ARB </th>
                            <th>Customer</th>
                            <th>PO# </th>
                            <th>Railcar# </th>
                            <th>Lot# </th>
                            <th>Material </th>
                            <th>Release Recd? </th>
                            <th>Cutoff </th>
                            <th>Weight</th>
                            <th>#Bags (To Ship)</th>
                            <th>(In Invt.) </th>
                            <th>
                                <label className="control control--checkbox">
                                  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                                </label>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {queueView}
                        </tbody>
                    </table>
                </div>
                </div>
            

               <div className="row-fluid pddn-50-btm">
                <hr/>
                    <div className="padding-top-btm-xs" id="buttons">
                    <div className="padding-20-all pull-right"><button type="button" id="edit_btn" onClick={hashHistory.goBack}   className="btn  btn-gray">BACK</button></div>

               <div className="padding-20-all pull-right"><button type="button" id="edit_btn" onClick={this.callonEdit}   className="btn  btn-gray">EDIT QUEUE</button></div>
               <div className="padding-20-all pull-right"><button type="button" id="edit_btn" onClick = {this.Print} className="btn  btn-gray">PRINT</button></div>

                    </div>

            </div>

        </div>
        </div>

    </div>
    </div>
</section>

                );
    }
}
export default PackagingInstructionQueueViewForm;
