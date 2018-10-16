const newsletter_model = require('../models/newsletter_model');
const twig = require('twig');
const email = require('../lib/mail');
const config = require('../config/site').config;

exports.sendNewsletter = async function (post) {
    let users = await newsletter_model.getEmailsActive();

    for (const user of users) {
        config.user = user;
        config.post = post;

        renderTemplate('new_bog_post', config)
            .then(html => {
                email
                    .send([user.email], 'New Post Out', html)
                    .catch(e => console.log('error in sending email to', user.email))

            })
            .catch(er => {
                console.log('Error in Template Rendering ');
            });

    }
    return true;
}

function renderTemplate(name, data = {}) {
    let path = APP_DIR + '/email_templates/' + name + '.twig';
    return new Promise((resolve, reject) => {
        twig.renderFile(path, data, function (err, html) {
            if (err) {
                return reject(err);
            } else {
                return resolve(html);
            }
        })
    });

}