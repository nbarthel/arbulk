import React from 'react';
import { Link } from 'react-router';
import './styles.css';
import { hashHistory } from 'react-router'
import '../../public/stylesheets/bootstrap.min.css'
import '../../public/stylesheets/font-awesome.min.css'
import BreadCrumb from '../BreadCrumbComponent/BreadCrumb';


 class Header extends React.Component {
constructor(props){
  super(props);
  this.onLogout = this.onLogout.bind(this);
}
  onLogout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.clear();
    hashHistory.push('/')
  }
     render() {
       return (
        <div>
     <header>
   <nav className="navbar navbar-default  navbar-fixed-top">
     <div className="container-fluid">

       <div className="navbar-header">
         <button type="button" className="navbar-toggle collapsed " data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span className="sr-only">Toggle navigation</span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
         </button>
       <span className="navbar-brand imgbg" ></span>
       </div>

        <div className="pageTitle">
         {this.props.routes[1].name.props.children[2]!="Enter Packaging Instruction" && this.props.routes[1].name.props.children[2]!= "Packaging Instruction View"?this.props.routes[1].name : (this.props.routes[1].name.props.children[2]=="Enter Packaging Instruction"?"Packaging >> Enter RailCars":"Packaging >> View RailCars")}
        </div>



       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
         <ul className="nav navbar-nav navbar-right top_nav">
           <li className="dropdown">
             <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">PACKAGING <span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">PACKAGING</a></li>
               <li role="separator" className="divider"></li>
              <li><Link to="/Packaging/enterpackginginst/" >Enter RailCars</Link></li>
               <li><Link to="/Packaging/packaginginstview/">View Inventory</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="/Packaging/railcararrival">Mark Railcar Arrivals </Link></li>
               <li><Link to="/Packaging/railcardeparte">Mark Railcar Departures </Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="/Packaging/packaginginstqueue">View Packaging Queue</Link></li>
             </ul>
           </li>
           <li className="dropdown">
             <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHIPMENT<span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">Shipments</a></li>
               <li role="separator" className="divider"></li>
               <li><Link to="/Shipment/shipmententry">Enter Shipments</Link></li>
               <li><Link to="/Shipment/shipmentview">Shipment View</Link></li>
             </ul>
           </li>
           <li className="dropdown">
             <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CONTAINERS <span className="caret"></span></a>
             <ul className="dropdown-menu">
               <li><a href="javascript:void(0)">Containers</a></li>
               <li role="separator" className="divider"></li>
               <li><Link to="/Container/containerarrivalentry/">Enter Container Arrival</Link></li>
               <li><Link to="/Container/containerview">View Container</Link></li>
               <li role="separator" className="divider"></li>
               <li><Link to="/Conatainer/containerqueueview">View Container Queue </Link></li>
             </ul>
           </li>
           <li><Link to="/Admin/adminlogin">ADMIN</Link></li>
           <li><a href="#">HELP</a></li>
           <li onClick={this.onLogout}><a href="#">LOGOUT <i className="fa fa-lock" aria-hidden="true"></i></a></li>
         </ul>
       </div>
     </div>
   </nav>
</header>
 <BreadCrumb routes = {this.props.routes} setWeight={this.props.setWeight}/>
 </div>

    );
  }
}
export default Header;
