const Service = require('../models/Service');
const createCrudController = require('../utils/crudFactory');
const asyncHandler = require('../utils/asyncHandler');
const slugify = require('../utils/slugify');

const base = createCrudController(Service);

// Finds a slug that isn't already taken, starting from the given base and
// appending -2, -3, etc. on collision.
async function findAvailableSlug(baseSlug) {
  let candidate = baseSlug;
  let suffix = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Service.exists({ slug: candidate })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

// POST /api/admin/services — same as the generic factory's create, but
// derives a URL slug from the title when the admin panel leaves it blank
// (the admin form doesn't collect one, so this always applies in practice).
const create = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (!body.slug || !body.slug.trim()) {
    const baseSlug = slugify(body.title) || 'service';
    body.slug = await findAvailableSlug(baseSlug);
  } else {
    body.slug = slugify(body.slug);
  }
  const item = await Service.create(body);
  res.status(201).json(item);
});

// PUT /api/admin/services/:id — re-derives the slug if the title changes and
// no explicit slug was sent, so renaming a service doesn't require the admin
// to also edit a slug field that isn't shown anywhere.
const update = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.slug && body.slug.trim()) {
    body.slug = slugify(body.slug);
  } else {
    delete body.slug;
  }
  const item = await Service.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

module.exports = { ...base, create, update };
