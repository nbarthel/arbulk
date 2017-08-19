import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateIntInput(data){
	console.log("dataV",data)
	debugger
	let intErrors = { };
	var isError = false;
	if(Validator.isNull(data.containerNumber)){
		intErrors.containerNumber = "Must be a Number";
		isError = true;
	}
	// if(Validator.isNull(data.sealNumber)){
	// 	intErrors.sealNumber = "Required"
	// }
	if(Validator.isNull(data.truckerId)){
		intErrors.truckerId = "Required"
		isError = true;
	}
	if(Validator.isNull(data.pickupTruckerId)){
		intErrors.pickupTrucker = "Required"
		isError = true;
	}
	if(Validator.isNull(data.chasisNumber)){
		intErrors.chasisNumber = "Required"
		isError = true;
	}
	if(Validator.isNull(data.tareWeight)){
		intErrors.tareWeight = "Required"
		isError = true;
	}
	if(!isError){
		ValidateAlphaNumeric(data,intErrors)
	}
	return{
		intErrors,
		isIValid: isEmpty(intErrors),
		haveSpecialChar: !isError && !isEmpty(intErrors) ? 1 : 0
	}

}
function ValidateAlphaNumeric(data,intErrors){
	return intErrors
	// for(var props in data){
	// 	if(props!="trackingNumber" && props!="sealNumber" && !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return intErrors[props]="Cant't have special charcters"
	// 	}
	// }
}
