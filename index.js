const express = require('express')
const app = express()
const port = 3000

const dbs = require('./dbs')



app.get('/:userid/favorites/temp/', (req, res) => {
    dbs.getTemp(req.params.userid, function(result, err){
        if(err) return res.status(500).json(JSON.parse('{"status": "407", "message": "' + err + '"}'))

        console.log(err)

        var response = '{\n' +
            '\t"status": "200",\n' +
            '\t"data": [{\n' +
            '\t\t"userid": "'+req.params.userid+'",\n' +
            '\t\t"preftemp": "'+result.preftemp+'"\n' +
            '\t}]\n' +
            '}'

        try{
            response = JSON.parse(response);
        }catch(err)
        {
            return res.status(500).json(JSON.parse('{"status": "500", "message": "' + err + '"}'))
        }

        return res.json(response)
    })
})

app.post('/:userid/favorites/temp/:temp', (req, res) => {
    dbs.setTemp(req.params.userid, req.params.temp, function(err){
        if (err) return res.status(500).json(JSON.parse('{"status": "500", "message": "' + err + '"}'))

        //!err
        return res.json(JSON.parse('{"status": "200", "message": "success"}'))
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})