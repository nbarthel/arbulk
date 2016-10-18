import React, { Component } from 'react';
import _ from 'lodash';
import InventoryHistory from './InventoryHistory';
import { createDataLoader } from 'react-loopback'
import SweetAlert from 'sweetalert-react';
import '../../public/stylesheets/sweetalert.css';
import { Base_Url } from '../../constants'
import axios from 'axios'
import { TotalComponent } from './TotalComponent'
class CurrentInventory extends Component {
	constructor(){
	super();
	this.postObj = { }
	this.postObj1 = { }
	this.AllObj = { }
	this.state={
		hideEdit: 'block',
		showEdit : 'none',
		addFlag : false
		
		}
	this.currentInventArray
	this.rows = [ ] 
	this.index
	this.addFlag = false
	this.selectedRow = { }
	this.edit = false
	this.splRow = false
	this.rowAdd = false
	this.PILots 
	this.onClick=this.onClick.bind(this);
	this.handleInputChange =  this.handleInputChange.bind(this)
	this.handleLocationChange = this.handleLocationChange.bind(this)
	this.onAdd = this.onAdd.bind(this)
	//this.onSelect = this.onSelect.bind(this)
	this.backupRow = { }
	this.onSaveChange = this.onSaveChange.bind(this)
	this.splitRow = this.splitRow.bind(this)
	//this.onEdit = this.onEdit.bind(this)
	this.orignalTble
}



componentWillReceiveProps(nextProps) {
	debugger
	let id = this.props.lID
	let lotId = nextProps.lotId
	var PIview = createDataLoader(InventoryHistory, {
            queries: [{
                endpoint: 'TPiInventories',
                filter:  
                {"include" : ["TInventoryLocation","TPackagingInstructionLots"] 
            }
                
            }]
        });
//"include": {"relation": "classes", "scope": {"include": ["teachers","students"]}}
	var base1 = 'TPackagingInstructionLots/'+ lotId;
          this.urlnew = PIview._buildUrl(base1, {
           include: {"relation": "TPiInventory", "scope": {"include": ["TInventoryLocation"]}}
           //include : ['TPiInventory',{"relation":'TPiInventory',"scope":{"include":["TInventoryLocation"]}}]
        });
           	console.log("new URl value>>>>>> bhiya jara dekh ke",this.urlnew)


           	 $.ajax({
            url: this.urlnew,
            success:function(data){
            	debugger;
                console.log('ajax>>>>>>>>>>>>>> ',data);
              
              	
              //	console.log("lengthandindexandarr",length,index,arr)
                this.setState({
                	currentInventory : data,
                	rows : data.TPiInventory
                })
                this.orignalTble = _.cloneDeep(this.state.rows)
                console.log("OrignalTable",this.orignalTble)
               }.bind(this)

        })
}
	onEdit(index){
		debugger
		this.index = index
		/*if(this.orignalTble == undefined){
		this.orignalTble = _.cloneDeep(this.state.rows)
		}*/
		if(!this.splRow && !this.rowAdd){
		this.edit = true
		this.row = _.cloneDeep(this.rows[this.index])
		this.selectedRow = _.cloneDeep(this.rows[this.index])
		console.log(this.selectedRow)
		//if(this.selectedRow.noOfBags != undefined && this.selectedRow.)

		if (this.selectedRow.noOfBags != undefined && this.selectedRow.TInventoryLocation != undefined && this.selectedRow.weight != undefined) {
		this.refs.noOfBags.value = this.selectedRow.noOfBags
		this.refs.locationName.value = this.selectedRow.TInventoryLocation.locationName
		this.refs.weight.value = this.selectedRow.weight
		this.setState({
				hideEdit: 'none',
				showEdit : 'block'
			})
}
		else{
			swal("Error","All fields must be present",'error')
		}
		}
		else{
			swal("error","Press Save or Cancel before starting a new task","error")
		}
}
	
	splitRow(index){
		console.log("OrignalTable",this.orignalTble)
		this.index = index
		/*if(this.orignalTble == undefined){
			this.orignalTble = _.cloneDeep(this.state.rows)
		}*/
		if(!this.edit && !this.rowAdd){
		this.splRow = true
		//this.backupRow = _.cloneDeepthis.state.currentInventory[this.index]
		this.row = _.cloneDeep(this.state.rows[this.index])
		this.selectedRow = _.cloneDeep(this.state.rows[this.index])
		if(this.selectedRow.noOfBags != undefined && this.selectedRow.TInventoryLocation != undefined && this.selectedRow.weight != undefined){
		this.refs.noOfBags.value = this.selectedRow.noOfBags
		this.refs.locationName.value = this.selectedRow.TInventoryLocation.locationName
		this.refs.weight.value = this.selectedRow.weight
			this.setState({
					hideEdit : 'none',
					showEdit : 'block'
			})
		}
		else{
			swal("Error","All fields must be present",'error')
		}
	}
else{
	swal("error","Press Save or Cancel before starting a new task","error")
}
}

		onClick(){
			//debugger
			if(this.state.rows.length != 0){
			this.addRow = _.cloneDeep(this.state.rows[0])
				let dummy = {active : 1 ,locationName : "Vegas" , location_id : this.props.lid}
				this.addRow.TInventoryLocation = dummy
			
			console.log(">>>>>>>>addRow",this.addRow)
		}
		else{
			this.addRow = {active : 1 ,createdBy: 1,createdOn: "2016-10-02T00:00:00.000Z",id: 1,inventoryLocationId:this.props.lid,inventory_location_id:this.props.lID,lot:"13",modifiedBy:1,modifiedOn:"2016-10-02T00:00:00.000Z",noOfBags:400,piLotId:this.props.lID,weight:22}
			let dummy = {active : 1 ,locationName : "Vegas" , location_id : this.props.lid}
			this.addRow.TInventoryLocation = dummy
			console.log(this.addRow)
		}
			this.setState({
				hideEdit: 'none',
				showEdit : 'block'
			})

		}

	onCancel(){
		debugger
			//this.rows.splice(this.index,2,this.selectedRow)
		     if(this.edit){
			    //this.rows.splice(this.index,1,this.row)
			    this.setState({
			    	hideEdit : 'block',
					showEdit : 'none',
			    	rows : this.orignalTble
			    })
			   
			    this.edit = false
		    }
		     else if(this.splRow)
		    { 
		    	this.setState({
		    		hideEdit : 'block',
					showEdit : 'none',
		    		rows : this.orignalTble
		    	})
		    	this.splRow = false
	        }
		      else if(this.addRow != undefined){
		      	//debugger;
		      	if(JSON.stringify(this.addRow) === JSON.stringify(this.rows[this.rows.length-1])){
			   this.rows.pop()
			   this.rowAdd = false
			}
		    }
		    else if(this.delete){
		    	debugger
		    	this.setState({
		    		hideEdit : 'block',
					showEdit : 'none',
		    		rows : this.theTable
		    	})
		    	this.delete = false
		    }
			
				/*this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					
				})*/
				/*let refe = this.res*/
				this.refs.noOfBags.value = null
				this.refs.locationName.value = null
				this.refs.weight.value = null
				//this.radioCheck = false
				//this.refs['ref'+this.index].checked = false
				this.index = undefined
			}

	handleInputChange(e){
				if(this.index != undefined){
				this.selectedRow[e.target.id] =  e.target.value
				}
				else{

					this.addRow[e.target.id] = e.target.value
					console.log(this.addRow)
				}
			}
	handleLocationChange(e){
				if(this.index != undefined)
					{
				this.selectedRow.TInventoryLocation[e.target.id] = e.target.value
				console.log("^><^><^>^<>^<^<>^<^><^>^<^>^<",this.selectedRow)}
				else{
					this.addRow.TInventoryLocation[e.target.id] = e.target.value
					console.log(this.addRow)
				}
			}
		onAdd(){
			if(this.edit){
				this.rows.splice(this.index,1,this.selectedRow)
				
				this.refs.noOfBags.value = null
				this.refs.locationName.value = null
				this.refs.weight.value = null
				this.forceUpdate();		
				console.log("Orignal Row",this.row)
			}
			else if(this.splRow) {
			
			if(this.row.noOfBags >= this.selectedRow.noOfBags && this.row.weight >= this.selectedRow.weight)
			{
			if(this.row.noOfBags != this.selectedRow.noOfBags || this.row.weight != this.selectedRow.weight){
			if(this.row.noOfBags != this.selectedRow.noOfBags){
			this.row.noOfBags = this.row.noOfBags - this.selectedRow.noOfBags
			}
			if(this.row.weight != this.selectedRow.weight){
			this.row.weight = this.row.weight - this.selectedRow.weight
			}
			this.state.rows.splice(this.index,1,this.row,this.selectedRow)
			this.refs.noOfBags.value = null
			this.refs.locationName.value = null
			this.refs.weight.value = null
			this.forceUpdate();
			this.setState({
				addFlag : true
			})
			}
			else if(this.row.noOfBags == this.selectedRow.noOfBags && this.row.weight == this.selectedRow.weight){
				this.state.rows.splice(this.index,1,this.selectedRow)
				this.refs.noOfBags.value = null
				this.refs.locationName.value = null
				this.refs.weight.value = null
				this.forceUpdate();
				this.setState({
					addFlag : true
				})
			}
			
			
			
			}
			else {
				swal("Error","Please Enter Appropriate Values","error")
			}

			
	}
	else {//debugger
		 this.rowAdd = true
		 if(this.refs.noOfBags.value != "" &&	this.refs.locationName.value != "" && this.refs.weight.value != ""){
		 this.rows.push(this.addRow)
		}
		else{
			swal("Error","All fields must be filled","error");
		}
		 this.refs.noOfBags.value = null
		 this.refs.locationName.value = null
		 this.refs.weight.value = null
	}
						
}				
		
	/*	onSelect(e){ 
			console.log("check",this.props.checked)
			//this.radioCheck = true
			this.index = e.target.value
			console.log("qwertyqwertyqwerty",this.index)
			//console.log("qwertyqwertyqwerty",this.selectedRow)
		}*/
		onDelete(index){
			debugger
			this.index = index
			if(this.prevTble == undefined){
				this.prevTble = _.cloneDeep(this.state.rows)
			}
			this.delete = true
			this.state.rows.splice(this.index,1)
			this.setState({
				hideEdit : 'node',
				showEdit : 'block',
			})
		}
		calculateWeight(){
			debugger
			this.totalBags = 0
			this.totalWeight = 0
			this.totalRailcarWeight = 0
			//console.log("AllData",this.allData)
			for(let i=0;i<this.state.rows.length;i++){
				this.totalBags = parseInt(this.totalBags)+parseInt(this.state.rows[i].noOfBags)
   				this.totalWeight = parseInt(this.totalWeight)+parseInt(this.state.rows[i].weight)
   				console.log("BAGSBAGSBAGS",this.totalBags)
   				console.log("WEIGHTWEIGHTWEIGHT",this.totalWeight)
		}
		for(let k = 0 ; k <(this.props.lots).length ; k++ ){
			this.totalRailcarWeight = parseInt(this.totalRailcarWeight) + parseInt(this.props.lots[k].weight)
		}
		//this.totalBags = this.totalBags % 2 == 0 ?this.totalBags /2 : (this.totalBags +1) / 2
        //this.totalWeight = this.totalWeight % 2 == 0 ?this.totalWeight /2 : (this.totalWeight +1) / 2
	}

		onSaveChange(e){
			if(this.edit){
				this.CID = this.props.lID
				this.checked = this.props.checked
				this.dummyObj = _.cloneDeep(this.state.rows[this.index])
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.state.rows[this.index],'TInventoryLocation')

				console.log("newnewnewnewnew",InvObj,InvtLocation)
				Object.defineProperty(this.postObj,'Tinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvObj
																})
				Object.defineProperty(this.postObj,'Tpinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvtLocation
																})
				//console.log('editposteditposteditpost',this.postObj)
			console.log("EditpostObject>>>><<<<>>>><<<<",this.postObj)
			console.log("inside save change",this.checked)
			this.url = Base_Url+"TInventoryLocations/updatebagweight"
			$.ajax({
				type:"POST",
				url:this.url,
				data:this.postObj,
				success:function(){
					
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
			if(this.checked){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.edit = false
			this.postObj = { }
			console.log(this.edit)
			console.log("empty",this.postObj)
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					addFlag : false
				})
			}
			else if(this.splRow){
				this.CID = this.props.lID
				console.log(">>>>>>>>spl",this.row,this.selectedRow)
				this.dummyObj = _.cloneDeep(this.state.rows[this.index])
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.state.rows[this.index],'TInventoryLocation')

				console.log("newnewnewnewnew",InvObj,InvtLocation)
				Object.defineProperty(this.postObj,'Tinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvObj
																})
				Object.defineProperty(this.postObj,'Tpinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvtLocation
																})
				//this.spldummyObj = _.cloneDeep(this.state.currentInventory[this.index])
				console.log(this.selectedRow)
				let InvtLocation1 = this.selectedRow.TInventoryLocation
				let InvObj1 = _.omit(this.selectedRow,'TInventoryLocation')

				console.log("newnewnewnewnew",InvObj1,InvtLocation1)
				Object.defineProperty(this.postObj1,'Tinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvObj1
																})
				Object.defineProperty(this.postObj1,'Tpinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvtLocation1
																})
				//console.log('editposteditposteditpost',this.postObj)
			console.log("SplitpostObject>>>><<<<>>>><<<<",this.postObj)
			console.log("SplitpostObject1>>>><<<<>>>><<<<",this.postObj1)
				this.url = Base_Url+"TInventoryLocations/updatebagweight"
			$.ajax({
				type:"POST",
				url:this.url,
				data:this.postObj,
				success:function(){
					
				},
			})
			this.url1 = Base_Url+"TInventoryLocations/addbagweight"
			$.ajax({
				type:"POST",
				url:this.url1,
				data:this.postObj1,
				success:function(){
					
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
			if(this.checked){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.splRow = false
			this.postObj = { }
			console.log(this.splRow)
			console.log("empty",this.postObj)
			
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					addFlag : false
				})

			}
			else if(!this.edit && !this.splRow){
				//debugger;
				this.CID = this.props.lID
				this.checked = this.props.checked
				this.dummyObj = _.cloneDeep(this.addRow)
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.addRow,'TInventoryLocation')

				console.log("newnewnewnewnew",InvObj,InvtLocation)
				Object.defineProperty(this.postObj,'Tinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvObj
																})
				Object.defineProperty(this.postObj,'Tpinventory',{
																enumerable:true,
																configurable:true,
																writable:true,
																value:InvtLocation
																})
			console.log("AddpostObject>>>><<<<>>>><<<<",this.postObj)
			console.log("inside save change",this.checked)
			this.url = Base_Url+"TInventoryLocations/addbagweight"
			$.ajax({
				type:"POST",
				url:this.url,
				data:this.postObj,
				success:function(){
					
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
			if(this.checked){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",weight:this.totalWeight})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.rowAdd = false
			this.postObj = { }
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					addFlag : false
				})
			}
		}

	render() {
		debugger
		this.newCurrentInvent = this.state.currentInventory
		if(this.newCurrentInvent != undefined){
			//console.log("I AM IN")
			for(var i in this.newCurrentInvent.TPiInventory){
			this.newCurrentInvent.TPiInventory[i].lot = this.newCurrentInvent.lot_number

		}
		this.currentInventArray = this.newCurrentInvent.TPiInventory
		}
		console.log("999999999999999999999999",this.state.rows)
		this.rows = this.state.rows
		if(this.state.rows != undefined && this.props.lots != undefined){
			debugger
				console.log("GOING TO CALCULATE")
				this.calculateWeight()
		}
		if(this.props.lots){
		this.PILots = this.props.lots
	}
		
	
		console.log("###################",this.state.rows)
		//debugger;
		if(this.rows != undefined){
		var inventory = _.map(this.rows,(invent,index) => {
			if(invent.TInventoryLocation)
			{      	return (
					<tr key={index}>
					<td>{invent.TInventoryLocation? invent.TInventoryLocation.locationName : ''}</td>
					<td>{invent.noOfBags}</td>
					<td>{invent.weight}</td>
					<td>{invent.lot}</td>
					<td>
					<i className="fa fa-pencil-square-o act-btn" value = {index} onClick = {(e) => {this.onEdit(index)}} aria-hidden="true"></i>
					<i className="fa fa-plus-square-o act-btn" value = {index} onClick = {(e) => {this.splitRow(index)}} aria-hidden="true"></i>
					<i className="fa fa-trash-o act-btn" value={index} onClick = {(e) => {this.onDelete(index)}} aria-hidden="true"></i></td>
					</tr>
				)
			}

		})
	
	
}
		return (
			 <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> 
	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 active">
	 	 <div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12"> 
				<div className="table-responsive">	
				 <h5>Current Inventory</h5>
				 <div id="edit" className="edit" style={{display: this.state.showEdit}}>			
			    <div className="form-group">
					<div className="col-md-3  col-sm-6 col-xs-6">
					  <input type="text" onChange={this.handleInputChange} ref="noOfBags" className="form-control " id="noOfBags" placeholder="# of bags" />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="text" onChange={this.handleLocationChange} ref="locationName" className="form-control" id="locationName" placeholder="Inv. Loc." />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="text" onChange={this.handleInputChange} ref = "weight" className="form-control" id="weight" placeholder="Weight"/>
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group ">
					<div className="col-md-3 col-sm-6 col-xs-6 text_right  ">
					 <button type="button" onClick={this.onAdd}  className="btn btn-primary btn_right_no_margin">ADD</button>
				</div>		
                </div>		    
				
			</div>
					<table className="table table-striped">
						<thead className="base_bg">
						  <tr >				
							<th>Inv. Location</th>
							<th>Bags</th>
							<th>Weight</th>
							<th>Lot #</th> 
							<th>Action </th>				
						</tr>
						</thead>
						<tbody>
							{inventory}
							<tr>
							<th>Total</th>
							<th>{this.totalBags}</th>
							<th>{this.totalWeight}</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="edit" style={{display:this.state.showEdit}}>
				<div className="pull-left padding-20-last-l"><button type="button" id="inventory-save" onClick={this.props.onSaveChange} onClick = {this.onSaveChange} className="btn  btn-primary tex-uppercase">Save Changes</button> </div>
				 <div className="pull-left padding-20-all"><button type="button" id="cancel" onClick={this.onCancel.bind(this)}  className="btn  btn-gray tex-uppercase">CANCEL</button> </div>				 
				</div>
				<div className="pull-left padding-20-last-l" style={{display:this.state.hideEdit}}><button type="button" id="inventory-edit" className="btn  btn-orange tex-uppercase" onClick={this.onClick}>Edit Inventory</button> </div>
			</div>
			<div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12"> 
				<div className="table-responsive">	
				 <h5>&nbsp; </h5>
					<TotalComponent totalRailcarWeight = {this.totalRailcarWeight} totalWeight = {this.totalWeight} />
				</div>
				
				<label className="control control--checkbox ">Packaging Complete 
				  <input type="checkbox" onChange={this.props.onCheckBoxChange} id="row1"/><div className="control__indicator"></div>
				</label>	
				
			</div>
		</div>
	</div>
		);
	}
}
export default CurrentInventory;