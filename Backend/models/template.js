const mongoose = require('mongoose');

let Template = {
    creator: {type: String, require: true},
    technology: {type: String, require: true},
    name: {type: String, require: true, unique: true},
    code: {type: String, require: true},
    parameters: [{
        name: String,
        defaultValues: [String]
    }]
};

module.exports = mongoose.model("Template", Template);