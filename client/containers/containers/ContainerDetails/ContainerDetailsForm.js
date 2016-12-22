import React from 'react';
import ContainerTable from '../../../components/ContainerDetailComponents/ContainerTable'
import ContainerInfoComponent from '../../../components/ContainerDetailComponents/ContainerInfoComponent';
import ShipmentSummaryComponent from '../../../components/ContainerDetailComponents/ShipmentSummaryComponent'
import ContainerLoadComponent from '../../../components/ContainerDetailComponents/ContainerLoadComponent'
import CurrentInventoryComp from '../../../components/ContainerDetailComponents/CurrentInventoryComp'
import LotTableCompoenent from '../../../components/ContainerDetailComponents/LotTableCompoenent'
import DomesticShipmentSummary from '../../../components/ContainerDetailComponents/DomesticShipmentSummary'
import { hashHistory } from 'react-router'
import { createDataLoader } from 'react-loopback'
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import { Base_Url } from '../../../constants';

class ContainerDetailsForm extends React.Component {

  constructor(props){
        super(props)
        this.state={
            editing : false,
            currentIntObject : undefined,
            ContainerLoadKey : 0,
            currentInventoryKey : 0

        }
        this.lotId
        this.obj = { }
        this.userId = localStorage.getItem('userId')
        this.delObject = { }
        this.SaveObj = {
          containerLoaded: 0,
          containerInTransit: 0,
          containerDelivered: 0
        }
        this.index  = 0
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.changeLot  = this.changeLot.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.onCancelClick = this.onCancelClick.bind(this)
        this.handleCurrentInvChecks = this.handleCurrentInvChecks.bind(this)
        this.onLeftClick = this.onLeftClick.bind(this)
        this.loadNewData = this.loadNewData.bind(this)
        this.handleContainerLoadChecks = this.handleContainerLoadChecks.bind(this)
        this.onRightClick = this.onRightClick.bind(this)
        this.onSaveClick = this.onSaveClick.bind(this)
        this.cIArray =[]
    }
    onLeftClick(e){

    if(Object.keys(this.obj).length > 0){
      axios.post(Base_Url+"TContainerLoads",this.obj).then((response)=>{
      axios.put(Base_Url+"TPiInventories/"+this.delObject.pInventoryId,{active:0})
       }).then((response)=>{
         this.loadNewData()
         swal("","Loaded","success")
       })


      }
      else{
          swal("Missing","Please Select A Inventory","info")
          }

    }
    handleCheckbox(e){
//"addloaded"
        console.log(this.props.containerTable.containerLoaded)

      if(e.target.checked){
          console.log("dddsdsds" , e.target.name)
          if(e.target.name == "containerInTransit" && !this.props.containerTable.containerLoaded){
              swal("" , "Container is not loaded yet" , 'info')
              e.target.checked = false;
              return;
          }
          if(e.target.name == "containerDelivered" && !this.props.containerTable.containerInTransit){
              swal("" , "Container is not InTransit yet" , 'info')
              e.target.checked = false;
              return;
          }


            this.SaveObj[e.target.name] = 1
          }
            else if(!e.target.checked){
              this.SaveObj[e.target.name] = 0
            }
            console.log(this.SaveObj)
    }

    onRightClick(e){
      axios.delete(Base_Url+"TContainerLoads/"+this.contLoadid).then((response)=>{
        axios.put(Base_Url+"TPiInventories/"+this.pInventId,{active:1}).then((response)=>{
          this.loadNewData()
          swal("","Removed","success")
        })
      })
    }
    componentDidMount(){
     this.containertable = this.props.containerTable
     //this.load_cont_Id  = this.props.containerTable.id
     //this.lotId = (this.props.containerTable && this.props.containerTable.TShipmentLots && this.props.containerTable.TShipmentLots.length>0 && this.props.containerTable.TShipmentLots[0].TPackagingInstructionsLots ) ? this.props.containerTable.TShipmentLots[0].TPackagingInstructionsLots.id : ''
      /*      this.url = Base_Url+"TInventoryLocations/addbagweight"
*/
}
onCancelClick(e){
  this.setState({
    editing: false
  })
}
handleContainerLoadChecks(e,data){
 this.contLoadid = data.id
 this.pInventId = data.piInventId
}
handleCurrentInvChecks(e,data){
  if(e.target.checked){
    this.obj.id = 0
    this.obj.invLocId = data.inventoryLocationId
    this.obj.noOfBags =  data.noOfBags
    this.obj.weight = data.weight
        if(this.props.isDomestic == 1){
            this.obj.loadContId = null
            this.obj.loadContDId  = this.props.containerId
     }
        else if(this.props.isDomestic == 0){
            this.obj.loadContId = this.props.containerTable.id
            this.obj.loadContDId =null
        }



    this.obj.lotId = parseInt(this.lotId)
    this.obj.createdBy = this.userId
    this.obj.active = 1
    this.obj.piInventId = data.id
    this.delObject.locationId = data.inventoryLocationId
    this.delObject.pInventoryId = data.id
    this.cIArra.push(this.obj)
    console.log("object",this.obj,this.delObject)
  }
  else if(!e.target.checked){
    // this.obj.id = 0
    // this.obj.invLocId = data.inventoryLocationId
    // this.obj.noOfBags =  data.noOfBags
    // this.obj.weight = data.weight
    //     if(this.props.isDomestic == 1){
    //         this.obj.loadContId = null
    //         this.obj.loadContDId  = this.props.containerId
    //  }
    //     else if(this.props.isDomestic == 0){
    //         this.obj.loadContId = this.props.containerTable.id
    //         this.obj.loadContDId =null
    //     }
    //
    //
    //
    // this.obj.lotId = parseInt(this.lotId)
    // this.obj.createdBy = this.userId
    // this.obj.active = 1
    // this.obj.piInventId = data.id
    // this.delObject.locationId = data.inventoryLocationId
    // this.delObject.pInventoryId = data.id
    // this.cIRemove.push(this.obj)
    // console.log("object",this.obj,this.delObject)
  }

}
loadNewData(){

 var PIview = createDataLoader(ContainerDetailsForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter:
                {"include" : ["TInventoryLocation","TPackagingInstructionLots"]
                }

            }]
        });

        var base1 = 'TPackagingInstructionLots/'+ this.lotId;
        this.urlnew = PIview._buildUrl(base1, {
            include: {"relation": "TPiInventory", "scope": {"include": ["TInventoryLocation"] ,where : {active : 1}}},


        });
        console.log(this.urlnew)
        var base2 = "TContainerLoads/"
        if(this.props.isDomestic == 0){
           this.CLoadURL = PIview._buildUrl(base2,{
           include : ["TInventoryLocation",{"relation": "TPackagingInstructionLots" , "scope":{"include":"TPackagingInstructions"}}],

          where:{ "loadContId": this.props.containerTable.id }
        })
        }
  else if(this.props.isDomestic == 1){
     this.CLoadURL = PIview._buildUrl(base2,{
           include : ["TInventoryLocation",{"relation": "TPackagingInstructionLots" , "scope":{"include":"TPackagingInstructions"}}],

          where:{"loadContDId": this.props.containerId}
        })
  }

        axios.get(this.CLoadURL).then((response)=>{
        axios.get(this.urlnew).then((CIDATA)=>{
            //this.state.ContainerLoadKey =  this.state.ContainerLoadKey + 1,
            //    this.state.currentInventoryKey = this.state.currentInventoryKey + 1
          this.setState({
            contLoadData : response.data,
            currentIntObject : CIDATA.data,

              ContainerLoadKey : parseInt(this.state.ContainerLoadKey) + 1,
              currentInventoryKey : parseInt(this.state.currentInventoryKey) + 1
          })

        })
          console.log("contLoadData",this.state.contLoadData);
        })

       /* $.ajax({
            url: this.urlnew,
            success:function(data){
                debugger;
                console.log(">>>>>>>>>>>> ajax" , data)
                this.CIData = data
                this.setState({

                })





            }.bind(this)
*/
     //   })
}
changeLot(e){
      var id = e.target.value
      this.lotId =  id
        var PIview = createDataLoader(ContainerDetailsForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter:
                {"include" : ["TInventoryLocation","TPackagingInstructionLots"]
                }

            }]
        });

        var base1 = 'TPackagingInstructionLots/'+ id;
        this.urlnew = PIview._buildUrl(base1, {
            include: {"relation": "TPiInventory", "scope": {"include": ["TInventoryLocation"] ,where : {active : 1}}},


        });
        console.log(this.urlnew)
        var base2 = "TContainerLoads/"
         if(this.props.isDomestic == 0){
           this.CLoadURL = PIview._buildUrl(base2,{
           include : ["TInventoryLocation",{"relation": "TPackagingInstructionLots" , "scope":{"include":"TPackagingInstructions"}}],

          where:{ "loadContId": this.props.containerId }
        })
        }
  else if(this.props.isDomestic == 1){
     this.CLoadURL = PIview._buildUrl(base2,{
           include : ["TInventoryLocation",{"relation": "TPackagingInstructionLots" , "scope":{"include":"TPackagingInstructions"}}],
           //where: { "loadContId": this.props.containerId}
          where:{"loadContDId": this.props.containerId}
        })
  }
        axios.get(this.CLoadURL).then((response)=>{

          this.setState({
            contLoadData : response.data
          })
          console.log("contLoadData",this.state.contLoadData);
        })

        $.ajax({
            url: this.urlnew,
            success:function(data){
                debugger;
                console.log(">>>>>>>>>>>> ajax" , data)
                this.CIData = data
                this.setState({
                    currentIntObject : this.CIData,
                    index  :  this.index+1
                })

      }.bind(this)

        })

    }
    onEditClick(e){
       if(this.props.isDomestic == 0){
           if(this.props.containerTable.status == "ARRIVED"){
               swal("", "Container must be queued" , 'info')
               return;
           }

       }

       if(this.props.isDomestic == 1){
                if(this.props.containerTable.containerArrived == 0){
               swal("" , "Container is not arrived" , "info")
               return;
           }
       }


      if(this.state.editing == false){
        this.setState({
          editing: true
        })
      }
      else{
        this.setState({
          editing:false
        })
      }
    }
    onSaveClick(e){
      if(this.SaveObj.containerDelivered){
          this.SaveObj.status = "DELIVERED"
      }
        else if(this.SaveObj.containerInTransit){
          this.SaveObj.status = "INTRANSIT"
      }
      else if(this.SaveObj.containerLoaded){
          this.SaveObj.status = "LOADED"
      }

        if(this.props.isDomestic == 0){

            axios.put(Base_Url+"TContainerInternationals/" + this.props.containerTable.id ,this.SaveObj).then((response)=>{
                 swal("Done" , "Saved Successfully" , "info")
                 hashHistory.push('/Container/containerview')
                this.setState({
                    editing: false
                })
            })
        }
        else if(this.props.isDomestic == 1){
            axios.put(Base_Url+"TContainerDomestics/" + this.props.containerId ,this.SaveObj).then((response)=>{
                 swal("Done" , "Saved Successfully" , "info")
                 hashHistory.push('/Container/containerview')
                this.setState({
                    editing: false
                })
            })
        }
  }
    render() {
      if(this.props.containerTable && this.props.containerTable.TShipmentent && this.props.containerTable.TShipmentent.TShipmentLots && this.props.containerTable.TShipmentent.TShipmentLots.length>0){
    var lotList = _.map(this.props.containerTable.TShipmentent.TShipmentLots , (data ,index)=>{
        debugger;
        return(
            <option value={data.TPackagingInstructionLots.id}>{data.TPackagingInstructionLots.lot_number}</option>

        )
    })



}

        return (
           <section className="container_detils">
        <div className="container-fluid">


        <div className="row ">
        <div className="col-lg-12">
             <div className="table-responsive border-bottom">
                <ContainerTable table = {this.props.containerTable}/>

            </div>
        </div>
        </div>


            <div className="label_details" >
                <div className="row pddn-20-top">
                    <div className="col-lg-3  col-sm-12 col-xs-12">
                    <ContainerInfoComponent  info= {this.props.containerTable} />
                    </div>

                    <div className="col-lg-9  col-sm-12 col-xs-12">
                        {this.props.isDomestic == 0 ? <ShipmentSummaryComponent shipInfo = {this.props.containerTable}/> : <DomesticShipmentSummary shipInfo = {this.props.containerTable}/>}
                    </div>
                </div>
            </div>



            <br className="clearfix"/>
            <div className="row ">

                <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <div className="panel-group" id="Container-Load-Information-accordion">
                  <div className="panel panel-default">
                    <div className="panel-heading" data-toggle="collapse" data-parent="#Container-Load-Information-accordion" href="#CurrentInformation">
                      <h4 className="panel-title" >
                        <a className="accordion-toggle" >Container Load Information<i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>  </a>
                      </h4>
                    </div>
                    <div id="CurrentInformation" className="panel-collapse collapse in ">

                    <div className="table-responsive">
                        <ContainerLoadComponent key = {this.state.ContainerLoadKey} handleContainerLoadChecks = {this.handleContainerLoadChecks} contLoadData = {this.state.contLoadData} />
                    </div>



                    <ul className={this.state.editing ? "no-space" : "no-space hidden"}>

                    <li >
                      <div className="form-group">
                         <input type="text" className="form-control s_width" value = {this.props.containerTable ? (this.props.containerTable.sealNumber ? this.props.containerTable.sealNumber : ''): ''} disabled  id="SealNumber" placeholder="Seal Number"/>
                         <div className="error"><span></span></div>
                     </div>
                   </li>
                    <li >
                       <label className="control control--checkbox ">Confirmed Loaded?
                          <input type="checkbox" onChange={this.handleCheckbox} name = "containerLoaded" /><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li >
                        <label className="control control--checkbox ">Confirmed In Transit?
                          <input type="checkbox" name = "containerInTransit" onChange = {this.handleCheckbox}  /><div className="control__indicator"></div>
                        </label>
                    </li>
                    <li >
                       <label className="control control--checkbox ">Confirmed Delivered?
                          <input type="checkbox" name = "containerDelivered" onChange= {this.handleCheckbox}  /><div className="control__indicator"></div>
                        </label>
                    </li>
                    </ul>


                        </div>
                     </div>
                    </div>
                </div>

    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 ">
        <div className="arrow-btn">
            <button type="button" onClick = {this.onLeftClick} className={this.state.editing ? "btn btn-default" : "btn btn-default hidden"}><i className="fa fa-arrow-left orange-orange fa-2x"  aria-hidden="true"></i></button>
            <button type="button" onClick = {this.onRightClick} className={this.state.editing ? "btn btn-default" : "btn btn-default hidden"}><i className="fa fa-arrow-right orange-orange fa-2x" aria-hidden="true"></i></button>
        </div>
    </div>

            <ul className="no-space">
                <li >
                   <div className="form-group">
                      <select className={this.state.editing ? "form-control s_width" : "form-control s_width hidden"} onChange={this.changeLot}  id="customer_name" name="customer_name">
                             <option value="">Pull From Other Lot</option>
                            {lotList}
                        </select>
                      <div className="error"><span></span></div>
                  </div>
                </li>
                </ul>

<div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <div className={this.state.editing ? "panel-group" : "panel-group hidden"} id="CurrentInventoryaccordion">
                  <div className="panel panel-default">
                    <div className="panel-heading" data-toggle="collapse" data-parent="#CurrentInventoryaccordion" href="#CurrentInventory">
                      <h4 className="panel-title" >
                        <a className="accordion-toggle" > Current Inventory<i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>  </a>
                      </h4>
                    </div>
                    <div id="CurrentInventory" className="panel-collapse collapse in ">

                    <div className="table-responsive">
                   <CurrentInventoryComp key = {this.state.currentInventoryKey} currentInventory = {this.state.currentIntObject} handleCurrentInvChecks = {this.handleCurrentInvChecks}/>
                    </div>
                </div>
             </div>
             </div>
       </div>

    </div>

            <div className="row">
            <div className=" col-lg-12 "><hr/></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="text_left">
                         <div className="pull-left margin-10-last-l"><button type="button" id="back" className="btn  btn-gray text-uppercase"> BACK</button> </div>
                            {
                               /* <div className="pull-left margin-10-all">
                                    <button type="button" className="btn  btn-gray text-uppercase">Add to queue</button>
                                </div>

                                < div className="pull-left margin-10-all"><button type="button" id="edit_details"  className="btn  btn-gray text-uppercase">Print Load Order</button> </div>
                                <div className="pull-left margin-10-all"><button type="button" id="edit_details"  className="btn  btn-gray text-uppercase">Print BOL</button> </div>
                           */
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="pull-right margin-10-last-r">{this.state.editing == false ? <button type="button"  className="btn  btn-success text-uppercase" onClick = {this.onEditClick}> Edit</button> : <button type="button"  className="btn  btn-success text-uppercase" onClick = {this.onSaveClick.bind(this)} > SAVE</button>} </div>
                          <div className="pull-right margin-10-all"><button type="button" id="edit_details"  className={this.state.editing ? "btn  btn-primary text-uppercase" : "btn  btn-primary text-uppercase hidden" } onClick = {this.onCancelClick}>Cancel</button> </div>



                    </div>

                </div>

         </div>
        </section>
                )
    }
}
export default ContainerDetailsForm;
