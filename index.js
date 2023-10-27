var onvif = require('onvif');
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
                console.log(stream);
            });
        } catch {
            console.log(ip.hostname);
        }
    });
}

// var
//     http = require('http'),
//     Cam = require('onvif').Cam;

// new Cam({
//     hostname: '192.168.1.62',
//     username: 'admin',
//     password: 'Sieora123'
// }, function (err) {
//     this.getStreamUri({ protocol: 'RTSP' }, function (err, stream) {
//         console.log(stream);
//     });
// });

// setInterval(function () {
//     var onvif = require('node-onvif');
//     onvif.startDiscovery(function (info) {
//         console.log(info);
//         setTimeout(function () {
//             console.log('stop');
//             onvif.stopDiscovery();
//         }, 3000);
//     });
// }, 5000)
