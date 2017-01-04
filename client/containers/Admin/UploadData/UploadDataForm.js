import React, { Component } from 'react';
import PalletComponent from './PalletComponent'
import ContainerComponent from './ContainerComponent'
import ShipmentComponent from './ShipmentComponent'
import SteamShipComponent from './SteamShipComponent'
import OriginComponent from './OriginComponent'
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
import LocationComponent from './LocationComponent'
import InventoryComponent from './InventoryComponent'
import { Base_Url } from '../../../constants'
import axios from 'axios'
class UploadDataForm extends Component {
	constructor(props){
		super(props);
		
		this.state = {
						palletIndex : 0,
						containerIndex: 0,
						shipmentIndex: 0,
						steamShipIndex: 0,
						originIndex: 0,
						locationIndex: 0,
						inventIndex: 0,
						isPressed: false
					}
		
		this.palletPostArray = []
		this.containerPostArray = []
		this.shipmentPostArray = []
		this.steamShipPostArray = []
		this.originPostArray = []
		this.locationPostArray = []
		this.inventPostArray = []

		this.palletData = {"id" : 0,
							"active" : 1}
		this.containerData = {"id" : 0,
							  "active" : 1}
		this.shipmentData = { "id":0,
							  "active": 1}					  
		
		this.steamShipData = {"id" : 0,
   							  "active" : 1}
		
		this.originData = {"id" : 0,
						   "active" : 1}

		this.locationData = {"id" : 0,
							"weightTolerance" : 0,
							"active" : 1}				   
		
		this.inventLocData = {"id": 0,
								"active": 1}

		this.containerComponent = [<ContainerComponent key = { this.state.containerIndex } handleContainerChange = {(e) => this.handleContainerChange(e)}/>]
		this.palletComponent = [<PalletComponent key = { this.state.palletIndex } handlePalletChange = {(e) => this.handlePalletChange(e)}/>]
		this.shipmentComponent = [<ShipmentComponent key = { this.state.shipmentIndex } handleShipmentChange = {(e) => this.handleShipmentChange(e)}/>]
		this.steamShipComponent = [<SteamShipComponent key = { this.state.steamShipIndex } handleSteamShipChange = {(e) => this.handleSteamShipChange(e)}/>]
		this.originComponent = [<OriginComponent key = { this.state.originIndex } handleOriginChange = {(e) => this.handleOriginChange(e)}/>]
		this.locationComponent = [<LocationComponent key = { this.state.locationIndex } handleLocationChange = {(e) => this.handleLocationChange(e)}/>]
		this.inventComponent = [<InventoryComponent key = { this.state.inventIndex } inventPostArray = {this.inventPostArray} inventLocData = {this.inventLocData} handleInventLocChange = {(e) => this.handleInventLocChange(e)}/>]
		
		this.onAddShipment = this.onAddShipment.bind(this)
		this.onAddPallet = this.onAddPallet.bind(this)
		this.onAddContainer = this.onAddContainer.bind(this)
		this.onAddSteamShip = this.onAddSteamShip.bind(this)	
		this.onAddOrigin = this.onAddOrigin.bind(this)
		this.onAddData = this.onAddData.bind(this)
		this.onAddLocation = this.onAddLocation.bind(this)
		this.onAddInvent = this.onAddInvent.bind(this)
		
		this.handleShipmentChange = this.handleShipmentChange.bind(this)
		this.handlePalletChange = this.handlePalletChange.bind(this)
		this.handleContainerChange =  this.handleContainerChange.bind(this)
		this.handleSteamShipChange = this.handleSteamShipChange.bind(this)
		this.handleOriginChange = this.handleOriginChange.bind(this)
		this.handleLocationChange = this.handleLocationChange.bind(this)
		this.handleInventLocChange = this.handleInventLocChange.bind(this)
	}

	onAddPallet(e){
		if(this.palletData.palletType != null){
			this.palletPostArray.push(_.cloneDeep(this.palletData))			
			this.palletData.palletType = null
		}else{
			swal("Missing Data","Please fill the current field before adding new fields","info")
			return
		}
		this.palletComponent = this.palletComponent.concat(<PalletComponent key = {this.state.palletIndex + 1} handlePalletChange = {(e) => this.handlePalletChange(e)}/>)
		this.setState({
			palletIndex: this.state.palletIndex + 1
		})
		console.log("Pal",this.palletPostArray)
	}

	onAddSteamShip(e){
		if(this.steamShipData.name != null){
			this.steamShipPostArray.push(_.cloneDeep(this.steamShipData))
			this.steamShipData.name = null
		}else{
			swal("Missing Data","Please fill the current field before adding new fields","info")
			return
		}
		this.steamShipComponent = this.steamShipComponent.concat(<SteamShipComponent key = {this.state.steamShipIndex + 1} handleSteamShipChange = {(e) => this.handleSteamShipChange(e)}/>)
		this.setState({
			steamShipIndex: this.state.steamShipIndex + 1
		})
		console.log("Steam",this.steamShipPostArray)
	}
	
	onAddContainer(e){
		if(this.containerData.name != null){
			this.containerPostArray.push(_.cloneDeep(this.containerData))
			this.containerData.name = null
		}else{
			swal("Missing Data","Please fill the current field before adding new fields","info")
			return
		}
		this.containerComponent = this.containerComponent.concat(<ContainerComponent key = {this.state.containerIndex +1} handleContainerChange = {(e) => this.handleContainerChange(e)}/>)
		this.setState({
			containerIndex: this.state.containerIndex + 1
		})
		console.log("Cont",this.containerPostArray)
	}

	onAddShipment(e){
		if(this.shipmentData.shipmentType != null){
			this.shipmentPostArray.push(_.cloneDeep(this.shipmentData))
			this.shipmentData.shipmentType = null
		}else{
			swal("Missing Data","Please fill the current field before adding new fields","info")
			return
		}
		this.shipmentComponent = this.shipmentComponent.concat(<ShipmentComponent key = {this.state.shipmentIndex + 1}  handleShipmentChange = {(e) => this.handleShipmentChange(e)}/>)
		this.setState({
			shipmentIndex: this.state.shipmentIndex + 1
		})
		console.log("Ship",this.shipmentPostArray);
	}

	onAddOrigin(e){
		if(this.originData.origin !=  null){
			this.originPostArray.push(_.cloneDeep(this.originData))
			this.originData.origin = null
		}else{
			swal("Missing Data","Please fill the current field before adding new fields","info")
			return
		}
		this.originComponent = this.originComponent.concat(<OriginComponent key = {this.state.originIndex + 1} handleOriginChange = {(e) => this.handleOriginChange(e)}/>)
		this.setState({
			originIndex: this.state.originIndex + 1
		})
		console.log("Orig",this.originPostArray)
	}

	onAddLocation(e){
		if(this.locationData.locationName != null && this.locationData.bagsPerPallet != null){
			this.locationPostArray.push(_.cloneDeep(this.locationData))
			this.locationData.locationName = null
			this.locationData.bagsPerPallet = null
		}else{
			swal("Missing Data","Please fill the current fields before adding","info")
			return
		}
		this.locationComponent = this.locationComponent.concat(<LocationComponent key = {this.state.locationIndex + 1} handleLocationChange = {(e) => this.handleLocationChange(e)}/>)
		this.setState({
				locationIndex: this.state.locationIndex + 1
		})
		console.log("LOC",this.locationPostArray)
	}

	onAddInvent(e){
		if(this.inventLocData.locationName != null){
			this.inventPostArray.push(_.cloneDeep(this.inventLocData))
			this.inventLocData.locationName = null
		}else{
			swal("Missing Data","Please fill the current fields before adding","info")
			return
		}
		this.inventComponent = this.inventComponent.concat(<InventoryComponent key = { this.state.inventIndex + 1} inventPostArray = {this.inventPostArray} inventLocData = {this.inventLocData}  handleInventLocChange = {(e) => this.handleInventLocChange(e)}/>)
		this.setState({
			inventIndex: this.state.inventIndex + 1
		})
		console.log("INVENT",this.inventPostArray)
	}

	handleShipmentChange(e){
		this.shipmentData[e.target.id] = e.target.value
		console.log(this.shipmentData)
	}

	handlePalletChange(e){
		this.palletData[e.target.id] = e.target.value
		console.log(this.palletData)
	}

	handleContainerChange(e){
		this.containerData[e.target.id] = e.target.value
		console.log(this.containerData)
	}

	handleSteamShipChange(e){
		this.steamShipData[e.target.id] = e.target.value
		console.log(this.steamShipData)
	}

	handleOriginChange(e){
		this.originData[e.target.id] = e.target.value
		console.log(this.originData)
	}

	handleLocationChange(e){
		this.locationData[e.target.id] = e.target.value
		console.log(this.locationData)
	}
	
	handleInventLocChange(e){
		this.inventLocData[e.target.id] = e.target.value
		console.log(this.inventLocData)
	}

	onAddData(e){
		e.preventDefault()
		if(this.palletData.palletType != null){
			this.palletPostArray.push(_.cloneDeep(this.palletData))
			this.palletData.palletType = null
		}
		if(this.containerData.name != null){
			this.containerPostArray.push(_.cloneDeep(this.containerData))
			this.containerData.name  = null
		}
		if(this.shipmentData.shipmentType != null){
			this.shipmentPostArray.push(_.cloneDeep(this.shipmentData))
			this.shipmentData.shipmentType = null
		}
		if(this.steamShipData.name != null){
			this.steamShipPostArray.push(_.cloneDeep(this.steamShipData))
			this.steamShipData.name = null
		}
		if(this.originData.origin != null){
			this.originPostArray.push(_.cloneDeep(this.originData))
			this.originData.origin = null
		}
		if(this.locationData.locationName != null && this.locationData.bagsPerPallet != null){
			this.locationPostArray.push(_.cloneDeep(this.locationData))
			this.locationData.locationName = null
			this.locationData.bagsPerPallet = null
		}
		if(this.inventLocData.locationName != null || this.inventPostArray.length == 0){
			this.inventPostArray.push(_.cloneDeep(this.inventLocData))
		}
		/**///console.log(this.palletPostArray)
		this.setState({
			isPressed: true
		})
		axios.post(Base_Url + "TPalletTypes",this.palletPostArray).then((Presponse)=>{
				if(Presponse.statusText != "OK"){
					swal("Error","Failed To Upload Pallet Entry","erorr")
					return
				}
				axios.post(Base_Url + "TContainerTypes",this.containerPostArray).then((Cresponse)=>{
				if(Cresponse.statusText != "OK"){
					swal("Error","Failed To Upload Container Entry","erorr")
					return	
				}
				
				axios.post(Base_Url + "TShipmentTypes",this.shipmentPostArray).then((Sresponse)=>{
					if(Sresponse.statusText != "OK"){
						swal("Error","Failed To Upload Shipment Type Entry","erorr")
						return
					}
					console.log("Sresponse",Sresponse)
					axios.post(Base_Url + "TSteamshipLines",this.steamShipPostArray).then((STresponse)=>{
						if(STresponse.statusText != "OK"){
						swal("Error","Failed To Upload SteamShiment Entry","erorr")
						return
						}
						axios.post(Base_Url + "TOrigins",this.originPostArray).then((Oresponse)=>{
							if(Oresponse.statusText != "OK"){
								swal("Error","Failed To Upload Origin Entry","error")
								return
							}
							axios.post(Base_Url + "TLocations",this.locationPostArray).then((Lresponse)=>{
								if(Lresponse.statusText != "OK"){
									swal("Error","Failed To Upload Location Entry","error")
									return
								}
								axios.post(Base_Url + "TInventoryLocations",this.inventPostArray).then((Iresponse)=>{
									console.log("Iresponse",Iresponse)
									if(Iresponse.statusText != "OK"){
										swal("Error","Failed To Upload Inventory Location Entry","error")
										return
									}else{
										swal({
										title: "Success",
										text: "User Data Has Been Updated",
										type: "success",
										showCancelButton: false
											},
										function(isConfirm){
										window.location.reload();
										}
										)
									}
								})
							})
						})
					})
				})
			})
		})
	}

	render() {
	var style = {
			paddingRight: "200px",
			paddingTop: "31px",
			float: "right",

		}
	var styleRight  = {
			paddingRight: "40px",
			paddingTop: "31px",
			float: "right",

		}	
	var styleRightBot = {
			paddingRight: "245px",
			paddingTop: "31px",
			float: "right"
	}	
		return (
			<section className="admin">   
			<div className="container-fluid"> 
				<div className="">   
					<form className="form-horizontal">
					<fieldset className="scheduler-border no-right-border">
				        <legend className="scheduler-border">Upload Data</legend>
						<div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
						
							<div className="form-group">
							<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {style}><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddPallet }></i> </div>	
							<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7"><label htmlFor="usr" >Type of Pallet</label></div>	
							{this.palletComponent}
							</div>
							
							
							<div className="form-group">
							<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {style} ><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddContainer } ></i> </div>
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >Container Type</label></div>	
								
								{this.containerComponent}
									
								
							</div>
							
							<div className="form-group">
								<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {style}><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddShipment }></i> </div>						
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >Type of Shipment</label></div>	
								
								{this.shipmentComponent}
									
								
							</div>
							<div className="form-group">
							<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {style}><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddSteamShip } ></i> </div>
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >Steamship Line Type</label></div>	
								
								{this.steamShipComponent}
								
							
								
									
								
							</div>
							<div className="form-group">
								<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {style}><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddOrigin }></i> </div>
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >Origins</label></div>	
								
								{this.originComponent}
								
								
								
									
								
							</div>
								
						</div>
						
<div className=" col-lg-1 col-md-1 col-sm-1 col-xs-12"> 
<div className="verticalLine hidden-xs"></div> <div className="hidden-md hidden-lg hidden-sm  visible-xs-block horizontallLine"></div> 
</div>
						
						<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
						
							<div className="form-group">
							<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {styleRight} ><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddLocation }></i> </div>
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >ARB Location</label></div>	
								
								{this.locationComponent}

									
								
							</div>
							
							
							<div className="form-group">
							<div className="add_btn text_left col-lg-1 col-md-1 col-sm-1 col-xs-1 " style = {styleRightBot}><i className="fa-2x fa fa-plus base_color" aria-hidden="true" onClick = { this.onAddInvent }></i> </div>
								<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "><label htmlFor="usr" >Inventory Locations</label></div>	
								
								{this.inventComponent}
								
									
								
							</div>
							
							
							
							
							
						</div>
					</fieldset>
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">
							<div className="col-lg-12 padding-20-last-l">
							  <button type="submit" className={this.state.isPressed == false ? "btn  btn-primary text-uppercase" : "btn  btn-primary text-uppercase disabled"} onClick = {this.onAddData}>{this.state.isPressed == false ? "Add Data" : "Please Wait"}</button>
							</div>
						</div>					
					</div>
					
					</form>
				</div>
			</div>
	</section>	   
		);
	}
}
export default UploadDataForm