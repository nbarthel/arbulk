import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
class ContainerTypeFilter extends Component {
constructor(props){
	super(props);
	this.state = { }
}
	 componentDidMount() {
        axios.get(Base_Url+"TContainerTypes").then((response) => {
            this.setState({
                containerType: response.data
            })
        })
        .catch(function(err){
            console.log(err)
        })


    }
        

    render(){

    let containerType = _.map(this.state.containerType,(containerType) => {

        debugger;
            return ( 
                <li key={containerType.id}>
                            <label className="control control--checkbox">{containerType.name}
                                <input type="checkbox" value={containerType.name} onChange={(e) => this.props.onContainerFilter(e,containerType)} id={containerType.id}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });
    
     return(<div>
               
                    <div className="head_bg">
                        <h6 className="pull-left">Container Type</h6>
                        <a href="javascript:void(0)"  className="pull-right text_right"> Show All</a>
                    </div>
                    <ul>
                       {containerType}
                    </ul>
                </div>






                )
    }
}
	
export default ContainerTypeFilter;