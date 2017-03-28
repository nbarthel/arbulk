import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import SweetAlert from 'sweetalert-react';
import { hashHistory } from 'react-router'
import '../../../public/stylesheets/sweetalert.css';
import RailcarInformation from '../../../components/RailcarInformation/RailcarInformation';
import {Base_Url} from '../../../constants';
var Spinner = require('react-spinkit');
import  validateInput  from './PIValidator';
import ValidateAlphaNumeric from './PIValidator'
import { createDataLoader } from 'react-loopback';
import DisableDoubleClick from '../../GlobalFunctions/DisableDoubleClick'
import EnableClick from '../../GlobalFunctions/EnableClick'
var Loader = require('react-loader')
var ReactDOM = require('react-dom');
var flagsc = true;
var flagnj = true;
var weightinLBS = true;
var isWeightconverted = false;
var flagBoxesSet = false
var objectPushed = false
const MUL_FACTOR = 2.204625
var clicked = false
var flag = true

export default class EnterPackagingInstructionForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.Allobjs = { }
    this.PI ={ }
    this.obj = { }
    this.railcarObj = { }
    this.railObjects = []
    this.rObjects = []
    this.PIedit = { }
    this.railCarObjects = []
    this.RailCarChange = { }
    this.RailCarArray = []
    var temobj = new Object();
    this.RailCarArray.push(temobj)
    this.AddRailCarForProps = this.AddRailCarForProps.bind(this)
    this.ChangeRailCarForProps = this.ChangeRailCarForProps.bind(this)
    this.MinusRailCarFromProps = this.MinusRailCarFromProps.bind(this)
    this.state = {
      railCarInfoList: [],
      customChecked : false,
      index: 0,
      isLoading : false,
      errors : { },
      rObjects:[],
      labelLength : [],
      selectedOption: 'lbs',
      haveSpecialChar :0,
      loaded : false
    }
    this.userId = localStorage.getItem('userId')
    //this.index = 0

    this.handleRailcarChange = this.handleRailcarChange.bind(this);
    this.obj = {
      customer_id : '',
      location_id : '',
      po_number : '',
      material : '',
      origin_id : '',
      packaging_material_id : '',
      pallet_type_id : '',
      bags_per_pallet : '',
      wrap_type_id : '',
      bag_id : '',
      custom_label : '',
    }
    this.onAdd = this.onAdd.bind(this);
    this.handlePIChange = this.handlePIChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate =this.onUpdate.bind(this);
    this.handleWeightEdit = this.handleWeightEdit.bind(this)
    this.onMinus = this.onMinus.bind(this)
    this.onChekBoxClick = this.onChekBoxClick.bind(this)
    this.handleNumberofbagsChange = this.handleNumberofbagsChange.bind(this)
    this.Add = false
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleOptionChange1 = this.handleOptionChange1.bind(this)
    this.convertWeightToLBS = this.convertWeightToLBS.bind(this)
    this.convertWeightToKG = this.convertWeightToKG.bind(this)
    this.ValidateRailCar = this.ValidateRailCar.bind(this)
    this.SetUnitType = this.SetUnitType.bind(this)
  }
// componentDidMount() {
// }
  componentDidMount() {
    var PIview = createDataLoader(EnterPackagingInstructionForm,{
      queries:[{
        endpoint: 'TPackagingInstructions',
        filter: {
          include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
        }
      }]
    })
    var base = 'TCompanies'
    this.urlCustomer = PIview._buildUrl(base, {
      "where" : {type : "CUSTOMER" }
    })


    axios.get(Base_Url+"TPackagingInstructions/getPoList").then((response) => {
      this.setState({
        polList: response.data
      })
    })
        .catch(function(err){
          console.log(err)
        })

    axios.get(this.urlCustomer).then((response) => {
      this.setState({
        customer: response.data
      })
    })
        .catch(function(err){
          console.log('eroor>>>>' , err)
        })
    axios.get(Base_Url+"TLocations").then((response) => {
      this.setState({
        location: response.data
      })
    })
        .catch(function(err){
          console.log('eroor>>>>' , err)
        })
    axios.get(Base_Url+"TOrigins").then((response)=> {
      this.setState({
        origin: response.data
      })
    })
        .catch(function(err){
          console.log(err)
        })

    axios.get(Base_Url+"TPackagingTypes").then((response) => {
      this.setState({
        packagingtype : response.data
      })
    })
        .catch(function(err){
          console.log(err)
        })

    axios.get(Base_Url+"TPalletTypes").then((response)=> {
      this.setState({
        pallettype : response.data
      })
    })
        .catch(function(err){
          console.log(err)
        })

    axios.get(Base_Url+"TWrapTypes").then((response) => {
      this.setState({
        wrapType : response.data
      })
    })
        .catch(function(err){
          console.log(err)
        })

    axios.get(Base_Url+"TPackagingMaterials").then((response) => {
      this.setState({
        tempUnitType : response.data,
        loaded : true
      })
      debugger
      if(this.props.data){
        var tempObj=[]
        for(var i =0;i<response.data.length;i++){
          if(this.props.data.bag_id==response.data[i].packagingTypeId &&
              this.props.data.location_id == response.data[i].locationId &&
              this.props.data.customer_id == response.data[i].customerId ){
            tempObj.push(response.data[i])
          }
        }
        this.setState({
          unittype : tempObj,
          loaded : true
        })
      }
    })
        .catch(function(err){
          console.log(err)
        })
  }

  handleOptionChange(changeEvent) {
    debugger;

    var selectedOption = changeEvent.target.value
    this.setState({
      selectedOption: changeEvent.target.value
    });
// weightinLBS = true;
// if( weightinLBS && isWeightconverted){
//    this.convertWeightToLBS(this.railcarObj)
//    this.convertWeightToLBS(this.railCarObjects)
//   //  if(this.props.data!==undefined){
//   //    this.convertWeightToLBS(this.props.data.TPackagingInstructionLots)
//   //  }
// }
//isWeightconverted = false;
  }
  handleOptionChange1(e) {
    debugger;

    this.setState({
      selectedOption: e.target.value
    });
    // weightinLBS = false;
    // if( !weightinLBS && !isWeightconverted){
    //     this.convertWeightToKG(this.railcarObj)
    //     this.convertWeightToKG(this.railCarObjects)
    //     // if(this.props.data!==undefined){
    //     //   this.convertWeightToKG(this.props.data.TPackagingInstructionLots)
    //     // }
    // }
    // isWeightconverted = true;
  }
  SetUnitType(name){
    var check=false
    var tempObj=[]
    if(this.obj.bag_id!=""&&this.obj.customer_id!=""&&this.obj.location_id!=""){
      check = true;
    }
    if(this.props.data){
      check = true;
      this.props.data.packaging_material_id=""
    }
    if(check){
      if(this.props.data){
        for(var i =0;i<this.state.tempUnitType.length;i++){
          if(this.props.data.bag_id == this.state.tempUnitType[i].packagingTypeId &&
              this.props.data.location_id == this.state.tempUnitType[i].locationId &&
              this.props.data.customer_id == this.state.tempUnitType[i].customerId ){
            tempObj.push(this.state.tempUnitType[i])
          }
        }
      }
      else{
        for(var i=0;i<this.state.tempUnitType.length;i++){
          if(this.state.tempUnitType[i].locationId==parseInt(this.obj.location_id) &&
              this.state.tempUnitType[i].customerId==parseInt(this.obj.customer_id) &&
              this.state.tempUnitType[i].packagingTypeId==parseInt(this.obj.bag_id)){
            tempObj.push(this.state.tempUnitType[i])
          }
        }
      }
      var dummyObject={}
      if(tempObj && tempObj.length>0 && Object.keys(tempObj[0]).length>0){
        for(var props in tempObj[0]){
          dummyObject[props] = ""
        }
      }
      tempObj.unshift(dummyObject)
      this.setState({
        unittype:tempObj
      })
    }
  }
  handlePIChange(e){
    debugger
    this.obj[e.target.name] = e.target.value
    if(this.obj.bag_id == 1){
      flagBoxesSet = false
      if(this.obj.location_id!=="" && (flagsc || flagnj)&& this.obj.location_id!== undefined)
      {
        if(this.obj.location_id==1 && flagnj)
        {
          flagnj = false;
          flagsc = true;
          this.state.numberofbagsorpallets = "55";
          this.obj.bags_per_pallet = this.state.numberofbagsorpallets
        }
        else if(this.obj.location_id==2 && flagsc) {
          flagsc = false;
          flagnj = true;
          this.state.numberofbagsorpallets = "60";
          this.obj.bags_per_pallet = this.state.numberofbagsorpallets
        }
        else {
          if((this.obj.location_id==2 && !flagsc)||(this.obj.location_id==1 && !flagnj))
          {
            this.state.numberofbagsorpallets = e.target.value
          }
          this.state.numberofbagsorpallets = (this.obj.bags_per_pallet==="")?this.state.numberofbagsorpallets:this.obj.bags_per_pallet
        }
      }
    }
    else if(!flagBoxesSet && this.obj.bag_id == 2){
      debugger
      this.state.numberofbagsorpallets = "1"
      this.obj.bags_per_pallet = this.state.numberofbagsorpallets
      flagBoxesSet = true
      this.forceUpdate()
    }
    else if(this.obj.bag_id != 1){
      flagBoxesSet = false
      flagnj = true;
      flagsc = true;
      this.obj[e.target.name] = e.target.value
      if(e.target.name==="bags_per_pallet")
      {
        this.state.numberofbagsorpallets = e.target.value//(this.obj.bags_per_pallet==="")?this.state.numberofbagsorpallets:this.obj.bags_per_pallet
        this.obj.bags_per_pallet = this.state.numberofbagsorpallets
      }
    }
    this.SetUnitType(e.target.name)
    console.log(this.obj)
  }
  handleCustomerEditChange(e){
    this.props.data.customer_id = e.target.value
    this.SetUnitType()
    this.forceUpdate()
  }
  handleLocationEditChange(e){
    this.props.data.location_id = e.target.value
    this.SetUnitType()
    this.forceUpdate()
  }
  handlePOEditChange(e){
    this.props.data.po_number = e.target.value

    this.forceUpdate()
    console.log(this.props.data)
  }
  cancel(e){

    window.location.reload();
  }
  handleMaterialEditChange(e){
    this.props.data.material = e.target.value
    //t	his.props.data.material = this.refs.Material.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleOriginEditChange(e){
    this.props.data.origin_id = e.target.value
    //this.props.data.origin_id = this.refs.Origin.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleTypeOfPackagingEditChange(e){
    debugger
    this.props.data.bag_id = e.target.value
    this.SetUnitType()
    this.forceUpdate()
  }
  handleTypeofUnitEditChange(e){
    this.props.data.packaging_material_id = e.target.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handlepalletTypeChange(e){
    this.props.data.pallet_type_id = e.target.value
//this.props.data.pallet_type_id = this.refs.palletType.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleNumberofbagsChange(e){
    debugger
    if(this.props.data!==undefined)
    {
      this.props.data.bags_per_pallet = e.target.value
    }
    else {

      this.state.numberofbagsorpallets = e.target.value;
    }
    //this.props.data.number_of_bags =  this.refs.bagsNumber.value
    this.obj[e.target.name] = e.target.value
    this.forceUpdate()
    console.log(this.props.data)
  }

  handleWrapTypeChange(e){
    this.props.data.wrap_type_id = e.target.value
    //this.props.data.wrap_type_id = this.refs.wrapType.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleNotesChange(e){
    this.props.data.notes = e.target.value
    //this.props.data.notes = this.refs.notes.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleLabelChange(e){
    this.props.data.custom_label = e.target.value
    //this.props.data.custom_label = this.refs.customLabel.value
    this.forceUpdate()
    console.log(this.props.data)
  }
  handleRailCarNumberEdit(e,index){
    /*this.RailCarChange[e.target.name] = e.target.value*/
    //console.log(">>>>>>>>>>>>>>..",this.props.id)
    debugger
    this.props.data.TPackagingInstructionLots[index].railcar_number = e.target.value
    this.forceUpdate()
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...",this.props.data.TPackagingInstructionLots)

  }
  handleLotNumberEdit(e,index){
    //this.RailCarChange[e.target.name] = e.target.value
    this.props.data.TPackagingInstructionLots[index].lot_number = e.target.value
    this.forceUpdate()

  }
  handleWeightEdit(e,index){
    //console.log("<<*_________________*>>",key)
    this.props.data.TPackagingInstructionLots[index].weight = e.target.value
    //this.props.lotInfo[id].weight = this.refs.weight.value
    this.forceUpdate()
//console.log(this.RailCarChange)
  }

  handleRailcarChange(e){
    debugger;
    var number = e.target.id[e.target.id.length-1]
    var propertyName = e.target.name
    if(!isNaN(number) && this.RailCarArray.length>1){
      this.RailCarArray[number][propertyName] = e.target.value;
    }
    else{
      this.RailCarArray[0][propertyName] = e.target.value;
    }
    console.log(this.railcarObj)
  }
  onUpdate(e){

    DisableDoubleClick('update')
    this.obj = {
      customer_id : this.props.data.customer_id.toString(),
      location_id : this.props.data.location_id.toString(),
      po_number : this.props.data.po_number.toString(),
      material : this.props.data.material.toString(),
      origin_id : this.props.data.origin_id.toString(),
      packaging_material_id : this.props.data.packaging_material_id.toString(),
      pallet_type_id : this.props.data.pallet_type_id.toString(),
      bags_per_pallet : this.props.data.bags_per_pallet.toString(),
      wrap_type_id : this.props.data.wrap_type_id.toString(),
      bag_id : this.props.data.bag_id.toString(),
      custom_label : this.props.data.custom_label.toString(),
    }
    if(this.isValid() != true){
      EnableClick('update')
      return
    }
    if(this.ValidateRailCar(1)){
      EnableClick('update')
      return
    }
    var isError = false;
    for(var i=0;i<this.props.data.TPackagingInstructionLots.length;i++){
      var lot_number = this.props.data.TPackagingInstructionLots[i].lot_number
      var railcar_number = this.props.data.TPackagingInstructionLots[i].railcar_number
      var weight = this.props.data.TPackagingInstructionLots[i].weight
      if(lot_number==" " || lot_number==null || lot_number == undefined || lot_number==""){
        swal("Lot Number can't be empty")
        isError = true;
        EnableClick('update')
        return
      }
      if(railcar_number==" " || railcar_number==null || railcar_number == undefined || railcar_number==""){
        swal("Railcar Number can't be empty")
        isError = true;
        EnableClick('update')
        return
      }
      if(weight==" " || weight==null || weight == undefined || weight==0 || weight==""){
        swal("Weight can't be empty or 0")
        isError = true;
        EnableClick('update')
        return
      }
    }
    if(!document.getElementById('row1').checked){
      swal("Error","Please check the Create Label Check Box","info")
      isError = true
      EnableClick('update')
      return
    }
    if(isError){
      EnableClick('update')
      return
    }
    var postUrl = Base_Url+"TPackagingInstructions/updatePIEntry"
    $.ajax({
      type:"POST",
      url: postUrl,
      data:this.props.data,
      success:function(){
        swal("Posted" , "Data Has Been Successfully Edited !" , "success");
        hashHistory.push('/Packaging/packaginginstview/')
      },
      Error:function(err){
        EnableClick('update')
        swal("Failed" , "Error occured please try later!" , "error");
      }
    })

  }
  isValid(){

    const { errors , isValid, haveSpecialChar } = validateInput(this.obj);
    if(!isValid){
      this.setState({
        errors : errors,
        haveSpecialChar : haveSpecialChar
      })
    }
    this.forceUpdate()
    return isValid;
  }


  onSubmit(e){
    debugger
    var checkPo = []

    DisableDoubleClick('submit')

    for(var i in this.state.polList){
      checkPo.push(this.state.polList[i].poNumber)
    }
    if(this.obj.po_number != ""){
      if(checkPo.indexOf(this.obj.po_number) > 0){
        swal('Warning' , "This Purchase order already exists" , 'info')
        EnableClick('submit')
        return ;
      }
    }
    if(this.isValid() == true){

      if(!document.getElementById('row1').checked){
        swal("Error","Please check the Create Label Check Box")
        EnableClick('submit')
        return
      }
      if(this.ValidateRailCar()){
        EnableClick('submit')
        return
      }
      console.log("PI Object",this.obj)
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10){
        dd = '0'+dd
      }
      if(mm<10){
        mm = '0'+mm
      }
      today = mm+'/'+dd+'/'+yyyy
      this.obj.created_by = this.userId
      this.obj.created_on = today
      this.obj.packaging_status = "UNCONFIRMED"
      //this.obj.
      Object.defineProperty(this.Allobjs,"PI",{
        enumerable: true ,
        writable: true,
        configurable:true,
        value:this.obj})
//if(this.state.customChecked == false){
      // 	if(Object.keys(this.railcarObj).length != 0){
      // 		this.addrailcarObject();
      // 	}
//}
      this.railCarObjects = this.RailCarArray
      console.log(this.railCarObjects)
      if(this.railCarObjects && this.railCarObjects.length > 1){
        this.state.labelLength.unshift(this.obj.custom_label)

        for(var i in this.railCarObjects){
          let tempcustomlabel = this.state.labelLength[i]
          if(i>0){
            tempcustomlabel = tempcustomlabel.poNumber+tempcustomlabel.lotNumber+tempcustomlabel.material+tempcustomlabel.originName+tempcustomlabel.weight
          }
          this.railCarObjects[i].custom_label = tempcustomlabel
        }
      }
      if(this.state.selectedOption == 'kg'){
        var flag = true;
        for(var i=0;i<this.railCarObjects.length;i++){
          this.railCarObjects[i].weight = this.railCarObjects[i].weight*MUL_FACTOR
        }
      }
      if(this.state.labelLength && this.state.labelLength.length == 0){
        this.railCarObjects[0].custom_label = this.obj.custom_label
      }

      this.Allobjs.packagingLots = JSON.parse(JSON.stringify(this.railCarObjects))

      console.log(this.Allobjs)

      var postUrl = Base_Url+"TPackagingInstructions/createPiEntry"
      if(this.railCarObjects== 0){
        if(flag){
          for(var i=0;i<this.railCarObjects.length;i++){
            this.railCarObjects[i].weight = this.railCarObjects[i].weight/MUL_FACTOR
          }
        }
        this.state.labelLength.shift()
        swal("Error","Please enter railcar Information","error")
        EnableClick('submit')
        return;
      }
      console.log(this.Allobjs)
      if(this.Allobjs.PI.po_number == "" || this.Allobjs.PI.po_number === undefined){
        this.Allobjs.PI.po_number = this.Allobjs.packagingLots[0].lot_number
      }
      swal({
        title: "Submitting",
        text: "Please Wait",
        timer: 2500,
        showConfirmButton: false
      })
      $.ajax({
        type:"POST",
        url: postUrl,
        data:this.Allobjs,
        success:function(){
          swal("Posted" , "Data Has Been Successfully Posted !" , "success");
          hashHistory.push('/Packaging/packaginginstview/')
        },
        error:function(err){
          EnableClick('submit')
          if(flag){
            for(var i=0;i<this.railCarObjects.length;i++){
              this.railCarObjects[i].weight = this.railCarObjects[i].weight/MUL_FACTOR
            }
          }
          this.state.labelLength.shift()
          swal("Error","Please enter all the fields","error")
        }
      })
      this.railCarObjects.splice(this.railCarObjects.length-1,1)
    }
    else{
      if(this.state.haveSpecialChar==0){
        swal('',"Please complete fields marked as red" , 'info')
        EnableClick('submit')
      }
    }

  }


  addrailcarObject(){
    var railCarObjects = new Object()
    this.RailCarArray.push(railCarObjects)
    console.log(this.railCarObjects)
    return this.RailCarArray.length
  }

  onMinus(e){
    this.setState({
      railCarInfoList : [ ],
      labelLength : []
    })
    this.railCarObjects.splice(1,this.railCarObjects.length-1)
    this.Add = false
    this.state.rObjects = []
    this.railcarObj = this.railCarObjects[0]
    this.state.index = 0;
    this.railCarObjects=[]
    this.RailCarArray.splice(1,this.RailCarArray.length-1)
  }
  ValidateRailCar(RailCarByProps){
    debugger
    var isError = false;
    var obj = [];
    if(RailCarByProps && RailCarByProps==1){
      var tempObj = {railCar:'',lot:'',weight:''}
      for(var i=0;i<this.props.lotInfo.length;i++){
        tempObj.railCar = JSON.parse(JSON.stringify(this.props.lotInfo[i].lot_number))
        tempObj.lot = JSON.parse(JSON.stringify(this.props.lotInfo[i].railcar_number))
        tempObj.weight = JSON.parse(JSON.stringify(this.props.lotInfo[i].weight))
        obj.push(JSON.parse(JSON.stringify(tempObj)))
      }
    }
    else{
      obj = JSON.parse(JSON.stringify(this.RailCarArray))
    }

    for(var i =0; i <obj.length;i++){
      if(Object.keys(obj[i]).length<3){
        swal("","Please Enter all fields of Railcar: "+i,"info")
        isError = true;
        break
      }
      for(var prop in obj[i]){
        if (obj[i].hasOwnProperty(prop)) {
          if(obj[i][prop] =="" || obj[i][prop] == null){
            swal("","Please Enter all fields of Railcar: "+i,"info")
            isError = true;
            break
          }
          if(!/^[\w-//]+$/.test(obj[i][prop])){
            swal("Error","Cant't have special charcters","warning")
            isError = true;
            break
          }
        }}
      if(isError){
        break
      }

    }
    return isError
  }
  onAdd(e){
    debugger
    var position = 0;
    this.Add = true
    if(this.ValidateRailCar()){
      return
    }

    position = this.addrailcarObject();
    const railCarInfoList = this.state.railCarInfoList;
    var count = this.state.index+1
    this.setState
    ({
      index:count,
      railCarInfoList	: railCarInfoList.concat(<RailcarInformation key={railCarInfoList.length} onChange={this.handleRailcarChange.bind(this)} idd = {position-1} />),

    })
  }
  convertWeightToLBS(object){

    if(Array.isArray(object)){

      for(var i =0;i<object.length;i++){
        object[i].weight = object[i].weight / MUL_FACTOR
      }
    }
    else{
      object.weight = object.weight / MUL_FACTOR
    }

  }
  convertWeightToKG(object){

    if(Array.isArray(object)){

      for(var i =0;i<object.length;i++){
        object[i].weight = object[i].weight * MUL_FACTOR
      }
    }
    else{
      object.weight = object.weight * MUL_FACTOR
    }

  }
  ChangeRailCarForProps(){
    debugger
    swal("value changed")
  }
  MinusRailCarFromProps(e){
    var id = parseInt(e.target.id.substring(10,e.target.id.length))
    this.props.lotInfo.splice(id,1)
    this.forceUpdate()
  }
  AddRailCarForProps(){
    debugger
    var a = JSON.parse(JSON.stringify(this.props.lotInfo[0]))
    if(this.ValidateRailCar(1)){
      return
    }
    a.lot_number = ""
    a.railcar_number = ""
    a.weight = ""
    a.id = 0
    a.railcar_status = "INTRANSIT"
    a.status ="UNCONFIRMED"
    a.bags_to_ship = 0
    a.arrived = 0
    a.createdOn = new Date()
    this.props.lotInfo.push(a)
    this.forceUpdate()
  }
  onChekBoxClick(e){
    debugger
    var labelArray = []
    var obj1 = {}
    var flag = false
    var weightForLabel = -10
    var weightUnit = 'Kg'
    if(e.target.checked == true)
    {
      if(this.props.data){
        for(var i=0;i<this.state.unittype.length;i++){
          if(this.props.data.packaging_material_id==this.state.unittype[i].id){
            weightForLabel = this.state.unittype[i].avarageMaterialWeight
            if(this.props.data.bag_id!="1"){
              weightUnit = 'lbs'
            }
            break;
          }
        }
      }
      else{
        for(var i=0;i<this.state.unittype.length;i++){
          if(this.state.unittype[i].id==parseInt(this.obj.packaging_material_id)){
            weightForLabel = this.state.unittype[i].avarageMaterialWeight
            if(this.obj.bag_id!=1){
              weightUnit = 'lbs'
            }
            break;
          }
        }
      }
      if(weightForLabel==""){
        weightForLabel = -1
      }
      if(this.props.data!==undefined){
        var flag = true
        this.railcarObj = []
        this.RailCarArray=[]
        for(var i=0;i<this.props.data.TPackagingInstructionLots.length;i++){

          var object = new Object()
          object.lot_number = this.props.data.TPackagingInstructionLots[i].lot_number
          object.railcar_number = this.props.data.TPackagingInstructionLots[i].railcar_number
          object.weight = this.props.data.TPackagingInstructionLots[i].weight
          this.railcarObj.push(object)
          this.RailCarArray.push(object)
          this.state.rObjects.push(object)
        }
        objectPushed = true
        this.obj.origin_id = this.props.data.origin_id
        this.obj.po_number = this.props.data.po_number
        this.obj.material = this.props.data.material
      }
      var obj = ""
      var arrRail = []
      var mulrail = []
      var arrWeight = []
      var arrlot= []
      this.state.rObjects = objectPushed ? this.RailCarArray : []

      if(this.Add == false) {
        this.railcarObj = this.RailCarArray[0]
        this.state.rObjects.push(this.railcarObj);
      }
      else if(this.Add == true){

        for(var i =0 ;i<this.RailCarArray.length;i++){
          var obj = JSON.parse(JSON.stringify(this.RailCarArray[i]))
          this.state.rObjects.push(obj)
        }

      }
      this.state.rObjects = [].concat.apply([], this.state.rObjects);

      for(var i in this.state.origin){

        if(this.state.origin[i].id == this.obj.origin_id){
          var originName = this.state.origin[i].origin

        }

      }

      for(var i in this.state.rObjects){
        if(!isNaN(i)){
          arrRail.push(this.state.rObjects[i].railcar_number)
          arrWeight.push(this.state.rObjects[i].weight)
          arrlot.push(this.state.rObjects[i].lot_number)
        }
      }
      console.log("Arrayweight , Arrayrail , Arraylot" ,arrRail , arrWeight, arrlot)
      var uniqueRail = arrRail.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      })

      var uniquelot = arrlot.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      })

//var uniqueWeight = arrWeight
      var uniqueWeight = arrWeight.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      })
      if(this.state.selectedOption == 'kg'){
        for(var i =0 ;i<uniqueWeight.length;i++){
          uniqueWeight[i] = uniqueWeight[i] * MUL_FACTOR
        }
      }
      var stampConfirm = localStorage.getItem('userName')
      var count = 0

      for(var z in uniquelot){
        if(weightForLabel>-1){
          this.state.labelLength.push({"poNumber" : this.obj.po_number +'\n' ,"material" : this.obj.material +'\n' ,"lotNumber" : uniquelot[z]+ '\n' , "weight" :  weightForLabel+" "+weightUnit +" Net \n","originName" : "Made in "+originName })
        }
        else{
          this.state.labelLength.push({"poNumber" : this.obj.po_number +'\n' ,"material" : this.obj.material +'\n',"lotNumber" : uniquelot[z]+ '\n' ,"originName" : "Made in "+originName })
        }


      }
//this.state.labelLength.push(labelArray)

      this.state.labelLength = [].concat.apply([],this.state.labelLength)
      if(weightForLabel>-1){
        var obj =  this.obj.po_number +'\n'+ this.obj.material +'\n' + uniquelot[0] + '\n'  +  weightForLabel+ " "+weightUnit+ " Net \n" + "Made in "+originName
      }
      else{
        var obj =  this.obj.po_number +'\n'+ this.obj.material +'\n' + uniquelot[0] + '\n'   + "Made in "+ originName
      }


      if(this.props.data!==undefined){
        this.props.data.custom_label = obj
        var tempObj = this.state.labelLength
        for (var i=0;i< this.props.lotInfo.length;i++){
          let tempCustomlabelobj;
          if(weightForLabel>-1){
            tempCustomlabelobj = tempObj[i].poNumber+tempObj[i].material+tempObj[i].lotNumber+tempObj[i].weight+tempObj[i].originName
          }
          else{
            tempCustomlabelobj = tempObj[i].poNumber+tempObj[i].material+tempObj[i].lotNumber+tempObj[i].originName
          }

          this.props.lotInfo[i].custom_label = tempCustomlabelobj
        }
      }
      this.state.labelLength.splice( 0 ,1)
      this.autolabel = obj
      this.obj.custom_label = obj
      this.setState({
        labelObject : obj,
        customChecked : true
      })
    }
    else{
      this.setState({
        labelObject : null,
        customChecked : true,
        labelLength : []
      })
      this.obj.custom_label = ""
      this.state.labelLength = []
      if(this.props.data!==undefined){
        this.props.data.custom_label = ''
      }
      if(this.props.data!==undefined){
        this.props.lotInfo[0].custom_label = ''
      }
    }
  }
  addrailcarObjectLabel()
  {
    var obj = new Object
    this.RailCarArray.push(obj)
  }
  render() {
    var customers = _.map(this.state.customer,(customer) =>
    {
      return <option key={customer.id} id = {customer.id} value={customer.id}>{customer.name}</option>
    })

    var locations = _.map(this.state.location,(location) => {
      return <option key={location.id} value={location.id}>{location.locationName}</option>
    })
    var origins = _.map(this.state.origin,(origin) => {
      return <option key={origin.id} value={origin.id}>{origin.origin}</option>
    })

    var packagingtypes = _.map(this.state.packagingtype,(packagingtype) => {
      return <option key={packagingtype.id} value={packagingtype.id}>{packagingtype.packagingType}</option>
    })
    var unittypes = _.map(this.state.unittype,(unittype) => {
      return <option key={unittype.id} value={unittype.id}>{unittype.packagingName}</option>
    })

    var pallettypes = _.map(this.state.pallettype,(pallettype) => {
      return <option key={pallettype.id} value={pallettype.id}>{pallettype.palletType}</option>
    })
    var wraptypes = _.map(this.state.wrapType,(wraptype) => {
      return <option key={wraptype.id} value={wraptype.id}>{wraptype.name}</option>
    })
    if(this.props.data != undefined){
      var editableLots = []
      var index= 0
      editableLots = _.map(this.props.lotInfo,(lotInfo,index) => {
        return <RailcarInformation lotInfo={this.props.lotInfo} MinusRailCarFromProps = {this.MinusRailCarFromProps} onChange={this.ChangeRailCarForProps} haveProps = {"1"} idForadd={"add"+index} idForminus={"minus"+index} AddRailCarForProps = {this.AddRailCarForProps} key={index} id = {index} data = {lotInfo} handleRailCarNumberEdit = {(e)=>{this.handleRailCarNumberEdit(e,index)}} handleWeightEdit = {(e)=>{this.handleWeightEdit(e,index) }} handleLotNumberEdit = {(e)=>{this.handleLotNumberEdit(e,index)}}/>
      })
    }
    return (
        <Loader loaded={this.state.loaded} id="loaded">
          <section className="edit_Packaging">
            {this.props.data == undefined?
                <div className="pull-right "  style={{"margin-right":"170","margin-top":"-33"}}>
                  <label className="control control--radio ">LBS
                    <input id="Modify_User" name="Modify_User" type="radio"
                           type="radio"
                           id="ADDCustomers"
                           name="ADDCustomers"
                           value="lbs"
                           onChange={this.handleOptionChange}
                           checked={this.state.selectedOption==='lbs'}
                        /><div className="control__indicator"></div>
                  </label>
                </div>:''}
            {this.props.data == undefined?
                <div className="pull-right " style={{"margin-right":"10","margin-top":"-33"}}>
                  <label className="control control--radio ">Kg
                    <input id="Modify_User" name="Modify_User" type="radio"
                           id="ADDCustomers"
                           name="ADDCustomers"
                           value="kg"
                           onChange={this.handleOptionChange1}
                           checked={this.state.selectedOption==='kg'}
                        /><div className="control__indicator"></div>
                  </label>
                </div>:''}
            <form className="form-horizontal padding-30">
              <div className="container">

                <div className="row">

                  <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">



                    <fieldset className="scheduler-border no-right-border">
                      <legend className="scheduler-border">PACKAGING INSTRUCTIONS</legend>
                      <div className="form-group">
                        <label htmlFor="customer_name" className={this.state.errors.customer_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>Customer Name</label>
                        <div className="col-lg-8   col-sm-11 col-xs-11 ">
                          {this.props.data == undefined ?
                              <select
                                  className="form-control"
                                  id="customer_name"
                                  name="customer_id"
                                  onChange={this.handlePIChange}
                                  >
                                <option value="Please Select An Option" disabled selected>Customer Name</option>
                                {customers}
                              </select>
                              :
                              <select
                                  className="form-control"
                                  id="customer_name"
                                  name="customer_id"
                                  ref="customerPicker"
                                  onChange={(e) => {this.handleCustomerEditChange(e)}}
                                  defaultValue={this.props.data.customer_id}
                                  value={this.props.data.customer_id}
                                  >
                                {customers}
                              </select>
                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="ar_bulk_location" className={this.state.errors.location_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>AR Bulk Location</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <select
                                  className="form-control"
                                  id="ar_bulk_location"
                                  name="location_id"
                                  ref="locationPicker"
                                  value = {this.props.data.location_id}
                                  onChange={(e)=>{this.handleLocationEditChange(e)}}
                                  >
                                {locations}
                              </select> :
                              <select
                                  className="form-control"
                                  id="ar_bulk_location"
                                  name="location_id"
                                  onChange={this.handlePIChange}
                                  >
                                <option value="Please Select An Option" disabled selected>Location</option>
                                {locations}
                              </select>}
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Purchase_Order" className={this.state.errors.po_number ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>Purchase Order</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <input
                                  type="text"
                                  className="form-control"
                                  id="Purchase_Order"
                                  placeholder="Purchase Order"
                                  ref="purchaseOrder"
                                  name="po_number"
                                  onChange={(e)=>{this.handlePOEditChange(e)}}
                                  value={this.props.data.po_number} />
                              :
                              <input
                                  type="text"
                                  className="form-control"
                                  id="Purchase_Order"
                                  placeholder="Purchase Order"
                                  name="po_number"
                                  onChange={this.handlePIChange}
                                  value={this.state.purchaseorder}/>
                          }

                          <div className="error"><span></span></div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="scheduler-border no-right-border">
                      <legend className="scheduler-border">RAILCAR INFORMATION</legend>
                      {this.props.lotInfo == undefined ?
                          <div className="railCarLabelContainer">
                            <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span></span></div>
                            <div className="form-group ">
                              <label htmlFor="Rail_Car_Number" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label pr-0">Railcar #</label>
                              <div className="col-lg-8    col-sm-11 col-xs-11 pr-0 ">
                                {this.props.lotInfo != undefined ?
                                    <input
                                        type="text"
                                        name="railcar_number"
                                        className="form-control"
                                        id="Rail_Car_Number"
                                        placeholder="Railcar #"
                                        onChange={this.handleRailcarChange}
                                        value ={this.props.lotInfo[0].railcar_number} />
                                    :
                                    <input
                                        type="text"
                                        name="railcar_number"
                                        className="form-control"
                                        id="Rail_Car_Number"
                                        placeholder="Railcar #"
                                        onChange={this.handleRailcarChange}
                                        value ={this.state.railcarnumber} />	}
                                <div className="error"><span></span></div>
                              </div>
                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                <i className="fa-2x fa fa-plus base_color" onClick={this.onAdd.bind(this)} aria-hidden="true"></i>
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="Lot_Number" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label pr-0">Lot #</label>
                              <div className="col-lg-8   col-sm-11 col-xs-11 pr-0 ">
                                {this.props.lotInfo != undefined ?
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Lot_Number"
                                        placeholder="Lot #"
                                        name="lot_number"
                                        onChange={this.handleRailcarChange}
                                        value={this.props.lotInfo[0].lot_number}/>
                                    :
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Lot_Number"
                                        placeholder="Lot #"
                                        name="lot_number"
                                        onChange={this.handleRailcarChange}
                                        value={this.state.lotnumber}/>
                                }
                                <div className="error"><span></span></div>
                              </div>
                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
                                {this.state.railCarInfoList.length > 0 ? <i className="fa-2x fa fa-minus base_color" onClick={this.onMinus} aria-hidden="true"></i> : null}
                              </div>

                            </div>

                            <div className="form-group">
                              <label htmlFor="Weight" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label pr-0">{ this.state.selectedOption=='lbs'?'Weight(lbs)':'Weight(kg)'}</label>
                              <div className="col-lg-8    col-sm-11 col-xs-11 pr-0 ">
                                {this.props.lotInfo != undefined ?
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Weight"
                                        placeholder="Enter Weight"
                                        name="weight"
                                        onChange={this.handleRailcarChange}
                                        value={this.props.lotInfo[0].weight} />
                                    :
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Weight"
                                        placeholder="Enter Weight"
                                        name="weight"
                                        onChange={this.handleRailcarChange}
                                        value={this.state.weight} />
                                }
                                <div className="error"><span></span></div>
                              </div>
                            </div>
                            {this.state.railCarInfoList}
                          </div>
                          :
                          <div>
                            <div>{editableLots}</div>
                          </div>
                      }
                    </fieldset>
                  </div>

                  <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <fieldset className="scheduler-border no-right-border">
                      <legend className="scheduler-border">PURCHASE ORDER DETAILS</legend>

                      <div className="form-group ">
                        <label htmlFor="Material" className={this.state.errors.material ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>Material</label>
                        <div className="col-lg-8 col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <input
                                  type="text"
                                  className="form-control"
                                  id="Material"
                                  name="material"
                                  placeholder="Material"
                                  ref="Material"
                                  onChange={(e)=>{this.handleMaterialEditChange(e)}}
                                  value={this.props.data.material}/>
                              :
                              <input
                                  type="text"
                                  className="form-control"
                                  id="Material"
                                  name="material"
                                  placeholder="Material"
                                  onChange={this.handlePIChange}
                                  value={this.state.Material}/>
                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Origin" className = { this.state.errors.origin_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label" }  >Origin</label>
                        <div className="col-lg-8   col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <select
                                  className="form-control"
                                  id="Origin"
                                  name="origin_id"
                                  ref="Origin"
                                  value = {this.props.data.origin_id}
                                  onChange={(e)=>{this.handleOriginEditChange(e)}}>
                                {origins}
                              </select>
                              :
                              <select
                                  className="form-control"
                                  id="Origin"
                                  name="origin_id"
                                  onChange={this.handlePIChange}>
                                <option value="Please Select An Option" disabled selected>Origin</option>
                                {origins}
                              </select>
                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Type_of_Packaging" className= { this.state.errors.bag_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11 col-xs-11 control-label" } >Unit of Packaging</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {
                            this.props.data !=undefined ?
                                <select
                                    className="form-control"
                                    id="Type_of_Packaging"
                                    name="bag_id"
                                    ref="packagingType"
                                    onChange={(e)=>{this.handleTypeOfPackagingEditChange(e)}}
                                    value = {this.props.data.bag_id}>
                                  {packagingtypes}
                                </select>
                                :
                                <select
                                    className="form-control"
                                    id="Type_of_Packaging"
                                    name="bag_id"
                                    onChange={this.handlePIChange}>
                                  <option value="Please Select An Option" disabled selected>Unit of Packaging</option>
                                  {packagingtypes}
                                </select>
                          }
                          <div className="error"><span></span></div>

                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Type_of_Unit" className = {this.state.errors.packaging_material_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"} >Type of Packaging</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <select
                                  className="form-control"
                                  id="Type_of_Unit"
                                  name="packaging_material_id"
                                  ref="unitType"
                                  onChange={(e) => {this.handleTypeofUnitEditChange(e)}}
                                  value = {this.props.data.packaging_material_id}>
                                {unittypes}
                              </select>
                              :
                              <select
                                  className="form-control"
                                  id="Type_of_Unit"
                                  name="packaging_material_id"
                                  disabled = {this.state.disabled}
                                  onChange={this.handlePIChange}>
                                <option value="Please Select An Option" disabled selected>Type Of Packaging</option>
                                {unittypes}
                              </select>
                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Type_of_Pallet" className= { this.state.errors.pallet_type_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"} >Type of Pallet</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <select
                                  className = "form-control"
                                  id = "Type_of_Pallet"
                                  name = "pallet_type_id"
                                  ref="palletType"
                                  value = {this.props.data.pallet_type_id}
                                  onChange = {(e)=>{this.handlepalletTypeChange(e)}}>
                                {pallettypes}
                              </select>
                              :
                              <select
                                  className="form-control"
                                  id="Type_of_Pallet"
                                  name="pallet_type_id"
                                  onChange={this.handlePIChange}>
                                <option value="Please Select An Option" disabled selected>Type of Pallet</option>
                                {pallettypes}
                              </select>
                          }
                          <div className = "error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="No_of_Bags_Pallet" className= {this.state.errors.bags_per_pallet ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>{(this.obj.bag_id==2 || (this.props!=undefined && this.props.data!=undefined && this.props.data.bag_id==2))?"# Boxes per Pallet":"# Bags per Pallet"}</label>
                        <div className="col-lg-8   col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <input
                                  type="number"
                                  className="form-control"
                                  id="No_of_Bages_Pallet"
                                  placeholder="# Bags per Pallet"
                                  ref="bagsNumber"
                                  onChange={(e)=>{this.handleNumberofbagsChange(e)}}
                                  name="bags_per_pallet"
                                  value={this.props.data.bags_per_pallet} />
                              :
                              <input
                                  type="number"
                                  className="form-control"
                                  id="No_of_Bages_Pallet"
                                  placeholder="# Bags per Pallet"
                                  onChange={(e)=>{this.handleNumberofbagsChange(e)}}
                                  name="bags_per_pallet"
                                  value={this.state.numberofbagsorpallets} />
                          }
                          <div className="error"><span>{this.state.errors.bags_per_pallet}</span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="Stretch_wrap" className={ this.state.errors.wrap_type_id ? "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label has error" : "col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label"}>Stretch wrap</label>
                        <div className="col-lg-8    col-sm-11 col-xs-11 ">
                          {this.props.data != undefined ?
                              <select
                                  className="form-control"
                                  id="Stretch_wrap"
                                  name="wrap_type_id"
                                  ref="wrapType"
                                  value = {this.props.data.wrap_type_id}
                                  onChange={(e)=>{this.handleWrapTypeChange(e)}}>
                                {wraptypes}
                              </select>
                              :
                              <select
                                  className="form-control"
                                  id="Stretch_wrap"
                                  name="wrap_type_id"
                                  onChange={this.handlePIChange}>
                                <option value="Please Select An Option" disabled selected>Stretch wrap</option>
                                {wraptypes}
                              </select>
                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="No_of_Bags_Pallat" className="col-lg-12 control-label">Notes</label>
                        <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                          {this.props.data != undefined ?
                              <textarea
                                  className="form-control textarea"
                                  onChange ={(e)=>{this.handleNotesChange(e)}}
                                  ref="notes"
                                  value = {this.props.data.notes}
                                  name="notes"
                                  rows="3"
                                  id="Notes"></textarea>
                              :
                              <textarea
                                  className="form-control textarea"
                                  onChange ={this.handlePIChange}
                                  name="notes"
                                  rows="3"
                                  id="Notes"></textarea>

                          }
                          <div className="error"><span></span></div>
                        </div>
                      </div>

                    </fieldset>
                  </div>



                </div>
              </div>
              <div className="Packaging_footer">
                <div className="container">
                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">  <h4>CUSTOM LABEL</h4></div>
                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 cLabel">
                    <label className="control control--checkbox ">Create Label
                      <input type="checkbox" onClick = {this.onChekBoxClick}  id="row1"/><div className="control__indicator"></div>
                      <br/>
                      <span className="error">{this.state.errors.custome_label}</span>
                    </label>
                  </div>
                </div>
                <hr/>
                <div className="container">
                  {
                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12 pddn-10-top">
                      <div className="form-group">
                        {
                          this.props.lotInfo != undefined ?
                              <textarea
                                  className="form-control  textarea"
                                  name= "custom_label"
                                  onChange ={(e)=>{this.handleLabelChange(e)}}
                                  ref="customLabel"
                                  rows="3"
                                  id="Notes"
                                  value = {this.props.lotInfo[0].custom_label}
                                  placeholder="Enter Custom Label information"></textarea>
                              :
                              <textarea
                                  className="form-control  textarea"
                                  name = "custom_label"
                                  onChange ={this.handlePIChange}
                                  rows="3"
                                  id="Notes"
                                  value={ this.obj.custom_label }
                                  placeholder="Enter Custom Label information"></textarea>
                        }
                        <div className="error"><span>{this.state.errors.custome_label}</span></div>

                      </div>

                    </div>
                  }

                  {


                    _.map(this.state.labelLength , function(element , index){
                      debugger
                      return(
                          <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12 pddn-10-top labelArea">
                            <div className="form-group">
                              {
                                (!element) ?
                                    <textarea
                                        className="form-control  textarea"
                                        name= "custom_label"
                                        onChange ={(e)=>{this.handleLabelChange(e)}}
                                        ref="customLabel"
                                        rows="3"
                                        id="Notes"
                                        value = {this.props.data.custom_label}
                                        placeholder="Enter Custom Label information"></textarea>
                                    :
                                    <textarea
                                        className="form-control  textarea"
                                        name = "custom_label"

                                        rows="3"
                                        id="Notes"
                                        value={Object.keys(element).length==5?(element.poNumber+element.material+element.lotNumber+element.weight+element.originName):(element.poNumber+element.material+element.lotNumber+element.originName)}
                                        placeholder="Enter Custom Label information"></textarea>
                              }
                              <div className="error"><span>{}</span></div>

                            </div>

                          </div>
                      )})
                  }




                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12   padding-20-last-l ">
                    <div className="pull-left padding-20-last-l">
                      {
                        this.props.data != undefined ? <button type="button" id="update"  className="btn  btn-primary" onClick = {this.onUpdate}>Update</button> :
                            <button type="button"  className="btn  btn-primary" id="submit" onClick = {this.onSubmit}>SUBMIT</button> }
                    </div>
                    <div className="pull-left padding-20-all"><button type="button" onClick={(e) => this.cancel(e)}  className="btn  btn-gray">CANCEL</button> </div>
                    <div className="pull-left padding-20-all"><button type="button" onClick={hashHistory.goBack}  className="btn  btn-gray">BACK</button> </div>

                  </div>
                  {this.state.isLoading ?  <Spinner spinnerName='circle' /> : null}
                </div>

              </div>
            </form>
          </section>
        </Loader>

    )}
}
