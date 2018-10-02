var express = require('express');
var router = express.Router();
var forms = require('../handlers/form');
const form_model = require('../models/forms_model');
const response_model = require('../models/responses_model');
const validator = require('../lib/form_validator');

router.post('/submit/:id', async function (req, res) {
    const {
        id
    } = req.params;
    if (id in forms) {
        let body = req.body;
        try {
            if ('tracking' in body) {
                body.tracking.ip = req.ip;
            }
            if ('body' in body) {
                try {
                    let vv = validator.validate(body.body, forms[id].fields);
                    let resp = await response_model.recordSubmission(body);
                    if (req.xhr) {
                        console.log('XHR Request')
                        return res.send(resp);
                    }
                    req.flash('form_submit_success', 'Thank You for your Response!')
                    res.redirect('back')
                } catch (error) {
                    if (req.xhr) {
                        console.log('XHR Request')
                        return res.send(error).status(403);
                    }
                    req.flash('form_submit_error', error)
                    res.redirect('back')
                }
            }

        } catch (error) {
            res.send(error);
        }
    } else {
        return res.send('Not Found!').status(400);
    }

});

router.get('/:id', async function (req, res) {
    const {
        id
    } = req.params;
    let data = {};
    if (id in forms) {
        try {
            data['form'] = await form_model.findById(id);
            data.form.fields = forms[id].fields;
            data.query = req.query;
            data.success_msg = req.flash('form_submit_success');
            let formErr = req.flash('form_submit_error');
            data.form_error = formErr[0] || {};
            return res.render('forms/render', data);
        } catch (error) {
            return res.send('No Form').status(400);
        }
    } else {
        return res.send('Not Found').status(400);
    }
})

module.exports = router;