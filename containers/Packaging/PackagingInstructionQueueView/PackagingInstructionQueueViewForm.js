import React from 'react';
import { Link } from 'react-redux';
//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';

class  PackagingInstructionQueueViewForm extends React.Component
{
    render()

 {
     const queueViewProp = this.props.data
     console.log('queueViewProp' , queueViewProp)
     var queueView = _.map(queueViewProp , (queueView)=>{
         return(
   <tr>
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
 })




    return(
    
<section className="view_table-queue">  
    <div className="container-fluid">
    <div className="row-fluid">
    
    <div className="table-responsive "> 
        <table className="table table-striped">
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
            <div className="padding-20-all pull-right"><button type="button"    className="btn  btn-gray">VIEW QUEUE</button></div>
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

