import React from 'react';
import LoginForm from './LoginForm';
import '../../public/stylesheets/bootstrap.min.css';
import '../../public/stylesheets/style.css';
class LoginPage extends React.Component{
	
	componentDidMount() {
		document.body.classList.toggle('signin_bg');
	}
componentWillUnmount() {
	document.body.classList.remove('signin_bg');
}
	render(){
		return (
			<div>
			<LoginForm />
			</div>
			)
	}
}
export default LoginPage;