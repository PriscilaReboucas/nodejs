module.exports = app =>{
    const userController = require('../controllers/user')(app)
    app.route('/users').get(userController.index)
    app.route('/api/users').get(/*userController.verifyJWT,*/userController.getAll)
    app.route('/api/users/:id').get(userController.getOne)
    app.route('/api/users/:id').put(userController.update)
    app.route('/api/users/:id').delete(userController.deleteOne)
    app.route('/api/users').post(userController.create)
    app.route('/api/user/login').post(userController.login)
    
}