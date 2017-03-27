import React from 'react';
//import styles from './asset/css/bootstrap.min.css';
//import styles from './asset/css/style.css';
import { Link } from 'react-router';
import validateInput from '../../public/validations/validateInput';
import '../../public/stylesheets/bootstrap.min.css';
import './style.css';
import { push } from 'react-router-redux';
import axios from 'axios'
import SweetAlert from 'sweetalert-react';
import '../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router';
import { Base_Url } from  '../../constants/index';
var Spinner = require('react-spinkit');
class LoginForm extends React.Component{
	constructor(props,context){
		super(props);
		this.state={
			email: '',
			password: '',
			errors: {},
			isLoading: false,
			}
			//	this.userData= { }
		this.onChange=this.onChange.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}
	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	isValid(){

		const { errors , isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({ errors });
		}

		return isValid;

		}
	onSubmit(e){
		e.preventDefault();
		if(this.isValid() == true){
			axios.post(Base_Url+'TUsers/login?include=user',this.state)
			.then((response)=>{
			debugger
			localStorage.setItem('userName',response.data.user.firstName)
			localStorage.setItem('userId',response.data.user.id)

			/*this.setState(
				isLoading:false,
			})*/
			debugger
			//console.log(response.data.user)
			//this.userData = response.data
			//this.userData = response.data.user
			hashHistory.push('/Packaging/enterpackginginst/')
			//console.log(this.state.userData)
			}).catch(function(error){
				swal("Fail :(" , "You Have Entered Wrong Username or Password " , "error")
			})
		}
	}
	render()
	{
	return(
	<div id="container">
	<div id="wrapperLogin">
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
	{this.state.isLoading ? <Spinner spinnerName='circle' /> : null}
	</form>
	</section>
	</div>
	</div>
	</div>
	)
	}
}
export default LoginForm;
