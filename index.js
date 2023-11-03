const express = require('express');
const cors = require('cors');
const onvif = require('onvif');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/discover', (req, res) => {
    let address = req.body.ips
    const devices = [];
    let count = 0
    address.map((val) => {
        new onvif.Cam({
            hostname: val,
            username: req.body.username,
            password: req.body.password
        }, function (err) {
            try {
                this.getStreamUri({ protocol: 'RTSP' }, function (err, stream) {
                    count = count + 1
                    devices.push(stream)
                    console.log(stream);
                    if (address.length === count) {
                        res.json(devices)
                    }
                });

                // this.getDeviceInformation(function (err, info, xml) {
                //     console.log(info);
                // })
            } catch {
                count = count + 1
                console.log('error',val);
                if (address.length === count) {
                    res.json(devices)
                }
            }
        });
    })

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

