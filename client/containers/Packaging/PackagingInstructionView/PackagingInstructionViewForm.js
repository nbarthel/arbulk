    import React from 'react';
    import _ from 'lodash';
    import  { PropTypes } from 'react';
    import { createDataLoader } from 'react-loopback';
  /*  import './stylesheet/jquery.dataTables.min.css';
    import './js/jquery.dataTables.min.js';*/
    import { hashHistory } from 'react-router'
    import FilterComponent from '../../../components/FilterComponent';
    import FilterButton from '../../../components/FilterComponent/FilterButton';
    import ViewDataComponent from '../../../components/ViewDataComponent/ViewDataComponent';
    import SweetAlert from 'sweetalert-react';
    import '../../../public/stylesheets/sweetalert.css';
    import HeadBody from '../../../components/ViewDataComponent/HeadBody';
    import axios from 'axios'
    var Loader = require('react-loader')
   import {Base_Url} from '../../../constants';
export default class PackagingInstructionViewForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                viewData : '',
                dataView : '',
                key : 0,
                selectedOption: 'lbs',
                index : 0,
                selectedOption1: 'kg',

            }
            this.status
            this.buttonDisplay = [ ]
            this.checkedCustomer = [ ]
            this.checkedStatus = [ ] 
            this.checkedCompany = [ ]
            this.Query = [ ]
            this.Where = { }
            this.qArray = []
            this.selected = null
            this.piID = null
            this.onClickli = this.onClickli.bind(this)
            this.onClickPo = this.onClickPo.bind(this)
            this.lotSearch = this.lotSearch.bind(this)
            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
           // this.onClick = this.onClick.bind(this)
            this.onButtonRemove = this.onButtonRemove.bind(this) 
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            this.saveView = this.saveView.bind(this)
            this.handleTextChange = this.handleTextChange.bind(this)
            this.viewChange = this.viewChange.bind(this)
            this.checkboxChange = this.checkboxChange.bind(this)
            this.handleOptionChange = this.handleOptionChange.bind(this)
            this.handleOptionChange1 = this.handleOptionChange.bind(this)
            this.onEdit =this.onEdit.bind(this)
            this.qArray = [] 
            this.addToQueue = this.addToQueue.bind(this)
            this.headerCheckboxChange = this.headerCheckboxChange.bind(this)
        }
    componentWillMount() {

     axios.get(Base_Url+"TCustomViews").then(response=>{
         this.setState({
             savedViews : response.data
         })
     })

      axios.get(Base_Url+"TPackagingInstructionLots/getMaxQueue").then(response=>{
    this.setState({
        queue_Sequence : response.data
    })
})




 }
        //this.state.queue_Sequence[0].max_mark

     onTextChange(e){
          this.Query[e.target.id] = e.target.value
          console.log(this.Query)
        }

      onClickPo(e){
        debugger;
           this.Query[e.target.id] = e.target.getAttribute('value')

          document.getElementById('POSearch').value = e.target.getAttribute('value')
           console.log(this.Query)
           console.log('>>>>>> target Value' , e.target.value)
      }

      lotSearch(e){
          debugger;
           this.Query[e.target.id] = e.target.getAttribute('value')
           console.log(this.Query)
           document.getElementById('LotSearch').value = e.target.getAttribute('value')
           console.log('>>>>>> target Value' , e.target.value)
      }

onClickli(e){
  this.Query[e.target.id] = e.target.getAttribute('value')

    document.getElementById('railcarSearch').value = e.target.getAttribute('value')
  console.log(this.Query)
  console.log('>>>>>> target Value' , e.target.value)
}

onSearch(e){
           if(this.Query != undefined){
                Object.defineProperty(this.Where,"Query",{enumerable:true ,
                    writable: true,
                    configurable: true,
                    value:this.Query})
            }
         console.log(this.Where)
          var serachObj = []
            if (this.Where != undefined && this.Where!= null)
                {
                    if(this.Where.Customer && this.Where.Customer.length >0){
                        var customer = []
                        var obj = {}
                        for(var i in this.Where.Customer){
                            obj = {"customer_id" : this.Where.Customer[i] }
                            customer.push(obj);
                        }
                        serachObj.push(customer)
                    }

                    if(this.Where.Company && this.Where.Company.length > 0){
                        var company = [] ;
                        var objCompany = {}
                        for(var j in this.Where.Company)
                        {
                            objCompany = {"location_id" : this.Where.Company[j] }
                            company.push(objCompany);
                        }
                        serachObj.push(company)
                    }

                    if(this.Where.status && this.Where.status.length){
                        var status = [];
                        var objStatus = {};
                        for(var z in this.Where.status){
                            objStatus = {"packaging_status" : this.Where.status[z]}
                            status.push(objStatus)
                        }
                        serachObj.push(status)
                    }

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && this.Where.Query.POSearch!= undefined ){
                        var poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                        serachObj.push(poSearch)
                    }


                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                        var serachObjLots = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
                    }

                    if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                        var serachObjLots =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                    }

                    var serachObj = [].concat.apply([], serachObj);

                    var PIview = createDataLoader(PackagingInstructionViewForm, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                            }
                        }]
                    });
                    var base = 'TPackagingInstructions';

                    if(serachObjLots && serachObjLots != undefined ){
                        debugger;
                        this.urlSearch = PIview._buildUrl(base, {
                            include : ["TLocation" , "TCompany" ,{"relation": "TPackagingInstructionLots", "scope":
                            {
                                "where":
                            {  "or":
                               [ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                            }
                            }
                               }
                            ],
                            where : {
                                "or": serachObj
                            }
                        });
                    }
                    else {
                        this.urlSearch = PIview._buildUrl(base, {
                            include: ["TLocation", "TCompany", "TPackagingInstructionLots"],
                            where: {
                                "or": serachObj
                            }
                 });
                    }

                   console.log(this.urlSearch , ">>>>>>>>>>>d,lpwkdlwjldjwlkdjwo");
                    $.ajax({
                        url: this.urlSearch,
                        success:function(data){
                            debugger;
                            console.log('ajax ',data);

                            this.setState(
                                {
                                    viewData : data
                                }
                            )
                            console.log( "ajax>>>>>>>")
                        }.bind(this)

                    })
                }
}
        onCompanyFilter(e,location){
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where,"Company",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCompany})
            this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
           
           }
            else if (!e.target.checked){

            let id = e.target.id
            this.checkedCompany = _.without(this.checkedCompany,id)
            this.Where.Company = this.checkedCompany
            if(Object.keys(this.Where.Company).length === 0){
              this.Where.Company = undefined
              //console.log(this.Where)
              delete this.Where.Company
             }
                let value = e.target.value               
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)       
                 this.forceUpdate() 
                   }
        }
        onCustomerFilter(e,customer){
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCustomer.push(e.target.id)
            Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedCustomer})
            this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
            console.log(this.checkedCustomer)
           }
            else if (!e.target.checked){
            let id = e.target.id
            this.checkedCustomer = _.without(this.checkedCustomer,id)
            this.Where.Customer = this.checkedCustomer
            if(Object.keys(this.Where.Customer).length === 0){
              this.Where.Customer = undefined
              delete this.Where.Customer
            }
                let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)       
                  this.forceUpdate()
                   }
        }
        onStatusFilter(e,status){
            if(e.target.checked){

            this.checkedStatus.push(e.target.value);
            Object.defineProperty(this.Where,"status",{enumerable: true ,
                                                      writable: true,
                                                      configurable:true,
                                                      value:this.checkedStatus})
            this.buttonDisplay.push(e.target.value)
            this.forceUpdate()
            
            //console.log(this.props.buttonDisplay)
           /* console.log(this.Where)
            console.log(this.checkedStatus)
            console.log(this.checkedStatus.length)*/
           }
            else if (!e.target.checked){
            let value = e.target.value
            //let pos = this.checkedStatus.indexOf(e.target.value)
            this.checkedStatus = _.without(this.checkedStatus,value)
            this.Where.status = this.checkedStatus
            //console.log(this.Where.status)
            if(Object.keys(this.Where.status).length === 0){
              this.Where.status = undefined
              delete this.Where.status
            }
            console.log(this.Where)
            //let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value) 
                //console.log(this.buttonDisplay)      
                  this.forceUpdate()
                  }
        }

   
    handleTextChange(e){
        this.setState({
            Text  : e.target.value
        })

    }
    viewChange(e){

        var index = e.target.selectedIndex ;


         var changedView = this.state.savedViews[index -1]
        this.Where = JSON.parse(changedView.viewFilters)

        console.log(this.Where)
        var serachObj = []
        if (this.Where != undefined && this.Where!= null)
        {
            if(this.Where.Customer && this.Where.Customer.length >0){
                var customer = []
                var obj = {}
                for(var i in this.Where.Customer){
                    obj = {"customer_id" : this.Where.Customer[i] }
                    customer.push(obj);
                }
                serachObj.push(customer)
            }

            if(this.Where.Company && this.Where.Company.length > 0){
                var company = [] ;
                var objCompany = {}
                for(var j in this.Where.Company)
                {
                    objCompany = {"location_id" : this.Where.Company[j] }
                    company.push(objCompany);
                }
                serachObj.push(company)
            }

            if(this.Where.status && this.Where.status.length){
                var status = [];
                var objStatus = {};
                for(var z in this.Where.status){
                    objStatus = {"packaging_status" : this.Where.status[z]}
                    status.push(objStatus)
                }
                serachObj.push(status)
            }

            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.POSearch && his.Where.Query.POSearch!= undefined ){
                var poSearch =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                serachObj.push(poSearch)
            }


            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.railcarSearch && this.Where.Query.railcarSearch!= undefined ){
                var serachObjLots = [{'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}}]
            }

            if(this.Where.Query && this.Where.Query!= null && this.Where.Query!= undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch!= undefined ){
                var serachObjLots =  [{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
            }

            var serachObj = [].concat.apply([], serachObj);

            var PIview = createDataLoader(PackagingInstructionViewForm, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                    }
                }]
            });
            var base = 'TPackagingInstructions';

            if(serachObjLots && serachObjLots != undefined ){
                debugger;
                this.urlSearch = PIview._buildUrl(base, {
                    include : ["TLocation" , "TCompany" ,{"relation": "TPackagingInstructionLots", "scope":
                    {
                        "where":
                        {  "or":
                            [ {'railcar_number': {"like": "%" + this.Where.Query.railcarSearch + "%"}},{'lot_number': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                        }
                    }
                    }
                    ],
                    where : {
                        "or": serachObj
                    }
                });
            }
            else {
                this.urlSearch = PIview._buildUrl(base, {
                    include: ["TLocation", "TCompany", "TPackagingInstructionLots"],
                    where: {
                        "or": serachObj
                    }
                });
            }

            console.log(this.urlSearch , ">>>>>>>>>>>d,lpwkdlwjldjwlkdjwo");
            $.ajax({
                url: this.urlSearch,
                success:function(data){
                    debugger;
                    console.log('ajax ',data);

                    this.setState(
                        {
                            viewData : data
                        }
                    )
                    console.log( "ajax>>>>>>>")
                }.bind(this)

            })
        }
    }
    saveView(e){
        debugger;
        var saveCustomView = {
            "id": 0,
            "screenName": "PACKAGING",
            "viewName": this.state.Text,
            "viewFilters": JSON.stringify(this.Where),
            "createdBy": 0,
            "createdOn": "2016-09-26",
            "modifiedBy": 0,
            "modifiedOn": "2016-09-26",
            "active": 1
        }
        console.log("Save Customer View" , saveCustomView);
   if(saveCustomView.viewFilters != undefined && saveCustomView.viewFilters != null){
     axios.post(Base_Url + "TCustomViews", saveCustomView).then(response=> {
        swal('Success' , "Successfully Saved..." , 'success');
        console.log("response", response)
    })
    
}
    else {
   swal('Error' , "Please Select Filter Options First" , 'error');
}

    }


    handleOptionChange1(e) {
        debugger;
        this.setState({
            selectedOption: e.target.value
        });
    }

    handleOptionChange(changeEvent) {
        debugger;
        var selectedOption = changeEvent.target.value

        this.setState({
            selectedOption: changeEvent.target.value

        });
         console.log( selectedOption);
    }

 onViewClick(e){
    if(this.selected != undefined || this.piID != undefined){
   hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)}
   else 
   {
    swal("Selection Missing", "Please Select A Lot To View.","error")
   }
    }
    headerCheckboxChange(e,value){
        debugger
        if(e.target.checked){
        this.piID = e.target.value  
        console.log("PIID",this.piID)
        }
        else if(!e.target.checked){
            console.log("I am uncheckeed")
        }
        
    }
 checkboxChange(e,value){
   /*  var queueArray = []
    this.qArray.push(id)
    localStorage.setItem('qArray',this.qArray)
    localStorage.setItem('queue_Sequence',this.state.queue_Sequence[0].max_mark)
    console.log("clicked" , id)*/
    debugger
    if(e.target.checked){
             this.piID = e.target.value 
             this.selected = e.target.id
             this.status = value.status
         }
    else if(!e.target.checked){
      this.selected = null
      //this.piID = null
     
    }
    console.log("SelectedID >>>>>>>>>>>>.",this.selected)
    console.log("piID><^><^><^>^<^>^<",this.piID)
  }
onButtonRemove(index,button){
    this.buttonDisplay.splice(index,1)
    this.forceUpdate()

}
    onRemove(e){
        debugger;
        console.log("clicked")
         this.buttonDisplay = [];
         //this.buttonDisplay = []
            this.checkedCustomer = []
            this.checkedStatus = []
            this.checkedCompany = []
            this.Query = []
            delete this.Where.Company 
            delete this.Where.Customer 
            delete this.Where.status  
            delete this.state.viewData
            this.setState({
                key : this.state.key +1,
                index : this.state.index +1
            })
         this.forceUpdate();

    }
    onConfirmClick(){
    if(this.selected != undefined && this.selected != null){
      console.log(">>>>>>>>>>>>>",this.selected)
                if(this.status == "ININVENTORY"){
                hashHistory.push('/Packaging/confirmpckginst/'+this.selected)
                 }
                else if(this.status == "ARRIVED"){
                   swal("Info","Order is already arrived","info")
                }
                else if(this.status == "QUEUED"){
                   swal("Info","Order is already queued","info")
                }
                 else{
                 swal("Error","Selected order Should be in Inventory","error")
                }
        }
      else 
      {
        swal("Selection Missing", "Please Select A Lot To Confirm.","error")
      }
  }

  onEdit(){ debugger
    if(this.piID != null && this.piID != undefined){
         if(this.status=="UNCONFIRMED" || this.status=="PARTIALLYPACKED" || this.status=="ININVENTORY")
         {
             hashHistory.push('/Packaging/enterpackginginst/'+this.piID)
                  }
           else{
               swal('Info' , 'This order has been confirmed , therefore you can not update!!')
           }
     }
      else {
        swal("Nothing To Edit","Please Select A PI To Edit.","error")
      }
  }
  /*checkboxChange(e,id){
    if(e.target.checked){
             this.selected = e.target.id
              this.piID = e.target.id
         }
    else if(!e.target.checked){
      this.selected = null
      this.piID = null
    }
    console.log("SelectedID >>>>>>>>>>>>.",this.selected)
 console.log("Piiddd>>>>>>>>>>>.",this.piID);
}*/
  addToQueue(e){
      debugger
      let pid = this.piID
     var qArray =  localStorage.getItem('qArray')
     var sequence =  localStorage.getItem('queue_Sequence')
      var queueArray = []
      queueArray.push(qArray);
     localStorage.removeItem('qArray');
      localStorage.removeItem('queue_Sequence');
      var option = {
          queue_sequence : parseInt(sequence) + 1
      }

      var optionpkg = {

          status : "Queued"
      }
      if(this.status == "CONFIRMED"){
      if(queueArray && queueArray.length > 0&& qArray!= null){
          queueArray.forEach((id)=>{
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
                  axios.put(Base_Url+"TPackagingInstructionLots/" + id , optionpkg).then(function(response){

                  }).catch(function(err){
                      console.log("Error Is" + err)
                  })
}
); 
                 
              }).catch(function(err){
                  console.log("Error Is" + err)
              })
          })
      }
    else{
          alert('Please select row ')
      }

  }
  else if(this.status == "QUEUED"){
    swal("Info" , 'Order is already queued' , 'info')
  }
  else if(this.status == "ARRIVED"){
    swal("Info" , 'Order is already Arrived' , 'info')
  }
  else {
    swal("error","The selected order has not confirmed yet","error")
  }
}

  render() {

      var index = 0

      var filterData = ''
if(this.state.viewData && (this.state.viewData.length ==0 || this.state.viewData.length >0 )){

    filterData = this.state.viewData;
}

  return (
    <section className="side-filter">
    <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">  
        <div className="">
          <h4 className="pull-left">REFINE YOUR RESULT </h4>
          <button type="button" className="btn collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>             
        </div>
    </div>

   <div className="container">
    <div className="row-fluid">
            
    <FilterComponent key={this.state.key} lotSearch={this.lotSearch}   onClickPo={this.onClickPo}  onClickli={this.onClickli} onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter}/>        
        <div id="filter-grid">
         <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
             <div className="pull-right margin-30-right">
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
                 </div>
                 <div className="pull-right margin-30-right">
                     <label className="control control--radio ">Kg
                         <input id="Modify_User" name="Modify_User" type="radio"
                                id="ADDCustomers"
                                name="ADDCustomers"
                                value="kg"
                                onChange={this.handleOptionChange1}
                                checked={this.state.selectedOption==='kg'}
                             /><div className="control__indicator"></div>
                         </label>
                     </div>


            <div className="row">           
            <FilterButton buttonDisplay = {this.buttonDisplay}  onButtonRemove = {this.onButtonRemove} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/>

                   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs pull-right">
                    <div className="pull-right ">

                         <select className="form-control"   id="customer_name" name="customer_name" onChange={this.viewChange}>
                              <option value="Please Select An Option" disabled>Select</option>
                             {
                                 _.map(this.state.savedViews , (views,index)=>{
                                     debugger;
                                     return(

                                         <option key = {index} value={views}>{views.viewName}</option>
                                     )
                                 })
                             }
                        </select>
                    </div>                  
                    <div className="pull-right btn_right_margin">
                        <select className="form-control"  id="customer_name" name="customer_name">
                             <option value="">Group By</option>
                             <option value="Date">Date</option>
                        </select>
                    </div>  
                </div>  
            </div>  
        </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><hr/></div>   
            
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className=" table-responsive view_table">  
                
                      {this.props.id != undefined ? <ViewDataComponent headerCheckboxChange = {this.headerCheckboxChange} checkboxChange = {this.checkboxChange} key={this.state.index} filterData = {filterData} id = {this.props.id} weight={this.state.selectedOption}/> : <ViewDataComponent checkboxChange = {this.checkboxChange} headerCheckboxChange = {this.headerCheckboxChange} key={this.state.index} filterData = {filterData} weight={this.state.selectedOption} />}               
             
                  </div>
        
                <div className="row-fluid pddn-50-btm padding-top-btm-xs">
                    
                        <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button></div>       
                        <div className="pull-left margin-10-all"><button type="button" onClick={this.addToQueue} className="btn  btn-gray">Add To Queue</button></div>
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Print</button></div>
                    
                
                        <div className="pull-right margin-10-last-r"><button type="button" onClick={(e) => this.onViewClick(e)} className="btn  btn-primary">View</button></div>       
                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn" onClick={this.onEdit}  className="btn  btn-orange">EDIT</button></div>
                        <div className="pull-right margin-10-all"><button type="button" onClick = {(e) => this.onConfirmClick(e)}  className="btn  btn-default">Confirm</button></div>
                    
                
                </div>
                
               <div className="row pddn-50-btm">        
                    <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                        <input
                            type="text"
                            className="form-control"
                            id="No_of_Bages_Pallat"
                            placeholder="Enter Customer Screen Name "
                            onChange = {this.handleTextChange}
                            value = {this.state.Text}
                            />
                    </div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                        <button type="button" onClick={(e) => this.saveView(e)} className="btn  btn-success margin-left-xs">SAVE CUSTOMER VIEW</button>
                    </div>
               </div>
            </div>  
        </div>        
    </div>
 </div>        

    
   
    

 
</section>

    );
  }
}