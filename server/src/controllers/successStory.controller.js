const SuccessStory = require('../models/SuccessStory');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(SuccessStory);
