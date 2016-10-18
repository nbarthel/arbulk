import React from 'react';
import { Link } from 'react-router';

 class SetNewPassword extends React.Component{
  /*componentWillMount() {
  	document.body.classList.remove('signin_bg');
  }
*/
  
  render() {
    return (
      <div className="container">  
	<div className="set-password col-lg-8 col-md-8 col-sm-12 col-xs-12">
		<form className="form-horizontal bs-component">
			<fieldset className="scheduler-border">
				<legend className="scheduler-border">SET NEW PASSWORD</legend>
				
				<div className="form-group  has-error">
				<div className="col-lg-4 ">	<label htmlFor="inputPassword" className="control-label">New Password</label></div>
					<div className="col-lg-8">
					  <input type="password" className="form-control  input-lg" id="inputPassword" placeholder="Enter New Password" />
					  <div className="error"><span>Error occur required field</span></div>
					</div>
                </div>
				
				<div className="form-group">
					<div className="col-lg-4 "><label htmlFor="inputPassword" className="control-label">Confirm Password</label></div>
					<div className="col-lg-8">
					  <input type="password" className="form-control  input-lg" id="inputPassword" placeholder="Confirm Password" />
					  <div className="error"><span></span></div>
					</div>
                </div>
			  
			</fieldset>
			
			<div className="form-group">
					<div className="col-lg-12 padding-20-last-l">
					  <Link to="/"><button type="submit" className="btn  btn-primary">UPDATE PASSWORD</button></Link>
					</div>
			</div>	
		</form>	
	</div>
	
 </div>		
    );
  }
}
export default SetNewPassword;