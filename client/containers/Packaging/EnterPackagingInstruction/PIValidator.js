import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){
debugger
	let errors = {};
	if (Validator.isNull(data.customer_id))
	{
		errors.customer_id = 'Customer Name field is required';
	}
	if (Validator.isNull(data.location_id)){
		errors.location_id = 'Location field is required';
	}
	if (Validator.isNull(data.po_number)){
		errors.po_number = 'PO number field is required';
	}
	if (Validator.isNull(data.material)){
		errors.material = 'Material field is required';
	}
	if (Validator.isNull(data.origin_id)){
		errors.origin_id = 'Origin field is required';
	}
	if (Validator.isNull(data.bag_id)){
		errors.bag_id = "Type field is required"
	}

	if (Validator.isNull(data.packaging_material_id.toString())){
		errors.packaging_material_id = "Type field is required"
	}
	if (Validator.isNull(data.pallet_type_id)){
		errors.pallet_type_id = "Type field is required"
	}
	if (Validator.isNull(data.bags_per_pallet)){
		errors.bags_per_pallet = "Must be a number"
	}
	if (Validator.isNull(data.wrap_type_id)){
		errors.wrap_type_id = "Type field is required"
	}
	if(Validator.isNull(data.custom_label)){
		errors.custome_label = "Custom label is required"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
