'use strict';
var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
module.exports = function(Tpackaginginstructionlots) {


    Tpackaginginstructionlots.getMaxQueue = function(cb) {

        var ds = Tpackaginginstructionlots.dataSource;
        var sql ="SELECT  MAX(queue_sequence) as max_mark FROM t_packaging_instruction_lots"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tpackaginginstructionlots.getrailCarList = function(cb) {

        var ds = Tpackaginginstructionlots.dataSource;
        var sql ="SELECT railcar_number as railcarList FROM t_packaging_instruction_lots"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };



    Tpackaginginstructionlots.getLotList = function(cb) {

        var ds = Tpackaginginstructionlots.dataSource;
        var sql ="SELECT  lot_number as lotNumber FROM t_packaging_instruction_lots"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };


    Tpackaginginstructionlots.remoteMethod('getMaxQueue', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getMaxQueue", verb: 'get'}
    });


    Tpackaginginstructionlots.remoteMethod('getrailCarList', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getrailCarList", verb: 'get'}
    });

    Tpackaginginstructionlots.remoteMethod('getLotList', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getLotList", verb: 'get'}
    });
};
