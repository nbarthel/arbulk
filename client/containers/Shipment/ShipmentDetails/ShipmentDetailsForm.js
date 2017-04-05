import React from 'react';
//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';
import { Link } from 'react-router';
import ShipmentDetailsTable from '../../../components/ShipmentViewComponents/ShipmentDetailsTable'
import ShipmentSummaryComponent from '../../../components/ShipmentViewComponents/ShipmentSummaryComponent'
import ContainerSummaryComponent from '../../../components/ShipmentViewComponents/ContainerSummaryComponent'
import CurrentInventoryComponent from '../../../components/ShipmentViewComponents/CurrentInventoryComponent'
import DomesticShipmentSummary from '../../../components/ShipmentViewComponents/DomesticShipmentSummary'
import { createDataLoader } from 'react-loopback'
import { hashHistory } from 'react-router'
import axios from 'axios'
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';

class  ShipmentDetailsForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showEdit : 'block',
            hideEdit : 'none',
            currentIntObject : undefined,
           CI : false,
            total : 0

        }
        this.total = 0
        this.TotalSum = 0
        this.allocatedArray = [ ]
        this.unAllacated = 0
        this.unique
        this.addSum
        this.flag = undefined
        this.b = []
        this.truckerDetail = { }
        this.someId = 1
        this.shipmentId = null
        this.index  = 0
        this.piLotId
        this.idArray = []
        this.deleteArray = []
        this.onClick=this.onClick.bind(this);
        this.tableCheckBoxChange = this.tableCheckBoxChange.bind(this)
        this.getCurrentInventry = this.getCurrentInventry.bind(this)
        this.handleTruckerSelect = this.handleTruckerSelect.bind(this)
        this.handleNumberOfContainers = this.handleNumberOfContainers.bind(this)
        this.sum = this.sum.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onSaveChange = this.onSaveChange.bind(this)
        this.deleteAllocate = this.deleteAllocate.bind(this)
        this.onDeleteFunction = this.onDeleteFunction.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.checkConfirmation = this.checkConfirmation.bind(this)
        this.onAllocateContainer = this.onAllocateContainer.bind(this)
        this.piLotIdArray = []
    }
    componentDidMount() {
       console.log("aloc",this.props.allocShipment)
       if(this.props.allocShipment == 1){
        this.setState({
            hideEdit : 'block',
                showEdit : 'none'
        })
       }
       var PIview = createDataLoader(ShipmentDetailsForm,{
          queries:[{
              endpoint: 'TPackagingInstructions',
              filter: {
                  include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
              }
          }]
      })
     var base = 'TCompanies'
      this.urlTrucker = PIview._buildUrl(base, {
          "where" : {type : "TRUCKER" }
      })
      axios.get(this.urlTrucker).then((response)=>{
        this.setState({
            trucker : response.data
        })
        this.truckers = _.map(this.state.trucker,(truck,index)=>{
           return <option key = {index} value = {truck.name+truck.id}>{truck.name}</option>
        })

        this.forceUpdate()
      })
      var e = {target:{checked:true}}
      var i =0
      while(true){
        if(document.getElementById(i)){
          document.getElementById(i).checked = true
          this.tableCheckBoxChange(e,this.props.data.TShipmentLots[i])
          i++
        }
        else{
          break
        }
      }

      this.forceUpdate()
    }
    checkConfirmation()
  	{
      var status;
      var id;
      if(this.props.data.isDomestic==0){
        status = this.props.data.TShipmentInternational[0].status
        id = this.props.data.TShipmentInternational[0].id
      }
      else{
        status = this.props.data.TShipmentDomestic[0].status
        id = this.props.data.TShipmentDomestic[0].id
      }
      var data = this.props.data.isDomestic
      var tempthis = this
        if(status == 'UNCONFIRMED' || status == "CONFIRMED"){

          swal({
            title:"Are you sure?",
			      text:"Want to Delete Shipment",
			      type:"warning",
			      showCancelButton: true,
			      confirmButtonColor: "#DD6B55",
  		      confirmButtonText: "Yes, delete it!",
  		      closeOnConfirm: false
          },
        function(isConfirm){
          debugger
          if(isConfirm){

            var tableName = "TShipmentInternationals";
            if(data!=0){
                  tableName = "TShipmentDomestics"
            }
            var PIview = createDataLoader(ShipmentDetailsForm, {
                queries: [{
                    endpoint: 'TPackagingInstructionLots'
                }]
            });
              var base = Base_Url+tableName+"/DeleteTemp"
              var obj = {id:id}
              debugger
                      $.ajax({
                        type:"POST",
                          url: base,
                          data:obj,
                          success:function(data){
                            debugger
                          swal({
                            title:"Info",
                            text:"Deleted Successfully",
                            type:"info"
                          },function(){
                            debugger
                              hashHistory.push('/Shipment/shipmentview')
                          })

                          }

                      })
          }
          else{
            return {"shpid":id,"res":false}
          }
        })

        }
        else{
          swal({
            title:"Info",
            text:"order with status " + status + " can not be deleted",
            type:"info"
          },
        function(){
            return {"shpid":id,"res":false}
        })
        }
  	}

    onAllocateContainer(){
      this.setState({
                   hideEdit: 'block',
                   showEdit: 'none'
               });
    }

    onDelete(){
      this.checkConfirmation(function(res){
      });
    }
    tableCheckBoxChange(e,value){
      debugger;

        if(e.target.checked) {
        this.piLotIdArray.push(value.TPackagingInstructionLots.id)
        // document.getElementById("ContainerSummary").style.display = "table"
        console.log("value", value)
        this.sID = value.shipmentId
        this.shipmentId = value.shipmentId
        this.piLotId = value.TPackagingInstructionLots.id
        this.confid = value.id
        this.getCurrentInventry(this.piLotId)
        this.state.CI = true
        /*this.forceUpdate()*/
        console.log(this.shipmentId, this.piLotId)
            var CSView = createDataLoader(ShipmentDetailsForm,{
                queries:[{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                    }
                }]
            })
            var base = "TShipmentents" + '/' + this.shipmentId
            this.url = CSView._buildUrl(base,{
                "include" : [{"relation": "TContainerAllocation","scope":{"relation":"TCompany" , "scope":{"where" : {"type":"TRUCKER"}}}},{"relation": "TContainerDomestic","scope":{"include":["TCompany","TContainerLoad"]}},{"relation": "TContainerInternational","scope":{"include":["TCompany","TContainerLoad"]}}]
            })
            console.log(this.url)
            axios.get(this.url).then((response)=>{
                this.data = response.data
               this.TotalSum = this.sum(this.data.TContainerAllocation, 'noOfContainer');

                this.setState({
                    CSummaryData : response.data,
                    total : this.TotalSum
                })
            })



    }
    else if(!(e.target.checked)){
      for(var i in this.piLotIdArray){
        if(parseInt(this.piLotIdArray[i]) == parseInt(value.TPackagingInstructionLots.id)){
          this.piLotIdArray.splice(i,1)
          i=0
        }
      }
      if(this.piLotIdArray.length==0){
          this.setState({
            CI : false
        })
        document.getElementById("ContainerSummary").style.display = "none"
      }
      this.getCurrentInventry(this.piLotIdArray[0])
    }

    }
    getCurrentInventry(id){
        var PIview = createDataLoader(ShipmentDetailsForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter:
                {"include" : ["TInventoryLocation","TPackagingInstructionLots"]
                }

            }]
        });

        var base1 = 'TPackagingInstructionLots';
        this.urlnew = PIview._buildUrl(base1, {
            include: {"relation": "TPiInventory", "scope": {"include": ["TInventoryLocation"]}},
            "where":{"id":{"inq":this.piLotIdArray}}

        });

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

    sum(items, prop){
    return items.reduce( function(a, b){
        return (parseInt(a) + parseInt(b[prop]));
    }, 0);
};






    handleNumberOfContainers(e){
        this.truckerDetail.noOfContainer = e.target.value
    }


    handleTruckerSelect(e){
        console.log("value",e.target.selectedIndex)
        let value = this.state.trucker[e.target.selectedIndex-1]
        this.truckerDetail = {
                                "id" : 0,
                                "truckerName" : value.name,
                              "truckerId" : value.id,
                                "shipment_id" : this.props.id}
                              console.log(this.truckerDetail)
    }


     removeDuplicates(originalArray, objKey) {
        var trimmedArray = [];
        var values = [];
        var value;

        for(var i = 0; i < originalArray.length; i++) {
            value = originalArray[i][objKey];

            if(values.indexOf(value) === -1) {
                trimmedArray.push(originalArray[i]);
                values.push(value);
            }
        }

        return trimmedArray;

    }

    onSaveChange(e){
        debugger;
        var arr = []
        var index = []
       var len = this.b.length
       var len = this.b.length

   var unique = this.removeDuplicates(this.b , "truckerId")
   var TotalSum = this.sum(unique, 'noOfContainer');
  var delArray = []
  this.deleteArray = [].concat.apply([], this.deleteArray)
  for(var i in this.deleteArray){
    if(this.deleteArray[i].id > 0){
      delArray.push(this.deleteArray[i])
    }
  }



        if(this.state.CSummaryData.numberOfContainers < TotalSum){
          window.location.reload()
            swal("" ,"Container can not be added" , 'info')

            return
        }

if(this.deleteArray.length > 0  && unique.length ==0){
  var arr = []
  var delLength = this.deleteArray.length
  arr = this.deleteArray
  arr = [].concat.apply([], arr)
  arr.forEach(function(element){
  $.ajax({
  	type:"delete",
  	url: Base_Url +"/TContainerAllocations/"+element.id,

  	success:function(){
  		// swal("Posted" , "Data Has Been Successfully Edited !" , "success");
  		// hashHistory.push('/Packaging/packaginginstview/')
  	},
  	Error:function(err){
  		swal("Failed" , "Error occured please try later!" , "error");
  	}
  	})

})
}


if(unique.length >0 && delArray.length == 0){
        unique.forEach(function(element,index) {

            var length = unique.length

              axios.patch(Base_Url +"/TContainerAllocations",element).then((response)=>{
                if(length == index+1){
                  swal({
                      title: "Success",
                      text: "Done",
                      type: "success",
                      showCancelButton: true,
                },
               function(isConfirm){
              	window.location.reload();
});
}
        })
        })
      }

      if(unique.length >0 && delArray.length > 0){
        var arr = []
        var length2 = delArray.length
        // arr = this.deleteArray
        // arr = [].concat.apply([], arr)
        var length2 = delArray.length
        delArray.forEach(function(element , idx){
          if(element.id > 0){
        $.ajax({
        	type:"delete",
        	url: Base_Url +"/TContainerAllocations/"+element.id,

        	success:function(){
            if(length2 == idx + 1){
              unique.forEach(function(element,index) {

                  var length = unique.length

                    axios.patch(Base_Url +"/TContainerAllocations",element).then((response)=>{
                      if(length == index+1){
                        swal({
                            title: "Success",
                            text: "Done",
                            type: "success",
                            showCancelButton: true,
                      },
                     function(isConfirm){
                      window.location.reload();
            });
            }
              })
              })

            }
        		// swal("Posted" , "Data Has Been Successfully Edited !" , "success");
        		// hashHistory.push('/Packaging/packaginginstview/')
        	},
        	Error:function(err){
        		swal("Failed" , "Error occured please try later!" , "error");
        	}
        	})
        }


      })

            }
    }


onDeleteFunction(deleteArray){
  var unique = deleteArray
  unique.forEach(function(element,index) {

      var length = unique.length

        axios.patch(Base_Url +"/TContainerAllocations",element).then((response)=>{
          if(length == index+1){
            swal({
                title: "Success",
                text: "Done",
                type: "success",
                showCancelButton: true,
          },
         function(isConfirm){
          window.location.reload();
});
}
  })
  })

}


  onClick(){
        if (this.state.hideEdit === 'block'){
            this.setState({
                hideEdit : 'none',
                showEdit : 'block'
            })
            $('.panel-group').removeClass('active');

        }
        else {
            this.setState({
                hideEdit: 'block',
                showEdit: 'none'
            })
            $('.panel-group').addClass('active');
        }

 }

 onAdd(e){
debugger
     var bArray = []
     this.flag = "false"
if(this.length > 0){
bArray = this.b
}
       if(this.allocatedArray.length == 0) {
         var tkId = this.truckerDetail.truckerId


         var index2 = _.findIndex(this.state.CSummaryData.TContainerAllocation, function(voteItem) { return voteItem.truckerId == tkId })
        console.log("index" , index2)
         if(index2 >=0){
             this.truckerDetail.id = this.state.CSummaryData.TContainerAllocation[index2].id
             this.allocatedArray.push(_.cloneDeep(this.truckerDetail))
         }
         else{
             this.allocatedArray.push(_.cloneDeep(this.truckerDetail))
         }

         if(this.state.CSummaryData.TContainerAllocation.length > 0) {
             this.allocatedArray = this.allocatedArray.concat(this.state.CSummaryData.TContainerAllocation)
         }
         else {

             //for(var an in this.allocatedArray){
             //    this.idArray.push(this.allocatedArray.truckerId)
             //}

             this.b = this.allocatedArray

         }


           if(this.b.length > 1){
              var lastId;

              for (var i = 0; i < this.b.length; i++) {
                  if (lastId == this.b[i]['truckerId']) {
                      this.b[this.b.length-1]['noOfContainer'] = parseInt(this.b[this.b.length-1]['noOfContainer']) +parseInt(this.b[i]['noOfContainer']);
                      this.b[this.b.length-1]['id'] = this.b[this.b.length-1]['id']
                      //b[b.length-1]['noOfContainer'] += this.allocatedArray[i]['noOfContainer'];
                      //b[b.length-1]['noOfContainer'] += this.allocatedArray[i]['noOfContainer'];

                  } else {

                      this.b[this.b.length] = (this.b[i]);
                       var id =  (this.b[i+1]) ? (this.b[i+1].id) : (this.b[i].id)
                      this.b[i].id = id
                      lastId = this.b[i]['truckerId'];
                  }
              }

          }
          else{

              this.b = this.allocatedArray
          }



      }
      else{
         debugger;
          var len = this.b.length
          if(len > 0){
          for(var k = 0 ; k < len ; k++){
              if(this.b[k].truckerId == this.truckerDetail.truckerId){
                  this.b[k].noOfContainer = (this.truckerDetail.noOfContainer)
                  this.refs.TD.value = ""
                   var id  = this.b[k].id
                  this.b[k].id = id
                  this.refs.NC.value = ""
                  this.b.push(_.cloneDeep(this.truckerDetail))
                 this.b =  this.b.concat(this.state.CSummaryData.TContainerAllocation)

              }else {

                  this.b.push(_.cloneDeep(this.truckerDetail))

      }
   }
 }
else{
this.b.push(_.cloneDeep(this.truckerDetail))

}


  }
      console.log(this.allocatedArray)
      this.truckerDetail = { }
      this.refs.TD.value = ""
      this.refs.NC.value = ""


      this.unique = this.removeDuplicates(this.b , "truckerId")
      this.addSum = this.sum(this.unique, 'noOfContainer');
      this.b = this.unique
      this.unAllacated = this.addSum


       if(this.addSum > this.state.CSummaryData.numberOfContainers){
         if(this.unique.length ==2 && (this.unique[0].noOfContainer > this.state.CSummaryData.numberOfContainers) ){

           this.addSum = parseInt(this.addSum) - parseInt(this.unique[0].noOfContainer)
           this.unAllacated = this.addSum
           this.b.splice(0,1)
             this.forceUpdate()
         }
         else{
                  if(this.state.CSummaryData.TContainerAllocation.length > 0){
                         this.unique.splice(0,1)
                        this.b = this.unique
                      //  this.b = bArray
                        swal("" , "Allocated container can't be more than Unallocated container" , "info")
                   }
             else{
               if(this.unique.length > 1){
                 this.unique.splice(this.unique.length -1,1)
                 this.b = this.unique
               }
            swal("" , "Allocated container can't be more than Unallocated container" , "info")

        return
      }
      }
      }
      else{
        this.forceUpdate()
      }

}

deleteAllocate(e){
  debugger;
  if(this.props.data.isDomestic == 0){
    if((this.state.CSummaryData && this.state.CSummaryData.TContainerInternational && this.state.CSummaryData.TContainerInternational.length > 0 ) && (this.state.CSummaryData.TContainerInternational.length == this.state.CSummaryData.numberOfContainers) )
    {
      swal("" , "This allocation can not be deleted" , "info")
      return
    }
  }else if(this.props.data.isDomestic == 1){
    if((this.state.CSummaryData && this.state.CSummaryData.TContainerDomestic && this.state.CSummaryData.TContainerDomestic.length > 0 ) && (this.state.CSummaryData.TContainerDomestic.length == this.state.CSummaryData.numberOfContainers) )
    {
      swal("" , "This allocation can not be deleted" , "info")
      return
    }
  }
  var index = e.target.getAttribute('value')
//  alert(e.target.getAttribute('value'))
  console.log(this.b)
  if(this.b.length == 0){
    this.b = this.state.CSummaryData.TContainerAllocation
    var obj =   this.b.splice(index , 1)
    this.deleteArray.push(obj)
    console.log(this.b)
    this.unique = this.removeDuplicates(this.b , "truckerId")
    this.addSum = this.sum(this.unique, 'noOfContainer');
    this.unAllacated  =   this.addSum
    this.forceUpdate()
  }else{
   var obj1 = this.b.splice(index , 1)
   this.deleteArray.push(obj1)
  console.log(this.state.CSummaryData.TContainerAllocation.length , "lengthhhh")
  this.unique = this.removeDuplicates(this.b , "truckerId")
  this.addSum = this.sum(this.unique, 'noOfContainer');
    this.unAllacated  =   this.addSum
  this.forceUpdate()
  }
}

onConfirmClick(e){
  if(this.props.id != null){
          hashHistory.push('/Shipment/shipmentConfirmation/'+this.confid)}
          else{
            swal("Selection Missing","Please Select A Shipment Lot","info")
          }
}

onEditClick(e){
  if(this.props.id != undefined){
    hashHistory.push('/Shipment/shipmentedit/'+this.props.id)
  }

else
{
  swal("Selection Missing","Please Select A Checkbox","error")
}
}

    render() {
        return (
            <section className="shipment">
                <div className="container-fluid">

                    <div className="row ">
                        <div className="col-lg-12">

                            <div className="table-responsive border-bottom">
                                <ShipmentDetailsTable tableCheckBoxChange = {this.tableCheckBoxChange} tabledata = {this.props.data}/>

                            </div>

                        </div>
                    </div>

                    <div className="">
                        <div className="row pddn-20-top">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            { this.props.data ? (this.props.data.isDomestic == 0 ? <ShipmentSummaryComponent summaryData = {this.props.data} pSumData = {this.props.pckData} /> : <DomesticShipmentSummary summaryData = {this.props.data} pSumData = {this.props.pckData}/>) : ''}
                        </div>
                    </div>
                </div>
                 <div className="row">

                    <div className=" col-lg-12 ">
                        <div className="text_left">
                         <div className="pull-right margin-10-last-r"><button type="button" id="back" className="btn  btn-gray text-uppercase" onClick = {hashHistory.goBack}> BACK</button> </div>



                         <div className="pull-left margin-10-all"><button type="button" id="confirm" className="btn  btn-success text-uppercase" onClick = {(e) => {this.onConfirmClick(e)}}>Confirm</button> </div>
                         <div className="pull-left margin-10-all"><button type="button" id="allocateContainer" className="btn  btn-success text-uppercase" onClick = {(e) => {this.onAllocateContainer(e)}}>Allocate Container</button> </div>

                          <div className="pull-left margin-10-all"><button type="button" id="edit_shipment"  className="btn  btn-orange text-uppercase" onClick={this.onEditClick}>Edit</button> </div>
                          <div className="pull-left margin-10-all"><button type="button" id="delete_shipment"  className="btn  btn-orange text-uppercase" onClick={this.onDelete}>Delete</button> </div>
                        </div>
                    </div>
                    <div className=" col-lg-12 "><hr/></div>
            </div>

                <br className="clearfix"/>

                <div className="row ">

                    <div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12">
                        <div className="panel-group" id="ContainerSummaryaccordion">
                            <div className="panel panel-default">
                                <div className="panel-heading" data-toggle="collapse"
                                     data-parent="#ContainerSummaryaccordion" href="#ContainerSummary">
                                    <h4 className="panel-title">
                                        <a className="accordion-toggle">
                                            Container Summary</a>
                                        <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>
                                    </h4>
                                </div>
                                <div id="ContainerSummary" className="panel-collapse collapse in">

                                    <div id="edit" className="edit row pddn-10-btm" style={{display:this.state.hideEdit}}>
                                            <form action="" method="post">
                                                <div className="form-group">
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                         <select ref = "TD" onChange = {this.handleTruckerSelect} className="form-control " id="Trucker">
                                                        <option value = "" selected disabled>Select Trucker</option>
                                                        {this.truckers}
                                                        </select>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                            <input type="text" ref = "NC" className="form-control" id="" onChange = {this.handleNumberOfContainers} placeholder="# of Containers"/>
                                                                <div className="error"><span></span></div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group ">
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6  padding-top-btm-xs ">
                                                                <button type="button" onClick = {this.onAdd}  className="btn btn-success btn_right_no_margin">ALLOCATE</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                   <div className="table-responsive">
                                        <ContainerSummaryComponent deleteClick={this.deleteAllocate} flag={this.flag}  hide={this.props.allocShipment} SId = {this.shipmentId} isDomestic = {this.props.isDomestic} allocatedTruckers = {this.b.length == 0 ?((this.state.CSummaryData && this.state.CSummaryData.TContainerAllocation) ?this.state.CSummaryData.TContainerAllocation:''):this.b} allocated={this.unAllacated} total = {this.state.total } />
                                        <div className="more_load" style={{display:((this.state.CSummaryData && this.state.CSummaryData.numberOfContainers) ?this.state.CSummaryData && (this.state.CSummaryData.numberOfContainers == this.state.total || this.state.CSummaryData.numberOfContainers == this.unAllacated ) : '') ? 'none' : 'block'}}>More containers are required to be allocated to this
                                            shipment!
                                        </div>
                                    </div>

                                   <div className="text_left pddn-10-top" style={{display : this.state.showEdit}}>
                         <div className="pull-left margin-10-last-l"><button type="button"  className="btn btn-sm  btn-gray">Print Load Order</button> </div>

                      </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
                        <div className="panel-group" id="CurrentInventoryaccordion">
                            <div className="panel panel-default">
                                <div className="panel-heading" data-toggle="collapse"
                                     data-parent="#CurrentInventoryaccordion" href="#CurrentInventory">
                                    <h4 className="panel-title">
                                        <a className="accordion-toggle">
                                            Current Inventory
                                            <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i> </a>
                                    </h4>
                                </div>
                                <div id="CurrentInventory" className="panel-collapse collapse ">
                                    <div className="">


                                        <div className="table-responsive">
                                                  {this.state.CI == true ? <CurrentInventoryComponent key={this.state.index}  currentInventory = {this.state.currentIntObject } /> : ''}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

               <div className="row" style={{display:this.state.hideEdit}} >
    <div className=" col-lg-12 "><hr/></div>
    <div className=" col-lg-12 " >
    <div className="pull-left margin-10-last-l"><button type="button"  id="cancel_btn" onClick={this.onClick}  className="btn  btn-gray text-uppercase">CANCEL</button> </div>
    <div className="pull-left margin-10-all "><button type="button" id="save_changes" onClick={this.onSaveChange} className="btn  btn-orange text-uppercase">Save Changes</button> </div>
    </div>
    </div>

    </div>
            </section>
        );
    }
}
export default ShipmentDetailsForm;
