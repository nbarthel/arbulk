    import React from 'react';
    import _ from 'lodash';
    import  { PropTypes } from 'react';
    import { createDataLoader } from 'react-loopback';
  /*  import './stylesheet/jquery.dataTables.min.css';
    import './js/jquery.dataTables.min.js';*/
    import { browserHistory } from 'react-router'
    import FilterComponent from '../../../components/FilterComponent';
    import FilterButton from '../../../components/FilterComponent/FilterButton';
    import ViewDataComponent from '../../../components/ViewDataComponent/ViewDataComponent';
    import HeadBody from '../../../components/ViewDataComponent/HeadBody';
export default class PackagingInstructionViewForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                viewData : ''
            }
            this.buttonDisplay = [ ]
            this.checkedCustomer = [ ]
            this.checkedStatus = [ ] 
            this.checkedCompany = [ ]
            this.Query = [ ]
            this.Where = { }

            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
           // this.onClick = this.onClick.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            //this.onButtonClick = this.onButtonClick.bind(this)
        }
    componentWillMount() {




    }



        onTextChange(e){
          this.Query[e.target.id] = e.target.value
          console.log(this.Query)
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
                            objCompany = {"origin_id" : this.Where.Company[j] }
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
                        serachObj =  [ {'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                        serachObj.push(serachObj)
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
                            include : ["TOrigin" , "TCompany" ,{"relation": "TPackagingInstructionLots", "scope":
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
                            include: ["TOrigin", "TCompany", "TPackagingInstructionLots"],
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

    onClick(e){
    
   browserHistory.push('/Packaging/inventorycard')
    }
   /* onButtonClick(e){
        let key = e.target.id
        console.log(key)
         this.buttonDisplay = _.without(this.buttonDisplay,key)       
                  this.forceUpdate()
    }*/

    onRemove(e){
        console.log("clicked")
         this.buttonDisplay = [];
         //this.buttonDisplay = []
            this.checkedCustomer = []
            this.checkedStatus = []
            this.checkedCompany = []
         this.forceUpdate();

    }
  render() {
debugger;
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
            
    <FilterComponent onCompanyFilter = {this.onCompanyFilter} onCustomerFilter = {this.onCustomerFilter} onTextChange = {this.onTextChange}  onStatusFilter = {this.onStatusFilter}/>        
        <div id="filter-grid">
         <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">            
            <div className="row">           
            <FilterButton buttonDisplay = {this.buttonDisplay} onRemove = {this.onRemove} Query = {this.Query} onSearch = {this.onSearch}/> 
             
                   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-btm-xs">
                    <div className="pull-right ">
                         <select className="form-control"   id="customer_name" name="customer_name">
                             <option value="">Save View</option>
                             <option value="View1">View 1</option>
                             <option value="View2">View 2</option>
                             <option value="View3">View 3</option>
                             <option value="View4">View 4</option>
                             <option value="View5">View 5</option>
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
                <table id="Packaging_Instruction_View" className="table table-expandable table-striped dataTable no-footer" cellSpacing="0" role="grid" aria-describedby="Packaging_Instruction_View_info">
                                    
                    <ViewDataComponent key={index++} filterData = {filterData}/>
                </table>    
                  </div>
        
                <div className="row-fluid pddn-50-btm padding-top-btm-xs">
                    
                        <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button></div>       
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Add To Queue</button></div>
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Print</button></div>
                    
                
                        <div className="pull-right margin-10-last-r"><button type="button" onClick={(e) => this.onClick(e)} className="btn  btn-primary">View</button></div>       
                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn"  className="btn  btn-orange">EDIT</button></div>
                        <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-default">Confirm</button></div>
                    
                
                </div>
                
               <div className="row pddn-50-btm">        
                    <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                        <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name " />      
                    </div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                        <button type="button"   className="btn  btn-success margin-left-xs">SAVE CUSTOMER VIEW</button>
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
