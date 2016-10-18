import React from 'react';
import { Link } from 'react-router';
class InventoryCardForm extends React.Component{

	render(){
		return(

<section className="inventory_card">  
<div className="container-fluid"> 
<div className="row pddn-20-top">	
	  <div className="col-lg-12">
	  
	 <div className="table-responsive">	
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >
					<th>ARB </th>
					<th>Customer</th>
					<th>PO </th>
					<th>Railcar# </th>
					<th>Lot# </th>
					<th>Material </th>
					<th>Confmd </th>
					<th>Arrvd </th>
					<th>Recd </th>
					<th>Cutoff </th>
					<th>Weight</th>
					<th>#Bags</th>
					<th>(In Invt.) </th>
					<th>Status</th>
            </tr>
			</thead>
			<tbody>
				<tr>
					<td>sc </td>
					<td>Ravago</td>
					<td>123456</td>
					<td>CCBX-73261</td>
					<td>D030G2E03</td>
					<td>LLDPE 1647C</td>
					<td>Y</td>
					<td>Y</td>
					<td>Y</td>
					<td>5/6/16</td>
					<td>150000</td>
					<td>2970 Bags</td>
					<td>3508 Bags</td>
					<td>In Inventory</td>					
				</tr>	
				
			</tbody>
	    </table>
	</div>
	</div>
	</div>
	<div className="label_info" >
		<div className="row pddn-20-top">
			<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<fieldset className="scheduler-border">
							<legend className="scheduler-border">PACKAGING LABEL </legend>
							<div className="col-lg-5 col-sm-5 col-xs-5">Bag Type</div>
							<div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
							<div className="col-lg-5 col-sm-5 col-xs-5"><b>Ravago Bags  </b></div>
							
							<div className="col-lg-5 col-sm-5 col-xs-5">Pallet Type</div>
							<div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
							<div className="col-lg-5 col-sm-5 col-xs-5"><b> H/T</b></div>
							
							<div className="col-lg-5 col-sm-5 col-xs-5">Bags per Pallet</div>
							<div className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
							<div className="col-lg-5 col-sm-5 col-xs-5"><b> 60</b></div>
							
							<div className="col-lg-5 col-sm-5 col-xs-5">Stretch Wrap:</div>
							<div className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
							<div className="col-lg-5 col-sm-5 col-xs-5"><b> Full Wrap </b></div>
							
							<div className="col-lg-5 col-sm-5 col-xs-5">ORIGIN</div>
							<div className="col-lg-2 col-sm-2 col-xs-2 ">:</div>
							<div className="col-lg-5 col-sm-5 col-xs-5"><b>Made in USA</b></div>
							
						</fieldset>
						</div>
					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12  ">			
						<fieldset className="scheduler-border">
							<legend className="scheduler-border">SAMPLE LABEL </legend>
							<div className="col-lg-4 col-sm-4 col-xs-4">PO</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div> <div className="col-lg-6 col-sm-6 col-xs-6"> #123456</div>
							<div className="col-lg-4 col-sm-4 col-xs-4">LLDPE</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1647E</div>
							<div className="col-lg-4 col-sm-4 col-xs-4">LOT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> #D030G2E2C</div>
							<div className="col-lg-4 col-sm-4 col-xs-4">WEIGHT</div><div  className="col-lg-2 col-sm-2 col-xs-2 ">:</div><div className="col-lg-6 col-sm-6 col-xs-6"> 1000KG</div>
							<div className="col-lg-12 ">MADE IN USA </div>
						</fieldset>				
					</div>	
					<div className=" col-lg-4 col-md-4 col-sm-6 col-xs-12 pddn-20-top">			
				<label className="control control--checkbox ">Stamp Confirmed <br/><b>Joe Smith</b>
				  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
				</label>				
			</div>
			</div>
		
		
		
			
			
		</div>
		
		<div className="row">	
			<div className=" col-lg-7 col-md-7 col-sm-12 col-xs-12">	
				<div className="text_left">
				 <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray"><i className="fa fa-angle-left"aria-hidden="true"></i> &nbsp; BACK</button> </div>
				 
				 <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Print Bagging Instruction</button> </div>
				 
				 <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Add To Queue</button> </div>	
				 
				 <div className="pull-left margin-10-all"><button type="button"  className="btn  btn-gray">Confirm</button> </div>		 		 
				
				
				  <div className="pull-left margin-10-all"><Link to="inventoryedit"><button type="button"  className="btn  btn-orange">Edit</button></Link> </div>		 		 
				</div>	
			</div>	
			<div className=" col-lg-5 col-md-5 col-sm-12 col-xs-12">	
				<div className="text_left">
				 <div className="pull-right margin-10-last-r"><button type="button"  className="btn  btn-primary"><i className="fa fa-chevron-left"aria-hidden="true"></i></button> </div>	
				  <div className="pull-right margin-10-all"><button type="button"  className="btn  btn-primary"><i className="fa fa-chevron-right"aria-hidden="true"></i></button> </div>		 		 
				</div>	
			</div>
		</div>
		 <div className="col-lg-12 label-gray font-size-16">Inventory Card</div>
	</div>

	<br className="clearfix"/>
	<div className="row pddn-40-top">	
	
	 <div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
		<div className="row">
			<div className=" col-lg-7 col-md-7 col-sm-12 col-xs-12"> 
				<div className="table-responsive">	
				 <h5>Current Inventory</h5>
					<table className="table table-striped">
						<thead className="base_bg">
						  <tr >				
							<th>Inv. Location</th>
							<th>Bags</th>
							<th>Weight</th> 				
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>Aisle 11</td>
								<td>100 Bags</td>
								<td>5500 lbs.</td>					
							</tr>
							<tr>
								<td>Aisle 11</td>
								<td>100 Bags</td>
								<td>5500 lbs.</td>					
							</tr>
							<tr>
								<td>Aisle 11</td>
								<td>100 Bags</td>
								<td>5500 lbs.</td>						
							</tr>
							<tr>
								<td>Aisle 11</td>
								<td>100 Bags</td>
								<td>5500 lbs.</td>					
							</tr>
							<tr>
								<th>Total </th>
								<th>400 Bags </th>
								<th>22000 lbs.</th>					
							</tr>				
						</tbody>
					</table>
				</div>
				<span className="pull-left underline"><a href="inventory-edit.html">Edit Inventory</a></span>
				
			</div>
			<div className=" col-lg-5 col-md-5 col-sm-12 col-xs-12"> 
				<div className="table-responsive">	
				 <h5>&nbsp; </h5>
					<table className="table table-striped">
						<thead className="base_bg">
						  <tr >				
							<th> &nbsp; </th>
							<th> &nbsp; </th>				
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>Railcar Weight</td>
								<td>15000 </td>				
							</tr>
							<tr>
								<td>Packaged Weight </td>
								<td>14900 </td>				
							</tr>
							<tr>
								<td>Gain / Loss</td>
								<td>-1000 </td>				
							</tr>
											
						</tbody>
					</table>
				</div>
				
				<label className="control control--checkbox ">Packaging Complete 
				  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
				</label>	
				
			</div>
		</div>
	</div>
	<div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12">
	 <div className="table-responsive">	
	  <h5>Inventory History</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >				
				<th>Date</th>
				<th>PO</th>
				<th>Release#</th> 				
				<th># of Bags</th> 				
				<th>Bag Balance</th> 				
            </tr>
			</thead>
			<tbody>
				<tr>
					<td>11/1/2014 </td>
					<td>35687456</td>
					<td> </td>					
					<td>+3508</td>					
					<td>3508</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>35687456</td>
					<td>11635</td>					
					<td>-990</td>					
					<td>2518</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>35687456</td>
					<td>11635</td>					
					<td>-990</td>					
					<td>1528</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>35687456</td>
					<td>11635</td>					
					<td> -888</td>					
					<td>880</td>					
				</tr>
				<tr>
					<th colSpan="4">Total </th>
					<th>660 </th>					
				</tr>				
			</tbody>
	    </table>
	</div>
	
	</div>
	</div>
	
	
	
	<div className="row pddn-20-top">	
	
	 <div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
	 <div className="table-responsive">	
	 <h5>Inventory Location History</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >				
				<th>Inv. Location</th>
				<th>Bags</th>
				<th>Weight</th> 				
				<th>Time</th> 				
				<th>Note</th> 				
            </tr>
			</thead>
			<tbody>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Broken Bag</td>					
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td></td>								
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Rel #11635</td>									
				</tr>
				<tr>
					<td>Aisle 11</td>
					<td>100 Bags</td>
					<td>5500 lbs.</td>
					<td>5/1/16  8:23am </td>
					<td>Rel #11635</td>								
				</tr>
								
			</tbody>
	    </table>
	</div>
	</div>
	<div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12">
	 <div className="table-responsive">	
	 <h5>Pending Shipment</h5>
		<table className="table table-striped">
			<thead className="base_bg">
			  <tr >				
				<th>Date Entered</th>
				<th>Release#</th> 				
				<th># of Bags</th> 				
				<th>Bag Balance</th> 				
            </tr>
			</thead>
			<tbody>
				
                <tr>
					<td>11/1/2014 </td>
					<td> </td>					
					<td>+3508</td>					
					<td>3508</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td>-990</td>					
					<td>2518</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td>-990</td>					
					<td>1528</td>					
				</tr>
				<tr>
					<td>11/1/2014 </td>
					<td>11635</td>					
					<td> -888</td>					
					<td>880</td>					
				</tr>
				<tr>
					<th colSpan="4">Total </th>
					<th>660 </th>					
				</tr>					
			</tbody>
	    </table>
	</div>
	
	</div>
	</div>
	
	
	
	
 
</section>	


			)
	}
}
export default InventoryCardForm;