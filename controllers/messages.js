module.exports = app => {
    const Messages = require('../models/messages')(app)
    return {
        index: (req, res) => {
            let query = Messages.find({})
            query.exec((err, docs) => {
                if (err) {
                    res.send(err)
                } else {
                    res.render('pages/messages', { messages: docs })
                }
            })
        },
        create: (req, res) => {
            try {
                let message = new Messages(req.body)
                message.save((err, r) => {
                    if (err) {
                        res.status(500).json(err)
                    } else {
                        if (req.headers['content-type'] == "application/x-www-form-urlencoded") {
                            res.redirect('/messages')
                        } else {
                            res.status(200).json(r)
                        }
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        getAll: (req, res) => {
            try {
                let query = Messages.find({})
                query.exec((err, docs) => {
                    if (err) {
                        res.status(500).json(err)
                    } else {
                        res.status(200).json(docs)
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
    }
}