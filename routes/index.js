var Employees = require('../config/api/employees/employees.controller');

module.exports = function(router) {
  router.post('/create', Employees.createEmployee);
  router.get('/get', Employees.getEmployees);
  router.get('/get/:name', Employees.getEmployee);
  router.put('/update/:id', Employees.updateEmployee);
  router.delete('/remove/:id', Employees.removeEmployee);
}