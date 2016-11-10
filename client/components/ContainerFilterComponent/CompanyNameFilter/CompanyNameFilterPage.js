import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Base_Url} from '../../../constants';
class CompanyNameFilterPage extends React.Component{
    constructor(props){
        super(props);
        this.checkedCompany = this.props.checkedCompany
        this.state = {
          
         }
         /*this.location = [{locationName:"UK",id: 0},
        {locationName:"US",id:1},
        {locationName:"Canada",id:2},
        {locationName:"Bhatinda",id:3},
        {locationName:"East",id:4},
        {locationName:"Wesr",id:5},
        {locationName:"xyz",id:6}]
    }*/
}
    componentDidMount() {

        axios.get(Base_Url+"TLocations").then((response) => {
            this.setState({
                location: response.data
            })
        })
        .catch(function(err){
            console.log(err)
        })


    }
        

   /* onClick(e,location){
        if(e.target.checked){
            this.props.checkedCompany[e.target.id] = e.target.value;
            this.props.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
           }
        else if (!e.target.checked){
         delete this.props.checkedCompany[e.target.id]
            let value = e.target.value
            let index = this.props.buttonDisplay.indexOf(e.target.value)
            if(index !== -1)
             this.props.buttonDisplay = _.without(this.props.buttonDisplay,value)       
                  console.log(this.props.buttonDisplay)
                   }
    }
*/

    render(){

    let locations = _.map(this.state.location,(location) => {
            return ( 
                <li key={location.id}>
                            <label className="control control--checkbox">{location.locationName}
                                <input type="checkbox" value={location.locationName} onChange={(e) => this.props.onCompanyFilter(e,location)} id={location.id}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });
    //console.log(this.state.location)
     return(<div>
               
                    <div className="head_bg">
                        <h6 className="pull-left">AR BULK  </h6>
                        <a href="javascript:void(0)"  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul>
                       {locations}
                    </ul>
                </div>






                )
    }
}
export default CompanyNameFilterPage;