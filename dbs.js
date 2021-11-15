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
            connection.query('INSERT INTO preferences (userid, preftemp) VALUES ('+userid+', '+temp+') ON DUPLICATE KEY update preftemp = '+temp+'', function(err){
                if(err) return callback(err)
            })
        }catch(err){
            return callback(null, err)
        }

},

    getTemp: function (userid, callback){
        try{
            connection.query('select preftemp from preferences where userid like '+userid+'', function (err, rows) {
                if (err) return callback(null, err)
                if (rows.length < 1) return callback(null, "userid not found")

                var result = rows[0]

                return callback(result, null)
            })
        }catch(err){
            return callback(null, err)
        }
    }
}
