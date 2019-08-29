const mongoose = require('Mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Mongodb Connected : )')
        mongoose.connection.on('error', (err) => {
            console.log(`mongoose connection: ${err}`)
        })
        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected to MongoDB')
        })
    })
    .catch((err) => {
        console.log(`rejected promise ${err}`)
        mongoose.disconnect()
    })
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongodb: bye : )')
        process.exit(0)
    })
})
    
    return mongoose
}
