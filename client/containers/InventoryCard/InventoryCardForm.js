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
	this.onCancel = this.onCancel.bind(this)
	//this.onSaveChange = this.onSaveChange.bind(this)
	}
	onConfirm(e){
		console.log("Clicked")
			hashHistory.push('/Packaging/confirmpckginst/'+this.props.cId)
	}
	onEdit(e){
		//e.preventDefault();
		hashHistory.push('/Packaging/enterpackginginst/'+this.props.id)
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
        var baseNew = 'TInventoryLocations';
        //TPackagingInstructionLots
        this.url = PIview._buildUrl(base, {
            include : ['TPackagingInstructions',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation","TCompany"]}}]


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
                console.log( '>>>>>>>>>>>>Inventoryraillcart' , this.state.viewInventoryCardData)
            }.bind(this)

        })






     /* $.ajax({
            url: this.urlnew,
            success:function(data){
                console.log('ajax>>>>>>>>>>>>>> ',data);
                this.setState({
                	currentInventory : data
                })
                console.log(">>>>>>>>>>>>>>>CurrentInventory",this.state.currentInventory)
               }.bind(this)

        })*/
    }
    onCancel(){
    	this.currentInventoryKey = this.currentInventoryKey + 1;
    }
    onCheckBoxChange(e){
			//console.log(this.checked)
			debugger
			if(e.target.checked){
				this.checked = true
				console.log(this.checked)
			}
			else if(!e.target.checked){
				this.checked = false
				console.log(this.checked)
			}
			this.forceUpdate()
		}
	onSaveChange(e){
			if (this.checked){
				swal("Saved","Data Saved",'success')
				this.setState({
					key: this.state.key + 1
				})
			}
			else {
				swal("Failed","Please Check Packaging Complete","error")
			}

		}

    onCheck(e){
	if(e.target.checked){
	this.id = e.target.id
	console.log(">>>>>>>>>>>>>>>>>>",this.id)}
	else if(!e.target.checked){
		this.id = undefined
	console.log(">>>>>>>>>>>>>>>>",this.id)
	}
		this.forceUpdate();
}


	render(){
		this.currentInventKey = 0
		debugger;
		console.log("OOOOOOOO_____OOOOOOOOO",this.props.viewData)
		console.log("sssfsdsdsadasdas",this.state.viewInventoryCardData)
		console.log(">>>>>>>>>>>>>>>>>>>>>...",this.state.currentInventory)
		return(


<section className="inventory_card">
		<div className="container-fluid">

		<div className="row pddn-20-top">
			<div className="col-lg-12">

		<InventoryTable id = {this.props.id} onCheck = {this.onCheck} viewData = {this.props.viewData} />

	</div>
		</div>


	<div className="label_info" >
		<div className="row pddn-20-top">

					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<fieldset className="scheduler-border">
							<legend className="scheduler-border">PACKAGING LABEL </legend>
							<div>{this.props.viewData? this.props.viewData[0].custom_label : ''} </div>

						</fieldset>
					</div>
					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12 ">

					</div>




			<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12 pddn-20-top">
				<label className="control control--checkbox ">Stamp Confirmed <br/><b>{this.userName}</b>
				  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
				</label>
			</div>

		</div>

		<div className="row">
			<div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12" >
				<div className="text_left">

				 <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button> </div>

				 <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Add To Queue</button> </div>

				 <div className="pull-left margin-10-all"><button type="button"  className="btn btn-gray" onClick={this.onConfirm}>Confirm</button> </div>


				  <div className="pull-left margin-10-all"><button type="button" id="edit_btn" onClick={this.onEdit} className="btn  btn-orange">Edit</button> </div>
				</div>
			</div>
			<div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
				<div className="pull-right margin-10-last-r"><button type="button" id="back" onClick = {hashHistory.goBack} className="btn  btn-gray">Back</button> </div>
			</div>
		</div>

		 <div className="col-lg-12 margin-btm-40 label-gray font-size-16" >
		   Inventory Card
		 </div>
	</div>





	<br className="clearfix"/>
	<div >
	<div className="row pddn-40-top">

	 <CurrentInventory key={this.currentInventoryKey} onCancel = {this.onCancel} lid={this.props.lid} id = {this.props.id} lID={this.props.cId} checked = {this.checked} lotId = {this.id}  onCheckBoxChange = {this.onCheckBoxChange} onSaveChange = {this.onSaveChange} lots = {this.props.lots}/>
	<InventoryHistory  />


	
	</div>
	<div className="row pddn-20-top">

	 <InventoryLocationHistory id = {1} />
	 <PendingShipment />

	</div>

	</div>



 </div>
</section>


			)
	}
}
export default InventoryCardForm;
