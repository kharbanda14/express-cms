module.exports.getPaginationOptions = function (page) {
    const defaults = {
        limit: 5,
        skip: 0,
    }
    if (isNaN(page)) {
        return defaults;
    } else {
        if (page == 1 || page <= 0) {
            return defaults;
        } else {
            let skip = (page - 1) * defaults.limit;
            defaults.skip = skip;
            return defaults;
        }
    }
}