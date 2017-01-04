import React, { Component } from 'react';

export class AddMaterialForm extends Component {
	render() {
		return (
			<section className="admin">   
			<div className="container-fluid"> 
			
					<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<form className="form-horizontal">
					<fieldset className="scheduler-border no-right-border">
				        <legend className="scheduler-border">Add Packaging Material</legend>
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >Packaging Type</label></div>	
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<select className="form-control" id="" name="">
										<option value="">Select Packaging Type</option>
										<option value="Bags-Boxes-Bulk-Liners">Bags / Boxes / Bulk Liners</option>
										<option value="Pallet" >Pallet</option>
										<option value="Seal" >Seal</option>										
										<option value="Shrink-Wrap" >Shrink Wrap</option>										
									</select>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
							   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >ARB Location</label></div>	
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								 <select className="form-control" id="" name="">
										<option value="">Select ARB Location</option>
										<option value="SC" >SC</option>
										<option value="NJ" >NJ</option>										
								 </select>
								 <div className="error"><span></span></div>
								</div>	
								
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12  pddn-10-top">								
								<label className="control control--checkbox "><b>Company Material</b>
								<input type="checkbox" id="" name=""  /><div className="control__indicator"></div>
								</label>	
								</div>
							</div>
							
							<div className="form-group">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label htmlFor="" >Customer Name</label>
								<input type="text" className="form-control" id="" name="" placeholder="Customer Name"/>
								 <div className="error"><span></span></div>
								</div>	
								
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">						
								<label htmlFor="" >Type of Packaging Material</label>
								<input type="text" className="form-control" id="" name="" placeholder="Enter Packaging Type Material"/>
								 <div className="error"><span></span></div>
								</div>
							</div>
							
							
							
							
							<div className="form-group">							
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Packaging Name</label>
							    <input type="text" className="form-control" id="" name="" placeholder="Enter Packaging Name "/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Quantity</label>
								<input type="text" className="form-control" id="" name="" placeholder="Enter Quantity"/>
								<div className="error"><span></span></div>	
								</div>								
							</div>
							
							<div className="form-group">							
							  	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> <label htmlFor="" >Estimated Weight Empty (lbs.)</label>
							    <input type="text" className="form-control" id="" name="" placeholder="Enter Estimated Weight"/>
								 <div className="error"><span></span></div>
							   </div>
							   
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">	<label htmlFor="" >Avg. Weight of Material in Bags (kgs)</label>
								<input type="text" className="form-control" id="" name="" placeholder="Enter Avg, Weight"/>
								<div className="error"><span></span></div>	
								</div>								
							</div>
							
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >No. of Active Bags</label>
									<input type="text" className="form-control" id="" name="" placeholder="Enter Avg, Weight"/>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="" >Reorder Threshold</label>
									<input type="text" className="form-control" id="" name="" placeholder="Enter Reorder Threshold"/>
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="Notes" >Notes</label></div>	
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <textarea className="form-control textarea" rows="3" id="Notes"  placeholder="Enter Notes "></textarea> 	
									 <div className="error"><span></span></div>
								</div>	
							</div>
							
							
						</div>
						

					</fieldset>
					
					<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">					
						<div className="form-group">							
							 <div className="pull-left margin-10-last-l"> <button type="submit" className="btn  btn-primary text-uppercase " >Add Packaging Material</button> </div>
						</div>		
						
										
					</div>
					
					</form>
				</div>
			</div>
	</section>	   
		);
	}
}
export default AddMaterialForm