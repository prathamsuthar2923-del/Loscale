import { useRef, useState } from 'react';
import uploadApi from '../../api/upload.api';
import resolveImage from '../../utils/resolveImage';

// Single-image picker: uploads immediately on selection and reports back the
// stored path (e.g. "/uploads/foo.jpg") via onChange. Used for service
// teaser images, work cover/gallery images, team photos, testimonial photos,
// and success-story images.
export default function ImageUploader({ value, onChange, label }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await uploadApi.uploadImage(file);
      onChange(res.url);
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium text-black">{label}</p>}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f2f2f2]">
          {value ? (
            <img src={resolveImage(value)} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-black/30">No image</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="text-sm" />
          {uploading && <p className="text-xs text-black/50">Uploading...</p>}
          {error && <p className="text-xs text-red-600">{error}</p>}
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="w-fit text-xs font-medium text-black/50 hover:text-black"
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
