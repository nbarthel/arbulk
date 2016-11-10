'use strict';

module.exports = function(Tshipmentlots) {


    Tshipmentlots.getMaxQueue = function(cb) {

        var ds = Tshipmentlots.dataSource;
        var sql ="SELECT  MAX(queue_sequence) as max_mark FROM t_shipment_lots"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tshipmentlots.remoteMethod('getMaxQueue', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getMaxQueue", verb: 'get'}
    });

};
