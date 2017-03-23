import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export function validateCustomer(data){
	let errors = { }
	if(Validator.isNull(data.name)){
		errors.name = "Customer Name Is Required"
	}
	if(Validator.isNull(data.primaryContactName)){
		errors.primaryContactName = "Field is Required"
	}
	if(Validator.isNull(data.secondaryContactName)){
		errors.secondaryContactName = "Field is Required"
	}
	if(Validator.isNull(data.phoneNumber)){
		errors.phoneNumber = "Field is Required"
	}else if(data.phoneNumber.length != 10){
		errors.phoneNumber = "Enter a valid Phone Number"
	}
	if(Validator.isNull(data.emailAddress)){
		errors.emailAddress = "Field is Required"
	}else if(!Validator.isEmail(data.emailAddress)){
		errors.emailAddress = "Enter a valid Email Address"
	}
	if(Validator.isNull(data.type)){
		errors.type = "Please Choose a Type"
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}

export function validateAddress(addr){
	let errorsA = { }
	if(Validator.isNull(addr.address)){
		errorsA.address = "Field is Required"
	}
	if(Validator.isNull(addr.cityId)){
		errorsA.cityId = "Selection is Required"
	}
	if(Validator.isNull(addr.zipCode)){
		errorsA.zipCode = "Field is Required"
	}else if(addr.zipCode.length != 6){
		errorsA.zipCode = "Enter a Valid Zip Code"
	}
	if(Validator.isNull(addr.billingAddress)){
		errorsA.billingAddress = "Field is Required"
	}
	return {
		errorsA,
		isAddrValid: isEmpty(errorsA)
	}
}
