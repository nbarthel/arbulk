import React from 'react';
import LoginForm from './LoginForm'; 
import '../../public/stylesheets/bootstrap.min.css';
import '../../public/stylesheets/style.css';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../actions/loginActions';
class LoginPage extends React.Component{
	
	componentDidMount() {
		document.body.classList.toggle('signin_bg');
	}
componentWillUnmount() {
	document.body.classList.remove('signin_bg');
}
	render(){
		const { userLoginRequest } = this.props;
		return (
			<div>
			<LoginForm userLoginRequest={userLoginRequest} />
			</div>
			)
	}
}
export default connect(null, { userLoginRequest })(LoginPage);