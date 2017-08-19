import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';



export default function validateInput(data){

    let errors = {};
    var isError = false;
        if (Validator.isNull(data.customer_id))
        {
            errors.customerId = 'Customer Name field is required';
            isError = true;
        }

    if (Validator.isNull(data.location_id))
    {
        errors.locationId = 'location Name field is required';
        isError = true;
    }

    if (Validator.isNull(data.releaseNumber)){
        errors.releaseNumber = 'Release field is required';
        isError = true;
    }
    if (Validator.isNull(data.numberOfContainers))
    {
        errors.numberOfContainers = 'Number of Container must be number';
        isError = true;
    }
    if(!isError){
  		ValidateAlphaNumeric(data,errors)
  	}


        return {
            errors,
            isValid: isEmpty(errors),
            haveSpecialChar: !isError && !isEmpty(errors) ? 1 : 0
    }
}
function ValidateAlphaNumeric(data,errors){

      return errors
	// for(var props in data){
	// 	if( props!="isDomestic" &&  !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return errors[props]="Cant't have special charcters"
	// 	}
	// }
}
