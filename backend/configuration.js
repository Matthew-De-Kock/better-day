// var connectionStringStandard = "mongodb://betterday:M%40CAutomation1@192.168.2.251:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// var connectionStringMongoose = "mongodb://betterday:M%40CAutomation1@192.168.2.251:27017/Betterday?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

var connectionStringStandard = "mongodb://localhost:27017/";
var connectionStringMongoose = "mongodb://localhost:27017/Betterday";



module.exports= {
    connectionStringMongoose,
    connectionStringStandard
};