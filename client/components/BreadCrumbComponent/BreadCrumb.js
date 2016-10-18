import React from 'react';
import routes from '../../routes';
import BreadCrumbs from 'react-breadcrumbs';
export default class BreadCrumb extends React.Component {
 

   render() {
     return (
      <section className="breadcrumb_bg">  
	    <div className="container">
             <div id="row">  
           <BreadCrumbs routes={this.props.routes}/>
          </div>	
	    </div>	
    </section>
    );
  }
}
