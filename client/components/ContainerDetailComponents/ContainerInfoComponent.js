import React, { Component } from 'react';

class ContainerInfoComponent extends Component {
	render() {
				var isDomestic = (this.props.info && this.props.info.TShipmentent?this.props.info.TShipmentent.isDomestic:0)
        var chasis_number  = (this.props.info && this.props.info.chasisNumber) ? this.props.info.chasisNumber : 'NA'
        var seal_number  = (this.props.info && this.props.info.sealNumber) ? this.props.info.sealNumber : 'NA'
        var materialNetWeight  = (this.props.info && this.props.info.tareWeight) ? parseInt(this.props.info.tareWeight) * 25 : 'NA'
        var containerTareWeight  = (this.props.info && this.props.info.tareWeight) ? this.props.info.tareWeight : 'NA'
        //var typeConf = (this.props.info && this.props.info.containerTypeConfirmed) ? this.props.info.containerTypeConfirmed : 'NA'
        //if(typeConf ==1){
			//		if(document.getElementById('cType')){
			//			document.getElementById('cType').checked = true;
        //                document.getElementById("cType").disabled = true;
			//		}
        //}
        //var steamConf = (this.props.info && this.props.info.containerSteamshipLineConfirmed) ? this.props.info.containerSteamshipLineConfirmed : 'NA'
        //if(steamConf ==1){
			//		if(document.getElementById('sType')){
			//			  document.getElementById('sType').checked = true
        //                document.getElementById("sType").disabled = true;
			//		}
        //}
        //var loadConf = (this.props.info && this.props.info.containerLoaded) ? this.props.info.containerLoaded : 'NA'
        //var tranConf = (this.props.info && this.props.info.containerInTransit) ? this.props.info.containerInTransit : 'NA'
        //var delConf = (this.props.info && this.props.info.containerDelivered) ? this.props.info.containerDelivered : 'NA'
        //if(loadConf ==1){
			//		if(document.getElementById('lType')){
			//			document.getElementById('lType').checked = true
        //                document.getElementById("lType").disabled = true;
			//		}
        //}
        //if(tranConf ==1){
			//		if(document.getElementById('tType')){
			//			  document.getElementById('tType').checked = true
        //                document.getElementById("tType").disabled = true;
			//		}
        //}
        //if(delConf ==1){
			//		if(  document.getElementById('dType')){
			//			document.getElementById('dType').checked = true
        //                document.getElementById("dType").disabled = true;
			//		}
        //}

        return (
			 <fieldset className="scheduler-border sameHeight">
                                    <legend className="scheduler-border">Container Info</legend>
                                    <ul className="no-space summary_list">
                                        <li>{isDomestic==0?'Chassis #':"" }<b>{isDomestic==0?chasis_number:""}</b></li>
                                        <li>Seal #    <b>{seal_number}</b></li>
                                        <li> Material  Net Weight     <b>{containerTareWeight}</b></li>
                                        <li> {isDomestic==0?"Container Tare Weight":""}<b>{isDomestic==0?containerTareWeight:""}</b></li>
                                        <li className=" pddn-10-top">
                                            <label className="control control--checkbox " >Container Type Confirmed?
                                                {(this.props.info && (this.props.info.containerTypeConfirmed == 1)) ?
                                                    <input type="checkbox" disabled="disabled" checked="checked" id="cType"/>:""}<div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Container Steamship Line Confirmed?
                                                {(this.props.info && (this.props.info.containerSteamshipLineConfirmed == 1))?
                                                <input type="checkbox"  disabled="disabled" checked="checked" id="sType"/>:""}<div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Confirmed Loaded?
                                                {(this.props.info &&( this.props.info.containerLoaded == 1))?
                                                <input type="checkbox" disabled="disabled" checked="checked" id="lType" />:""}<div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox " >Confirmed In Transit?
                                                {(this.props.info && (this.props.info.containerInTransit == 1))?
                                                <input type="checkbox" disabled="disabled" checked="checked" id="tType"/>:""}<div className="control__indicator"></div>
                                            </label>
                                        </li>
                                        <li >
                                            <label className="control control--checkbox" >Confirmed Delivered?
                                                {(this.props.info && (this.props.info.containerDelivered == 1))?<input type="checkbox" disabled checked id="dType"/>:""}
                                               <div className="control__indicator"></div>
                                            </label>
                                        </li>
                                    </ul>
                                </fieldset>
		);
	}
}
export default ContainerInfoComponent
