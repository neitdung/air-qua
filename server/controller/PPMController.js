const PPM = require('../model/ppm.model');

class PPMController {
    saveData(data) {
        const ppm = new PPM(data);
        ppm.save()
            .then(() => true)
            .catch(() => false);
    }

    show(req, res, next) {
        PPM.find({})
            .then(data => {
                data = data.map(dt => dt ? dt.toObject() : dt);
                res.json(data);
            })
    }
}

module.exports = new PPMController;
