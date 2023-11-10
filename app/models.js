const mongoose = require('mongoose');
mongoose.pluralize(null);
// Define schema
const Schema = mongoose.Schema;

const RequesInfoModelSchema = new Schema({
    requestUrl: String,
    timestamp: String,
});

// Compile model from schema
module.exports = mongoose.model("RequesInfo", RequesInfoModelSchema);