'use strict';

module.exports = function(TpiInventory) {

  TpiInventory.AddInventory = function(id,cb){
    var ds = TpiInventory.dataSource;
    var sql ="CREATE TEMPORARY TABLE temp1 as Select * from t_pi_inventory where id ="+id.id
    sql = sql+";update temp1 set id=0,active=0,logs=1;"
    sql = sql+"insert into t_pi_inventory select * from temp1;drop table temp1;"
    console.log(sql)
    ds.connector.query(sql, function (err, result) {
        if (err) {
            logger.error(err)
            return cb(err);
        }
        cb(null, result);
    });
  }
  TpiInventory.SubtractInventory = function(id,cb){
    var ds = TpiInventory.dataSource;
    var sql ="CREATE TEMPORARY TABLE temp1 as Select * from t_pi_inventory where id ="+id.id
    sql = sql+";update temp1 set id=0,active=0,logs=1;"+"update temp1 set no_of_bags = 0-no_of_bags;"
    sql = sql+"insert into t_pi_inventory select * from temp1;drop table temp1;"
    console.log(sql)
    ds.connector.query(sql, function (err, result) {
        if (err) {
            logger.error(err)
            return cb(err);
        }
        cb(null, result);
    });
  }

  TpiInventory.remoteMethod('AddInventory', {
      description: 'Credit Inventory',
      accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
      returns: { type: 'object',root: true},
      http: {path:"/AddInventory", verb: 'post'}
  });

  TpiInventory.remoteMethod('SubtractInventory', {
      description: 'Credit Inventory',
      accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
      returns: { type: 'object',root: true},
      http: {path:"/SubtractInventory", verb: 'post'}
  });

};
