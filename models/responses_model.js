var formResponse = require('../collections/Responses');

module.exports.recordSubmission = (data) => {
    return new formResponse(data).save();
}

module.exports.getSubmissions = (query = {}, limit = 5, skip = 0, sort = {
    '_id': 'asc',
}) => {
    console.log(sort);
    return formResponse.find(query)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
}

module.exports.count_submissions = function (query) {
    return formResponse.find(query).countDocuments()
}