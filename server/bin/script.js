/*
var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server'));
var outputPath = path.resolve(__dirname, '../../common/models');

var dataSource = app.dataSources.AccountDb;

function schemaCB(err, schema) {
    if(schema) {
        console.log("Auto discovery success: " + schema.name);
        var outputName = outputPath + '/' +schema.name + '.json';
        fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputName);
            }
        });
    }
    if(err) {
        console.error(err);
        return;
    }
    return;
};

dataSource.discoverSchema('t_address',{schema:'address'},schemaCB);*/
