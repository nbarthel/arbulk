import React from 'react';

import { Link } from 'react-router';
import { hashHistory } from 'react-router'
import '../../public/stylesheets/bootstrap.min.css'
import '../../public/stylesheets/font-awesome.min.css'
import BreadCrumb from '../BreadCrumbComponent/BreadCrumb';


export default class AdminHeader extends React.Component {
	constructor(props){
		super(props);
		this.logOut = this.logOut.bind(this)
	}
	logOut(){
		localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    hashHistory.push('/')
		window.location.reload()
	}
  render() {
    return (
    	<div>
      <header className="admin-menu-font text-uppercase">
			<nav className="navbar navbar-default navbar-fixed-top  ">
				  <div className="container-fluid">
					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation-menu" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					  </button>
					  <span className="navbar-brand imgbg" ></span>
					</div>

				 <div className="collapse navbar-collapse" id="navigation-menu">
					 <ul className="nav navbar-nav navbar-right top_nav">
						<li><Link to="/Admin/createusr">Create User</Link></li>
						<li><Link to="/Admin/modifyUser">Modify User</Link></li>
						<li><Link to = "/Admin/CustAndTruck">Customers & Truckers</Link></li>
						 <li className="dropdown">
							 <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Material<span className="caret"></span></a>
							 <ul className="dropdown-menu">
								 <li><Link to ="/Admin/AddMaterial">Add Material</Link></li>
								 <li role="separator" className="divider"></li>
								 <li><Link to ="/Admin/addPallet">Add Pallet</Link></li>
								 <li><Link to ="/Admin/addStretchWrap">Add Stretch wrap</Link></li>
							 </ul>
						 </li>

						<li><Link to ="/Admin/viewMaterial">View Material</Link></li>
						<li><Link to = "/Admin/UploadData">Upload Data</Link></li>
						<li><a href="#">Change History</a></li>
						   <li><a href="#" onClick={this.logOut}>LOGOUT <i className="fa fa-unlock-alt" aria-hidden="true"></i></a></li>
					  </ul>
					</div>
				  </div>
				</nav>
    </header>
    <BreadCrumb routes = {this.props.routes} />
    </div>
    );
  }
}
