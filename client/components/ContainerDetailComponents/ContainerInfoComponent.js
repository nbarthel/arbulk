import React, { Component } from 'react';

class ContainerInfoComponent extends Component {
	render() {

        var chasis_number  = (this.props.info && this.props.info.chasisNumber) ? this.props.info.chasisNumber : 'NA'
        var seal_number  = (this.props.info && this.props.info.sealNumber) ? this.props.info.sealNumber : 'NA'
        var materialNetWeight  = (this.props.info && this.props.info.tareWeight) ? parseInt(this.props.info.tareWeight) * 25 : 'NA'
        var containerTareWeight  = (this.props.info && this.props.info.tareWeight) ? this.props.info.tareWeight : 'NA'
        var typeConf = (this.props.info && this.props.info.containerTypeConfirmed) ? this.props.info.containerTypeConfirmed : 'NA'
        if(typeConf ==1){
            document.getElementById('cType').checked = true
        }
        var steamConf = (this.props.info && this.props.info.containerSteamshipLineConfirmed) ? this.props.info.containerSteamshipLineConfirmed : 'NA'
        if(steamConf ==1){
            document.getElementById('sType').checked = true
        }
        var loadConf = (this.props.info && this.props.info.containerLoaded) ? this.props.info.containerLoaded : 'NA'
        var tranConf = (this.props.info && this.props.info.containerInTransit) ? this.props.info.containerInTransit : 'NA'
        var delConf = (this.props.info && this.props.info.containerDelivered) ? this.props.info.containerDelivered : 'NA'
        if(loadConf ==1){
            document.getElementById('lType').checked = true
        }
        if(tranConf ==1){
            document.getElementById('tType').checked = true
        }
        if(delConf ==1){
            document.getElementById('dType').checked = true
        }

        return (
			 <fieldset className="scheduler-border sameHeight">
                                    <legend className="scheduler-border">Container Info</legend>
                                    <ul className="no-space">
                                        <li>Chassis #  <b>{chasis_number}</b></li>
                                        <li>Seal #    <b>{seal_number}</b></li>
                                        <li> Material  Net Weight     <b>{containerTareWeight}</b></li>
                                        <li> Container Tare Weight<b>{containerTareWeight}</b></li>
                                        <li className=" pddn-10-top">
                                            <label className="control control--checkbox " >Container Type Confirmed?
                                                <input type="checkbox"  id="cType"/><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Container Steamship Line Confirmed?
                                                <input type="checkbox"  id="sType"/><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Confirmed Loaded?
                                                <input type="checkbox" id="lType" /><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Confirmed In Transit?
                                                <input type="checkbox" id="tType"/><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox" >Confirmed Delivered?
                                                <input type="checkbox"  id="dType"/><div className="control__indicator"></div>
                                            </label>
                                        </li>
                                    </ul>
                                </fieldset>
		);
	}
}
export default ContainerInfoComponent