'use strict';

module.exports = function(Tcompany) {

    Tcompany.getCustomers = function (id, cb) {
        var sql ="select count(aT.customer_id) as mostActive, bT.*, customer_id from  t_packaging_instructions as aT inner join t_company as bT on bT.id = aT.customer_id group by aT.customer_id having bT.type='CUSTOMER' order by bT.name"
        var ds = Tcompany.dataSource;
        sql =  (id!==undefined)? sql+" limit "+ id : sql
 console.log(sql)
        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            cb(null, result);
        });
        //cb(null, null);

    }
    Tcompany.remoteMethod('getCustomers', {
        description: 'get all customers',
        accepts: {"arg": "id","type": "string","http": {"source": "query"}},
        returns: { type: 'object', root: true},
        http: {path:"/getCustomers/", verb: 'get'}
    });
};
