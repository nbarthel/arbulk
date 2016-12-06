'use strict';
var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();
module.exports = function(Tcontainerinternational) {



    Tcontainerinternational.getMaxQueue = function(cb) {

        var ds = Tcontainerinternational.dataSource;
        var sql ="SELECT  MAX(sequence) as max_mark FROM t_container_international"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tcontainerinternational.remoteMethod('getMaxQueue', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getMaxQueue", verb: 'get'}
    });


};
