const form_model = require('../../models/forms_model');
const adminConfig = require('../../config/admin');
const responses_model = require('../../models/responses_model');

const forms = require('../../handlers/form');

const paginator = require('../../lib/pagination');

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
    if (action == 'submissions' && id) {
        try {
            if (id in forms) {
                let docQuery = {
                    form_id: id
                }
                data.submissions_count = await responses_model.count_submissions(docQuery)
                let {page, order_by, sort} = req.query;
                let pgOpts = paginator.getPaginationOptions(page, data.submissions_count);
                let {limit,skip} = pgOpts;
                let sortObj = {}
                if (order_by && sort) {
                    let field = `body.${order_by}`;
                    sortObj[field] = sort
                }
                data.submissions = await responses_model.getSubmissions(docQuery, limit, skip, sortObj);
                data.pagination = pgOpts;
                data.start_i = skip;
                data.query = req.query;
                let table_heads = {};
                forms[id].fields.forEach(v => {
                    table_heads[v.name] = v.nice_name;
                })
                data.table_heads = table_heads;
            } else {
                throw 'Form Handler Not Registered!';
            }
        } catch (error) {
            console.log(error)
            return res.send(error);
            return res.redirect(adminConfig.path + '/forms/');
        }
        return res.render('admin/forms/submissions', data);
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