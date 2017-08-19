import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){
	let errors = {};
	var isError = false;
	if (Validator.isNull(data.customer_id))
	{
		errors.customer_id = 'Customer Name field is required';
		isError = true;
	}
	if (Validator.isNull(data.location_id)){
		errors.location_id = 'Location field is required';
		isError = true;
	}
	if (Validator.isNull(data.po_number)){
		errors.po_number = 'PO number field is required';
		isError = true;
	}
	if (Validator.isNull(data.material)){
		errors.material = 'Material field is required';
		isError = true;
	}
	if (Validator.isNull(data.origin_id)){
		errors.origin_id = 'Origin field is required';
		isError = true;
	}
	if (Validator.isNull(data.bag_id)){
		errors.bag_id = "Type field is required"
		isError = true;
	}

	if (Validator.isNull(data.packaging_material_id.toString())){
		errors.packaging_material_id = "Type field is required"
		isError = true;
	}
	if (Validator.isNull(data.pallet_type_id)){
		errors.pallet_type_id = "Type field is required"
		isError = true;
	}
	if (Validator.isNull(data.bags_per_pallet)){
		errors.bags_per_pallet = "Must be a number"
		isError = true;
	}
	if (Validator.isNull(data.wrap_type_id)){
		errors.wrap_type_id = "Type field is required"
		isError = true;
	}
	if(Validator.isNull(data.custom_label)){
		errors.custome_label = "Custom label is required"
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
	// 	if( props!="notes" && props!="custom_label" &&  !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return errors[props]="Cant't have special charcters"
	// 	}
	// }
}
