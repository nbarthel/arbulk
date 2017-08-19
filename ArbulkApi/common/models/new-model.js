'use strict';

module.exports = function(Newmodel) {
    if(tshipment.Address.length ==0){
        return cb(null,err)
    }
    else if(tshipment.Address.length ==1){

        ShipmentAddress.create({
            "id": 0,
            "shipmentId": obj.id,
            "shipToAddress": tshipment.Address[0].shippingAddress,
            "shipToCity": tshipment.Address[0].shippingCity,
            "shipToZip": tshipment.Address[0].zipCode,
            "shipToState": tshipment.Address[0].shippingState,
            "active": 1
        },function(err){
            if(err){
                return cb(null , err)
            }
        })
    }
    else if(tshipment.Address.length >1){
        for(var i in tshipment.Address){
            ShipmentAddress.create({
                "id": 0,
                "shipmentId": obj.id,
                "shipToAddress": tshipment.Address[i].shippingAddress,
                "shipToCity": tshipment.Address[i].shippingCity,
                "shipToZip": tshipment.Address[i].zipCode,
                "shipToState": tshipment.Address[i].shippingState,
                "active": 1
            },function(err){
                if(err){
                    return cb(null , err)
                }
            })
        }

    }
};



























shipadd.create({
    "id": 0,
    "shipmentId": obj.id,
    "shipToAddress":"Noida 115",
    "shipToCity": "Noida",
    "shipToZip": "201301",
    "shipToState": "UP",
    "active": 1
},function(err){
    if(err){
        return cb(null , err)
    }
})






var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
var dsConfig = require('../../server/datasources.json');
//var logger  = require('../../server/logger.js')

module.exports = function(Tshipmentent) {

    Tshipmentent.createShipMentEntry = function(tshipment, cb) {
        var context = loopback.getCurrentContext();
        var currentUser = context && context.get('currentUser');
        var ShipmentLots = Tshipmentent.app.models.TShipmentLots;
        var ShipmentDomestic = Tshipmentent.app.models.TShipmentDomestic;
        var ShipmentInternational = Tshipmentent.app.models.TShipmentInternational;
        var ShipmentAddress = Tshipmentent.app.models.TShipmentAddress;
        var ds = Tshipmentent.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message = null;
        console.log("check modelsssss" ,Tshipmentent.app.models.TShipmentDomestic)
        Tshipmentent.create({
                "id": 0,
                "customerId": tshipment.SI.customer_id,
                "releaseNumber": tshipment.SI.releaseNumber,
                "numberOfContainers": tshipment.SI.numberOfContainers,
                "numberOfBags": tshipment.SI.numberOfBags,
                "isDomestic":tshipment.SI.isDomestic ,
                "shipmentComplete": 0,
                "confirmation": "string",
                "createdBy": tshipment.SI.created_By,
                "createdOn": tshipment.SI.created_on,
                "midifiedBy": 0,
                "modifiedOn": null,
                "active": 0
            },
            function (err, obj) {
                if (err) {
                    //logger.error(err);
                    console.log(err)
                    return cb(null, {errors: err});
                }
                if(obj!= null){

                    if(tshipment.SI.isDomestic){

                        ShipmentDomestic.create({
                            "id": 0,
                            "shipmentId": obj.id,
                            "typeOfShipment": tshipment.Domestic.typeOfShipment,
                            "shippingReferenceNumber": tshipment.Domestic.shippingReferenceNumber,
                            "recipent": tshipment.Domestic.recipent,
                            "recipentContact": tshipment.Domestic.recipentContact,
                            "recipentTelNumber": tshipment.Domestic.recipentTelNumber,
                            "carrier": tshipment.Domestic.carrier,
                            "carrierAcNumber": tshipment.Domestic.carrierAcNumber,
                            "bookingNumber": tshipment.Domestic.bookingNumber,
                            "paymentTypeId":tshipment.Domestic.paymentTypeId,
                            "paidBy": tshipment.Domestic.paidBy,
                            "requestedShipDate": tshipment.Domestic.RequestedShipDate,
                            "requestedDeliveryDate": tshipment.Domestic.RequestedDeliveryDate,
                            "cretedOn": tshipment.Domestic.created_on,
                            "createdBy": 0,
                            "modifiedOn": tshipment.Domestic.created_on,
                            "modifiedBy": 0,
                            "active": 0

                        },function(err , lotsObj){
                            if (err) {
                                // logger.error(err);
                                console.log(err)
                                return cb(null, {errors: err});
                            }
                            if(lotsObj && tshipment.lotInformation.length==1){
                                var abc = Tshipmentent.app.models.TShipmentLots;
                                console.log("insidppppppddddddddddddde lots lotsObjddd" ,tshipment.lotInformation)

                                abc.create({
                                    "id": 0,
                                    "shipmentId": obj.id,
                                    "piLotsId": tshipment.lotInformation[0].lot_id,
                                    "sId" : tshipment.lotInformation[0].pi_id,
                                    "noOfBags":obj.numberOfBags,
                                    "confirmedOn": "2016-10-26T00:00:00.000Z",
                                    "confirmedBy": 0,
                                    "queueSequence": 0,
                                    "createdOn": "2016-10-26T00:00:00.000Z",
                                    "createdBy": 1,
                                    "modifiedOn": "2016-10-26T00:00:00.000Z",
                                    "modifiedBy": 0,
                                    "active": 1},function(err,result){
                                    console.log(">>>>>>>>>>>>>>>resultssssvvvvv is",err,result)
                                })
                            }
                            else if(tshipment.lotInformation.length > 1){
                                var abc = Tshipmentent.app.models.TShipmentLots;
                                console.log("insidppppppddddddddddddde lots lotsObjddd" ,tshipment.lotInformation)
                                console.log("MUltiLot",tshipment.lotInformation.length)
                                for(var i in tshipment.lotInformation) {
                                    abc.create({
                                        "id": 0,
                                        "shipmentId": obj.id,
                                        "piLotsId": tshipment.lotInformation[i].lot_id,
                                        "sId" : tshipment.lotInformation[i].pi_id,
                                        "noOfBags":obj.numberOfBags,
                                        "confirmedOn": "2016-10-26T00:00:00.000Z",
                                        "confirmedBy": 1,
                                        "queueSequence": 0,
                                        "createdOn": "2016-10-26T00:00:00.000Z",
                                        "createdBy": 1,
                                        "modifiedOn": "2016-10-26T00:00:00.000Z",
                                        "modifiedBy": 0,
                                        "active": 1

                                    })
                                }

                        }

                    });
                }
                else  if(!(tshipment.SI.isDomestic)){
                    console.log(">>>>>>>>>>>>>>.inside international")
                    ShipmentInternational.create({
                        "id": 0,
                        "shipmentId":obj.id,
                        "bookingNumber": tshipment.International.bookingNumber,
                        "freightForwarder": tshipment.International.freightForwarder,
                        "containerTypeId": tshipment.International.containerTypeId,
                        "steamshipLineId": tshipment.International.steamshipLineId,
                        "steamshipVessel": tshipment.International.steamshipVessel,
                        "earliestReturnDate": tshipment.International.EarliestReturnDate,
                        "docCutoffDate": tshipment.International.DocCutoffDate,
                        "cutoffDateNotRequired": 1,
                        "cargoCutoffDate": tshipment.International.CargoCutoffDate,
                        "freeDaysPerContainer": tshipment.International.freeDaysPerContainer,
                        "containerPickupLocation": tshipment.International.containerPickupLocation,
                        "containerReturnLocation": tshipment.International.containerReturnLocation,
                        "notes": tshipment.International.notes,
                        "craetedBy": 0,
                        "createdOn": tshipment.International.created_on,
                        "modifiedBy": 0,
                        "modifiedOn": "2016-10-25",
                        "active": 1

                    },function(err , lotsObj){
                        // if (err) {
                        //     // logger.error(err);
                        //     console.log(err)
                        //     return cb(null, {errors: err});
                        // }
                        console.log("tshipment.lotInformation.length" , tshipment.lotInformation.length)
                        if(lotsObj && tshipment.lotInformation.length==1){
                            console.log("inside lots" ,obj.id)
                            ShipmentLots.create({

                                "id": 0,
                                "shipmentId": obj.id,
                                "piLotsId": tshipment.lotInformation[0].lot_id,
                                "sId" : tshipment.lotInformation[0].pi_id,
                                "noOfBags":obj.numberOfBags,
                                "confirmedOn": "2016-10-26T00:00:00.000Z",
                                "confirmedBy": 0,
                                "queueSequence": 0,
                                "createdOn": "2016-10-26T00:00:00.000Z",
                                "createdBy": 1,
                                "modifiedOn": "2016-10-26T00:00:00.000Z",
                                "modifiedBy": 0,
                                "active": 1

                            })
                        }
                        else{
                            console.log("MULTILOTS",tshipment.lotInformation.length,obj.id)
                            for(var z in tshipment.lotInformation) {
                                ShipmentLots.create({
                                    "id": 0,
                                    "shipmentId": obj.id,
                                    "piLotsId": tshipment.lotInformation[z].lot_id,
                                    "sId" : tshipment.lotInformation[z].pi_id,
                                    "noOfBags":obj.numberOfBags,
                                    "confirmedOn": "2016-10-26T00:00:00.000Z",
                                    "confirmedBy": 1,
                                    "queueSequence": 0,
                                    "createdOn": "2016-10-26T00:00:00.000Z",
                                    "createdBy": 1,
                                    "modifiedOn": "2016-10-26T00:00:00.000Z",
                                    "modifiedBy": 0,
                                    "active": 1

                                })
                            }
                        }
                    });
                }

                cb(null,obj);
            }
    })

};



Tshipmentent.getReleaseList = function(cb) {

    var ds = Tshipmentent.dataSource;
    var sql ="SELECT  release_number as releaseNumber FROM t_shipmentent"

    ds.connector.query(sql, function (err, result) {
        if (err) {
            logger.error(err)
            return cb(err);
        }
        cb(null, result);
    });

};






Tshipmentent.updateShipMentEntry = function(tshipment, cb) {
    var context = loopback.getCurrentContext();
    var currentUser = context && context.get('currentUser');
    var ShipmentLots = Tshipmentent.app.models.TShipmentLots;
    var ShipmentDomestic = Tshipmentent.app.models.TShipmentDomestic;
    var ShipmentInternational = Tshipmentent.app.models.TShipmentInternational;
    var ShipmentAddress = Tshipmentent.app.models.TShipmentAddress;
    var ds = Tshipmentent.dataSource;
    var customErr = new Error();
    customErr.statusCode = 422;
    customErr.message = null;
    console.log("check modelsssss" ,Tshipmentent.app.models.TShipmentDomestic)
    Tshipmentent.upsert({
            "id": tshipment.SI.id,
            "customerId": tshipment.SI.customer_id,
            "releaseNumber": tshipment.SI.releaseNumber,
            "numberOfContainers": tshipment.SI.numberOfContainers,
            "numberOfBags": tshipment.SI.numberOfBags,
            "isDomestic":tshipment.SI.isDomestic ,
            "shipmentComplete": 0,
            "confirmation": "string",
            "createdBy": tshipment.SI.created_By,
            "createdOn": tshipment.SI.created_on,
            "midifiedBy": 0,
            "modifiedOn": null,
            "active": 0
        },
        function (err, obj) {
            if (err) {
                //logger.error(err);
                console.log(err)
                return cb(null, {errors: err});
            }
            if(obj!= null){

                if(tshipment.SI.isDomestic){
                    console.log("asdasas")
                    ShipmentDomestic.upsert({
                        "id": tshipment.Domestic[0].id,
                        "shipmentId": obj.id,
                        "typeOfShipment": tshipment.Domestic[0].typeOfShipment,
                        "shippingReferenceNumber": tshipment.Domestic[0].shippingReferenceNumber,
                        "recipent": tshipment.Domestic[0].recipent,
                        "recipentContact": tshipment.Domestic[0].recipentContact,
                        "recipentTelNumber": tshipment.Domestic[0].recipientTelephone,
                        "carrier": tshipment.Domestic[0].carrier,
                        "carrierAcNumber": tshipment.Domestic[0].carrierAcNumber,
                        "bookingNumber": tshipment.Domestic[0].bookingNumber,
                        "paymentTypeId":tshipment.Domestic[0].paymentTypeId,
                        "paidBy": tshipment.Domestic[0].paidBy,
                        "requestedShipDate": tshipment.Domestic[0].RequestedShipDate,
                        "requestedDeliveryDate": tshipment.Domestic[0].RequestedDeliveryDate,
                        "cretedOn": "2016-10-26T00:00:00.000Z",
                        "createdBy": 0,
                        "modifiedOn": "2016-10-26T00:00:00.000Z",
                        "modifiedBy": 0,
                        "active": 0

                    },function(err , lotsObj){
                        if (err) {
                            // logger.error(err);
                            console.log(err)
                            return cb(null, {errors: err});
                        }
                        if(lotsObj && tshipment.lotInformation.length==1){
                            console.log("inside lots" ,obj.id)
                            ShipmentLots.upsert({

                                "id": tshipment.lotInformation[0].id,
                                "shipmentId": obj.id,
                                "piLotsId": tshipment.lotInformation[0].lot_id,
                                "noOfBags":obj.numberOfBags,
                                "confirmedOn": "2016-10-26T00:00:00.000Z",
                                "confirmedBy": 0,
                                "queueSequence": 0,
                                "createdOn": "2016-10-26T00:00:00.000Z",
                                "createdBy": 1,
                                "modifiedOn": "2016-10-26T00:00:00.000Z",
                                "modifiedBy": 0,
                                "active": 1

                            })
                        }
                        else if(lotsObj && tshipment.lotInformation.length > 1){
                            for(var i in tshipment.lotInformation) {
                                ShipmentLots.upsert({
                                    "id": tshipment.lotInformation[i].id,
                                    "shipmentId": obj.id,
                                    "piLotsId": tshipment.lotInformation[i].lot_id,
                                    "noOfBags":obj.numberOfBags,
                                    "confirmedOn": "2016-10-26T00:00:00.000Z",
                                    "confirmedBy": 1,
                                    "queueSequence": 0,
                                    "createdOn": "2016-10-26T00:00:00.000Z",
                                    "createdBy": 1,
                                    "modifiedOn": "2016-10-26T00:00:00.000Z",
                                    "modifiedBy": 0,
                                    "active": 1

                                })
                            }
                        }
                        if(tshipment.Address.length ==0){
                            return cb(null,err)
                        }
                        else if(tshipment.Address.length ==1){

                            ShipmentAddress.create({
                                "id":  tshipment.Address[0].id,
                                "shipmentId": obj.id,
                                "shipToAddress": tshipment.Address[0].shippingAddress,
                                "shipToCity": tshipment.Address[0].shippingCity,
                                "shipToZip": tshipment.Address[0].zipCode,
                                "shipToState": tshipment.Address[0].shippingState,
                                "active": 1
                            },function(err){
                                if(err){
                                    return cb(null , err)
                                }
                            })
                        }
                        else if(tshipment.Address.length >1){
                            for(var i in tshipment.Address){
                                shipmentAddress.create({
                                    "id": tshipment.Address[i].id,
                                    "shipmentId": obj.id,
                                    "shipToAddress": tshipment.Address[i].shippingAddress,
                                    "shipToCity": tshipment.Address[i].shippingCity,
                                    "shipToZip": tshipment.Address[i].zipCode,
                                    "shipToState": tshipment.Address[i].shippingState,
                                    "active": 1
                                },function(err){
                                    if(err){
                                        return cb(null , err)
                                    }
                                })
                            }

                        }
                    });
                }
                else  if(!(tshipment.SI.isDomestic)){
                    console.log(">>>>>>>>>>>>>>.inside international")
                    ShipmentInternational.upsert({
                        "id": tshipment.International[0].id,
                        "shipmentId":obj.id,
                        "bookingNumber": tshipment.International[0].bookingNumber,
                        "freightForwarder": tshipment.International[0].freightForwarder,
                        "containerTypeId": tshipment.International[0].containerTypeId,
                        "steamshipLineId": tshipment.International[0].steamshipLineId,
                        "steamshipVessel": tshipment.International[0].steamshipVessel,
                        "earliestReturnDate": tshipment.International[0].EarliestReturnDate,
                        "docCutoffDate": tshipment.International[0].DocCutoffDate,
                        "cutoffDateNotRequired": 1,
                        "cargoCutoffDate": tshipment.International[0].CargoCutoffDate,
                        "freeDaysPerContainer": tshipment.International[0].freeDaysPerContainer,
                        "containerPickupLocation": tshipment.International[0].containerPickupLocation,
                        "containerReturnLocation": tshipment.International[0].containerReturnLocation,
                        "notes": tshipment.International[0].notes,
                        "piLotsId": tshipment.lotInformation[0].lot_id,
                        "craetedBy": 0,
                        "createdOn": "2016-10-25",
                        "modifiedBy": 0,
                        "modifiedOn": "2016-10-25",
                        "active": 1

                    },function(err , lotsObj){
                        if (err) {
                            // logger.error(err);
                            console.log(err)
                            return cb(null, {errors: err});
                        }
                        if(lotsObj && tshipment.lotInformation.length==1){
                            console.log("inside lots" ,obj.id)
                            ShipmentLots.upsert({

                                "id": tshipment.lotInformation[0].id,
                                "shipmentId": obj.id,
                                "piLotsId": tshipment.lotInformation[0].lot_id,
                                "noOfBags":tshipment.lotInformation[0].noOfBags,
                                "confirmedOn": "2016-10-26T00:00:00.000Z",
                                "confirmedBy": 0,
                                "queueSequence": 0,
                                "createdOn": "2016-10-26T00:00:00.000Z",
                                "createdBy": 1,
                                "modifiedOn": "2016-10-26T00:00:00.000Z",
                                "modifiedBy": 0,
                                "active": 1

                            })
                        }
                        else if(lotsObj && tshipment.lotInformation.length > 1){
                            for(var i in tshipment.lotInformation) {
                                ShipmentLots.upsert({
                                    "id": tshipment.lotInformation[i].id,
                                    "shipmentId": obj.id,
                                    "piLotsId": tshipment.lotInformation[i].lot_id,
                                    "noOfBags":tshipment.lotInformation[i].noOfBags,
                                    "confirmedOn": "2016-10-26T00:00:00.000Z",
                                    "confirmedBy": 1,
                                    "queueSequence": 0,
                                    "createdOn": "2016-10-26T00:00:00.000Z",
                                    "createdBy": 1,
                                    "modifiedOn": "2016-10-26T00:00:00.000Z",
                                    "modifiedBy": 0,
                                    "active": 1

                                })
                            }
                        }


                    });
                }

                cb(null,obj);
            }
        })

};







Tshipmentent.remoteMethod('getReleaseList', {
    description: 'get max queue Value',
    returns: { type: 'object',root: true},
    http: {path:"/getReleaseList", verb: 'get'}
});


Tshipmentent.remoteMethod('updateShipMentEntry', {
    description: 'update PackagingInstruction Entry for Material.',
    accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
    returns: {arg: 'Result', type: 'object', root: true},
    http: {path:'/updateShipMentEntry', verb: 'post'}
});


Tshipmentent.remoteMethod('createShipMentEntry', {
    description: 'create PackagingInstruction Entry for Material.',
    accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
    returns: {arg: 'Result', type: 'object', root: true},
    http: {path:'/createShipMentEntry', verb: 'post'}
});




};
