import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPasswordPage extends React.Component{

componentDidMount() {
		document.body.classList.toggle('signin_bg');
	}
componentWillUnmount() {
	document.body.classList.remove('signin_bg');
}
	render(){
		return(
			<div>
			<ForgotPasswordForm />
			</div>
			)
	}
}
export default ForgotPasswordPage;