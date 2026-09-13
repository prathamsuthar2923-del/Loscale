// Tiny dependency-free slugify — lowercases, strips anything that isn't a
// letter/number, and collapses runs of separators into a single hyphen.
function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = slugify;
