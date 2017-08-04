    import React from 'react';
    import _ from 'lodash';
  /*  import './stylesheet/jquery.dataTables.min.css';
    import './js/jquery.dataTables.min.js';*/
    import FilterComponent from '../../../components/FilterComponent';
    import FilterButton from '../../../components/FilterComponent/FilterButton';
    import ViewDataComponent from '../../../components/ViewDataComponent/ViewDataComponent';
export default class PackagingInstructionViewForm extends React.Component {
        constructor(props){
            super(props);
            this.buttonDisplay = []
            this.checkedCustomer = { }
            this.checkedStatus = { }
            this.checkedCompany = { }
            this.Query = {}
            //this.btns = this.props.buttonDisplay
            /*this.state = {
                itemChecked: { },
                
            }*/
            this.onCompanyFilter = this.onCompanyFilter.bind(this)
            this.onCustomerFilter =  this.onCustomerFilter.bind(this)
            this.onStatusFilter = this.onStatusFilter.bind(this)
            this.onRemove = this.onRemove.bind(this)
           // this.onClick = this.onClick.bind(this)
            this.onSearch = this.onSearch.bind(this)
            this.onTextChange = this.onTextChange.bind(this)
            //this.onButtonClick = this.onButtonClick.bind(this)
        }
        onTextChange(e){
          this.Query[e.target.id] = e.target.value
          console.log(this.Query)
        }

        onSearch(e){
          let Where = {}
          if(Object.keys(this.Query).length !== 0 && Object.keys(this.buttonDisplay).length !== 0){
            Where = Object.assign({},this.buttonDisplay,this.Query)                        
            console.log(Where)
          }
          else if(Object.keys(this.Query).length !== 0 && Object.keys(this.buttonDisplay).length === 0 )
          {
            Where = Object.assign({},this.Query)
            console.log(Where)
          }
          else{
            Where = Object.assign({},this.buttonDisplay)
            console.log(Where)
          }

        }
        onCompanyFilter(e,location){
            if(e.target.checked){
            this.forceUpdate()
            this.checkedCompany[e.target.id] = e.target.value;
            this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
           
           }
            else if (!e.target.checked){

            delete this.checkedCompany[e.target.id]
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
            this.checkedCustomer[e.target.id] = e.target.value;
            this.buttonDisplay.push(e.target.value)
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
            console.log(this.checkedCustomer)
           }
            else if (!e.target.checked){
            delete this.checkedCustomer[e.target.id]
            let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)       
                  this.forceUpdate()
                   }
        }
        onStatusFilter(e,status){
            if(e.target.checked){

            this.checkedStatus[e.target.id] = e.target.value;
            this.buttonDisplay.push(e.target.value)
            this.forceUpdate()
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)
            console.log(this.buttonDisplay)
           }
            else if (!e.target.checked){
            delete this.checkedStatus[e.target.id]
            let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if(index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay,value)       
                  this.forceUpdate()
                   }
        }
    /*  onClick(e,customer){
       let itemChecked = this.state.itemChecked;
       //console.log(e.target.value)
       itemChecked[customer.id] = e.target.checked;
       this.setState({itemChecked});
       console.log(this.state.itemChecked)
      if(e.target.checked){
        this.buttonDisplay.push(e.target.value)
        //console.log(this.buttonDisplay.length)

    }

       else if(e.target.checked === false){
        let value = e.target.value
        let index = this.buttonDisplay.indexOf(e.target.value);
        if(index !== -1){
        this.buttonDisplay = _.without(this.buttonDisplay,value)
        //console.log(this.buttonDisplay.length)
       }*/
    /*   else if(e.target.name === "clearall"){
        debugger
        console.log("i have been Clicked")
        this.buttonDisplay = [];
        this.forceUpdate();
       }*/

       //}
    //}

    onClick(e){

      /* console.log(this.checkedCompany)
        console.log(this.checkedCustomer)
        console.log("checkedStatus>>>>>>>>>>>"+this.checkedStatus)*/
       // console.log(this.buttonDisplay)
     /*let buttons = _.map(this.props.buttonDisplay,(button) => {
        return <button type="button" className="btn btn-default">{button}<span aria-hidden="true">&times;</span></button>
    })*/

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
            this.checkedCustomer = { }
            this.checkedStatus = { }
            this.checkedCompany = { }
         this.forceUpdate();

    }
  render() {
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
                    <ViewDataComponent/>
                  </div>
        
                <div className="row-fluid pddn-50-btm padding-top-btm-xs">
                    
                        <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button></div>       
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Add To Queue</button></div>
                        <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Print</button></div>
                    
                
                        <div className="pull-right margin-10-last-r"><button type="button" onClick={(e) => this.onClick(e)} className="btn  btn-primary">Confirm</button></div>       
                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn"  className="btn  btn-orange">EDIT</button></div>
                        <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-default">VIEW</button></div>
                    
                
                </div>
                
               <div className="row pddn-50-btm">        
                    <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                        <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="Enter Customer Screen Name " />      
                    </div>
                    
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                        <button type="button" className="btn  btn-success margin-left-xs">SAVE CUSTOMER VIEW</button>
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
