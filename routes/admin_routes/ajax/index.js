var menuModel = require('../../../models/menu_model');

module.exports = {
    add_menu: function (body, req, res) {
        body.user_id = req.session.admin._id;
        return menuModel.add_menu(body);
    },
    get_menu: function (body, req) {
        if (req.query.id) {
            return menuModel.getMenuById(req.query.id)
        } else {
            return menuModel.get_menu();
        }
    },
    update_menu: function (body) {
        return menuModel.updateMenu(body.id,body)
    },
    submit_form:function (body) {
        return body;
    }
}