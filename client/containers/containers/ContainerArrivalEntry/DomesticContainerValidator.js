import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data){
	console.log("dataV",data)
	debugger
	let domesticErrors = { };
	if(Validator.isNull(data.containerNumber)){
		domesticErrors.containerNumber = "Must be a Number";
	}
	//if(Validator.isNull(data.sealNumber)){
	//	domesticErrors.sealNumber = "Required"
	//}
	if(Validator.isNull(data.trackingNumber)){
		domesticErrors.trackingNumber = "Required"
	}
	if(Validator.isNull(data.truckerId)){
		domesticErrors.truckerId = "Required"
	}
	if(Validator.isNull(data.pickupTrucker)){
		domesticErrors.pickupTrucker = "Required"
	}

	return{
		domesticErrors,
		isValid: isEmpty(domesticErrors)
	}

}