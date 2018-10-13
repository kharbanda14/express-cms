const json2csv = require('json2csv');
const parser = json2csv.Parser;


exports.downloadCsv = (fields, json = [], res) => {

    let csv = new parser({
        fields
    });
    let data = csv.parse(json)
    res.attachment('report.csv');
    res.contentType('csv');
    return res.send(data);
}