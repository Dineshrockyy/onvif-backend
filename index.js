const express = require('express');
const cors = require('cors');
const onvif = require('onvif');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/discover', (req, res) => {
    const devices = [];
    onvif.Discovery.on('device', function (cam) {
        share(cam)
        // console.log(cam);
        // cam.connect();

    })
    // Must have an error handler to catch bad replies from the network
    onvif.Discovery.on('error', function (err, xml) {
        // function called as soon as NVT responds, but this library could not parse the response
        console.log('Discovery error ' + err);
    });
    onvif.Discovery.probe();

    function share(ip) {
        new onvif.Cam({
            hostname: ip.hostname,
            username: 'admin',
            password: 'Sieora123'
        }, function (err) {
            try {
                this.getStreamUri({ protocol: 'RTSP' }, function (err, stream) {
                    devices.push(stream)
                    res.json(devices)
                    console.log(stream);
                });
            } catch {
                console.log(ip.hostname);
            }
        });
    }
    res.json(devices)

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

