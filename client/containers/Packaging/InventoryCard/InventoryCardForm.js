import React from 'react';
import { Link } from 'react-router';
import InventoryHistory from '../../../components/InventoryComponents/InventoryHistory';
import CurrentInventory from '../../../components/InventoryComponents/CurrentInventory';
import InventoryLocationHistory from '../../../components/InventoryComponents/InventoryLocationHistory';
import PendingShipment from '../../../components/InventoryComponents/PendingShipment'
import InventoryTable from '../../../components/InventoryComponents/InventoryTable';
import { createDataLoader } from 'react-loopback'
import { hashHistory } from 'react-router'
import axios from 'axios'
import { Base_Url } from '../../../constants'

class InventoryCardForm extends React.Component{
constructor(){
	super();
	this.state = {
		//stamp : false
		index :0
}
	//this.id = this.props.id
	//console.log(this.id)
	this.id
	this.userName =  localStorage.getItem('userName')
	this.checked = false
	this.onConfirm = this.onConfirm.bind(this)
	this.onEdit = this.onEdit.bind(this)
	this.onCheck = this.onCheck.bind(this)
	this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
	this.addToQueue =this.addToQueue.bind(this)
	this.onStampConfirmed = this.onStampConfirmed.bind(this);
	this.print = this.print.bind(this)
	this.onDelete = this.onDelete.bind(this)
	this.checkConfirmation = this.checkConfirmation.bind(this)
	this.piID = null
	this.lotIdArray = []
	this.flagforceUpdate = false
	this.flagStampconfirm = false
	this.selectedIndex = 0
	//this.onCancel = this.onCancel.bind(this)
	//this.onSaveChange = this.onSaveChange.bind(this)
	}
	onConfirm(e){
		 if(this.status == "UNCONFIRMED"){
				hashHistory.push('/Packaging/confirmpckginst/'+this.id)
           }
                 else{
                  swal("Error","Please select unconfirmed order","error")
                }
	}
	onEdit(e){

				hashHistory.push('/Packaging/enterpackginginst/'+this.props.id)

	}
	checkConfirmation()
	{
		var msg="None";
		var flag = false;
		for(var i in this.props.lots){
			if(this.id==this.props.lots[i].id){
				if(this.props.lots[i].status =="SHIPPED"){
					alert("Can not delete a shipped order")
					flag = true;
				}
			}
		}
		if(flag){
			return false;
		}
var tempThis = this
		swal({
			title:"Are you sure?",
			text:"Want to Delete Order",
			type:"warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
  		confirmButtonText: "Yes, delete it!",
  		closeOnConfirm: false
		},
		function(isConfirm){
			if(isConfirm){
				var PIview = createDataLoader(InventoryCardForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots'
            }]
        });
				var base = Base_Url+"TPackagingInstructionLots/setInActive"
				var obj = {id:tempThis.id}
				$.ajax({
					type:"POST",
						url: base,
						data:obj,
						success:function(data){
						swal({
							title:"Info",
							text:"Deleted Successfully",
							type:"info"
						},function(){
								hashHistory.push('/Packaging/packaginginstview/')
						})

						}
				})

			}
			else{
				return false;
			}
		}
	)
	}
	onDelete(e){
		if(this.checkConfirmation()){

		}
	}

	print(e){

	  if(this.status == "UNCONFIRMED"){
	    swal("" , "The Order is not confirmed yet" , "info")
	    return
	  }
	        if(this.id != undefined){
	            console.log('print view',this.piID+'/'+this.id)
	            hashHistory.push('/Packaging/packagingInstFormPrint/'+this.props.id+'/'+this.id)
	            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
	        }
	        else
	        {
	            swal("Selection Missing", "Please Select A Lot To View.","error")
	        }
	    }

componentWillMount() {
        var PIview = createDataLoader(InventoryCardForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter: {
                    include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}]
                }
            }]
        });
        var base = 'TPackagingInstructionLots'+'/'+this.props.id;
        var baseNew = 'TInventoryLocations'+'/'+this.props.id;
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(baseNew, {
            include : ["TShipmentLots", 'TPackagingInstructions',{"relation":  "TPackagingInstructions" ,"scope": {"include": ["TLocation","TCompany"]}}]


        });

        console.log('sdsddsdsdsdsd' , this.url);


        $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                this.setState(
                    {
                        viewInventoryCardData : [data]
                    }
                )


                this.status = this.state.viewInventoryCardData? this.state.viewInventoryCardData[0].TPackagingInstructionLots[0].status : '';
                console.log( '>>>>>>>>>>>>Inventoryraillcart' , this.state.viewInventoryCardData)
            }.bind(this)

        })

		//alert('status' , this.status)
     axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
})





    }

    addToQueue(e){
		 if(this.lotIdArray.length>1){
			 swal("warning","Please Select a single Lot","warning")
			 return
		 }
		 else if(this.lotIdArray.length<=0){
			 swal("warning","Please Select a Lot","warning")
			 return
		 }
     let id = this.lotIdArray[0]
     var sequence =  this.state.queue_Sequence[0].max_mark

      var option = {
          queue_sequence : parseInt(sequence) + 1 ,
          status : "Queued"
      }


      if(this.status == "READY"){
      axios.put( Base_Url+"TPackagingInstructionLots/"+id , option).then(function(response){
                  console.log("Queue Added" , response)
                  swal({
                      title: "Success",
                      text: "Successfully added to the queue",
                      type: "success",
                      showCancelButton: true,
      },
              function(isConfirm){
              hashHistory.push('/Packaging/packaginginstqueue/')

            });
            }).catch(function(err){
                  console.log("Error Is" + err)
        })

  }

  else {
    swal("","The selected order is not ready","info")
  }
}

    onCheckBoxChange(e){
			if(e.target.checked){
				this.checkedPI = true
				localStorage.setItem('packagingFlag' , 'true')
			}
			else if(!e.target.checked){
				this.checkedPI = false
				localStorage.setItem('packagingFlag' , 'false')
			}

		}
	onSaveChange(e){
			if (this.checked){
			}
			else {
				swal("Failed","Please Check Packaging Complete","error")
			}

		}

    onCheck(e,status,when,stampConfirmed,NumberOfRows){
			debugger
			if(this.lotIdArray.length>0){
				for(var i=0;i<this.lotIdArray.length; i++){
					this.lotIdArray[i]=parseInt(this.lotIdArray[i])
				}
			}
			if(NumberOfRows && when ==1){
					if(stampConfirmed==1){
						localStorage.setItem('stamp' , true)
						document.getElementById("rowstamp").checked = true;
					}
					else if(stampConfirmed==0){
						document.getElementById("rowstamp").checked = false;
					}
			}
			if(e!=null){
			if(!this.flagforceUpdate){
			if(when==1 ){
				e.checked = true
				e.target={}
				e.target.id = e.id
				e.target.checked = true
				this.id = e.target.id
				if(this.lotIdArray.indexOf(parseInt(e.target.id))==-1){
				this.lotIdArray.push(parseInt(e.target.id))
			}
			}
		}
  this.status = status
	if(e.target.checked && when ==0){
	this.id = e.target.id
	console.log(">>>>>>>>>>>>>>>>>>",this.id)
	if(this.lotIdArray.indexOf(parseInt(e.target.id))==-1){
	this.lotIdArray.push(parseInt(e.target.id))
}
}
	else if(!e.target.checked && when ==0){
		this.id = undefined
	console.log(">>>>>>>>>>>>>>>>",this.id)
	var len = this.lotIdArray.length
	for(var i =0;i<len;i++){
		var index = this.lotIdArray.indexOf(parseInt(e.target.id))
		if(index!=-1){
			this.lotIdArray.splice(index,1)
		}
		else{
			this.id = this.lotIdArray[0]
			break
		}
	}
	}
}
else{
	return
}
var hasIndexFound = false
if(this.lotIdArray && this.lotIdArray.length==1 ){
	for(var i in this.props.viewData[0].TPackagingInstructionLots){
		if(this.props.viewData[0].TPackagingInstructionLots[i].id == this.lotIdArray[0]){
			this.selectedIndex = i
            hasIndexFound = true
			break
		}
	}
}
// if(!hasIndexFound){
//     this.selectedIndex = 0
// }
else{
    this.selectedIndex
}
if(when==0 ){
            this.forceUpdate()
            this.flagforceUpdate = true;
        }
}
	onStampConfirmed(e){
debugger
		let id = this.props.cId
		var stamp ;
		var tempThis = this
		if(e.target.checked) {
			 stamp = true
			if(localStorage.getItem('stamp')){
				localStorage.removeItem('stamp')
			}
			localStorage.setItem('stamp' , true)
			if(!tempThis.flagStampconfirm){
			axios.put( Base_Url+"TPackagingInstructionLots/"+id , {"stamp_confirmed" : 1}).then(function(response){
					tempThis.flagStampconfirm = true
					tempThis.forceUpdate()
					document.getElementById('rowstamp').checked = true
			})
}
		}
		else{
			axios.put( Base_Url+"TPackagingInstructionLots/"+id , {"stamp_confirmed" : 0}).then(function(response){
					tempThis.flagStampconfirm = false
					localStorage.removeItem('stamp')
					tempThis.forceUpdate()
					document.getElementById('rowstamp').checked = 0
			})
			document.getElementById('rowstamp').checked = 0
		}
	}

	render(){

		console.log("status",this.props)
		if(this.props.lots != undefined){
			console.log("status",this.props.lots[0].status)
		}


		console.log("OOOOOOOO_____OOOOOOOOO",this.props.viewData)
		console.log("sssfsdsdsadasdas",this.state.viewInventoryCardData)
		console.log(">>>>>>>>>>>>>>>>>>>>>...",this.state.currentInventory)

		return(


<section className="inventory_card">
		<div className="container-fluid">

		<div className="row pddn-20-top">
			<div className="col-lg-12">

		<InventoryTable id = {this.props.id} lotId = {this.props.cId} onCheck = {this.onCheck} viewData = {this.props.viewData} containerLoadData = {this.props.containerLoadData}/>

	</div>
		</div>


	<div className="label_info" >
		<div className="row pddn-20-top">

			<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<fieldset className="scheduler-border">
					<legend className="scheduler-border">PACKAGING Info </legend>
					<div className="col-lg-5 col-sm-5 col-xs-5">Unit of Packaging</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b>{this.props.viewData ? (this.props.viewData[0].TPackagingType ? this.props.viewData[0].TPackagingType.packagingType : '') : ''}</b></div>

					<div className="col-lg-5 col-sm-5 col-xs-5">Type of Packaging</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b>{this.props.viewData ? (this.props.viewData[0].TPackagingMaterial ? this.props.viewData[0].TPackagingMaterial.packagingName : '') : ''}</b></div>

					<div className="col-lg-5 col-sm-5 col-xs-5">Pallet Type</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b>{this.props.viewData ? this.props.viewData[0].TPalletType.palletType : ''}</b></div>

					<div className="col-lg-5 col-sm-5 col-xs-5">Bags per Pallet</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b> {this.props.viewData ? this.props.viewData[0].bags_per_pallet : ''}</b></div>

					<div className="col-lg-5 col-sm-5 col-xs-5">Stretch Wrap</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b>{this.props.viewData ? this.props.viewData[0].TWrapType.name : ''}</b></div>

					<div className="col-lg-5 col-sm-5 col-xs-5">Origin</div>
					<div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
					<div className="col-lg-5 col-sm-5 col-xs-5"><b>{this.props.viewData ? this.props.viewData[0].TOrigin.origin : ''}</b></div>

				</fieldset>
			</div>


					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<fieldset className="scheduler-border custom-LABEL">
							<legend className="scheduler-border">PACKAGING LABEL </legend>
							<p>{this.props.viewData? this.props.viewData[0].TPackagingInstructionLots[this.selectedIndex].custom_label.split('\n')[0] : ''}</p>
							<p>{this.props.viewData? this.props.viewData[0].TPackagingInstructionLots[this.selectedIndex].custom_label.split('\n')[1] : ''}</p>
							<p>{this.props.viewData? this.props.viewData[0].TPackagingInstructionLots[this.selectedIndex].custom_label.split('\n')[2] : ''}</p>
							<p>{this.props.viewData? this.props.viewData[0].TPackagingInstructionLots[this.selectedIndex].custom_label.split('\n')[3] : ''}</p>
							<p>{this.props.viewData? this.props.viewData[0].TPackagingInstructionLots[this.selectedIndex].custom_label.split('\n')[4] : ''}</p>
						</fieldset>
					</div>
					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12 ">

					</div>




			<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12 pddn-20-top">
				<label className="control control--checkbox ">Stamp Confirmed <br/><b>{this.userName}</b>
				  <input type="checkbox"  id="rowstamp" onChange={this.onStampConfirmed}/><div className="control__indicator"></div>
				</label>
			</div>

		</div>

		<div className="row">
			<div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12" >
				<div className="text_left">
                    { this.status != "UNCONFIRMED" &&

						<div className="pull-left margin-10-last-l">
							<button type="button"  onClick={(e) => {
                                this.print(e)
                            }} className="btn  btn-gray ">Print Packaging Instruction
							</button>
						</div>

                    }
                    <div className="pull-left margin-10-all"><button type="button" onClick = {this.addToQueue}  className="btn  btn-gray">Add To Queue</button> </div>

				 <div className="pull-left margin-10-all"><button type="button"  className="btn btn-gray" onClick={this.onConfirm}>Confirm</button> </div>


				  <div className="pull-left margin-10-all"><button type="button" id="edit_btn" onClick={this.onEdit} className="btn  btn-orange">Edit</button> </div>
					<div className="pull-left margin-10-all"><button type="button" id="edit_btn" onClick={this.onDelete} className="btn  btn-orange">Delete</button> </div>
				</div>
			</div>
			<div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
				<div className="pull-right margin-10-last-r"><button type="button" id="back" onClick = {hashHistory.goBack} className="btn  btn-gray">Back</button> </div>
			</div>
		</div>

		{/* <div className="col-lg-12 margin-btm-40 label-gray font-size-16" >
		   Inventory Card
		 </div>*/}
		<hr/>
	</div>





	<br className="clearfix"/>
	<div >
	<div className="row">

	 <CurrentInventory viewData = {this.props.viewData} key={this.state.index} length = {this.length}  onCancel = {this.onCancel} lid={this.props.lid} id = {this.props.id} lID={this.props.cId} checked = {this.checked} lotId = {this.id}  onCheckBoxChange = {this.onCheckBoxChange} onSaveChange = {this.onSaveChange} lots = {this.props.lots} lotIdArray = {this.lotIdArray}/>
	<InventoryHistory pID ={this.props.id} lotIdArray = {this.lotIdArray}/>

   </div>
	<div className="row pddn-20-top">

	 <InventoryLocationHistory key={this.state.index} lid={this.props.lid} id = {this.props.id} lID={this.props.cId!=null||this.props.cId!=""||this.props.cId!="null"?this.lotIdArray[0]:this.props.cId} checked = {this.checked} lotId = {this.id}  lotIdArray={this.lotIdArray}/>
	 <PendingShipment pID ={this.props.id} lotIdArray={this.lotIdArray} />

	</div>

	</div>



 </div>
</section>


			)
	}
}
export default InventoryCardForm;
