const DAY = require('../model/day.model');

class DAYController {
    show(req, res, next) {
        DAY.find({})
            .then(data => {
                data = data.map(dt => dt ? dt.toObject() : dt);
                res.json(data);
            })
    }
}

module.exports = new DAYController;
