const path = require('path');
const fs = require('fs');
let d = new Date();
let folder = `uploads/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/`;
let dir = `${__dirname}/${folder}`;
createDirRecursive();
function createDirRecursive(folder) {
    folder.split(path.sep).reduce((parent, child) => {
        var curDir = path.resolve(parent, child);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }
        return curDir;
    });
}

