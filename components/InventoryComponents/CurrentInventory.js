import React, { Component } from 'react';

class CurrentInventory extends Component {
	constructor(){
	super();
	this.state={
		hideEdit: 'block',
		showEdit : 'none'
	}
	this.onClick=this.onClick.bind(this);
}
		onClick(){
			this.setState({
				hideEdit: 'none',
				showEdit : 'block'
			})
		}
		onCancel(){
			this.setState({
				hideEdit : 'block',
				showEdit : 'none'
			})
		}
	render() {
		return (
			 <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12"> 
	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 active">
			<div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12"> 
				<div className="table-responsive">	
				 <h5>Current Inventory</h5>
				 <div id="edit" className="edit" style={{display: this.state.showEdit}}>			
			    <div className="form-group">
					<div className="col-md-3  col-sm-6 col-xs-6">
					  <input type="text" className="form-control " id="Purchase_Order" placeholder="# of bags" />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="text" className="form-control" id="Purchase_Order" placeholder="Inv. Loc." />
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group">
					<div className=" col-md-3 col-sm-6 col-xs-6">
					  <input type="text" className="form-control" id="Purchase_Order" placeholder="Weight"/>
					  <div className="error"><span></span></div>
					</div>				
                </div>
				<div className="form-group ">
					<div className="col-md-3 col-sm-6 col-xs-6 text_right  ">
					 <button type="button"  className="btn btn-primary btn_right_no_margin">ADD</button>
					</div>				
                </div>		    
				
			</div>
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
				<div id="edit" style={{display:this.state.showEdit}}>
				<div className="pull-left padding-20-last-l"><button type="button" id="inventory-save"  className="btn  btn-primary tex-uppercase">Save Changes</button> </div>
				 <div className="pull-left padding-20-all"><button type="button" id="cancel" onClick={this.onCancel.bind(this)}  className="btn  btn-gray tex-uppercase">CANCEL</button> </div>				 
				</div>
				<div className="pull-left padding-20-last-l" style={{display:this.state.hideEdit}}><button type="button" id="inventory-edit" className="btn  btn-orange tex-uppercase" onClick={this.onClick}>Edit Inventory</button> </div>
			</div>
			<div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12"> 
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
				  <input type="checkbox" checked="checked" id="row1"/><div className="control__indicator"></div>
				</label>	
				
			</div>
		</div>
	</div>
		);
	}
}
export default CurrentInventory;