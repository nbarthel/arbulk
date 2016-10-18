import React from 'react';
import validateInput from '../../public/validations/validateInput';
//import '../../public/stylesheets/style.css';
import { Link } from 'react-router';
import SetNewPassword from './SetNewPassword';
class ForgotPasswordForm extends React.Component{
constructor(){
	super();
	this.state={clicked: false}
	this.onClick=this.onClick.bind(this);
}
onClick(){
	this.setState({clicked: true})
}

	render(){
	
			if(this.state.clicked){
				return(<SetNewPassword />)
			}
			else{
			return(		
		<div id="container">  
    	<div id="wrapper"> 		
            <div id="login" className="animate form" >
             <section className="login_content" >
			        <div>  
					   <label className="pull-left pddn-20-top font-size-18" htmlFor="">FORGOT PASSWORD  </label>					
					   <img src="../../public/img/logo.png" className=" pull-right img-responsive" />
                    </div>
					<div className="clearfix"></div>
					<form id="userLogin" className="pddn-20-top" onSubmit={this.onClick}>
					
					  <div className="form-group">
						<label htmlFor="exampleInputEmail1 font-size-11">EMAIL</label>
						<input type="email" className="input-control font-size-14" id="exampleInputEmail1" placeholder="example@gmail.com" />
						 <div className="error"><span></span></div>
					  </div>				  
					 	
					  <div className="form-group pddn-20-top">
						<label className="pull-left"><Link to="/">Login Here !</Link></label>
						 <button type="submit" className="login-btn pull-right">SEND</button>
					  </div>
					  <br className="clearfix"/>
					
					</form>
					
                   
                </section>
                
            </div>         
                
        </div>
	</div>
				)}
	}
}
export default ForgotPasswordForm;