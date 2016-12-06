import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';



export default function validateInput(data){

    let errors = {};

        if (Validator.isNull(data.customer_id))
        {
            errors.customerId = 'Customer Name field is required';
        }

    if (Validator.isNull(data.location_id))
    {
        errors.locationId = 'location Name field is required';
    }

    if (Validator.isNull(data.releaseNumber)){
        errors.releaseNumber = 'Release field is required';
    }
    if (Validator.isNull(data.numberOfContainers))
    {
        errors.numberOfContainers = 'Number of Container must be number';
    }
    //if (Validator.isNull(data.numberOfBags)){
      //  errors.numberOfBags = 'No. of bags must be number';
    //}
    //if (Validator.isNull(data.customerId))
    //{
    //    errors.customerId = 'Customer Name field is required';
    //}
    //
    //if (Validator.isNull(data.releaseNumber)){
    //    errors.releaseNumber = 'Release field is required';
    //}
    //if (Validator.isNull(data.numberOfContainers))
    //{
    //    errors.numberOfContainers = 'Number of Container field is required';
    //}
    //if (Validator.isNull(data.numberOfBags)){
    //    errors.numberOfBags = 'No. of bags field is required';
    //}
    //if (Validator.isNull(data.customerId))
    //{
    //    errors.customerId = 'Customer Name field is required';
    //}
    //
    //if (Validator.isNull(data.releaseNumber)){
    //    errors.releaseNumber = 'Release field is required';
    //}
    //if (Validator.isNull(data.numberOfContainers))
    //{
    //    errors.numberOfContainers = 'Number of Container field is required';
    //}
    //if (Validator.isNull(data.numberOfBags)){
    //    errors.numberOfBags = 'No. of bags field is required';
    //}
    //if (Validator.isNull(data.customerId))
    //{
    //    errors.customerId = 'Customer Name field is required';
    //}
    //
    //if (Validator.isNull(data.releaseNumber)){
    //    errors.releaseNumber = 'Release field is required';
    //}
    //if (Validator.isNull(data.numberOfContainers))
    //{
    //    errors.numberOfContainers = 'Number of Container field is required';
    //}
    //if (Validator.isNull(data.numberOfBags)){
    //    errors.numberOfBags = 'No. of bags field is required';
    //}
    //if (Validator.isNull(data.customerId))
    //{
    //    errors.customerId = 'Customer Name field is required';
    //}
    //
    //if (Validator.isNull(data.releaseNumber)){
    //    errors.releaseNumber = 'Release field is required';
    //}
    //if (Validator.isNull(data.numberOfContainers))
    //{
    //    errors.numberOfContainers = 'Number of Container field is required';
    //}
    //if (Validator.isNull(data.numberOfBags)){
    //    errors.numberOfBags = 'No. of bags field is required';
    //}
    //if (Validator.isNull(data.customerId))
    //{
    //    errors.customerId = 'Customer Name field is required';
    //}
    //
    //if (Validator.isNull(data.releaseNumber)){
    //    errors.releaseNumber = 'Release field is required';
    //}
    //if (Validator.isNull(data.numberOfContainers))
    //{
    //    errors.numberOfContainers = 'Number of Container field is required';
    //}
    //if (Validator.isNull(data.numberOfBags)){
    //    errors.numberOfBags = 'No. of bags field is required';
    //}

        return {
            errors,
            isValid: isEmpty(errors)

    }
}


