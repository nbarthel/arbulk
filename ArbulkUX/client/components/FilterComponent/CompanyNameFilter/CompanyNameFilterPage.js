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
    componentWillReceiveProps(nextProps){
        if(nextProps.locationSelected && nextProps.locationSelected.length>0){
            this.refs[nextProps.locationSelected[nextProps.locationSelected.length-1].location_id].checked = true;
        }
    }

    render(){
    let locations = _.map(this.state.location,(location) => {
            return (
                <li key={location.id}>
                            <label className="control control--checkbox">{location.locationName}
                                <input ref = {location.id} type="checkbox" value={location.locationName} onChange={(e) => this.props.onCompanyFilter(e,location)} id={location.id}/><div className="control__indicator"></div>
                            </label>
                        </li>

                )
        });
     return(<div>
                <hr className=" hidden-xs"/>
                    <div className="head_bg">
                        <h6 className="pull-left">AR BULK LOCATION</h6>
                    </div>
                    <ul>
                       {locations}
                    </ul>
                </div>






                )
    }
}
export default CompanyNameFilterPage;
