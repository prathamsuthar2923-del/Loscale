const Work = require('../models/Work');
const createCrudController = require('../utils/crudFactory');
const asyncHandler = require('../utils/asyncHandler');
const slugify = require('../utils/slugify');

const base = createCrudController(Work);

// GET /api/works/:slug — public detail lookup by slug, used by the Work
// Detail page (only returns the work if it's visible).
const getBySlug = asyncHandler(async (req, res) => {
  const work = await Work.findOne({ slug: req.params.slug, visible: true });
  if (!work) return res.status(404).json({ message: 'Work not found' });
  res.json(work);
});

// Finds a slug that isn't already taken, starting from the given base and
// appending -2, -3, etc. on collision.
async function findAvailableSlug(baseSlug) {
  let candidate = baseSlug;
  let suffix = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Work.exists({ slug: candidate })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

// POST /api/admin/works — same as the generic factory's create, but derives
// a URL slug from the title when the admin panel leaves it blank.
const create = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (!body.slug || !body.slug.trim()) {
    const baseSlug = slugify(body.title) || 'work';
    body.slug = await findAvailableSlug(baseSlug);
  } else {
    body.slug = slugify(body.slug);
  }
  const item = await Work.create(body);
  res.status(201).json(item);
});

module.exports = { ...base, getBySlug, create };
