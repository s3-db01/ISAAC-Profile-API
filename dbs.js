const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'pocisaac'
})
connection.connect()

module.exports = {
    setTemp: function(userid, temp, callback){
        try{
            connection.query(`INSERT INTO preferences (userid, preftemp) VALUES ("${userid}", ${temp}) ON DUPLICATE KEY update preftemp = ${temp}`, function(err){
                if(err) return callback(err.message)

                return callback(null)
            })
        }catch(err){
            return callback(err)
        }
},

    getTemp: function (userid, callback){
        try{
            connection.query(`select preftemp from preferences where userid like "${userid}"`, function (err, rows) {
                if (err) return callback(null, err.message)
                if (rows.length < 1) return callback(null, "userid not found")

                var result = rows[0]

                return callback(result, null)
            })
        }catch(err){
            return callback(null, err)
        }
    },

    // Client secret linked to developer/admin account for added security
    setKey: function(){
        try{
            var key = crypto.randomBytes(20).toString('hex');

            connection.query(`INSERT INTO accesskey (apikey) VALUES ("${key}")`, function(err){
                if(err) return callback(null, err.message)

                return callback(key, null)
            })
        }catch(err){
            return callback(null, err)
        }
    },

    checkKey: function (key, callback){
        try{
            connection.query(`select apikey from accesskey where apikey like "${key}"`, function (err, rows){
                if (err) return callback(err.message)
                if (rows.length < 1) return callback("Invalid api key")

                return callback(null)
            })
        }catch(err){
            return callback(err)
        }
    }
}
