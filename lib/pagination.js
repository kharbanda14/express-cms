module.exports.getPaginationOptions = function (page, count) {
    const defaults = {
        limit: 5,
        skip: 0,
        start_i: 0,
        current: 1,
        max_pages: 1
    }
    if ((count % defaults.limit) == 0) {
        defaults.max_pages = Math.floor(count / defaults.limit);
    } else {
        defaults.max_pages = Math.floor(count / defaults.limit) + 1;
    }
    if (isNaN(page)) {
        return defaults;
    } else {
        if (page == 1 || page <= 0) {
            return defaults;
        } else {
            let skip = (page - 1) * defaults.limit;
            defaults.skip = skip;
            defaults.start_i = skip;
            defaults.current = parseInt(page);
            return defaults;
        }
    }
}