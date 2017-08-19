'use strict';

module.exports = function(Tcontainerdomestic) {



    Tcontainerdomestic.getMaxQueue = function(cb) {

        var ds = Tcontainerdomestic.dataSource;
        var sql ="SELECT  MAX(sequence) as max_mark FROM t_container_domestic"

        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    };

    Tcontainerdomestic.remoteMethod('getMaxQueue', {
        description: 'get max queue Value',
        returns: { type: 'object',root: true},
        http: {path:"/getMaxQueue", verb: 'get'}
    });


};
