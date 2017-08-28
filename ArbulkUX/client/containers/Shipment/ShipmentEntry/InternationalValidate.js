/**
 * Created by Anurag on 06-11-2016.
 */
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateInternationalInput(data){

    let errorsI = {};
    var isError = false;
    if (Validator.isNull(data.freightForwarder))
    {
        errorsI.freightForwarder = 'Customer name field is required.';
        isError = true;
    }

    if (Validator.isNull(data.containerTypeId))
    {
        errorsI.containerTypeId = 'containerTypeId field is required.';
        isError = true;
    }

    if (Validator.isNull(data.steamshipLineId)){
        errorsI.steamshipLineId = 'steamshipLineId field is required.';
        isError = true;
    }
    if (Validator.isNull(data.steamshipVessel))
    {
        errorsI.steamshipVessel = 'steamshipVessel field is required.';
        isError = true;
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
        errorsI.bookingNumber = 'bookingNumber field is required.';
        isError = true;
    }
    //if (!(Validator.isDate(data.CargoCutoffDate))){
    //    errorsI.CargoCutoffDate = 'CargoCutoffDate field is required';
    //}
    if (Validator.isNull(data.freeDaysPerContainer))
    {
        errorsI.freeDaysPerContainer = 'freeDaysPerContainer must be number.';
        isError = true;
    }

    if (Validator.isNull(data.containerPickupLocation)){
        errorsI.containerPickupLocation = 'containerPickupLocation field is required.';
        isError = true;
    }
    if (Validator.isNull(data.containerReturnLocation))
    {
        errorsI.containerReturnLocation = 'containerReturnLocation field is required.';
        isError = true;
    }

    //if (Validator.isNull(data.piLotsId)){
    //    errorsI.piLotsId = 'piLotsId field is required';
    //}
    // if (Validator.isNull(data.notes))
    // {
    //     errorsI.notes = 'notes field is required';
    // }
    if(!isError){
  		ValidateAlphaNumeric(data,errorsI)
  	}

    return {
        errorsI,
        isValid: isEmpty(errorsI),
    		haveSpecialChar: !isError && !isEmpty(errorsI) ? 1 : 0

    }
}

function ValidateAlphaNumeric(data,errorsI){
    return errorsI
  // for(var props in data){
	// 	if( props!="notes"  && props!="EarliestReturnDate"  &&  props!="DocCutoffDate" && props!="CargoCutoffDate" && props!="cutoffDateNotRequired" && !( /^[\w-//]+$/.test(data[props]) ) ){
	// 		swal("Error","Cant't have special charcters","warning")
	// 		return errorsI[props]="Cant't have special charcters"
	// 	}
	// }
}
