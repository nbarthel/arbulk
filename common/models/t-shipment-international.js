'use strict';
var loopback = require('loopback');
var dateFormat = require('dateformat');
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var modelBuilder = new ModelBuilder();

module.exports = function(Tshipmentinternational) {

  Tshipmentinternational.DeleteTemp = function(id,cb) {

      var ds = Tshipmentinternational.dataSource;
      var sql ="update t_shipment_international set active = 0 where id="+id.id

      ds.connector.query(sql, function (err, result) {
          if (err) {
              logger.error(err)
              return cb(err);
          }
          cb(null, result);
      });

  };

  Tshipmentinternational.remoteMethod('DeleteTemp', {
      description: 'mark an id InActive',
      accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
      returns: { type: 'object',root: true},
      http: {path:"/DeleteTemp", verb: 'post'}
  });
};
