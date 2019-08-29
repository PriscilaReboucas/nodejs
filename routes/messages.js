module.exports = app => {
    const messagesController = require('../controllers/messages')(app)
    app.route('/messages').get(messagesController.index)
    app.get('/send',(req,res) => res.render('pages/send'))
    app.route('/api/messages').post(messagesController.create)
    app.route('/api/messages').get(messagesController.getAll)
}