import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export function validateCustomer(data){
	let errors = { }
	if(Validator.isNull(data.name)){
		errors.name = "Customer name is required."
	}
	if(Validator.isNull(data.primaryContactName)){
		errors.primaryContactName = "Field is required."
	}
	if(Validator.isNull(data.secondaryContactName)){
		errors.secondaryContactName = "Field is required."
	}
	if(Validator.isNull(data.phoneNumber)){
		errors.phoneNumber = "Field is required."
	}else if(data.phoneNumber.length != 10){
		errors.phoneNumber = "Enter a valid phone number."
	}
	if(Validator.isNull(data.emailAddress)){
		errors.emailAddress = "Field is required"
	}else if(!Validator.isEmail(data.emailAddress)){
		errors.emailAddress = "Enter a valid email address."
	}
	if(Validator.isNull(data.type)){
		errors.type = "Please choose a type."
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}

export function validateAddress(addr){
	let errorsA = { }
	if(Validator.isNull(addr.address)){
		errorsA.address = "Field is required."
	}
	if(Validator.isNull(addr.cityId)){
		errorsA.cityId = "Selection is required."
	}
	if(Validator.isNull(addr.zipCode)){
		errorsA.zipCode = "Field is Required"
	}else if(addr.zipCode.length != 6){
		errorsA.zipCode = "Enter a valid zip code."
	}
	if(Validator.isNull(addr.billingAddress)){
		errorsA.billingAddress = "Field is required."
	}
	return {
		errorsA,
		isAddrValid: isEmpty(errorsA)
	}
}
