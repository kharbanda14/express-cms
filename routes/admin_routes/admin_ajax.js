/**
 * Handles the ajax requests of the application admin interface.
 * 
 * handlers are registered in their specific files
 *
 */
const ajax_handlers = require('./ajax/index');

module.exports = function (router) {
    router.all('/admin_ajax/:action?', async (req, res) => {
        const {
            action
        } = req.params;
        if (action) {
            if (action in ajax_handlers) {
                try {
                    res.send({
                        status: 'ok',
                        data: await ajax_handlers[action](req.body, req)
                    })
                } catch (error) {
                    res.send({
                        status: 'err',
                        message: error.message ? error.message : 'Error Occured!',
                    });
                }
            } else {
                res.send({
                    status: 'err',
                    message: 'No Action Registered',
                }).status(400)
            }
        }
    })
    return router;
}