module.exports = () => {
    const mongoose = require("mongoose");
    const { DB_NAME, DB_HOST, DB_CON_STRING } = process.env;
    const url = `${DB_CON_STRING}/${DB_NAME}`;
    // const url = `mongodb://${DB_HOST}/${DB_NAME}`;
 
    try {
      mongoose.connect(url);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }

    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
 
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });

    return;
}