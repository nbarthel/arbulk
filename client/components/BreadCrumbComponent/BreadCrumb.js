import React from 'react';
import routes from '../../routes';
//import BreadCrumbs from 'react-breadcrumbs';
export default class BreadCrumb extends React.Component {
 componentDidMount() {
   console.log("Routes",this.props)
 }

   render() {
     return (
      <section className="breadcrumb_bg">  
	    <div className="container">
             <div id="row">  
            <strong>{this.props.routes[1].name}</strong>
            </div>	
	    </div>	
    </section>
    );
  }
}
