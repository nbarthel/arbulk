import React from 'react';
import { Link } from 'react-redux';
import { browserHistory } from 'react-router';
import './sortable.js';
import './jquery-ui-min.js';
import ReactDOM from 'react-dom'

//import './jquery-ui.css';
//import { Sortable } from 'react-sortable';

//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';

class  PackagingInstructionQueueViewForm extends React.Component
{
    constructor(){
        super();
        //this.onDoubleClick = this.onDoubleClick.bind(this)
        this.handleSortableUpdate  = this.handleSortableUpdate.bind(this)
        //this.dragStart  = this.dragStart.bind(this)
        //this.dragEnd  = this.dragEnd.bind(this)

  }

    componentDidMount(){
       debugger;
        $(ReactDOM.findDOMNode(this)).sortable({
            items: 'tr',
            update: this.handleSortableUpdate
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               );

    }

    handleSortableUpdate() {
        debugger;
        var newItems = _.clone(this.props.data, true);
        var $node = $(ReactDOM.findDOMNode(this));
        var ids = $node.sortable('toArray', { attribute: 'data-id' });

        ids.forEach((id, index) => {
            var item = _.find(newItems, {id: id});
            item.position = index;
        });

        // Lets React reorder the DOM
        $node.sortable('cancel');
        this.setState({ items: newItems });
        this.props.data = this.state.items
        this.forceUpdate();

    }

    //sortedItems(){
    //    var items = _.sortBy(this.state.items, 'position');
    //
    //    return items.map((item) => {
    //        return (
    //            <li key={item.id} data-id={item.id}>
    //                <strong>{item.content}</strong>
    //                <br/>
    //                id: {item.id} &bull; position: {item.position}
    //            </li>
    //        )
    //    })
    //}

    render()

        {
     const queueViewProp = this.props.data
     console.log('queueViewProp' , queueViewProp)
     var queueView = _.map(queueViewProp , (queueView)=>{
        debugger;
        if(queueView.queue_sequence > 0)
        {
         return(
   <tr onDoubleClick = {(e) => {this.props.onDoubleClick(e,queueView)}} data-id={queueView.id}

       key = {queueView.id}
       id = {queueView.id} className="item">
         <td>{queueView.TPackagingInstructions.TLocation.locationName} </td>
         <td>{queueView.TPackagingInstructions.TCompany.name}</td>
         <td>{queueView.TPackagingInstructions.po_number}</td>
         <td>{queueView.railcar_number}</td>
         <td>{queueView.lot_number}</td>
         <td>{queueView.TPackagingInstructions.material}</td>
         <td> Y</td>
         <td>5/3/16</td>
         <td>{queueView.weight}</td>
         <td>{queueView.bags_to_ship}</td>
         <td>5000</td>
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
   <div className="padding-20-all pull-right"><button type="button" id="edit_btn"    className="btn  btn-gray">EDIT QUEUE</button></div>

        </div>

</div>
</div>
</div>
</section>

                );
    }
}
export default PackagingInstructionQueueViewForm;
