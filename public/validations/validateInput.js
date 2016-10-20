import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){

	let errors = {};
	if (Validator.isNull(data.email))
	{
		errors.email = 'Please enter Email Address';
	}
	else if(!Validator.isEmail(data.email)){
		errors.email = 'Please enter a valid Email Address';
	}
	if (Validator.isNull(data.password)){
		errors.password = 'Please enter Password';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}