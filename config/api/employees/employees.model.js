var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeesSchema = new Schema({
    name: { type: String, unique: false, required: true},
    age: { type: Number, min: 18, index: true, required: true },
    department: { type: String, unique: false, required: true},
    email: { type: String, unique: false, required: true}
},{
    timestamps: true
});

module.exports = employeesSchema;