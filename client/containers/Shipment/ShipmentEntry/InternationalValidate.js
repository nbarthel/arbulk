/**
 * Created by Anurag on 06-11-2016.
 */
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateInternationalInput(data){

    let errorsI = {};




    if (Validator.isNull(data.freightForwarder))
    {
        errorsI.freightForwarder = 'Customer Name field is required';
    }

    if (Validator.isNull(data.containerTypeId))
    {
        errorsI.containerTypeId = 'containerTypeId field is required';
    }

    if (Validator.isNull(data.steamshipLineId)){
        errorsI.steamshipLineId = 'steamshipLineId field is required';
    }
    if (Validator.isNull(data.steamshipVessel))
    {
        errorsI.steamshipVessel = 'steamshipVessel field is required';
    }
    //if (!(Validator.isDate(data.EarliestReturnDate))){
    //    errorsI.EarliestReturnDate = 'EarliestReturnDate field is required';
    //}



    //if (!(Validator.isDate(data.DocCutoffDate)))
    //{
    //    errorsI.DocCutoffDate = 'DocCutoffDate  field is required';
    //}

    //if (!Validator.isDate(data.cutoffDateNotRequired)){
    //    errorsI.cutoffDateNotRequired = 'cutoffDateNotRequired field is required';
    //}
    if (Validator.isNull(data.bookingNumber))
    {
        errorsI.bookingNumber = 'bookingNumber field is required';
    }
    //if (!(Validator.isDate(data.CargoCutoffDate))){
    //    errorsI.CargoCutoffDate = 'CargoCutoffDate field is required';
    //}
    if (Validator.isNull(data.freeDaysPerContainer))
    {
        errorsI.freeDaysPerContainer = 'freeDaysPerContainer must be number';
    }

    if (Validator.isNull(data.containerPickupLocation)){
        errorsI.containerPickupLocation = 'containerPickupLocation field is required';
    }
    if (Validator.isNull(data.containerReturnLocation))
    {
        errorsI.containerReturnLocation = 'containerReturnLocation field is required';
    }

    //if (Validator.isNull(data.piLotsId)){
    //    errorsI.piLotsId = 'piLotsId field is required';
    //}
    if (Validator.isNull(data.notes))
    {
        errorsI.notes = 'notes field is required';
    }


    return {
        errorsI,
        isValid: isEmpty(errorsI)

    }
}
