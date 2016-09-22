import React from 'react';
import ReactDOM from 'react-dom';
//import styles from './asset/css/bootstrap.min.css';
//import styles from './asset/css/style.css';
import { Link } from 'react-router';

import validateInput from '../../public/validations/validateInput';
import '../../public/stylesheets/bootstrap.min.css';
import './style.css';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
class LoginForm extends React.Component{
	constructor(props,context){
		super(props);
		this.state={
			email: '',
			password: '',
			errors: {}
		}
		this.onChange=this.onChange.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}
	componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 0
	}
	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	isValid(){
		const { errors , isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({errors});
		}
		return isValid;
	}
	onSubmit(e){
		e.preventDefault();
		//this.props.dispatch(push('/enterpackginginst'))
		browserHistory.push('/Packaging/enterpackginginst')	
	/*	e.preventDefault();
		this.props.userLoginRequest(this.state)
		.then(function (response) {
			hashHistory.push('enterpackginginst')
			})
		.catch(function(error){
			console.log(error)
		})*/
	}		
	render()
	{
	return(
	<div id="container">
	<div id="wrapper">
	<div id="login" className="animate form">
	<section className="login_content" >
	<div>
		<span className="pull-right img-responsive imgbg" ></span>
	</div>
	
	<div className="clearfix"></div>
	<form id="userLogin" onSubmit={this.onSubmit}>
	<div className="form-group">
	<label htmlFor="inputEmail">Email</label>
	<input type="text"
	 className="input-control"
	 id="inputEmail"
	 placeholder="example@gmail.com"
	 value={this.state.email} 
	 onChange={this.onChange}
	 name="email"
	 />
	<div className="error"><span>{this.state.errors.email}</span></div>
	</div>

	<div className="form-group">
	<label htmlFor="inputPassword">Password</label>
	<input 
	type="password" 
	className="input-control"
	id="inputPassword"
	placeholder="*********"
	value={this.state.password}
	onChange={this.onChange}
	name="password"
	/>
	<div className="error"><span>{this.state.errors.password}</span></div>
	</div>

	<div className="form-group">
	<label className="pull-left">
	<Link to="/forgotpass">Forgot Password?</Link>
	</label>
	<button 
	onClick={this.onSubmit}
	className="login-btn pull-right">Sign in</button>	
	</div>
	</form> 
	</section>
	</div>
	</div>
	</div>
	)
	}
}
export default LoginForm;