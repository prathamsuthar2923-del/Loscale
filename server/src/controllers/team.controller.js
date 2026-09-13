const TeamMember = require('../models/TeamMember');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(TeamMember);
