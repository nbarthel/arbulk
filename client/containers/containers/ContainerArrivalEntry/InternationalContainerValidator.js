import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateIntInput(data){
	console.log("dataV",data)
	debugger
	let intErrors = { };
	if(Validator.isNull(data.containerNumber)){
		intErrors.containerNumber = "Must be a Number";
	}
	if(Validator.isNull(data.sealNumber)){
		intErrors.sealNumber = "Required"
	}
	if(Validator.isNull(data.truckerId)){
		intErrors.truckerId = "Required"
	}
	if(Validator.isNull(data.pickupTruckerId)){
		intErrors.pickupTrucker = "Required"
	}
	if(Validator.isNull(data.chasisNumber)){
		intErrors.chasisNumber = "Required"
	}
	if(Validator.isNull(data.tareWeight)){
		intErrors.tareWeight = "Required"
	}

	return{
		intErrors,
		isIValid: isEmpty(intErrors)
	}

}