module.exports = app => {
    const mongoose = app.datasource.mongodb
    const messagesSchema = require('../schemas/messages')(app)
    return mongoose.model('Messages',messagesSchema,'messages')
}