var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
var dsConfig = require('../../server/datasources.json');
//var logger  = require('../../server/logger.js')

module.exports = function(Tpackaginginstructions) {
    Tpackaginginstructions.beforeRemote( "*", function( ctx, modelInstance, next) {
        //logger.debug('Start execution of method  ' + ctx.methodString);
        //logger.debug("Http Verb: '" + ctx.domain.members[0].method + "' OriginalUrl:" + ctx.domain.members[0].originalUrl );
        //logger.info( ctx.methodString + ' was invoked remotely');
        next();
    });

    // remote method after hook
    Tpackaginginstructions.afterRemote('*', function(ctx, remoteMethodOutput, next) {
        //logger.debug('End execution of method  ' +ctx.methodString);
        next();
    });
    Tpackaginginstructions.afterRemoteError('**', function(ctx, next) {
        //logger.error('Received error in method  ' +ctx.methodString + " ERROR:"+ ctx.error );
        next();
    });

    Tpackaginginstructions.observe('before save', function updateTimestamp(ctx, next) {
        console.log('ctxctxctx>>' ,  ctx.instance);

        //var context = loopback.getCurrentContext();
        //var currentUser = context && context.get('currentUser');
        //
        //if (ctx.instance) {
        //
        //    if(ctx.isNewInstance !== undefined && ctx.isNewInstance==true) {
        //
        //        ctx.instance.Active = true;
        //        ctx.instance.CreatedBy = currentUser.email;
        //        ctx.instance.CreatedOn = new Date();
        //    } else {
        //        ctx.instance.ModifiedBy = currentUser.email;
        //        ctx.instance.ModifiedOn = new Date();
        //    }
        //
        //} else {
        //    if(ctx.isNewInstance !== undefined && ctx.isNewInstance==true) {
        //        ctx.data.Active = true;
        //        ctx.data.CreatedBy = currentUser.email;
        //        ctx.data.CreatedOn = new Date();
        //    } else {
        //        ctx.data.ModifiedBy = currentUser.email;
        //        ctx.data.ModifiedOn = new Date();
        //    }
        //}
        next();
    });
    Tpackaginginstructions.observe('after save', function(ctx, next) {
       console.log("After Save" , ctx.instance)
        next();
        return;
    });

    Tpackaginginstructions.createPiEntry = function(tpackaging, cb) {
        var context = loopback.getCurrentContext();
        var currentUser = context && context.get('currentUser');
        var PackagingLots = Tpackaginginstructions.app.models.TPackagingInstructionLots;
       console.log(tpackaging , '>>>>>>');
        var ds = Tpackaginginstructions.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;

        console.log("tapackaging lots entry array check" , tpackaging  ,tpackaging.packagingLots )

        Tpackaginginstructions.create({
                customer_id: tpackaging.PI.customer_id,
                location_id:tpackaging.PI.location_id ,
                po_number :tpackaging.PI.po_number,
                material :tpackaging.PI.material,
                origin_id: tpackaging.PI.origin_id ,
                packaging_material_id : tpackaging.PI.packaging_material_id ,
                bag_id: tpackaging.bag_id ,
                pallet_type_id : tpackaging.PI.pallet_type_id ,
                number_of_bags : tpackaging.PI.number_of_bags ,
                bags_per_pallet: tpackaging.PI.bags_per_pallet ,
                wrap_type_id: tpackaging.PI.wrap_type_id ,
                custom_label: tpackaging.PI.custom_label ,
                notes: tpackaging.PI.notes ,
                packaging_status: tpackaging.PI.packaging_status ,
                stamp_confirmed: tpackaging.PI.stamp_confirmed ,
                pi_confirmations: tpackaging.PI.pi_confirmations,
                created_by: tpackaging.PI.created_by ,
                created_on: tpackaging.PI.created_on ,
                modified_by: 1 ,
                modified_on: tpackaging.PI.created_on ,
                active: tpackaging.PI.active
            },
            function (err, obj) {
                if (err) {
                    //logger.error(err);
                    console.log(err)
                    return cb(null, {errors: err});
                }
                if(obj!= null && !(obj=== undefined) && obj.customer_id!= null &&!(obj.customer_id === undefined)){
                    //logger.debug("New PI Entry is created =" + obj.customer_id + JSON.stringify(obj));
                    console.log("New PI Entry is created =" + obj.customer_id + JSON.stringify(obj));
                    if(tpackaging.packagingLots.length == 0){
                        return cb(null, {errors: err});
                    }
                    else if(tpackaging.packagingLots.length ==1){

                        console.log("Start>>>>" , JSON.stringify(tpackaging.packagingLots[0].railcar_number) , ">>>>>>>>>>>>>>>Tpackaging dtaaAniuragagaga Top")

                        PackagingLots.create({
                            id : 0,
                            pi_id : obj.id,
                            railcar_number : tpackaging.packagingLots[0].railcar_number,
                            lot_number : tpackaging.packagingLots[0].lot_number,
                            weight : tpackaging.packagingLots[0].weight,
                            bags_to_ship: 0,
                            status: "UNCONFIRMED",
                            stamp_confirmed: 0,
                            railcar_arrived_on: null,
                                railcar_departed_on: null,
                                queue_sequence: 1,
                                createdBy: 1,
                                createdOn:  tpackaging.PI.created_on ,
                                modifiedBy: 1,
                                modifedOn:  tpackaging.PI.created_on ,
                                active: 1,
                                arrived: 0,
                                railcar_status : 'INTRANSIT'
                        },function(err , lotsObj){
                            if (err) {
                               // logger.error(err);
                                console.log(err)
                                return cb(null, {errors: err});
                            }
                        });
                    }
                    else if(tpackaging.packagingLots.length >1){
                        console.log("code in else condition>>>>>>>>>>>>>>>" , tpackaging.packagingLots.length)

                        for(var i in tpackaging.packagingLots) {



                            PackagingLots.create({
                                id : 0,
                                pi_id: obj.id,
                                railcar_number: tpackaging.packagingLots[i].railcar_number,
                                lot_number: tpackaging.packagingLots[i].lot_number,
                                weight: tpackaging.packagingLots[i].weight,
                                bags_to_ship: "0",
                                status: "UNCONFIRMED",
                                stamp_confirmed: 0,
                                railcar_arrived_on: null,
                                railcar_departed_on: null,
                                queue_sequence: 1,
                                createdBy: 1,
                                createdOn:  tpackaging.PI.created_on ,
                                modifiedBy: 1,
                                modifedOn:  tpackaging.PI.created_on ,
                                active: 1,
                                arrived: 0,
                                railcar_status : 'INTRANSIT'

                            }, function (err, lotsObj) {
                                if (err) {
                                    //logger.error(err);
                                    console.log(err)
                                    return cb(null, {errors: err});
                                }
                            })
                        }
                    }

                    cb(null,obj);
                }
            })

       };


    Tpackaginginstructions.updatePIEntry = function(tpackaging, cb) {
        var context = loopback.getCurrentContext();
        var currentUser = context && context.get('currentUser');
        var PackagingLots = Tpackaginginstructions.app.models.TPackagingInstructionLots;
        console.log(tpackaging , '>>>>>>');
        var ds = Tpackaginginstructions.dataSource;
        var customErr = new Error();
        customErr.statusCode = 422;
        customErr.message=null;
        console.log('>>>>UpdatePI Entry>>>>>>' ,tpackaging )
                                         var today = new Date();
	                                     var dd = today.getDate();
	                                    var mm = today.getMonth()+1;
	                                 var yyyy = today.getFullYear();
	                                if(dd<10){
		                           dd = '0'+dd
	                              } 
	                    if(mm<10){
	                 	mm = '0'+mm
	                   }
	                 today = mm+'/'+dd+'/'+yyyy
           Tpackaginginstructions.upsert({
                id : tpackaging.id ,
                customer_id: tpackaging.customer_id,
                location_id:tpackaging.location_id ,
                po_number :tpackaging.po_number,
                material :tpackaging.material,
                origin_id: tpackaging.origin_id ,
                packaging_material_id : tpackaging.packaging_material_id ,
                bag_id: tpackaging.bag_id ,
                pallet_type_id : tpackaging.pallet_type_id ,
                number_of_bags : tpackaging.number_of_bags ,
                bags_per_pallet: tpackaging.bags_per_pallet ,
                wrap_type_id: tpackaging.wrap_type_id ,
                custom_label: tpackaging.custom_label ,
                notes: tpackaging.notes ,
                packaging_status: tpackaging.packaging_status ,
                stamp_confirmed: 0 ,
                pi_confirmations: tpackaging.pi_confirmations,
                created_by: 12 ,
                created_on: today ,
                modified_by: 12 ,
                modified_on:  today  ,
                active: tpackaging.active
            },
            function (err, obj) {
                if (err) {
                   // logger.error(err);
                    return cb(null, {errors: err});
                }
                if(obj!= null && !(obj=== undefined) && obj.customer_id!= null &&!(obj.customer_id === undefined)){

                    if(tpackaging.TPackagingInstructionLots.length == 0){

                        return cb(null, {errors: err});
                    }
                    else if(tpackaging.TPackagingInstructionLots.length ==1){
                                           var today = new Date();
	                                     var dd = today.getDate();
	                                    var mm = today.getMonth()+1;
	                                 var yyyy = today.getFullYear();
	                                if(dd<10){
		                           dd = '0'+dd
	                              } 
	                    if(mm<10){
	                 	mm = '0'+mm
	                   }
	                 today = mm+'/'+dd+'/'+yyyy
                        console.log("Start>>>>" , JSON.stringify(tpackaging.TPackagingInstructionLots[0].railcar_number) , ">>>>>>>>>>>>>>>Tpackaging dtaaAniuragagaga Top")

                        PackagingLots.upsert({
                            id: tpackaging.TPackagingInstructionLots[0].id,
                            pi_id: obj.id,
                            railcar_number:  tpackaging.TPackagingInstructionLots[0].railcar_number,
                            lot_number: tpackaging.TPackagingInstructionLots[0].lot_number,
                            weight: tpackaging.TPackagingInstructionLots[0].weight,
                            bags_to_ship: 0,
                            status: "UNCONFIRMED",
                            stamp_confirmed: 0,
                            railcar_arrived_on: null,
                                railcar_departed_on: null,
                                queue_sequence: 1,
                                createdBy: 1,
                                createdOn: today,
                                modifiedBy: 1,
                                modifedOn: today,
                                active: 1,
                            arrived: 0,
                            railcar_status : tpackaging.TPackagingInstructionLots[0].railcar_status

                        },function(err , lotsObj){
                            if (err) {
                                //logger.error(err);
                                return cb(null, {errors: err});
                            }
                        });
                    }
                    else if(tpackaging.TPackagingInstructionLots.length >1){
    
                        console.log("started updating packahing instruction lots table")
                        for(var i in tpackaging.TPackagingInstructionLots) {
                            PackagingLots.upsert({
                                id : tpackaging.TPackagingInstructionLots[i].id,
                                pi_id: obj.id,
                                railcar_number: tpackaging.TPackagingInstructionLots[i].railcar_number,
                                lot_number: tpackaging.TPackagingInstructionLots[i].lot_number,
                                weight: tpackaging.TPackagingInstructionLots[i].weight,
                                bags_to_ship: 0,
                            status: "UNCONFIRMED",
                            stamp_confirmed: 1,
                            railcar_arrived_on: null,
                                railcar_departed_on: null,
                                queue_sequence: 1,
                                createdBy: 1,
                                createdOn: today,
                                modifiedBy: 1,
                                modifedOn: today,
                                active: 1,
                                arrived: 0,
                                railcar_status : tpackaging.TPackagingInstructionLots[i].railcar_status

                            }, function (err, lotsObj) {
                                if (err) {
                                    console.log(err);
                                    return cb(null, {errors: err});
                                }
                            })
                        }
                    }

                    cb(null,obj);
                }
            })

    };


    Tpackaginginstructions.getPoList = function(cb) {

        var ds = Tpackaginginstructions.dataSource;
        var sql ="SELECT po_number as poNumber FROM t_packaging_instructions";

        ds.connector.query(sql, function (err, result) {
            if (err) {
                //logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tpackaginginstructions.getPoListID2 = function(cb) {

        var ds = Tpackaginginstructions.dataSource;
        var sql ="SELECT po_number as poNumber FROM t_packaging_instructions where customer_id =2";

        ds.connector.query(sql, function (err, result) {
            if (err) {
                //logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tpackaginginstructions.getPoListID1 = function(cb) {

        var ds = Tpackaginginstructions.dataSource;
        var sql ="SELECT po_number as poNumber FROM t_packaging_instructions where customer_id =1";

        ds.connector.query(sql, function (err, result) {
            if (err) {
                //logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tpackaginginstructions.remoteMethod('getPoListID1', {
        description: 'get getPoListID',
        returns: { type: 'object',root: true},
        http: {path:"/getPoListID1", verb: 'get'}
    });

    Tpackaginginstructions.remoteMethod('getPoListID2', {
        description: 'get getPoListID',
        returns: { type: 'object',root: true},
        http: {path:"/getPoListID2", verb: 'get'}
    });

    Tpackaginginstructions.remoteMethod('getPoList', {
        description: 'get getPoList',
        returns: { type: 'object',root: true},
        http: {path:"/getPoList", verb: 'get'}
    });



    Tpackaginginstructions.remoteMethod('createPiEntry', {
        description: 'create PackagingInstruction Entry for Material.',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
        returns: {arg: 'Result', type: 'object', root: true},
        http: {path:'/createPiEntry', verb: 'post'}
    });
    Tpackaginginstructions.remoteMethod('updatePIEntry', {
        description: 'update PackagingInstruction Entry for Material.',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
        returns: {arg: 'Result', type: 'object', root: true},
        http: {path:'/updatePIEntry', verb: 'post'}
    });



};
