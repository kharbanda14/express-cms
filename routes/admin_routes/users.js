const users_model = require('../../models/users_model');
const hasher = require('../../lib/hash');

module.exports = function (router) {
    router.get('/users', getUsers);
    router.get('/users/create', createUser);
    router.post('/users/create', createUserPost);
    return router;
}

async function getUsers(req, res) {
    const data = {};
    data.users = await users_model.getUsers();
    //return res.send(data);
    res.render('admin/users/index', data);
}

async function createUser(req, res) {
    const data = {};
    res.render('admin/users/create', data);
}


async function createUserPost(req, res) {
    const data = req.body;
    let {
        password
    } = data;
    if (password) {
        data.password = await hasher.hashAsync(password);
    } else {
        req.flash('error_msg', 'Password is required');
        return res.redirect('/admin/users/create');
    }
    try {
        await users_model.createUser(data);
        req.flash('success_msg', 'User Created!')
        return res.redirect('/admin/users/')
    } catch (error) {
        req.flash('error_msg', 'Error In Creating User!');
        return res.redirect('/admin/users/create');
    }
    //return res.send(data);
}