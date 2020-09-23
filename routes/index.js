var Employees = require('../config/api/employees/employees.controller');

module.exports = function(router) {
  router.post('/employees', Employees.createEmployee);
  router.get('/employees', Employees.getEmployees);
  router.get('/employees/:id', Employees.getEmployee);
  router.put('/employees/:id', Employees.updateEmployee);
  router.delete('/employees/:id', Employees.removeEmployee);
}