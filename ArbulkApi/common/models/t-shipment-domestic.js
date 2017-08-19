'use strict';

module.exports = function(Tshipmentdomestic) {
  Tshipmentdomestic.DeleteTemp = function(id,cb) {

      var ds = Tshipmentdomestic.dataSource;
      var sql ="update t_shipment_domestic set active = 0 where id="+id.id

      ds.connector.query(sql, function (err, result) {
          if (err) {
              logger.error(err)
              return cb(err);
          }
          cb(null, result);
      });

  };

  Tshipmentdomestic.remoteMethod('DeleteTemp', {
      description: 'mark an id InActive',
      accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
      returns: { type: 'object',root: true},
      http: {path:"/DeleteTemp", verb: 'post'}
  });
};
