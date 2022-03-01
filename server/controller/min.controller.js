const MIN = require('../model/min.model');

class MINController {
    show(req, res, next) {
        MIN.find({})
            .then(data => {
                data = data.map(dt => dt ? dt.toObject() : dt);
                res.json(data);
            })
    }
}

module.exports = new MINController;
