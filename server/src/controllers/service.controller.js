const Service = require('../models/Service');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Service);
