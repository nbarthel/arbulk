import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
class TruckerFilter extends Component {
constructor(props){
	super(props);
	this.state = { }
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
                                <input type="checkbox" value={location.locationName} onChange={(e) => this.props.onCompanyFilter(e,location)} id={location.id}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });
    //console.log(this.state.location)
     return(<div>
                
                    <div className="head_bg">
                        <h6 className="pull-left">Trucker</h6>
                        <a href="javascript:void(0)"  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul>
                       {locations}
                    </ul>
                </div>






                )
    }
}
	
export default TruckerFilter;