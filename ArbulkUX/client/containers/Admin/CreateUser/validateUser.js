import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateUser(data){
	let errors = { }
	debugger
	if(Validator.isNull(data.firstName)){
		errors.firstName = "First Name is Required."
	}
	if(Validator.isNull(data.lastName)){
		errors.lastName = "Last Name is Required."
	}
	if(Validator.isNull(data.email)){
		errors.emailAddr = "Email Address is Required."
	}else if(!Validator.isEmail(data.email)){
		errors.emailAddr = "Please Enter a Valid Email Address."
	}
	if(Validator.isNull(data.confirmEmail)){
		errors.confirmEmail = "Email Address Confirmation Required."
	}else if(data.email != data.confirmEmail){
		errors.confirmEmail = "Confirm Email Address Doesn't Match."
	}
	if(Validator.isNull(data.role)){
		errors.role = "Please select a role."
	}
	if(Validator.isNull(data.password)){
		errors.password = "Password is Required."
	}
	if(Validator.isNull(data.confirmPassword)){
		errors.confirmPassword = "Password Confirmation is Required."
	}else if(data.password != data.confirmPassword){
		errors.confirmPassword = "Passwords Must Match."
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}