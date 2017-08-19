import React from 'react';
import SignupForm from './SignupForm';

class SignupPage extends React.Component{

	componentDidMount() {
		document.body.classList.add('signin_bg');
	}

	render(){
		return(
			<div>
			<SignupForm />
			</div>
			)
	}
}
export default SignupPage;