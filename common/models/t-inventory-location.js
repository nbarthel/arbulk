'use strict';
var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
var dsConfig = require('../../server/datasources.json');
module.exports = function(Tinventorylocation) {

    Tinventorylocation.addbagweight = function(tinventory, cb) {
        var inventoryData = Tinventorylocation.app.models.TPiInventory;
        console.log(tinventory , '>>>>>>');
        var ds = Tinventorylocation.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;
        console.log(">>>>>>>>>>>>>>>>>>tinventory" ,tinventory)
        Tinventorylocation.create({
                "id": 0,
                "locationName": tinventory.Tpinventory.locationName,
                "locationId": tinventory.Tpinventory.location_id,
                "active": 1

            },
            function (err, obj) {
                if (err) {
                    //logger.error("errooorrrrr" , JSON.stringify(obj));
                    return cb(null, {errors: err});
                }
                if(obj!= null && obj!= undefined){
                    console.log(">>>>>>>>>>>>>>>>>>>>>>.Object" , JSON.stringify((obj)))
                    console.log(">>>>>>>>>>>.Invnetory lacation table entry done" ,JSON.stringify(obj) )
                    if(!(tinventory.Tinventory)){
                        return cb(null, {errors: err});
                    }
                    else{
                        console.log(">>>>>>>>>>>.Invnetory lacation table entry done");
                        inventoryData.create({

                            "id": 0,
                            "piLotId": tinventory.Tinventory.piLotId,
                            "inventoryLocationId": obj.id,
                            "noOfBags": tinventory.Tinventory.noOfBags,
                            "weight": tinventory.Tinventory.weight,
                            "createdOn": "2016-10-03",
                            "createdBy": 1,
                            "modifiedOn": "2016-10-03",
                            "modifiedBy": 1,
                            "active": 1

                        },function(err , lotsObj){
                            if (err) {
                               // logger.error(err);
                                return cb(null, {errors: err});
                            }
                            else{
                                console.log("lots Object" , lotsObj)
                            }
                        });
                    }

                    cb(null,obj);
                }
            })

    };


    Tinventorylocation.updatebagweight = function(tinventory, cb) {
        var inventoryData = Tinventorylocation.app.models.TPiInventory;
        console.log(tinventory , '>>>>>>');
        var ds = Tinventorylocation.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;
        console.log(">>>>>>>>>>>>>>>>>>tinventory" ,tinventory)
        Tinventorylocation.upsert({
                "id": tinventory.Tpinventory.id,
                "locationName": tinventory.Tpinventory.locationName,
                "locationId": tinventory.Tpinventory.location_id,
                "active": 1
            },
            function (err, obj) {
                if (err) {
                   // logger.error("errooorrrrr" , JSON.stringify(obj));
                    return cb(null, {errors: err});
                }
                if(obj!= null && obj!= undefined){
                    console.log(">>>>>>>>>>>>>>>>>>>>>>.Object" , JSON.stringify((obj)))
                    console.log(">>>>>>>>>>>.Invnetory lacation table entry done" ,JSON.stringify(obj) )
                    if(!(tinventory.Tinventory)){
                        return cb(null, {errors: err});
                    }
                    else{
                        console.log(">>>>>>>>>>>.Invnetory lacation table entry done");
                        inventoryData.upsert({

                            "id": tinventory.Tinventory.id,
                            "piLotId": tinventory.Tinventory.piLotId,
                            "inventoryLocationId": obj.id,
                            "noOfBags": tinventory.Tinventory.noOfBags,
                            "weight": tinventory.Tinventory.weight,
                            "createdOn": "2016-10-03",
                            "createdBy": 1,
                            "modifiedOn": "2016-10-03",
                            "modifiedBy": 1,
                            "active": 1

                        },function(err , lotsObj){
                            if (err) {
                               // logger.error(err);
                                return cb(null, {errors: err});
                            }
                        });
                    }

                    cb(null,obj);
                }
            })

    };





    Tinventorylocation.remoteMethod('addbagweight', {
        description: 'create addbagweight Entry for Material.',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
        returns: {arg: 'Result', type: 'object', root: true},
        http: {path:'/addbagweight', verb: 'post'}
    });



    Tinventorylocation.remoteMethod('updatebagweight', {
        description: 'update bagweight Entry for Material.',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
        returns: {arg: 'Result', type: 'object', root: true},
        http: {path:'/updatebagweight', verb: 'post'}
    });



};
