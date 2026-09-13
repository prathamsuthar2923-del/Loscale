const asyncHandler = require('./asyncHandler');

/**
 * Generates a standard set of REST handlers for a Mongoose model that has
 * `order` and `visible` fields (Service, Work, TeamMember, Testimonial,
 * SuccessStory all follow this shape). Keeps the individual controller
 * files tiny while still letting each one add model-specific extras.
 */
function createCrudController(Model) {
  return {
    // GET /api/<resource>            (public — visible items only)
    listPublic: asyncHandler(async (req, res) => {
      const items = await Model.find({ visible: true }).sort({ order: 1, createdAt: 1 });
      res.json(items);
    }),

    // GET /api/admin/<resource>      (admin — everything)
    listAdmin: asyncHandler(async (req, res) => {
      const items = await Model.find().sort({ order: 1, createdAt: 1 });
      res.json(items);
    }),

    // GET /api/admin/<resource>/:id
    getOne: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    }),

    // POST /api/admin/<resource>
    create: asyncHandler(async (req, res) => {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    }),

    // PUT /api/admin/<resource>/:id
    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    }),

    // PATCH /api/admin/<resource>/:id/toggle
    toggleVisible: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      item.visible = !item.visible;
      await item.save();
      res.json(item);
    }),

    // DELETE /api/admin/<resource>/:id
    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    }),
  };
}

module.exports = createCrudController;
