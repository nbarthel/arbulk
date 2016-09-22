import React from 'react';
import { Link } from 'react-router';
import './style.css';
class SignupForm extends React.Component{

	render(){
		return(
			<div id="container">  
    		<div id="wrapper"> 		
            <div id="register" className="animate form" >
             <section className="login_content" >
			        <div>  
					   <img src="../../public/img/logo.png" className=" pull-right img-responsive" />
                    </div>
					<div className="clearfix"></div>
					<form id="userLogin" >
					  <div className="form-group">
						<label htmlFor="inputEmail1">Email</label>
						<input type="email" className="input-control" id="inputEmail" placeholder="example@gmail.com" />
					  </div>
					  <div className="form-group">
						<label htmlFor="inputPassword">PASSWORD</label>
						<input type="password" className="input-control" id="inputPassword" placeholder="*********" />
						<div className="error"><span></span></div>
					  </div>
                      <div className="form-group">
						<label htmlFor="inputPassword">Confirm Password</label>
						<input type="password" className="input-control" id="inputPassword" placeholder="*********" />
						<div className="error"><span></span></div>
					  </div>						  
					  <div className="form-group">
						<label className="pull-left"><a href="javacsript:void(0)">Forgot  Password ?</a></label>
						 <button type="submit" className="login-btn pull-right">Sign up</button>
					  </div>
					 <br className="clearfix"/>
					 <div className="form-group pddn-80-top">
					    <p className="pull-right"> Already have an account?<Link to="/login">Sign In here.</Link></p>
					 </div>
					 
					</form>
					</section>
                
            </div>         
                
        </div>
			</div>
			)
	}
}export default SignupForm;