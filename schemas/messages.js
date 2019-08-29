module.exports = app => {
    const mongoose = app.datasource.mongodb
    let messagesSchema = new mongoose.Schema({
        title: String,
        content: String,
        createdAt: Date,
        UpdatedAt:{
            type:Date,
            default:Date.now
        }
    })
    return messagesSchema
}