import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
class SteamshipLineFilter extends Component {
constructor(props){
	super(props);
	this.state = { }
}
	 componentDidMount() {
        axios.get(Base_Url+"TSteamshipLines").then((response) => {
            this.setState({
                steamShip: response.data
            })
        })
        .catch(function(err){
            console.log(err)
        })


    }
    componentDidUpdate(){
    debugger
        if(this.props.selectedSteamShip.length>0){
            for(let i=0;i<this.props.selectedSteamShip.length;i++){
                this.refs["steam"+this.props.selectedSteamShip[i]].checked = true
            }
        }
    }
    render(){

    let steamShip = _.map(this.state.steamShip,(steamShip) => {
            return (
                <li key={location.id}>
                            <label className="control control--checkbox">{steamShip.name}
                                <input type="checkbox" ref = {"steam"+steamShip.id} value={steamShip.name} onChange={(e) => this.props.onSteamShipFilter(e,steamShip)} id={steamShip.id}/><div className="control__indicator"></div>

                            </label>
                        </li>

                )
        });

     return(
         <div>

             <div className="head_bg">
                 <h6 className="pull-left">SteamShipLine</h6>

             </div>
						 <ul className="scroll">
								{steamShip}

						 </ul>
             {/*<ul>
                 <li>
                     <label className="control control--radio">Yes
                         <input type="radio"  name="steam_yes" value="1" id="steamYes" onChange={this.props.SteamLine}/><div className="control__indicator"></div>
                     </label>
                 </li>
                 <li>
                     <label className="control control--radio">No
                         <input type="radio"  name="steam_yes" id=""  value="0" id="steamNo" onChange={this.props.SteamLine}/><div className="control__indicator"></div>
                     </label>
                 </li>
             </ul>*/}
         </div>




                )
    }
}

export default SteamshipLineFilter;
