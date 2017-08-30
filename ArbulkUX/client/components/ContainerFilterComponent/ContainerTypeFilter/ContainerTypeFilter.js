import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
class ContainerTypeFilter extends Component {

    constructor(props){
        super(props);
        this.state = { }
    }
    componentDidUpdate(){
        var tempThis = this
        if(this.props.selectedContainerType && this.props.selectedContainerType.length>0){
            this.props.selectedContainerType.forEach(function(selectedContainerType){
                if(tempThis.refs && tempThis.refs["contType"+selectedContainerType])
                    tempThis.refs["contType"+selectedContainerType].checked = true
            });
        }
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
            return ( 
                <li key={containerType.id}>
                            <label className="control control--checkbox">{containerType.name}
                                <input type="checkbox" ref = {"contType"+containerType.id} value={containerType.name} onClick={(e) => this.props.onContainerFilter(e,containerType)} id={containerType.id}/><div className="control__indicator"></div>

                            </label>
                        </li>
                )
        });
     return (
                <div>
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