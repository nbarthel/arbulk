import React from 'react';

class ConfirmPackagingInstructionForm extends React.Component{

	render(){

		return(

<section className="confirm_Packaging">  
<div className="container-fluid"> 
<div className="row">  
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	
		
			<fieldset className="scheduler-border sameHeight ">
				<legend className="scheduler-border">PACKAGING ORDER INFO </legend>
				<div className="form-group ">
						<div className="col-md-12"><p className="text_right">Confirmed by Joe Smith</p></div>					
					</div>
				<div className="form-group has-error">
					<div className="col-lg-3 "><label for="customer_name" className=" control-label">Customer Name</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" id="customer_name" placeholder="Customer Name" />					 
					  <div className="error"><span>Error occur required field</span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="ar_bulk_location" className=" control-label">AR Bulk Location</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					   <select className="form-control" id="ar_bulk_location" name="ar_bulk_location">
						<option value="">AR Bulk Location</option>
						<option value="">Location 1</option>
						<option value="">Location 2</option>
						<option value="">Location 3</option>
						<option value="">Location 4</option>
						<option value="">Location 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">				
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Purchase_Order" className=" control-label">Purchase Order</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" id="Purchase_Order" placeholder="PO# 356478" />
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				<div className="form-group">
					<div className="col-lg-3 "><label for="Rail_Car_Number" className=" control-label">Rail Car Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" id="Rail_Car_Number" placeholder="D039SISS9"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">		
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
			    <div className="form-group">
					<div className="col-lg-3 "><label for="Lot_Number" className="control-label">Lot Number</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					     <input type="text" className="form-control" id="Lot_Number" placeholder="CCBX-547988"/>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
			</fieldset>	
			</div>
	

    <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border sameHeight">
				<legend className="scheduler-border">PURCHASE ORDER INFO</legend>
				<div className="form-group ">
					<div className="col-md-12"><p className="text_right">Confirmed by Joe Smith</p></div>					
				</div>
				<div className="form-group ">
					<div className="col-lg-3 "><label for="Material" className="control-label">Material</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <input type="text" className="form-control" id="Material" placeholder="Material" />
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Origin" className=" control-label">Origin</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					   <input type="text" className="form-control" id="Origin" placeholder="Origin" />
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">				
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Type_of_Packaging" className=" control-label">Type of Packaging</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Packaging" name="Type_of_Packaging">
						<option value="">193, 162 lbs</option>
						<option value="">Packaging 1</option>
						<option value="">Packaging 2</option>
						<option value="">Packaging 3</option>
						<option value="">Packaging 4</option>
						<option value="">Packaging 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Type_of_Bag" className=" control-label">Type of Bag</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Bag" name="Type_of_Bag">
						<option value="">Ravago Bags</option>
						<option value="">Bag 1</option>
						<option value="">Bag 2</option>
						<option value="">Bag 3</option>
						<option value="">Bag 4</option>
						<option value="">Bag 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">		
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Type_of_Pallet" className=" control-label">Type of Pallet</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Type_of_Pallet" name="Type_of_Pallet">
						<option value="">H/T Pallet</option>
						<option value="">Pallet 1</option>
						<option value="">Pallet 2</option>
						<option value="">Pallet 3</option>
						<option value="">Pallet 4</option>
						<option value="">Pallet 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
				<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="No_of_Bages_Pallat" className=" control-label">No of Bages/Pallat</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					 <select className="form-control" id="No_of_Bages_Pallat" name="No_of_Bages_Pallat">
						<option value="">60 Bags per Pallet</option>
						<option value="">Pallet 1</option>
						<option value="">Pallet 2</option>
						<option value="">Pallet 3</option>
						<option value="">Pallet 4</option>
						<option value="">Pallet 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-3 "><label for="Stretch_wrap" className=" control-label">Stretch wrap</label></div>
					<div className="col-lg-6 col-md-6 col-sm-8 col-xs-12 ">
					  <select className="form-control" id="Stretch_wrap" name="Stretch_wrap">
						<option value="">Full Wrap</option>
						<option value="">Stretch_wrap 1</option>
						<option value="">Stretch_wrap 2</option>
						<option value="">Stretch_wrap 3</option>
						<option value="">Stretch_wrap 4</option>
						<option value="">Stretch_wrap 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
					<div className=" col-lg-2 col-md-2 col-sm-4 col-xs-2 pddn-10-top">			
						<label className="control control--checkbox ">Confirmed
						  <input type="checkbox"  id=""/><div className="control__indicator"></div>
						</label>				
				    </div>
                </div>
		
				
		</fieldset>	
		
		
	</div>
</form>	
 </div>	 
	<div className="label_info row" >		
				<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
					<fieldset className="scheduler-border">
						<legend className="scheduler-border">LABEL INFORMATION</legend>
						<div className="col-lg-4 col-sm-4 col-xs-4">PO</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div> <div className="col-lg-6 col-sm-6 col-xs-6"> #123456</div>
						<div className="col-lg-4 col-sm-4 col-xs-4">LLDPE</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1647E</div>
						<div className="col-lg-4 col-sm-4 col-xs-4">LOT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> #D030G2E2C</div>
						<div className="col-lg-4 col-sm-4 col-xs-4">WEIGHT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1000KG</div>
						<div className="col-lg-12 ">MADE IN USA </div>
					</fieldset>
				</div>
				<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 pddn-10-top">			
					<label className="control control--checkbox ">Confirmed
					  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
					</label>				
				</div>	
		
		
		<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-8">	
			<div className="text_left">
			<div className="pull-right padding-20-all"><button type="button" className="btn  btn-primary">SUBMIT</button> </div>	
			 <div className="pull-right padding-20-last-r"><button type="button"  className="btn  btn-gray">CANCEL</button> </div>	
			  	 		 
			</div>	
		</div>	
	</div>	
	
	
	
 
 </div>	 
</section>	
			)
	}
}
export default ConfirmPackagingInstructionForm;