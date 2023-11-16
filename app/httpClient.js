const axios = require("axios");

class Client {
    constructor (type, options) {
        this.type = type;
        this.options = options;
        console.log('Http Client is ready..')
    }

    post () {
        console.log('POST Request Called..')
        axios.post(this.options.url, this.options.data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    get () {
        console.log('GET Request Called..')
    }
}

module.exports = Client;