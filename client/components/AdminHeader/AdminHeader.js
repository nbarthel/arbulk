import React from 'react';

import { Link } from 'react-router';

import '../../public/stylesheets/bootstrap.min.css'
import '../../public/stylesheets/font-awesome.min.css'
import BreadCrumb from '../BreadCrumbComponent/BreadCrumb';


export default class AdminHeader extends React.Component {
  render() {
    return (
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
					  <a className="navbar-brand" href="index.html"> <img src="../../public/img/logo_inner.png" className="img-responsive" /></a>
					</div>

				 <div className="collapse navbar-collapse" id="navigation-menu">
					 <ul className="nav navbar-nav navbar-right top_nav">      
						<li><Link to="/Admin/createusr">Create User</Link></li>
						<li><Link to="/Admin/modifyusr">Modify User</Link></li>
						<li><a href="#">Customers & Truckers  </a></li>
						<li><a href="#">Add Material  </a></li>
						<li><a href="#">Upload Data</a></li>
						<li><a href="#">Change Histroy</a></li>
						   <li><a href="signin.html">LOGOUT <i className="fa fa-unlock-alt" aria-hidden="true"></i></a></li>
					  </ul>
					</div>
				  </div>
				</nav>
    </header>
    );
  }
}
