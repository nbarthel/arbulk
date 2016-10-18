import React from 'react';
import axios from 'axios'
import validateInput from '../../public/validations/validateInput';
//import '../../public/stylesheets/style.css';
import { Link } from 'react-router';
import SweetAlert from 'sweetalert-react';
import '../../public/stylesheets/sweetalert.css';
import { Base_Url } from '../../constants';
class ForgotPasswordForm extends React.Component{
	constructor(){
		super();
		this.state = {
		errors: { }
		}
		
		this.onSubmit=this.onSubmit.bind(this);
		this.onChange=this.onChange.bind(this);
	}
		onChange(e){
		this.setState({[e.target.name]: e.target.value});
		console.log(this.state)
	}
	validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

	
	onSubmit(e) {
		e.preventDefault();
		if(this.state.email != undefined){
		if(this.validateEmail(this.state.email)){
		var data = this.state.email


		axios.post(Base_Url+"TUsers/passwordReset",data).then((respnse)=>{
			
				swal("Done","Please check your email","success")
			
		})
				
	

	}
	else{
		this.setState({
			error : "Please enter a valid Email Address"
		})
	}
	}
	else
	{
		this.setState({
			error : "Please enter Email Address"
		})
	}


	}


	render(){


		return(
			<div id="container">
				<div id="wrapper">
					<div id="login" className="animate form" >
						<section className="login_content" >
							<div>
								<label className="pull-left pddn-20-top font-size-18" htmlFor="">FORGOT PASSWORD  </label>
								<div>
									<span className="pull-right img-responsive imgbg" ></span>
									</div>
							</div>
							<div className="clearfix"></div>
							<form id="userLogin" className="pddn-20-top" onSubmit={this.onClick}>

								<div className="form-group">
									<label htmlFor="exampleInputEmail1 font-size-11">EMAIL</label>
									<input 
									type="text"
									name="email" 
									className="input-control font-size-14" 
									onChange={this.onChange} 
									id="exampleInputEmail1"  
									placeholder="example@gmail.com" 
									value={this.state.email}
									 />
									<div className="error"><span>{this.state.error}</span></div>
								</div>

								<div className="form-group pddn-20-top">
									<label className="pull-left"><Link to="/">Login Here !</Link></label>
									<button type="submit" onClick={this.onSubmit} className="login-btn pull-right">SEND</button>
								</div>
								<br className="clearfix"/>

							</form>


						</section>

					</div>

				</div>
			</div>
		)}

}
export default ForgotPasswordForm;