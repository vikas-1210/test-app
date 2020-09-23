var Employees = require('./employees.dao');
var Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(18).max(60).required(),
    department: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

exports.createEmployee = function (req, res, next) {
    const { error, value } = schema.validate(req.body);
    if(error){
            res.json({
                error: error.message
            })
    } else{
        Employees.createEmployee(JSON.parse(req.body), function(err, employee){
            if(err){
                res.json({
                    error: err
                })
            }
            res.json({
                message: "Employee created successfully"
            })
        })
    }
}

exports.getEmployees = function(req, res, next) {
    Employees.get({}, function(err, employees) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            employees: employees
        })
    })
}

exports.getEmployee = function(req, res, next) {
    Employees.get({name: req.params.name}, function(err, employees) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            employees: employees
        })
    })
}

exports.updateEmployee = function(req, res, next) {
    Employees.update({_id: req.params.id}, JSON.parse(req.body), function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee updated successfully"
        })
    })
}

exports.removeEmployee = function(req, res, next) {
    Employees.delete({_id: req.params.id}, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee deleted successfully"
        })
    })
}