    import React from 'react';
    import _ from 'lodash';

    import FilterComponent from '../../../components/FilterComponent';
    import FilterButton from '../../../components/FilterComponent/FilterButton';
    import  { PropTypes } from 'react';
    //import { createDataLoader } from 'react-loopback';
    import ViewDataComponent from '../../../components/ViewDataComponent/ViewDataComponent';
    import axios from 'axios'
    export default class PackagingInstructionViewForm extends React.Component {
        constructor(props){
            super(props);
            this.buttonDisplay = []
            this.state = {
                itemChecked: { }
                
            };


        }
    onClick(e,customer){
       let itemChecked = this.state.itemChecked;
       
       itemChecked[customer.id] = e.target.checked;
       this.setState({itemChecked});
      if(e.target.checked){
        this.buttonDisplay.push(e.target.value)
        console.log(this.buttonDisplay.length)

    }
       
       if(e.target.checked === false){
        let value = e.target.value
        let index = this.buttonDisplay.indexOf(e.target.value);
        if(index !== -1){
        this.buttonDisplay = _.without(this.buttonDisplay,value)
        console.log(this.buttonDisplay.length)
       }
         //console.log("after uncheck>>>>>>>>>>>",this.buttonDisplay)
    
       }
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
            
    <FilterComponent onClick={this.onClick.bind(this)}/>        
        <div id="filter-grid">
         <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">            
            <div className="row">           
             <FilterButton buttonDisplay = {this.buttonDisplay}/>
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
                    
                
                        <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-primary">Confirm</button></div>       
                        <div className="pull-right margin-10-all"><button type="button" id="edit_btn"  className="btn  btn-orange">EDIT</button></div>
                        <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-default">VIEW</button></div>
                    
                
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
