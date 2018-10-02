/**
 * Validates Object according to Schema
 * @param {Object} body - Body Contents
 * @param {Object} schema - Schema of the validation
 */
module.exports.validate = function (body, schema) {
    let schemaObj = {};
    let validBody = {};
    let errors = {};
    schema.forEach(element => {
        schemaObj[element.name] = element;
        if (element.name in body) {
            validBody[element.name] = body[element.name];
        }
    });

    for (const field in schemaObj) {
        if (schemaObj.hasOwnProperty(field)) {
            let element = schemaObj[field];
            if (field in validBody) {
                let value = validBody[field];
                if (element.required) {
                    if (value.length == 0) {
                        errors[field] = `${element.nice_name} is Requried`;
                    }
                }
                if ('validate' in element) {
                    let regexp = new RegExp(element.validate);
                    if (regexp.test(value) == false) {
                        errors[field] = `${element.nice_name} is Invalid`;
                    }

                }
            } else {
                validBody[field] = "";
            }
        }
    }
    if (Object.keys(errors).length > 0) {
        throw errors;
    }
    return validBody;
}