var Menu = require('../collections/Menu');

module.exports = {
    add_menu : (body) => {
        return new Menu(body).save();
    },
    get_menu : (query = {}) => {
        return Menu.find(query).lean();
    },
    getMenuById : (id) => {
        return Menu.findById(id).lean();
    },
    updateMenu : (id,body) => {
        let objid = body.id;
        delete body.id;
        body.last_edited = Date.now();
        return Menu.findByIdAndUpdate(id,body);
    }
}