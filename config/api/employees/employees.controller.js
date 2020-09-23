var Employees = require('./employees.dao');
var Joi = require('joi');

exports.createEmployee = function (req, res, next) {
    let schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().min(18).max(60).required(),
        department: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    const { error, value } = schema.validate(req.body);
    if(error){
            res.json({
                error: error.message
            })
    } else{
        var employee = {
            name: req.body.name,
            age: req.body.age,
            department: req.body.department,
            email: req.body.email
        };
        Employees.create(employee, function(err, employee){
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
    Employees.get({_id: req.params.id}, function(err, employees) {
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
    let schema = Joi.object({
        name: Joi.string(),
        age: Joi.number().integer().min(18).max(60),
        department: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    const { error, value } = schema.validate(req.body);
    if(error){
            res.json({
                error: error.message
            })
    } else{
        var employee = {
            name: req.body.name,
            age: req.body.age,
            department: req.body.department,
            email: req.body.email
        };
        Employees.update({_id: req.params.id}, employee, function(err, employee) {
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