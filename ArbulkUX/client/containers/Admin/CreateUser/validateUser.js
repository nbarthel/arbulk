import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateUser(data){
	let errors = { }
	debugger
	if(Validator.isNull(data.firstName)){
		errors.firstName = "First name is required."
	}
	if(Validator.isNull(data.lastName)){
		errors.lastName = "Last name is required."
	}
	if(Validator.isNull(data.email)){
		errors.emailAddr = "Email address is required."
	}else if(!Validator.isEmail(data.email)){
		errors.emailAddr = "Please enter a valid email address."
	}
	if(Validator.isNull(data.confirmEmail)){
		errors.confirmEmail = "Email address confirmation required."
	}else if(data.email != data.confirmEmail){
		errors.confirmEmail = "Confirm email address doesn't match."
	}
	if(Validator.isNull(data.role)){
		errors.role = "Please select a role."
	}
	if(Validator.isNull(data.password)){
		errors.password = "Password is required."
	}
	if(Validator.isNull(data.confirmPassword)){
		errors.confirmPassword = "Password confirmation is required."
	}else if(data.password != data.confirmPassword){
		errors.confirmPassword = "Passwords must match."
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}