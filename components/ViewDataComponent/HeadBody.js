

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import Reactable from 'reactable';


class HeadBody extends React.Component{
 constructor(){
     super()
 }


   render(){
       return(
           <thead className="table_head">
           <tr >
               <th>ARB</th>
               <th>Customer</th>
               <th>PO</th>
               <th>Railcar#</th>
               <th>Lot#</th>
               <th>Material</th>
               <th>Confmd</th>
               <th>Arrvd</th>
               <th>Recd</th>
               <th>Cutoff</th>
               <th>Weight</th>
               <th>#Bags</th>
               <th>(In Invt.)</th>
               <th>Status</th>
               <th>
                   <label className="control control--checkbox">
                       <input type="checkbox" id="row1"/>

                       <div className="control__indicator"></div>
                   </label>
               </th>
           </tr>
           </thead>
       )
   }
}

export default HeadBody;