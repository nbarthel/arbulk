import React from 'react';
import { Link } from 'react-router';
import './styles.css';
import '../../public/stylesheets/bootstrap.min.css'
import '../../public/stylesheets/font-awesome.min.css'
import BreadCrumb from '../BreadCrumbComponent/BreadCrumb';


 class Header extends React.Component {
  componentWillMount() {
  
  }

     render() {
       return (
        <div>
     <header>
   <nav className="navbar navbar-default ">
     <div className="container-fluid">

       <div className="navbar-header">
         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span className="sr-only">Toggle navigation</span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
         </button>
         <a className="navbar-brand" href="index.html"> <img src="../../public/img/logo_inner.png" className="img-responsive"/></a>
       </div>


       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
         <ul className="nav navbar-nav navbar-right top_nav">
           <li className="dropdown">
             <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">PACKAGING <span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">PACKAGING</a></li>
               <li role="separator" className="divider"></li>
              <li><Link to="enterpackginginst" >Enter Packaging Instructions</Link></li>
               <li role="separator" className="divider"></li>
              <li><Link to="confirmpckginst">Confirm Packaging Instructions</Link></li>
              <li role="separator" className="divider"></li>
               <li><Link to="packaginginstqueue">View Packaging Queue</Link></li>
               <li><Link to="packaginginstview">View Packaging Instructions</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="inventorycard">Inventory Card</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="railcararrival">Mark Railcar Arrivals </Link></li>
               <li><Link to="railcardeparte">Mark Railcar Departures </Link></li>
               <li><Link to="">Print Bagging Instruction</Link></li>
             </ul>
           </li>
           <li className="dropdown">
             <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHIPEMENT<span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">Shipments</a></li>
               <li role="separator" className="divider"></li>
               <li><Link to="shipmententry">Enter Shipments</Link></li>
               <li><Link to="shipmentarrive">Entry Shipment Arrival</Link></li>
               <li><Link to="shipmentview">Shipment View</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="shipmentdetails">Shipment Details</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="shipmentconfirm">Confirm Shipments</Link></li>
             </ul>
           </li>
           <li className="dropdown">
             <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CONTAINERS <span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">Containers</a></li>
               <li role="separator" className="divider"></li>
               <li><a href="javascript:void(0)">Enter Container Arrival</a></li>
               <li><a href="javascript:void(0)">View Container</a></li>
               <li role="separator" className="divider"></li>
               <li><a href="javascript:void(0)">View Container Queue </a></li>
             </ul>
           </li>
           <li><Link to="adminlogin">ADMIN</Link></li>
           <li><a href="#">HELP</a></li>
           <li><a href="#">LOGOUT <i className="fa fa-lock" aria-hidden="true"></i></a></li>
         </ul>
       </div>
     </div>
   </nav>
</header>
 <BreadCrumb />
 </div>

    );
  }
}
export default Header;
