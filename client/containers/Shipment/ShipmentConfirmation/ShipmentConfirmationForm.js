import React from 'react';
import '../../../public/stylesheets/sweetalert.css';
import SweetAlert from 'sweetalert-react';
//var shpData = require('./ShpmentViewData.json')

class  ShipmentConfirmationForm extends React.Component {
    constructor(props){
        super(props);
        /*this.state = {
            viewData : shpData
        }*/
        this.count = 0
        this.userName = localStorage.getItem('userName')
        this.userId = localStorage.getItem('userId')
        this.onCheck = this.onCheck.bind(this)
    }
    onCheck(e){
        if(e.target.checked){
            this.count = this.count + 1
        }
        else if(!e.target.checked){
            this.count = this.count - 1
        }
        console.log("COUNT",this.count)
    }
    onSubmit(e){
        if(this.count == 19){
            swal("Hogaya","Hogaya BC","info")
        }
        else{
            swal("Na Ho Paega","Tumse Na Ho paega beta","error")
        }
    }
    render() {
        return (
<section className="confirm_shipment">  
<div className="container-fluid"> 
<div className="row">  
<form className="form-horizontal">
    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> 
                <fieldset className="scheduler-border sameHeight-International ">
                <legend className="scheduler-border">PACKAGING ORDER INFO </legend>
                <div className="form-group base_color text-uppercase">
                    <div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold">Information</p></div>
                    <div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right bold">Confirmed by {this.userName}</p></div>                    
                </div>
                <div className="form-group">
                    <div className="col-lg-3 "><label for="" className=" control-label">Customer Name</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                    <select className="form-control" id="" name="Type_of_Packaging" disabled>
                     <option value = {this.props.data.TCompany ?this.props.data.TCompany.name : '' }>{this.props.data.TCompany ?this.props.data.TCompany.name : '' }</option>
                      </select>                              
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>      
                
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Purchase_Order" className=" control-label">Release #</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <input type="text" className="form-control" disabled value = {this.props.data.releaseNumber ? this.props.data.releaseNumber : '' } id="Purchase_Order" placeholder="Release #"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group ">
                    <div className="col-lg-3 "><label for="Rail_Car_Number" className=" control-label">Purchase Order Number</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <input type="text" className="form-control" id="Rail_Car_Number" placeholder="Purchase Order Number"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">      
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Lot_Number" className="control-label">Lot Number</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                         <input type="text" className="form-control" disabled value = '' id="Lot_Number" placeholder="Lot Number"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id="row1"/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="pddn-100-top"> 
                        <div className="form-group">
                        
                            <div className="col-lg-3 "><label for="Material" className=" control-label">Material</label></div>
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                               <input type="text" className="form-control" id="" placeholder="Material"/>
                              <div className="error"><span></span></div>
                            </div>
                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">              
                                <label className="control control--checkbox ">Confirmed
                                  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                                </label>                
                            </div>
                        </div>
                        
                        <div className="form-group ">
                            <div className="col-lg-3 "><label for="Material" className="control-label">Number of Containers</label></div>
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                               <select disabled className="form-control" id="Type_of_Packaging" name="Type_of_Packaging">
                                <option >{this.props.data.numberOfContainers}</option>
                              </select>
                              <div className="error"><span></span></div>
                            </div>
                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                                <label className="control control--checkbox ">Confirmed
                                  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                                </label>                
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-lg-3 "><label for="" className=" control-label">Number of Bags</label></div>
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                               <input type="text" className="form-control" value = {this.props.data.numberOfBags} id="" placeholder="Number of Bags"/>
                              <div className="error"><span></span></div>
                            </div>
                            <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">              
                                <label className="control control--checkbox ">Confirmed
                                  <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                                </label>                
                            </div>
                        </div>
                
                </div>
                
            </fieldset> 
    </div>
    
    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">

        <fieldset className="scheduler-border sameHeight-International">
                <legend className="scheduler-border">PURCHASE ORDER INFO</legend>
                <div className="form-group base_color text-uppercase">
                    <div className=" col-md-6 col-sm-5 col-xs-3"><p className="text_left bold ">Information</p></div>
                    <div className=" col-md-6 col-sm-7 col-xs-9"><p className="text_right bold">Confirmed by {this.userName}</p></div>                    
                </div>
                
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Type_of_Packaging" className=" control-label">Freight Forwarder</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <input type="text" className="form-control" value = {this.props.data.TShipmentInternational[0].freightForwarder != null ? this.props.data.TShipmentInternational[0].freightForwarder : ''} id="" placeholder="Freight Forwarder"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Type_of_Bag" className=" control-label">Container Type</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <input type="text" className="form-control"  disabled value = '' id="" placeholder="Container Type"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">      
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Type_of_Pallet" className=" control-label">Steamline  Vessel</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <select className="form-control" disabled id="Type_of_Pallet" name="Type_of_Pallet">
                        <option>{this.props.data.TShipmentInternational[0].TSteamshipLine.name}</option>
                      </select>
                      <div className="error"><span></span></div>
                    </div>
                <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="No_of_Bages_Pallat" className=" control-label">Shipment FInal  Destination</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                      <input type="text" className="form-control" id="" placeholder="Shipment FInal  Destination"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Receiving Customer</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <input type="text" className="form-control" id="" placeholder="Receiving Customer"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
        
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Earlieast Return Date </label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                       <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                        <input className="form-control" disabled id="date" name="date" value = {moment(this.props.data.TShipmentInternational[0].earliestReturnDate).format("MM-DD-YYYY")} placeholder="Earlieast Return Date" type="text"/>
                    </div>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Doc Cutoff Date</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                     <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                        <input className="form-control" disabled value = {moment(this.props.data.TShipmentInternational[0].docCutoffDate).format("MM-DD-YYYY")} id="date" name="date" placeholder="Doc Cutoff Date" type="text"/>
                    </div>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Cutoff Date </label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
                        <input className="form-control" id="date" name="date" disabled placeholder="Cutoff Date" type="text"/>
                    </div>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Pick Up Location</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <input type="text" className="form-control" disabled value = {this.props.data.TShipmentInternational[0].containerPickupLocation} id="" placeholder="Pick Up Location"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck}  id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Return Location </label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <input type="text" className="form-control" disabled id="" value ={this.props.data.TShipmentInternational[0].containerReturnLocation} placeholder="Return Location"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label"> Trucker</label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <input type="text" className="form-control" id="" placeholder="Trucker"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Note </label></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
                        <input type="text" className="form-control" id="" placeholder="Note"/>
                      <div className="error"><span></span></div>
                    </div>
                    <div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">          
                        <label className="control control--checkbox ">Confirmed
                          <input type="checkbox" onClick = {this.onCheck} id=""/><div className="control__indicator"></div>
                        </label>                
                    </div>
                </div>
                
                
        </fieldset> 
        
        
    </div>
</form> 
 </div>  

   <div className="label_info row pddn-30-btm" >       
        <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-4">
             <div className="pull-left padding-20-last-l"><button type="button"  className="btn  btn-orange hidden">DELETE</button> </div> 
        </div>
        
        
        <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-8">  
            <div className="text_left">
             <div className="pull-right padding-20-last-r"><button type="button" onClick = {(e) => {this.onSubmit(e)}}  className="btn  btn-primary">SUBMIT</button> </div>   
             <div className="pull-right padding-20-all"><button type="button"  className="btn  btn-gray">CANCEL</button> </div> 
                         
            </div>  
        </div>  
    </div>  
    
    
    
 </div>  
  
</section>  
                                                           );
    }
}
export default ShipmentConfirmationForm;
   