module.exports = (app) => {
    app.get("/", async (request, response) => {
        try {
            response.status(200).send('Server is up !');
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/api/status", async (request, response) => {
        try {
            require('child_process')
            .exec('npm ls --json', (err, stdout, stderr) => {
                if (err) {console.log(err)}
                else {
                    let formattedResp = JSON.stringify({
                        msg: 'Server is up',
                        packages: JSON.parse(stdout)
                    }, undefined, 2);

                    response.format({
                        "text/html": () => response.status(200).send("<pre>"+formattedResp+"</pre>")
                    });
        
                }
            });
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get('/api/process-image', async (req, res) => {
        const RequestInfoModel = require('./models')
        const fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        const info = {
            requestUrl: fullUrl,
            timestamp: new Date().valueOf()
        }
        console.log('info', info)
        
        const sharp = require('sharp');
        const axios = require('axios');
        
        const imgPath = req.query.imgurl;

        // gets the image from url as an arraybuffer
        const response = await axios.get(imgPath, {
            responseType: "arraybuffer",
        });

        // converts the arraybuffer to base64
        const buffer = await Buffer.from(response.data, "base64");
        console.log('buffer length from axios:', buffer?.length)

        // convert the buffer to file and save somewhere
        await sharp(buffer)
            .toFile(`${global.rootdir}/public/processed/output.jpg`)
        
        // pull back the file and processed the image
        const buffered = await sharp(`${global.rootdir}/public/processed/output.jpg`)
            .resize(200, 200)
            .greyscale()
            .toBuffer()

        // Saving information to Database
        const requestInfo = new RequestInfoModel(info);
        try {
            const resp = await requestInfo.save();
            console.log({resp})
            if (resp._id) {
                console.log('Successfully saved');

                // Calling external service to process heavy jobs after saving info to DB
                // const Client = require('./httpClient');
                // const options = {
                //     method: 'post',
                //     url: 'http://localhost:4000/api/run-jobs',
                //     data: {
                //       firstName: 'Fred',
                //       lastName: 'Flintstone'
                //     }
                // }
                // const httpClient = new Client('POST', options);
                // httpClient.post();
            } else {
                console.log('Information not saved')
            }
        } catch (error) {
            console.log({error})
        }
        
        res.set({'Content-Type': 'image/jpg'});
        res.status(200).send(buffered);

    });
}