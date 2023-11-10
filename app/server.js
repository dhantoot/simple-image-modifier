module.exports = (app) => {
    const {SERVER_PORT} = process.env;
    app.listen(SERVER_PORT, () => {
        console.log(`Server Started at ${SERVER_PORT}`)
    })
}