const DEVICE = require('../model/device.model');

class DeviceController {
    show(req, res, next) {
        DEVICE.findOne({}, {}, { sort: { _id: -1 } }, function (err, data) {
                res.json(data.data);
        });
    }

    save(req, res, next) {
        const devices = req.query.d;

        let arrData = [];
        for (var i = 1; i <= devices; i++) {
            arrData.push({
                id: (12 + Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4),
                title: 'ppm',
                lat: (21 + Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(3),
                lng: (105 + Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(3),
            });
        }

        var device = new DEVICE({
            data: JSON.stringify(arrData)
        });

        device.save()
            .then(() => res.json('success'))
            .catch(() => false);

        res.send('success');
    }
}

module.exports = new DeviceController;
