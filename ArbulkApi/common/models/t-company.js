'use strict';

module.exports = function(Tcompany) {
    Tcompany.getCustomers = function (cb) {
        var ds = Tcompany.dataSource;
        var sql ="select count(aT.customer_id) as mostActive, bT.*, customer_id from  t_packaging_instructions as aT inner join t_company as bT on bT.id = aT.customer_id group by aT.customer_id order by mostActive desc"
        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });

    }
    Tcompany.remoteMethod('getCustomers', {
        description: 'get all customers',
        returns: { type: 'object',root: true},
        http: {path:"/getCustomers", verb: 'get'}
    });
};
