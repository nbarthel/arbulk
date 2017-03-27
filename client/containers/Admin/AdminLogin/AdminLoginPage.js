import React from 'react';
import AdminLoginForm from './AdminLoginForm';
import '../../../public/stylesheets/bootstrap.min.css';
import '../../../public/stylesheets/style.css';
class AdminLoginPage extends React.Component{
	
	componentDidMount() {
		document.body.classList.toggle('signin_bg');
	}
componentWillUnmount() {
	document.body.classList.remove('signin_bg');
}
	render(){
		return (

			<AdminLoginForm />

			)
	}
}
export default AdminLoginPage;