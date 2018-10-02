
module.exports.generateQueryUrl = function (url) {
    if ( url.indexOf('?') == -1 ) {
        url += '?';
    } else {
        url += '&';
    }
    return url;
}