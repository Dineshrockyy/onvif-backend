const express = require('express');
const cors = require('cors');
const Stream = require("node-rtsp-stream")
const app = express();
const PORT = 5000;
let stream = null

app.use(cors());
app.use(express.json());

// app.post("/stream", (req, res) => {
//     const newRtspStreamUrl = req.body.rtsp
//     let currentRtspStreamUrl = ""
//     console.log(newRtspStreamUrl);

//     // Create the WebSocket stream only if it doesn't exist or the RTSP URL has changed
//     if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
//         if (stream || newRtspStreamUrl === "stop") {
//             stream.stop()
//         }

//         stream = new Stream({
//             name: 'Camera Stream',
//             streamUrl: newRtspStreamUrl,
//             wsPort: 9999,
//             ffmpegOptions: { // options ffmpeg flags
//                 '-stats': '', // an option with no neccessary value uses a blank string
//                 '-r': 30 // options with required values specify the value after the key
//             }
//         })
//         currentRtspStreamUrl = newRtspStreamUrl
//     }

//     res.send(200).json({ url: `ws://127.0.0.1:9999` })
// })

app.post("/stream", (req, res) => {
    stream = new Stream({
        name: 'name',
        streamUrl: 'rtsp://aitest:Ac72!k34j2r1@184.69.129.222:8012/streaming/channels/1002',
        wsPort: 9999,
        ffmpegOptions: { // options ffmpeg flags
            '-stats': '', // an option with no neccessary value uses a blank string
            '-r': 30 // options with required values specify the value after the key
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

