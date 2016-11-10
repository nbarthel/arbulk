import React, { Component } from 'react';
import _ from 'lodash';
import InventoryHistory from './InventoryHistory';
import { createDataLoader } from 'react-loopback'
import SweetAlert from 'sweetalert-react';
import '../../public/stylesheets/sweetalert.css';
import { Base_Url } from '../../constants'
import axios from 'axios'
import { TotalComponent } from './TotalComponent'
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
class CurrentInventory extends Component {
	constructor(){
	super();
	this.postObj = { }
	this.postObj1 = { }
	this.AllObj = { }
	this.state={
		hideEdit: 'block',
		showEdit : 'none',
		addFlag : false,
		errors: { }
		}
	this.currentInventArray
	 
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
	this.actualDeleteObj = { }
	this.editPostArray = [ ]
	this.splitPostArray = [ ]
	this.splitAddPostArray = [ ]
	this.addPostArray = [ ]
	this.deleteArray = [ ]
	this.isPresent = false
	this.isSplitPresent = false
	this.deletePostArray = [ ]
}


componentWillReceiveProps(nextProps) {

	var stamp = this.props.stamp
    this.stamp = stamp
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
            	console.log('ajax>>>>>>>>>>>>>> ',data);
              
              	if(data.stamp_confirmed){
                     document.getElementById('rowstamp').checked = true
				}
              //	console.log("lengthandindexandarr",length,index,arr)
                this.setState({
                	currentInventory : data,
                	rows : data.TPiInventory
                })
                if(this.orignalTble === undefined){

                this.orignalTble = _.cloneDeep(this.state.rows)
               }
                console.log("OrignalTable",this.orignalTble)
               }.bind(this)

        })
}
	onEdit(index){
		this.index = index
		console.log("BeforeEdit",this.orignalTble)
		if(!this.splRow && !this.rowAdd){
		this.edit = true
		this.row = _.cloneDeep(this.state.rows[this.index])
		this.selectedRow = _.cloneDeep(this.state.rows[this.index])
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
			debugger;
			var stamp = localStorage.getItem('stamp')
			localStorage.removeItem('stamp')
     		if(this.props.lotId){
			if(this.state.currentInventory.status == "UNCONFIRMED" || this.state.currentInventory.status == "CONFIRMED" || this.state.currentInventory.status == "READY"){
				swal("","The lot order cannot be edited","info")
				return
			}

			if(stamp == null){
				if(!this.state.currentInventory.stamp_confirmed){
					swal("","The lot order is not stamped ","info")
					return;
				}
			}


			if(this.state.rows.length != 0){
			this.addRow = _.cloneDeep(this.state.rows[0])
				let dummy = {active : 1 ,locationName : "Vegas" , location_id : this.props.lid}
				this.addRow.TInventoryLocation = dummy

		}
		else{
			this.addRow = {active : 1 ,createdBy: 1,createdOn: "2016-10-02T00:00:00.000Z",id: 1,inventoryLocationId:this.props.lid,inventory_location_id:this.props.lID,lot_number:this.state.currentInventory.lot_number,modifiedBy:1,modifiedOn:"2016-10-02T00:00:00.000Z",noOfBags:400,piLotId:this.props.lID,weight:22}
			let dummy = {active : 1 ,locationName : "Vegas" , location_id : this.props.lid}
			this.addRow.TInventoryLocation = dummy
			console.log(this.addRow)
		}
			this.setState({
				hideEdit: 'none',
				showEdit : 'block'
			})

		}
		


		else{
			swal("Error","Please select a lot first","error")
		}
	}

	onCancel(){
			//this.rows.splice(this.index,2,this.selectedRow)
		     if(this.edit){
			    //this.rows.splice(this.index,1,this.row)
			console.log("BEFORE EDIT CANCEL",this.orignalTble)
			    this.setState({
			    	 rows :  _.cloneDeep(this.orignalTble)
			    })
			       this.edit = false
			       console.log("After EDIT CANCEL",this.orignalTble)
		    }
		     else if(this.splRow)
		    { 
		    	this.setState({
		    		 rows : _.cloneDeep(this.orignalTble)
		    	})
		    	this.splRow = false
	        }
		      else if(this.rowAdd){
		      	this.setState({
		      		rows : _.cloneDeep(this.orignalTble)
		      	})
			   this.rowAdd = false
			
		    }
		    else if(this.delete){
		    	debugger
		    	this.setState({
		    		rows : _.cloneDeep(this.orignalTble)
		    	})
		    	this.delete = false
		    }
			
				
				this.setState({
					hideEdit : 'block',
					showEdit : 'none',
				})
				this.splitPostArray = [ ]
				this.splitAddPostArray = [ ]
				this.addPostArray = [ ]
				this.editPostArray = [ ]
				this.deletePostArray = [ ]
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
				debugger
				this.isPresent = false
				console.log("BEFORE EDIT ADD",this.orignalTble)
				this.state.rows[this.index] = this.selectedRow
				debugger
				if(this.refs.noOfBags.value != "" && this.refs.locationName.value != "" && this.refs.weight.value != ""){
				if(this.refs.noOfBags.value != "0" && this.refs.weight != "0"){	

				this.refs.noOfBags.value = null
				this.refs.locationName.value = null
				this.refs.weight.value = null
				this.forceUpdate();		
				this.dummyObj = _.cloneDeep(this.state.rows[this.index])
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.state.rows[this.index],'TInventoryLocation')
				this.postObj.Tinventory = InvObj
				this.postObj.Tpinventory = InvtLocation
				if(this.editPostArray.length != 0){
					for(let i = 0; i < this.editPostArray.length; i++){
						if(this.editPostArray[i].Tinventory.id == this.postObj.Tinventory.id){
							this.isPresent = true
							this.editPostArray.splice(i,1,this.postObj)
						}
					}
				}
				console.log("PUSHING!!!!!!")
				if(!this.isPresent){
				this.editPostArray.splice(this.index,0,this.postObj)
				}
				
				console.log("EditPostArray",this.editPostArray)
				this.postObj = { }
			} 
			else{
				swal("Error","Number of Bags and Weight cannot be Zero","error")
			}
		}
			else {
				swal("Error","All fields must be filled","error")
			}
		}
			else if(this.splRow) {
			debugger
			this.isSplitPresent = false
			if(this.refs.noOfBags.value != "" && this.refs.locationName.value != "" && this.refs.weight.value != ""){
			if(this.refs.noOfBags.value != "0" && this.refs.weight.value != "0"){	
			if(this.row.TInventoryLocation.locationName != this.refs.locationName.value){
			if(this.row.noOfBags > parseInt(this.selectedRow.noOfBags) && this.row.weight > parseInt(this.selectedRow.weight)){
			this.row.noOfBags = this.row.noOfBags - parseInt(this.selectedRow.noOfBags)
			this.row.weight = this.row.weight - parseInt(this.selectedRow.weight)
			this.state.rows.splice(this.index,1,this.row,this.selectedRow)
			this.refs.noOfBags.value = null
			this.refs.locationName.value = null
			this.refs.weight.value = null
			this.forceUpdate();
			this.dummyObj = _.cloneDeep(this.state.rows[this.index])
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.state.rows[this.index],'TInventoryLocation')
				this.postObj.Tinventory = InvObj
				this.postObj.Tpinventory = InvtLocation
				let InvtLocation1 = this.selectedRow.TInventoryLocation
				let InvObj1 = _.omit(this.selectedRow,'TInventoryLocation')
				this.postObj1.Tinventory = InvObj1
				this.postObj1.Tpinventory = InvtLocation1
				debugger
				if(this.splitPostArray.length != 0){
					for(let k = 0; k < this.splitPostArray.length; k++){
						if(this.splitPostArray[k].Tinventory.id == this.postObj.Tinventory.id && this.splitPostArray[k].Tpinventory.locationName == this.postObj.Tpinventory.locationName){
							this.splitPostArray.splice(k,1,this.postObj)
							this.isSplitPresent = true
						}
					}
				}
				if(!this.isSplitPresent){
				this.splitPostArray.splice(this.index,0,this.postObj)
			}
			this.splitAddPostArray.splice(this.index,0,this.postObj1)
				console.log("SPLITPOSTARRAY",this.splitPostArray)
				console.log("SPLITADDPOSTARRAY",this.splitAddPostArray)
				//console.log('editposteditposteditpost',this.postObj)
				/*console.log("SplitpostObject>>>><<<<>>>><<<<",this.postObj)
				console.log("SplitpostObject1>>>><<<<>>>><<<<",this.postObj1)*/
				this.postObj = { }
				this.postObj1 = { }
			}
			else if(this.row.noOfBags <= parseInt(this.selectedRow.noOfBags)  || this.row.weight <= parseInt(this.selectedRow.weight)){
			if(this.row.noOfBags < parseInt(this.selectedRow.noOfBags)){
				swal("Error","Please adjust number of bags accordingly","error")
				
			}
			else if(this.row.weight < parseInt(this.selectedRow.weight)){
				swal("Error","Please adjust weight accordingly","error")

			}
			else if(this.row.noOfBags == parseInt(this.selectedRow.noOfBags) || this.row.weight == parseInt(this.selectedRow.weight)){

				swal("Error","Please adjust the values for weight and bags accordingly","error")	
				
			}
			}
		}
		else{
			swal("Error","Location must be different")
		}
	}
		else{
			swal("Error","Number of Bags and Weight cannot be Zero","error")
		}
	}

		else{
			swal("Error","All fields must be present","error")
		}
			
	}
	else {//debugger
		 this.rowAdd = true
		 if(this.refs.noOfBags.value != "" &&	this.refs.locationName.value != "" && this.refs.weight.value != ""){
		 this.addRow.added = true
		 this.state.rows.push(_.cloneDeep(this.addRow))
		 this.forceUpdate()
		 this.dummyObj = _.cloneDeep(this.addRow)
				console.log(this.dummyObj)
				let InvtLocation = this.dummyObj.TInventoryLocation
				let InvObj = _.omit(this.addRow,'TInventoryLocation')
				this.postObj.Tinventory = InvObj
				this.postObj.Tpinventory = InvtLocation
				console.log("newnewnewnewnew",InvObj,InvtLocation)
				this.addPostArray.splice(0,0,this.postObj)
				console.log("ADDPOSTARRAY",this.addPostArray)
			}
		else{
			swal("Error","All fields must be filled","error");
			this.rowAdd = false
		}
		this.postObj = { }
		//this.addRow = { }
		 this.refs.noOfBags.value = null
		 this.refs.locationName.value = null
		 this.refs.weight.value = null
	}
	this.index = undefined
						
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
				if(this.prevTble == undefined){
				this.prevTble = _.cloneDeep(this.state.rows)
			}
			if(!this.splRow){
			this.delete = true
			this.deletedRow = _.cloneDeep(this.state.rows[index])
			let InvtLocation = _.cloneDeep(this.deletedRow.TInventoryLocation)
				let InvObj = _.omit(this.state.rows[index],'TInventoryLocation')
				this.deleteArray.splice(0,0,this.postObj)
				this.actualDeleteObj.Tpinventory = _.cloneDeep(InvtLocation.id)
				this.actualDeleteObj.Tinventory = _.cloneDeep(InvObj.id)
				console.log("THe DELETE OBJECT",this.actualDeleteObj)
				if(!this.deletedRow.added){
				this.deletePostArray.splice(0,0,this.actualDeleteObj)
			}
				console.log("deletePostArray",this.deletePostArray)

				//console.log("DeleteArray",this.deleteArray)
				if(this.addPostArray.length != 0){
					for(let k = 0; k <this.addPostArray.length; k++ ){
						if(this.addPostArray[k].Tpinventory.locationName == this.state.rows[index].TInventoryLocation.locationName){
							this.addPostArray.splice(k,1)
						}
					}
				}
				console.log("After Delete add post array",this.addPostArray)
			this.state.rows.splice(index,1)
			this.setState({
				hideEdit : 'node',
				showEdit : 'block',
			})
			this.actualDeleteObj = { }
		}
		else {
			swal("Info","Save all split actions before deleting a row","info")
		}
		this.index = undefined
	}
		calculateWeight(){
			//debugger
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
		for(let k = 0 ; k <this.props.lots.length ; k++ ){
			if(parseInt(this.props.lotId) == this.props.lots[k].id){
			this.totalRailcarWeight = parseInt(this.totalRailcarWeight) + parseInt(this.props.lots[k].weight)
		}
	}
		//this.totalBags = this.totalBags % 2 == 0 ?this.totalBags /2 : (this.totalBags +1) / 2
        
//axios.put(Base_Url+ "TPackagingInstructionLots/" +this.CID ,{inInventory : this.totalBags}).then((response) =>{

//})
        //this.totalWeight = this.totalWeight % 2 == 0 ?this.totalWeight /2 : (this.totalWeight +1) / 2
	}

		onSaveChange(e){
			debugger
			var stamp = localStorage.getItem('stamp')
			//localStorage.removeItem('stamp')

		if(this.addPostArray.length == 0 && this.editPostArray.length == 0 && this.splitAddPostArray.length == 0 && this.splitPostArray.length == 0 && this.addPostArray.length == 0 && this.deletePostArray.length == 0 ){
		 		swal("","Please press add before save","info")
		 		return
			}

			var packStatus = localStorage.getItem('packagingFlag') ? localStorage.getItem('packagingFlag')  :'false' ;
			if(this.edit){
				this.CID = this.props.lID
				this.checked = this.props.checked
				this.url = Base_Url+"TInventoryLocations/updatebagweight"
				//console.log("POSTOBJECT",)
				let editArray = this.editPostArray
				this.url = Base_Url+"TInventoryLocations/updatebagweight"
				var urledit = Base_Url+"TInventoryLocations/updatebagweight"
				editArray.forEach(function(data){
					$.ajax({
				type:"POST",
				url:urledit,
				data: data,
				success:function(){
					window.location.reload();
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
				})
			if(stamp == "true"){
				alert("www" , stamp)
				axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{stamp_confirmed:1})
				//swal("Edited","Data Has Been Successfully Edited","success")
				//localStorage.removeItem('packagingFlag')
			}
			if(packStatus == 'true' ){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",inInventory:this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
					localStorage.removeItem('packagingFlag')
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",inInventory:this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.edit = false
			this.editPostArray = [ ]
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
				this.url = Base_Url+"TInventoryLocations/updatebagweight"
				let spliturl1 = Base_Url+"TInventoryLocations/updatebagweight"
				let splitarr1 = this.splitPostArray
				splitarr1.forEach(function(data){
					$.ajax({
				type:"POST",
				url:spliturl1,
				data: data,
				success:function(){
					window.location.reload();
				},
			})
				})
			this.url1 = Base_Url+"TInventoryLocations/addbagweight"
			let spliturl2 = Base_Url+"TInventoryLocations/addbagweight"
			let splitarr2 = this.splitAddPostArray
			splitarr2.forEach(function(data){
				$.ajax({
				type:"POST",
				url: spliturl2,
				data: data,
				success:function(){
					window.location.reload();
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
			})

				if(stamp == "true"){
					alert("www" , stamp)
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{stamp_confirmed:1})
					//swal("Edited","Data Has Been Successfully Edited","success")
					//localStorage.removeItem('packagingFlag')
				}

			if(packStatus == 'true'){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",inInventory:this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
					localStorage.removeItem('packagingFlag')
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",inInventory:this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.splRow = false
			this.postObj = { }
			this.splitPostArray = [ ]
			this.splitAddPostArray = [ ]
			console.log(this.splRow)
			console.log("empty",this.postObj)
			
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					addFlag : false
				})

			}
			else if(!this.edit && !this.splRow && this.addPostArray.length != 0){
				debugger;
				this.CID = this.props.lID
				this.checked = this.props.checked
				console.log("ADDPOSTARRAY",this.addPostArray)
				let postArray = this.addPostArray
			this.url = Base_Url+"TInventoryLocations/addbagweight"
			var urladd = Base_Url+"TInventoryLocations/addbagweight"
			postArray.forEach(function(data){
                 $.ajax({
				type:"POST",
				url: urladd,
				data: data,
				success:function(){
					window.location.reload();
				},
				Error:function(err){
					swal("Error","Error Occured. Please Try Again","error")
				}
			})
			})
				if(stamp == "true"){
					alert("www" , stamp)
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{stamp_confirmed:1})
					//swal("Edited","Data Has Been Successfully Edited","success")
					//localStorage.removeItem('packagingFlag')
				}
			if(packStatus == 'true'){
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"ININVENTORY",inInventory:this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
					localStorage.removeItem('packagingFlag')
				}else {
					axios.put(Base_Url + "TPackagingInstructionLots/"+this.CID,{status:"PARTIALLYPACKED",inInventory : this.totalBags})
					swal("Edited","Data Has Been Successfully Edited","success")
				}
			this.forceUpdate()
			this.rowAdd = false
			this.addPostArray = [ ]
			this.postObj = { }
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
					addFlag : false
				})
			}
			else if(this.deletePostArray.length != 0){
				let deleteArr = this.deletePostArray
				let deleteurl = Base_Url+"TInventoryLocations/deleteLocation"
				deleteArr.forEach(function(data){
				axios.delete(Base_Url+"TPiInventories/"+data.Tinventory).then((response)=>{
				axios.delete(Base_Url+"TInventoryLocations/"+data.Tpinventory)
				})
				
							})
			this.setState({
					hideEdit : 'block',
					showEdit : 'none',
				})
			}
			console.log("AddPOSTARRAY",this.addPostArray)
			console.log("EditPOSTARRAY",this.editPostArray)
			console.log()
			this.addPostArray = [ ]
			this.deletePostArray = [ ]
			this.splitPostArray = [ ]
			this.orignalTble = _.cloneDeep(this.state.rows)
			this.index = undefined

			//this.props.onSave()

		}
		valdiateNoOfBags(e){
		/*	debugger
			if(this.index == undefined){
			if(Validator.isNull(this.addRow.noOfBags)){
				let error = {noOfBags: "Must be a number"} 
				this.setState({
					errors : error
				})
			}
			else {
				let error = {noOfBags : undefined}
				this.setState({
					errors: error
				})
			}
		}
		else {
			if(Validator.isNull(this.selectedRow.noOfBags)){
				let error = {noOfBags: "Must be a number"} 
				this.setState({
					errors : error
				})
			}
			else {
				let error = {noOfBags : undefined}
				this.setState({
					errors: error
				})
			}
		}*/
		}
	
	validateWeight(e){
		/*if(this.index == undefined){
			if(Validator.isNull(this.addRow.weight)){
				let error = {weight: "Must be a number"} 
				this.setState({
					errors : error
				})
			}
			else {
				let error = {weight : undefined}
				this.setState({
					errors: error
				})
			}
		}
		else {
			if(Validator.isNull(this.selectedRow.weight)){
				let error = {weight: "Must be a number"} 
				this.setState({
					errors : error
				})
			}
			else {
				let error = {weight : undefined}
				this.setState({
					errors: error
				})
			}
		}*/
		}
	

	render() {

		console.log("State Rows",this.state.rows)
		if(this.rows == undefined){
		this.rows = _.cloneDeep(this.state.rows)
		console.log("I am cloning State Rows",this.rows)
	}
		if(this.state.rows != undefined && this.props.lots != undefined){
				console.log("GOING TO CALCULATE")
				this.calculateWeight()
		}
		if(this.props.lots){
		this.PILots = this.props.lots
	}
		
		if(this.state.rows != undefined){
			if(this.state.showEdit != 'none'){	
		var inventory = _.map(this.state.rows,(invent,index) => {
			if(invent.TInventoryLocation)
			{      	return (
					<tr key={index}>
					<td>{invent.TInventoryLocation? invent.TInventoryLocation.locationName : ''}</td>
					<td>{invent.noOfBags}</td>
					<td>{invent.weight}</td>
					<td>{this.state.currentInventory.lot_number}</td>
					<td>
					<i className="fa fa-pencil-square-o act-btn" value = {index} onClick = {(e) => {this.onEdit(index)}} aria-hidden="true"></i>
					<i className="fa fa-plus-square-o act-btn" value = {index} onClick = {(e) => {this.splitRow(index)}} aria-hidden="true"></i>
					<i className="fa fa-trash-o act-btn" value={index} onClick = {(e) => {this.onDelete(index)}} aria-hidden="true"></i></td>
					</tr>
				)
			}

		})
	}
	else {
				var inventory = _.map(this.state.rows,(invent,index) => {
			if(invent.TInventoryLocation)
			{      	return (
					<tr key={index}>
					<td>{invent.TInventoryLocation? invent.TInventoryLocation.locationName : ''}</td>
					<td>{invent.noOfBags}</td>
					<td>{invent.weight}</td>
					<td>{this.state.currentInventory.lot_number}</td>
					</tr>
				)
			}

		})
	}
	
	
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
					  <input type="number" onChange = {this.handleInputChange} ref="noOfBags" onBlur = {(e) => {this.valdiateNoOfBags(e)}} className={this.state.errors.noOfBags ? "form-control has error" : "form-control"} id="noOfBags" placeholder="#Bags" />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="text" onChange={this.handleLocationChange} ref="locationName" className="form-control" id="locationName" placeholder="Location" />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="number" onChange={this.handleInputChange} ref = "weight" onBlur = {(e) => {this.validateWeight(e)}} className={this.state.errors.noOfBags ? "form-control has error" : "form-control"} id="weight" placeholder="Weight"/>
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
							<th style={{display: this.state.showEdit}}>Action </th>				
						</tr>
						</thead>
						<tbody>
							{inventory}
							<tr>
							<th>Total</th>
							<th>{this.totalBags}</th>
							<th>{this.totalWeight}</th>
							<th></th>
							<th style={{display:this.state.showEdit}}></th>
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
				
				<label className="control control--checkbox " style={{display:this.state.showEdit}}>Packaging Complete 
				  <input type="checkbox" onChange={this.props.onCheckBoxChange} id="row1"/><div className="control__indicator"></div>
				</label>	
				
			</div>
		</div>
	</div>
		);
	}
}
export default CurrentInventory;