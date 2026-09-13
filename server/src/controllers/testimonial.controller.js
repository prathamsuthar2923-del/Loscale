const Testimonial = require('../models/Testimonial');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Testimonial);
