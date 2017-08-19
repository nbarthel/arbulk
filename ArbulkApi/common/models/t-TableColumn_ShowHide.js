/**
 * Created by ankit on 16/8/17.
 */
module.exports = function(TColumnShowHide) {
    TColumnShowHide.remoteMethod('getAllVisibleColumnName',{
        description: 'Get all visible Column Names',
        accepts: [
                    { arg: 'name', type: 'string'},
                    { arg: 'userId', type: 'number'}
                 ] ,
        returns: { type: 'object',root: true},
        http: {path:"/getAllVisibleColumnName", verb: 'get'}
    });
    TColumnShowHide.remoteMethod('getAllColumns',{
        description: 'Get all Column that are not visible',
        accepts: { arg: 'name', type: 'string'} ,
        returns: { type: 'object',root: true},
        http: {path:"/getAllColumns", verb: 'get'}
    });
    TColumnShowHide.remoteMethod('updateColumns',{
        description: 'update columns to show them',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' }} ,
        returns: {arg: 'Result', type: 'object', root: true},
        http: {path:"/updateColumns", verb: 'post'}
    });
    TColumnShowHide.getAllVisibleColumnName = function(name,userId,cb){
        var ds = TColumnShowHide.dataSource;
        var sql ="select distinct columnName from t_TableColumn_ShowHide where `tableName` = '" + name +"' and `show` = 1 and userId =" + userId
        console.log(sql)
        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            console.log(result)
            cb(null, result);
        });
    }
    TColumnShowHide.getAllColumns = function(name,cb){
        debugger
        var ds = TColumnShowHide.dataSource;
        var sql ="select distinct columnName from t_TableColumn_ShowHide where tableName = '" + name +"'"
        console.log(sql);
        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            console.log(result)
            cb(null, result);
        });
    }
    TColumnShowHide.updateColumns = function(data,cb){
        var ds = TColumnShowHide.dataSource;
        var sql ="update t_TableColumn_ShowHide set `show` = 0 where tableName = '"+data.name+"' And userId = "+data.userId+";";
        sql = sql + "update t_TableColumn_ShowHide set `show` = 1 where tableName = '"+data.name+"' And userId = "+data.userId +" And columnName in(";
        for(var i=0;i<data.columns.length;i++){
            sql = sql + "'" +data.columns[i].columnName +"',";
        }
        sql = sql.substring(0,sql.length-1);
        sql = sql + ");"
        console.log(sql);
        ds.connector.query(sql, function (err, result) {
            if (err) {
                logger.error(err)
                return cb(err);
            }
            console.log(result)
            cb(null, result);
        });
    }
};