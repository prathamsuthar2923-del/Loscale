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
    // ?homepage=true additionally restricts to items marked "show on homepage",
    // used by the homepage teaser sections (full listing pages ignore it).
    listPublic: asyncHandler(async (req, res) => {
      const query = { visible: true };
      // $ne: false (rather than "=== true") so documents saved before this
      // field existed — which have no showOnHomepage key at all — still
      // count as shown, matching the schema's own `default: true`.
      if (req.query.homepage === 'true') query.showOnHomepage = { $ne: false };
      const items = await Model.find(query).sort({ order: 1, createdAt: 1 });
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

    // PATCH /api/admin/<resource>/:id/toggle-homepage
    toggleHomepage: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      item.showOnHomepage = !item.showOnHomepage;
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
