module.exports = [{
    type: 'post',
    nice_name: 'Posts',
    singular:'Post',
    slug: 'post',
    icon: 'nav-icon icon-doc',
    sub_menu: [{
            title: 'Add',
            action: 'create',
            icon: null,
        },
        {
            title: 'View',
            action: 'view',
            icon: null,
        }
    ]
}, {
    type: 'page',
    nice_name: 'Pages',
    singular: 'Page',
    slug: 'page',
    icon: 'nav-icon icon-doc',
    sub_menu: [{
            title: 'Add',
            action: 'create',
            icon: null,
        },
        {
            title: 'View',
            action: 'view',
            icon: null,
        }
    ]
}, ]