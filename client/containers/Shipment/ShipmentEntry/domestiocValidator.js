/**
 * Created by Anurag on 06-11-2016.
 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateDomesticInput(data){

    let errorsd = {};
    var isError = false;
    if (Validator.isNull(data.typeOfShipment))
    {
        errorsd.typeOfShipment = 'Customer Name field is required';
        isError = true;
    }

    if (Validator.isNull(data.shippingReferenceNumber))
    {
        errorsd.shippingReferenceNumber = 'ShippingReferenceNumber field is required';
        isError = true;
    }

    if (Validator.isNull(data.recipent)){
        errorsd.recipent = 'recipent field is required';
        isError = true;
    }
    if (Validator.isNull(data.recipentContact))
    {
        errorsd.recipentContact = 'recipentContact field is required';
        isError = true;
    }
    if (Validator.isNull(data.recipentTelNumber)){
        errorsd.recipentTelNumber = 'recipentTelNumber field is required';
        isError = true;
    }
    if (Validator.isNull(data.carrier))
    {
        errorsd.carrier = 'carrier  field is required';
        isError = true;
    }

    if (Validator.isNull(data.carrierAcNumber)){
        errorsd.carrierAcNumber = 'carrierAcNumber field is required';
        isError = true;
    }
    if (Validator.isNull(data.bookingNumber))
    {
        errorsd.bookingNumber = 'bookingNumber field is required';
        isError = true;
    }
    if (Validator.isNull(data.paymentTypeId)){
        errorsd.paymentTypeId = 'paymentTypeId field is required';
        isError = true;
    }
    if (Validator.isNull(data.paidBy))
    {
        errorsd.paidBy = 'Customer Name field is required';
        isError = true;
    }
    if (data.recipentTelNumber.length!=10){
        errorsd.recipentTelNumber = 'Telephone Number must be of 10 digit';
        isError = true;
    }
    if(!isError){
  		ValidateAlphaNumeric(data,errorsd)
  	}

    return {
        errorsd,
        isValid: isEmpty(errorsd),
    		haveSpecialChar: !isError && !isEmpty(errorsd) ? 1 : 0

    }
}

function ValidateAlphaNumeric(data,errorsd){

  return errorsd
	// for(var props in data){
	// 	if( props!= "domesticCarear" && props!="RequestedDeliveryDate" && props!="RequestedShipDate"  &&  !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return errorsd[props]="Cant't have special charcters"
	// 	}
	// }
}
