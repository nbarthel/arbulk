import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){

	let errors = {};
	if (Validator.isNull(toString(data.email))){
		errors.email = 'This field is required';
	}
	 if(!Validator.isEmail(toString(data.email))){
		errors.email = 'Please enter a valid Email address';
	}
	if (Validator.isNull(toString(data.password))){
		errors.password = 'This field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}