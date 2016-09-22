import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Base_Url} from '../../../constants'

class CompanyNameFilterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { }
    }
    componentWillMount() {
        axios.get(Base_Url +"TLocations").then((response) => {
            this.setState({
                location: response.data
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }
    render(){
        var locations = _.map(this.state.location,(location) => {
            return ( 
                <li key={location.id}>
                            <label className="control control--checkbox">{location.locationName}
                                <input type="checkbox" value={location.locationName} id={location.id} onChange={(e) => this.props.onClick(e,location)}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });
        return(

            <div>
                <hr className=" hidden-xs"/>
                    <div className="head_bg">
                        <h6 className="pull-left">AR BULK  </h6>
                        <a href=""  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul>
                       {locations}
                    </ul>
                </div>






                )
    }
}
export default CompanyNameFilterPage;