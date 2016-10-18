import React from 'react';
import { Link } from 'react-redux';
import { hashHistory } from 'react-router';
import './arrayclean.js';
import ReactDOM from 'react-dom'
import SweetAlert from 'sweetalert-react';
import axios from 'axios'
import { Base_Url} from '../../../constants'


class  PackagingInstructionQueueViewForm extends React.Component
{   
    constructor(){
            super()

           this.state ={
           selectedOption: 'lbs',
           selectedOption1: 'kg'
     }
        this.handleSortableUpdate  = this.handleSortableUpdate.bind(this)
        this.callonEdit = this.callonEdit.bind(this)
         this.handleOptionChange = this.handleOptionChange.bind(this)
            this.handleOptionChange1 = this.handleOptionChange.bind(this)
 }

    /*componentDidMount(){

  }
*/





  handleOptionChange1(e) {
        debugger;
        this.setState({
            selectedOption: e.target.value
        });
    
    }

    handleOptionChange(changeEvent) {
        debugger;
        var selectedOption = changeEvent.target.value

        this.setState({
            selectedOption: changeEvent.target.value

        });
        
         console.log( selectedOption);
    }


    callonEdit(){
         $(ReactDOM.findDOMNode(this)).sortable({
            items: 'tr',
            update: this.handleSortableUpdate
        } ); 
    }


    handleSortableUpdate() {
        debugger;
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
              debugger;
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

    render()

        {
     const queueViewProp = this.props.data
     var newArr = _.sortBy(queueViewProp, 'queue_sequence', function(n) {
          return Math.sin(n);
});
     console.log('queueViewProp' , queueViewProp)
     var queueView = _.map(newArr  ,(queueView)=>{
        if(queueView.queue_sequence > 0)
        {
         return(
   <tr onDoubleClick = {(e) => {this.props.onDoubleClick(e,queueView)}} data-id={queueView.id}

       key = {queueView.queue_sequence}
       id = {queueView.queue_sequence} className="item">
         <td>{queueView.TPackagingInstructions.TLocation ? queueView.TPackagingInstructions.TLocation.locationName : ''} </td>
         <td>{queueView.TPackagingInstructions.TCompany ? queueView.TPackagingInstructions.TCompany.name : ''}</td>
         <td>{queueView.TPackagingInstructions ? queueView.TPackagingInstructions.po_number : ''}</td>
         <td>{queueView.railcar_number ? queueView.railcar_number : ''}</td>
         <td>{queueView.lot_number ? queueView.lot_number : ''}</td>
         <td>{queueView.TPackagingInstructions.material}</td>
         <td>{}</td>
         <td>{}</td>
         <td>{queueView.weight ? (this.state.selectedOption=='kg' ?queueView.weight :queueView.weight * 2.04) : ''}</td>
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




    return(
    
<section className="view_table-queue">  

 <div className="pull-right margin-30-right">
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
                             /><div className="control__indicator"></div>
                         </label>
                     </div>


    <div className="container-fluid">
      
    <div className="row-fluid">
    
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
    
    
    
   <div className="row-fluid pddn-50-btm">
    <hr/>
        <div className="padding-top-btm-xs">
            <div className="padding-20-last-r pull-right"><button type="button"    className="btn  btn-primary">PRINT QUEUE</button></div>
         <div className="padding-20-all pull-right"><button type="button" id="edit_btn" onClick={this.callonEdit}   className="btn  btn-gray">EDIT QUEUE</button></div>
            
        </div>
     
</div>
</div>
</div>
</section>  

                );
    }
}
export default PackagingInstructionQueueViewForm;

