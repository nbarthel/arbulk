/**
 * Created by Anurag on 06-11-2016.
 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateDomesticInput(data){

    let errorsd = {};

    if (Validator.isNull(data.typeOfShipment))
    {
        errorsd.typeOfShipment = 'Customer Name field is required';
    }

    if (Validator.isNull(data.shippingReferenceNumber))
    {
        errorsd.shippingReferenceNumber = 'ShippingReferenceNumber field is required';
    }

    if (Validator.isNull(data.recipent)){
        errorsd.recipent = 'recipent field is required';
    }
    if (Validator.isNull(data.recipentContact))
    {
        errorsd.recipentContact = 'recipentContact field is required';
    }
    if (Validator.isNull(data.recipentTelNumber)){
        errorsd.recipentTelNumber = 'recipentTelNumber field is required';
    }
    if (Validator.isNull(data.carrier))
    {
        errorsd.carrier = 'carrier  field is required';
    }

    if (Validator.isNull(data.carrierAcNumber)){
        errorsd.carrierAcNumber = 'carrierAcNumber field is required';
    }
    if (Validator.isNull(data.bookingNumber))
    {
        errorsd.bookingNumber = 'bookingNumber field is required';
    }
    if (Validator.isNull(data.paymentTypeId)){
        errorsd.paymentTypeId = 'paymentTypeId field is required';
    }
    if (Validator.isNull(data.paidBy))
    {
        errorsd.paidBy = 'Customer Name field is required';
    }

    //if (Validator.isNull(data.RequestedShipDate)){
    //    errorsd.RequestedShipDate = 'RequestedShipDate field is required';
    //}
    //if (Validator.isNull(data.RequestedDeliveryDate))
    //{
    //    errorsd.RequestedDeliveryDate = 'RequestedDeliveryDate field is required';
    //}


    return {
        errorsd,
        isValid: isEmpty(errorsd)

    }
}
