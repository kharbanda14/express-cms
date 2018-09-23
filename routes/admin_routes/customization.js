const menuModel = require('../../models/menu_model');
module.exports = function (router) {
    router.get('/customization/menu', async (req,res) => {
        let data = {};
        data.menu = await menuModel.get_menu();
        // return res.send(data);
        return res.render('admin/customization/menu/index',data)
    })
    return router;
}