import React from 'react';

export default class EnterPackagingInstructionForm extends React.Component {
    render() {
    return (
 <section className="edit_Packaging">  
<div className="container"> 
<div className="row">   
<form className="form-horizontal">
	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	
		
			<fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PACKAGING INSTRUCTIONS</legend>
				
				<div className="form-group has-error">
					<label for="customer_name" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Customer Name</label>
				
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					 <select className="form-control" id="customer_name" name="customer_name">
						<option value="">Customer Name</option>
						<option value="">Customer 1</option>
						<option value="">Customer 2</option>
						<option value="">Customer 3</option>
						<option value="">Customer 4</option>
						<option value="">Customer 5</option>
					  </select>
					  <div className="error"><span>Error occur required field</span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="ar_bulk_location" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">AR Bulk Location</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
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
                </div>
				
				<div className="form-group">
					<label for="Purchase_Order" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Purchase Order</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select className="form-control" id="Purchase_Order" name="Purchase_Order">
						<option value="">Purchase Order</option>
						<option value="">Order 1</option>
						<option value="">Order 2</option>
						<option value="">Order 3</option>
						<option value="">Order 4</option>
						<option value="">Order 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
			  
			</fieldset>	
       

        
       
           <fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">RAIL CAR INFORMATION</legend>
				 <div className="bages_estimated col-lg-11 col-md-11 col-sm-11 col-xs-11"><span>990 bages Estimated</span></div>
				<div className="form-group ">
					<label for="Rail_Car_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Rail Car Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input type="text" className="form-control" id="Rail_Car_Number" placeholder="Rail Car Number" />
					  <div className="error"><span></span></div>
					 </div>
					 <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">					
						<i className="fa-2x fa fa-plus base_color" aria-hidden="true"></i>                   
					</div>
                </div>
				
				<div className="form-group">
					<label for="Lot_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Lot Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					     <input type="text" className="form-control" id="Lot_Number" placeholder="Lot Number" />
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Weight" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Weight</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					    <input type="text" className="form-control" id="Weight" placeholder="Weight" />
					  <div className="error"><span></span></div>
					</div>
                </div>
			  
			 		  
			</fieldset>
	</div>
	
	
     <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
	    <fieldset className="scheduler-border no-right-border">
				<legend className="scheduler-border">PURCHASE ORDER DETAILS</legend>
				
				<div className="form-group ">
					<label for="Material" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Material</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input type="text" className="form-control" id="Material" placeholder="Material" />
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Origin" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Origin</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					   <select className="form-control" id="Origin" name="Origin">
						<option value="">Origin</option>
						<option value="">Origin 1</option>
						<option value="">Origin 2</option>
						<option value="">Origin 3</option>
						<option value="">Origin 4</option>
						<option value="">Origin 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Packaging" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Packaging</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select className="form-control" id="Type_of_Packaging" name="Type_of_Packaging">
						<option value="">Type of Packaging</option>
						<option value="">Packaging 1</option>
						<option value="">Packaging 2</option>
						<option value="">Packaging 3</option>
						<option value="">Packaging 4</option>
						<option value="">Packaging 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Bag" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Bag</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select className="form-control" id="Type_of_Bag" name="Type_of_Bag">
						<option value="">Type of Bag</option>
						<option value="">Bag 1</option>
						<option value="">Bag 2</option>
						<option value="">Bag 3</option>
						<option value="">Bag 4</option>
						<option value="">Bag 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Type_of_Pallet" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Type of Pallet</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select className="form-control" id="Type_of_Pallet" name="Type_of_Pallet">
						<option value="">Type of Pallet</option>
						<option value="">Pallet 1</option>
						<option value="">Pallet 2</option>
						<option value="">Pallet 3</option>
						<option value="">Pallet 4</option>
						<option value="">Pallet 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="No_of_Bages_Pallat" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">No of Bages/Pallat</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <input type="text" className="form-control" id="No_of_Bages_Pallat" placeholder="No of Bages/Pallat" />
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="Stretch_wrap" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Stretch wrap</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					  <select className="form-control" id="Stretch_wrap" name="Stretch_wrap">
						<option value="">Stretch wrap</option>
						<option value="">Stretch_wrap 1</option>
						<option value="">Stretch_wrap 2</option>
						<option value="">Stretch_wrap 3</option>
						<option value="">Stretch_wrap 4</option>
						<option value="">Stretch_wrap 5</option>
					  </select>
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label for="No_of_Bages_Pallat" className="col-lg-12 control-label">Notes</label>
					<div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
					 <textarea className="form-control textarea" rows="3" id="Notes"></textarea> 					  
					 <div className="error"><span></span></div>
					</div>
                </div>
				
		</fieldset>	
	
	</div>	
	
	
	</form>	
	
 </div>		
	
 </div>	
 <div className="Packaging_footer filter_bg label_info">
	<div className="container">
	<div className="row">	
	<div className="col-md-12"><h4>LABEL INFORMATION</h4><hr/></div>
		 <div className="col-lg-6 col-md-6 col-sm-12  col-xs-12 ">	
		<div className="row">
			<div className=" col-lg-12 text-center">
			<label className="control control--radio "><b>Auto Lable</b>
			  <input type="radio" checked="checked"  name="lable" /><div className="control__indicator"></div>
			</label>
			</div>			
			<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
			<ul className="pddn-20-top">
				<li>
					<label className="control control--checkbox">Include PO#
					  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
					</label>
				</li>
				<li>
					<label className="control control--checkbox">Include Material
					  <input type="checkbox" checked="checked"  id="row1"/><div className="control__indicator"></div>
					</label>
				</li>
				<li>
					<label className="control control--checkbox">Include Lot #
					  <input type="checkbox" checked="checked"  id="row1"/><div className="control__indicator"></div>
					</label>
				</li>
				<li>
					<label className="control control--checkbox">Include Weight
					  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
					</label>
				</li>
				<li>
					<label className="control control--checkbox">Include Origin
					  <input type="checkbox" checked="checked"  id="row1"/><div className="control__indicator"></div>
					</label>
				</li>
			</ul>
			</div>
			<div className=" col-lg-8 col-md-8 col-sm-8 col-xs-8">
			  <div className="form-group">
				<label for="No_of_Bages_Pallat" className="col-lg-12 control-label">Other Notes on Label</label>
				<div className="col-lg-12">
				 <textarea className="form-control textarea" rows="2" id="Notes"></textarea> 					  
				 <div className="error"><span></span></div>
				</div>
			</div>		
			</div>
		</div>	
		</div>	
		
		<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 padding-top-btm-xs">		
			<label className="control control--radio "><b>Custom Lable</b>
			  <input type="radio"  name="lable" /><div className="control__indicator"></div>
			</label>
			<div className="form-group">
				<label for="No_of_Bages_Pallat" className="control-label">Other Notes on Label</label>
				
				 <textarea className="form-control  " rows="3" id="Notes" disabled></textarea> 					  
				 <div className="error"><span></span></div>
				
			</div>
			<div className="form-group">		
				<label for="No_of_Bages_Pallat" className="control-label">Attach Customer's Original Orders</label> 
				<input type="file" name="file-attach" className="file" />
				<div className="input-group ">
				  <span className="input-group-addon"><i className="fa fa-paperclip" aria-hidden="true"></i></span>
				  <input type="text" className="form-control " disabled placeholder="Upload file" />
				  <span className="input-group-btn">
					<button className="browse btn btn-primary " type="button"><i className="glyphicon glyphicon-search"></i> Browse</button>
				  </span>
				</div>
			</div>
		
		</div>
		
		
		<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 padding-top-btm-xs">		
			<fieldset className="scheduler-border">
				<legend className="scheduler-border">SAMPLE LABEL</legend>
				<div className="col-lg-4 col-sm-4 col-xs-4">PO</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div> <div className="col-lg-6 col-sm-6 col-xs-6"> #123456</div>
				<div className="col-lg-4 col-sm-4 col-xs-4">LLDPE</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1647E</div>
				<div className="col-lg-4 col-sm-4 col-xs-4">LOT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> #D030G2E2C</div>
				<div className="col-lg-4 col-sm-4 col-xs-4">WEIGHT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1000KG</div>
				<div className="col-lg-12 ">MADE IN USA </div>
			</fieldset>
			
			<div className="text_left">
			  <div className="pull-right padding-20-last-l"><button type="button" className="btn  btn-primary">SUBMIT</button> </div>
			  <div className="pull-right padding-20-all"><button type="button"  className="btn  btn-gray">CANCEL</button> </div>
			  <div className="pull-right padding-20-all"><button type="button" className="btn  btn-orange">DELETE</button> </div>
			</div>
		</div>
	
		
		
	


	</div> 
</div>
</div> 	
</section>	
    );
  }
}
