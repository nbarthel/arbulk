import React from 'react';
import '../../public/js/bootstrap-datetimepicker.min.js';
export default class RailcarArrivalEntryForm extends React.Component {

 onTap() {
  	$(document).ready(function(){
		var date_input=$('input[name="date"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		date_input.datepicker({
			format: 'M/d/yyyy',
			container: container,
			todayHighlight: true,
			autoclose: true,
		})
	})
  }
    render() {
    return (

    <section className="side-filter">
    <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
		<div className="">
		  <h4 className="pull-left">REFINE YOUR RESULT </h4>
		  <button type="button" className="btn btn-default collapsed pull-right " data-toggle="collapse" data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x" aria-hidden="true"></i></button>
		</div>
	</div>
<div className="container">
	<div className="row-fluid">


		<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">


			<div className="well filter_bg collapse navbar-collapse" id="filter-menu">
			<h4> REFINE YOUR RESULT </h4>

			<div>
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">AR BULK  </h6>
					<a href=""  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>
				</div>
				<ul>
					<li>
						<label className="control control--checkbox">SC
						  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">NG
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>

			<div className="customer">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">CUSTOMER  </h6>
					<a href=""  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>
				</div>
				<ul className="scroll">
					<li>
						<label className="control control--checkbox">AA Customers
						  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Dow
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Exxon
						  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Ravago
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Dow
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>

			<div className="">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">PO#  </h6>
					<a href=""  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>

					<div id="search" className="col-md-12">
						<div className="left-inner-addon ">
							<i className="fa fa-search" aria-hidden="true"></i>
							<input type="search"className="form-control" placeholder="Search" />
						</div>
					</div>


				</div>
			</div>
			<div className="">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">RAIL CAR#  </h6>
					<a href=""   className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>
					<div id="search" className="col-md-12">
					<div className="left-inner-addon ">
					    <i className="fa fa-search" aria-hidden="true"></i>
						<input type="search"className="form-control" placeholder="Search" />
					</div>
					</div>
				</div>
			</div>
			<div className="">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">LOT#  </h6>
					<a href=""   className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>
					<div id="search" className="col-md-12">
						<div className="left-inner-addon ">
							<i className="fa fa-search" aria-hidden="true"></i>
							<input type="search"className="form-control" placeholder="Search" />
						</div>
					</div>
				</div>
			</div>

			<div className="">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-7 col-md-7 col-sm-7 col-xs-7 text_left">CUT OFF DATE </h6>
					<a href=""  className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text_right"> Show All</a>
				</div>

				<div id="date" className="row">
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					 <input type="text" id="date" name="date" className="form-control"  placeholder="From" />

					</div>
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					 <input type="date" className="form-control"  id="date" name="date"  placeholder="To" />
					</div>
				</div>
			</div>

			<div className="status">
				<hr/>
				<div className="row pddn-20-btm ">
					<h6 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_left">STATUS  </h6>
					<a href=""  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text_right"> Show All</a>
				</div>
				<ul className="scroll">
					<li>
						<label className="control control--checkbox">Unconfirmed
						  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Confirmed
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Arrived
						  <input type="checkbox" checked="" id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Queued
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Partially Packaged
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">In Invetory
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
					<li>
						<label className="control control--checkbox">Shipped
						  <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
						</label>
					</li>
				</ul>
			</div>




			</div>
		</div>
		<div id="filter-grid">
		<div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
			<div className="row">
				<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 filter-btn">
			    <button type="button"  className="btn  btn-default">sc <span aria-hidden="true">&times;</span></button>
				<button type="button"  className="btn  btn-default">AA Customers<span aria-hidden="true">&times;</span></button>
				<button type="button"  className="btn  btn-default">Exxon <span aria-hidden="true">&times;</span></button>
				<button type="button"  className="btn  btn-default">Arrived <span aria-hidden="true">&times;</span></button>
				<a href="javascript:void(0)"  className="underline base_color"> Clear Filter</a>
				</div>
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

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><hr/></div>

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="table-responsive ">
					<table className="table table-striped">
						<thead className="base_bg">
						  <tr >

							<th>Customer</th>
							<th>PO# </th>
							<th>Railcar# </th>
							<th>Lot# </th>
							<th>Material </th>
							<th>In Inventiry?</th>
							<th>
								<label className="control control--checkbox">
								  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
								</label>
							</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>Ravago</td>
								<td>123456</td>
								<td>CCBX-73261</td>
								<td>D030G2E03</td>
								<td>LLDPE 1647C</td>
								<td> Y</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
							<tr>
								<td>Ravago</td>
								<td>123456</td>
								<td>CCBX-73261</td>
								<td>D030G2E03</td>
								<td>LLDPE 1647C</td>
								<td> Y</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
							<tr>
								<td>Ravago</td>
								<td>123456</td>
								<td>CCBX-73261</td>
								<td>D030G2E03</td>
								<td>LLDPE 1647C</td>
								<td> Y</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
							<tr>
								<td>Ravago</td>
								<td>123456</td>
								<td>CCBX-73261</td>
								<td>D030G2E03</td>
								<td>LLDPE 1647C</td>
								<td> Y</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>
							<tr>
								<td>Ravago</td>
								<td>123456</td>
								<td>CCBX-73261</td>
								<td>D030G2E03</td>
								<td>LLDPE 1647C</td>
								<td> Y</td>
								<td>
									<label className="control control--checkbox">
									  <input type="checkbox" id="row1"/><div className="control__indicator"></div>
									</label>
								</td>
							</tr>


						</tbody>
					</table>
				</div>


				<div className=" ">
					<div className="pull-left pddn-10-top ">
						 <div className="padding-10-last-l" >
						 <div className="right-inner-addon "><i className="fa fa-calendar" aria-hidden="true"></i>
							<input className="form-control" onClick={this.onTap.bind(this)} id="date" name="date" placeholder="Railcar Arrival Date" type="text"/>
						</div>
						</div>
					</div>
				    <div className="pull-right padding-top-btm-xs">
						<div className="pull-right padding-10-last-r"><button type="button"  className="btn  btn-primary">ARRIVAL </button></div>
						<div className="pull-right padding-10-all"><button type="button"  className="btn  btn-gray">BACK </button></div>
					</div>
				</div>
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
