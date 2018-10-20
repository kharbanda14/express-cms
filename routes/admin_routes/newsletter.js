const newsletter_model = require('../../models/newsletter_model');
const mailer = require('../../lib/mail');
const csv = require('../../lib/csv');

const moment = require('moment');

module.exports = function (router) {
    router.get('/newsletter', getIndex);
    router.post('/newsletter/delete', deleteSub);
    router.route('/newsletter/compose/:id?')
        .get(getCompose)
        .post(postCompose);
    return router;
}

async function getIndex(req, res) {
    let data = {};
    let {
        export_report
    } = req.query;
    data.start_i = 1;
    data.users = await newsletter_model.getUsersList();
    if (export_report == 'csv') {
        let fields = Object.keys(data.users[0]);
        let jsonData = data.users.map(v => {
            v.created_at = moment(v.created_at).format('Y-M-D h:m A')
            v.updated_at = moment(v.updated_at).format('Y-M-D h:m A')
            return v;
        })
        csv.downloadCsv(fields,jsonData,res);
    }
    res.render('admin/newsletter/index', data)
}

async function getCompose(req, res) {
    let data = {};
    const {
        id
    } = req.params;

    data.msg_sent = req.flash('msg_sent');
    data.msg_error = req.flash('msg_error');
    data.existing = req.flash('existing')[0];
    if (id) {
        try {
            let getuser = await newsletter_model.getUser(id);
            data.existing = {
                email: getuser.email
            }
        } catch (error) {
            return res.redirect('../compose');
        }
    }
    // return res.send(data);
    res.render('admin/newsletter/compose', data)
}

async function postCompose(req, res) {

    const {
        email,
        subject,
        body
    } = req.body;
    try {
        let resp = await mailer.send([email], subject, body);
        req.flash('msg_sent', 'Message Sent!');
    } catch (error) {
        console.log('Error Occured -----',error);
        req.flash('existing', req.body);
        req.flash('msg_error', 'Error Occured! Please Try Again.');
    }
    return res.redirect(req.originalUrl);

}

async function deleteSub(req, res) {
    const {
        id
    } = req.body;
    try {
        await newsletter_model.deleteUser(id);
        req.flash('success_msg', 'Subscriber Removed!');
        res.redirect('../');
    } catch (e) {
        req.flash('error_msg', 'Error Occured!');
        res.redirect('../');
    }
}