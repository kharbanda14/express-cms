const marked = require('marked');

exports.render = (body) => {
    return new Promise((resolve, reject) => {
        marked.parse(body, (err, parsed) => {
            if (err) return reject(err);
            return resolve(parsed);
        })
    });
}