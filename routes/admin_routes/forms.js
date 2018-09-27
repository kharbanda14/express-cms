const form_model = require('../../models/forms_model');
const adminConfig = require('../../config/admin');

module.exports = function (router) {
    router.route('/forms/:action?/:id?')
        .get(getFrom)
        .post(postForm)

    return router;
}

async function getFrom(req, res) {
    let data = {};
    let {
        action,
        id
    } = req.params;
    data.form_success = req.flash('form_success');
    data.form_btn_text = action ? action.toUpperCase() : '';
    if (action == 'create') {
        return res.render('admin/forms/index', data);
    }
    if (action == 'edit' && id) {
        try {
            data.existing_data = await form_model.findById(id);
        } catch (error) {
            return res.redirect(adminConfig.path + '/forms/');
        }
        return res.render('admin/forms/index', data);
    }
    data.forms = await form_model.getAll();
    data.start_i = 0;
    // return res.send(data);
    return res.render('admin/forms/view_all', data);
};
async function postForm(req, res) {
    let body = req.body;
    let {
        action,
        id
    } = req.params;

    if (action == 'edit') {
        try {
            let resp = await form_model.updateForm(id, body)
            req.flash('form_success', 'Form Updated!');
            return res.redirect(req.originalUrl);
        } catch (error) {
            return res.send(error);
        }
    }
    if (action == 'create') {
        try {
            body.user_id = req.session.admin._id;
            let resp = await form_model.createForm(body)
            req.flash('form_success', 'Form Created!');
            return res.redirect(adminConfig.path + '/forms/edit/' + resp._id);
        } catch (error) {
            return res.send(error);
        }
    }
    return res.send('Nothing found!')
}