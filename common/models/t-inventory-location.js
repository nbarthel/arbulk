'use strict';
var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
var dsConfig = require('../../server/datasources.json');

module.exports = function(Tinventorylocation) {
	
  
    Tinventorylocation.addbagweight = function(tinventory, cb) {
      var d = new Date();
	  var date_with_time =     d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDate()+" "
                              +d.getHours()+":"
                              +d.getMinutes()+":"+d.getSeconds()
      	console.log("Here is the date",date_with_time)
        var inventoryData = Tinventorylocation.app.models.TPiInventory;
      	var InventoryHistoryLog = Tinventorylocation.app.models.TPiInventoryHistory;
        console.log(tinventory , '>>>>>>');
        var ds = Tinventorylocation.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;
        console.log(">>>>>>>>>>>>>>>>>>tinventory" ,tinventory)
        //var tinventory1 = JSON.stringify(tinventory)
        //var Tinvet = JSON.parse(tinventory1)
        //console.log("stringify converted object>>>" ,Tinvet.postArray[0].Tpinventory )
        //
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
                                "notes" : tinventory.Tinventory.notes,
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
                          InventoryHistoryLog.create({
                        "id": 0,
                        "piLotId": tinventory.Tinventory.piLotId,
                        "inventoryLocationId": obj.id,
                        "noOfBags": tinventory.Tinventory.noOfBags,
                        "notes" : tinventory.Tinventory.notes,
                        "weight": tinventory.Tinventory.weight,
                        "createdOn": date_with_time,
                        "modifiedOn": date_with_time,
                        "createdBy": 1,
                        "modifiedBy": 1,
                        "active": 1

                    },function(err , lotsObj){
                        if (err) {
                            // logger.error(err);
                            return cb(null, {errors: err});
                        }
                        else{
                            console.log("history Object" , lotsObj)
                        }
                    });
                        }

                        cb(null,obj);
                    }
                })



    };


    Tinventorylocation.deleteLocation = function(tinventory, cb) {
        var d = new Date();
	  	var date_with_time =     d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDate()+" "
                              +d.getHours()+":"
                              +d.getMinutes()+":"+d.getSeconds()
      	console.log("Here is the date",date_with_time)
        var inventoryData = Tinventorylocation.app.models.TPiInventory;
      	var InventoryHistoryLog = Tinventorylocation.app.models.TPiInventoryHistory;
        var ds = Tinventorylocation.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;
        console.log(">>>>>>>>>>>>>>>>>>tinventory" ,tinventory)

        inventoryData.deleteById({

                "id": tinventory.Tinventory
                         },
            function (err, obj) {
                if (err) {
                    //logger.error("errooorrrrr" , JSON.stringify(obj));
                    console.log(">>>.errors" , err)
                    return cb(null, {errors: err});

                }
                if(obj!= null && obj!= undefined){
                     if(!(tinventory.Tinventory)){
                        return cb(null, {errors: err});
                    }
                    else{

                         Tinventorylocation.deleteById({

                            "id": tinventory.Tpinventory

                        },function(err , lotsObj){
                            if (err) {
                                // logger.error(err);
                                return cb(null, {errors: err});
                            }
                            else{
                                console.log("lots Object" , lotsObj)
                            }
                        });
                      InventoryHistoryLog.create({

                        "id": 0,
                        "piLotId": tinventory.Tinventory.piLotId,
                        "inventoryLocationId": obj.id,
                        "noOfBags": tinventory.Tinventory.noOfBags,
                        "notes" : tinventory.Tinventory.notes,
                        "weight": tinventory.Tinventory.weight,
                         "createdOn": date_with_time,
                        "modifiedOn": date_with_time,
                        "createdBy": 1,
                        "modifiedBy": 1,
                        "active": 1

                    },function(err , lotsObj){
                        if (err) {
                            // logger.error(err);
                            return cb(null, {errors: err});
                        }
                        else{
                            console.log("history Object" , lotsObj)
                        }
                    });
                    }

                    cb(null,obj);
                }
            })



    };







    Tinventorylocation.updatebagweight = function(tinventory, cb) {
        var d = new Date();
        var date_with_time =     d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDate()+" "
                              +d.getHours()+":"
                              +d.getMinutes()+":"+d.getSeconds()
      	console.log("Here is the date",date_with_time)
        var inventoryData = Tinventorylocation.app.models.TPiInventory;
      	var InventoryHistoryLog = Tinventorylocation.app.models.TPiInventoryHistory;
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
                            "notes" : tinventory.Tinventory.notes,
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
                      InventoryHistoryLog.create({

                        "id": 0,
                        "piLotId": tinventory.Tinventory.piLotId,
                        "inventoryLocationId": obj.id,
                        "noOfBags": tinventory.Tinventory.noOfBags,
                        "notes" : tinventory.Tinventory.notes,
                        "weight": tinventory.Tinventory.weight,
                         "createdOn": date_with_time,
                        "modifiedOn": date_with_time,
                        "createdBy": 1,
                        "modifiedBy": 1,
                        "active": 1

                    },function(err , lotsObj){
                        if (err) {
                            // logger.error(err);
                            return cb(null, {errors: err});
                        }
                        else{
                            console.log("history Object" , lotsObj)
                        }
                    });
                    }

                    cb(null,obj);
                }
            })

    };

      Tinventorylocation.remoteMethod('deleteLocation', {
        description: 'create deleteLocation Entry for Material.',
        returns: {arg: 'Result', type: 'object'},
        http: {path:'/deleteLocation', verb: 'post'}
    });


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