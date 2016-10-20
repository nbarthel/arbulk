import React from 'react';

class  ContainerArrivalEdithtmlForm extends React.Component {
    render() {
        return (
            <section className="container_detils form-horizontal">  
			<div className="container-fluid"> 
			<div className="row">   
			<htmlForm className="htmlForm-horizontal">
				<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">				
					
					<div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<fieldset className="scheduler-border sameHeight">
							<legend className="scheduler-border">Container INFO</legend>
							
							<div className="form-group ">
								<div className="col-lg-6"><label htmlFor="Booking" className=" control-label">Domestic Booking</label></div>
								<div className="col-lg-6">
								 <select className="form-control" id="Booking" name="Booking">
									<option value="">Booking </option>
									<option value="">Booking 1</option>
									<option value="">Booking 2</option>
									<option value="">Booking 3</option>
									<option value="">Booking 4</option>
									<option value="">Booking 5</option>
								  </select>
								  <div className="error"><span></span></div>
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="Customer" className="col-lg-6 control-label">Customer</label>
								<div className="col-lg-6">
								   <select className="form-control" id="Customer" name="">
									<option value="">Customer</option>
									<option value="">Customer 1</option>
									<option value="">Customer 2</option>
									<option value="">Customer 3</option>
									<option value="">Customer 4</option>
									<option value="">Customer 5</option>
								  </select>
								  <div className="error"><span></span></div>
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="PO_Number" className="col-lg-6 control-label">PO Number</label>
								<div className="col-lg-6">
								  <select className="form-control" id="PO_Number" name="PO_Number">
									<option value="">PO Number</option>
									<option value="">PO Number 1</option>
									<option value="">PO Number 2</option>
									<option value="">PO Number 3</option>
									<option value="">PO Number 4</option>
									<option value="">PO Number 5</option>
								  </select>
								  <div className="error"><span></span></div>
								</div>
							</div>
						  
						   <div className="form-group ">			  
								<label htmlFor="Dropoff_Trucker" className="col-lg-6 control-label">Dropoff Trucker</label>
								<div className="col-lg-6"> 
								 <select className="form-control" id="Dropoff_Trucker" name="Dropoff_Trucker">
									<option value="">Dropoff Trucker</option>
									<option value="">Dropoff Trucker 1</option>
									<option value="">Dropoff Trucker 2</option>
									<option value="">Dropoff Trucker 3</option>
									<option value="">Dropoff Trucker 4</option>
									<option value="">Dropoff Trucker 5</option>
								  </select>
								  <div className="error"><span></span></div>
								</div>
							</div>
							
							<div className="form-group ">			  
								<label htmlFor="P_U_Trucker" className="col-lg-6 control-label">P / U Trucker</label>
								<div className="col-lg-6"> 
								 <select className="form-control" id="P_U_Trucker" name="P_U_Trucker">
									<option value="">P/U Trucker</option>
									<option value="">P/U Trucker 1</option>
									<option value="">P/U Trucker 2</option>
									<option value="">P/U Trucker 3</option>
									<option value="">P/U Trucker 4</option>
									<option value="">P/U Trucker 5</option>
								  </select>
								  <div className="error"><span></span></div>
								</div>
							</div>
							
							
							<div className="form-group">
								<label htmlFor="Container_#" className="col-lg-6 control-label">Container #</label>
								<div className="col-lg-6">
									<input type="text" className="form-control" id="Container_#" placeholder="Container #"/>
								  <div className="error"><span></span></div>
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="Tracking_#" className="col-lg-6 control-label">Tracking #</label>
								<div className="col-lg-6">
									 <input type="text" className="form-control" id="Tracking_#" placeholder="Tracking #"/>
									 <div className="error"><span></span></div>
								</div>
							</div>
											
							<div className="form-group pddn-10-top">				
								<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">			
									<label className="control control--checkbox "> Container Arrived?
									  <input type="checkbox" defaultChecked id="row1"/><div className="control__indicator"></div>
									</label>				
								</div>
							</div>
						</fieldset>	
						<div className="text_left">
						  <div className="pull-left padding-20-last-l "><button type="button" className="btn  btn-gray">CANCEL </button>  </div>	
						  <div className="pull-left padding-20-all"><button type="button" className="btn  btn-primary"> SAVE </button> </div>
						</div>
				</div>
				</div>
			 
				<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<fieldset className="scheduler-border sameHeight">
							<legend className="scheduler-border">SHIPMENT INFO</legend>
							
							<div className=" col-lg-6 col-md-6 col-sm-5 col-xs-12 no-space">
							<ul className="no-space">
								<li>Eligible Lot Numbers</li>
								<li>Eligible Lot Numbers</li>
								<li>Eligible Lot Numbers</li>					
							</ul>
							</div>
							<div className=" col-lg-6 col-md-6 col-sm-7 col-xs-12 no-space">
							<ul className="no-space">
								<li>Type of Shipment</li>
								<li>Shipping Reference Number</li>
								<li>Recipient</li>
								<li>Recipient Contact</li>
								<li>Recipient Telephone Number</li>
								<li>Ship To
									<ul>
									<li>Address 1</li>
									<li>City, State, Zip Code</li>
									</ul>
								</li>
								<li>Carrier</li>
								<li>Carrier Account Number</li>
								<li>Shipping Payment Type</li>
								<li>Shipping Paid By</li>
								<li>Request Ship Date</li>
								<li>Request Delivery Date</li>
												
							</ul>
							</div>
					</fieldset>	
				</div>	
				</div>		
				</htmlForm>	
			</div>
			</div>	
	</section>
            )
            }
}
export default ContainerArrivalEdithtmlForm;