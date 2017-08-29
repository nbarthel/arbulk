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

    componentWillReceiveProps(nextProps){
        if(nextProps.locationSelected && nextProps.locationSelected.length>0){
            this.refs["l"+nextProps.locationSelected[nextProps.locationSelected.length-1].locationId].checked = true;
        }
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
        

    render(){

    let locations = _.map(this.state.location,(location) => {
            return ( 
                <li key={location.id}>
                            <label className="control control--checkbox">{location.locationName}
                                <input type="checkbox" ref = {"l"+location.id} value={location.locationName} onChange={(e) => this.props.onCompanyFilter(e,location)} id={location.id}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });
    //console.log(this.state.location)
     return(<div>
               
                    <div className="head_bg">
                        <h6 className="pull-left">AR BULK LOCATION </h6>
                    </div>
                    <ul>
                       {locations}
                    </ul>
                </div>






                )
    }
}
export default CompanyNameFilterPage;