const profile = require("../controllers/profile.controller");
module.exports = app => {
    const profile = require('../controllers/profile.controller');

    var router = require("express").Router();

    router.get("/:userid/favorites/temp/", profile.GetTemp);
    router.post("/:userid/favorites/temp/:temp", profile.SetTemp);

    app.use('/api', router);
};