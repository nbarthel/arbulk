import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data){

	let domesticErrors = { };
	var isError = false;
	if(Validator.isNull(data.containerNumber)){
		domesticErrors.containerNumber = "Must be a number.";
		isError = true
	}
	if (Validator.isNull(data.trackingNumber)){
		domesticErrors.trackingNumber = "Required."
		isError = true
	}
	if(Validator.isNull(data.truckerId)){
		domesticErrors.truckerId = "Required."
		isError = true
	}
	if(Validator.isNull(data.pickupTrucker)){
		domesticErrors.pickupTrucker = "Required."
		isError = true
	}
	if(!isError){
		ValidateAlphaNumeric(data,domesticErrors)
	}
	return{
		domesticErrors,
		isValid: isEmpty(domesticErrors),
		haveSpecialChar: !isError && !isEmpty(domesticErrors) ? 1 : 0
	}

}
function ValidateAlphaNumeric(data,domesticErrors){
	return domesticErrors
	// for(var props in data){
	// 	if(props!="sealNumber" && props!="shipmentLotsId"&& !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return domesticErrors[props]="Cant't have special charcters"
	// 	}
	// }
}
