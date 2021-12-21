const mdl = require("../models");
const pref = mdl.preferences


exports.GetTemp = (req, res) => {
    pref.findByPk(req.params.userid).then(
        data => {
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(404).send({message: `could not find userid with userid ${req.params.userid}`})
            }
        }
    )
}

exports.SetTemp = (req, res) => {
    //validate requests
    console.log(req.body);
    if (req.params.temp.length <= 0) {
        res.status(400).send({
            message: 'Content can not be empty'
        });
        return;
    }

    //create Floor
    const preference = {
        id: req.params.userid,
        preftemp: req.params.temp
    };

    if (pref.findByPk(req.params.userid).lenght > 0) {
        pref.update(
            {preftemp: req.params.temp},
            {where: {id: req.params.userid}}
        )
            .then(function(rowsUpdated) {
                res.json(rowsUpdated)
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updateting floor with id=${req.params.userid}. Error: ${err}.`
                });
            });
    }else {
        pref.create(preference)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while setting prefered temp",
                });
            });
    }
    //Save floor in the database

};