const apiOrigin = import.meta.env.VITE_API_URL || '';

// Image fields stored in the DB are relative paths like "/uploads/foo.jpg"
// (from the upload endpoint). This turns that into an absolute URL when the
// client and API are on different origins (production), and leaves it as-is
// in dev where Vite proxies /uploads to the API. Falsy input returns null so
// callers can easily fall back to a placeholder.
export default function resolveImage(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${apiOrigin}${path}`;
}
