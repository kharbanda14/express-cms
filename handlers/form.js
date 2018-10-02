module.exports = {
    '5babb843b7d230236078cad4': {
        fields: [{
                name: 'first_name',
                type: 'text',
                nice_name: 'First Name',
                required: true,
                validate: '^[a-zA-Z ]+$'
            },
            {
                name: 'last_name',
                type: 'text',
                nice_name: 'Last Name',
                required: true,
                validate: '^[a-zA-Z ]+$'
            },
            {
                name: 'phone',
                type: 'number',
                nice_name: 'Phone',
                required: true,
                validate: '^[0-9]{10}$'
            },
            {
                name: 'email',
                type: 'email',
                nice_name: 'Email',
                required: true,
            },
            {
                name: 'comment',
                type: 'textarea',
                nice_name: 'Comment',
            },
        ]
    }
}