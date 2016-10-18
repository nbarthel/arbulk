/**
 * Created by Anurag on 17-09-2016.
 */






import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';



class NestedRows extends React.Component{
    constructor(){
        super()
    }


    render(){
        console.log('propssss' , this.props.data);
        for(var i in this.props.data.TPackagingInstructionLots)
        {
            this.props.data.TPackagingInstructionLots[i].material = this.props.data.material;

        }
        const nestedData = this.props.data.TPackagingInstructionLots

        var nestedRows = _.map(nestedData , (data)=>{
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
        </tr>
            )})
        return(<label>{nestedRows}</label>)

    }
}

export default NestedRows;