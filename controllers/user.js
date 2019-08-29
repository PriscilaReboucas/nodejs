const { User } = require('../database/sequelize')
const jwt = require('jsonwebtoken')
module.exports = app => {
    return {
        index: (req, res) => {
            let query = User.find({})
            query.exec((err, docs) => {
                if (err) {
                    res.send(err)
                } else {
                    res.render('pages/users', { users: docs })
                }
            })
        },
        login: (req, res) => {
            try {
                User.findOne({ where: { name: req.body.name, password: req.body.password } })
                    .then(user => {
                        let r = user
                            ? jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: 3000 })
                            : { error: 'invalid user/password' }
                        res.status(r.error ? 300 : 200).json(r)
                    })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        getAll: (req, res) => {
            try {
                User.findAll().then(r => res.status(200).json(r))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        create: (req, res) => {
            try {
                User.create(req.body).then(r => res.status(200).json(r))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        getOne: (req, res) => {
            try {
                User.findOne({ id: req.params.id }).then(user => res.status(200).json(user))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        update: (req, res) => {
            try {
                User.update(req.body, { where: { id: req.params.id } }).then(user => res.status(200).json(user))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        deleteOne: (req, res) => {
            try {
                User.destroy({ where: { id: req.params.id } }).then(user => res.status(200).json(user))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        verifyJWT: (req, res,next) => {
            try {
                const token = req.headers['x-access-token']
                if (!token) {
                    res.status(401).json({ auth: false, message: 'empty token' })
                } else {
                    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                        if (err) {
                            res.status(401).json({ auth: false, message: 'cannot decode token' })
                        } else {
                            req = decoded
                            next()
                        }
                    })
                }

            } catch (error) {
                res.status(500).json(error)
            }
        }
    }
}