module.exports = (app) => {
    require('./dbconnect')();
    require('./routes')(app);
    require('./server')(app);
}