import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){

	let errors = {};
	if (Validator.isNull(toString(data.email))){
		errors.email = 'This field is required';
	}
	if (!Validator.isEmail(toString(data.email))){
		errors.email = 'Please enter a valid Email address';
	}
	if (Validator.isNull(toString(data.password))){
		errors.password = 'This field is required';
	}

	/*if(Validator.isNull(data.newPassword)){
		errors.newPassword = 'This field is required';
	}
	if(Validator.isNull(data.confirmPassword)){
		errors.newPassword = 'This field is required';
	}

	if(!Validator.equals(data.newPassword,data.confirmPassword)){
		errors.confirmPassword = 'The password fields should match';
	}*/

	return {
		errors,
		isValid: isEmpty(errors)
	}
}