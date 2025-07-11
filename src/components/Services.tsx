import React, { useRef, useState } from 'react';

const Services = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    setUploading(true);
    setError(null);
    setUploadedUrl(null);
    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (e) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern tools, genuine parts, and unmatched professionalism in auto AC services.
          </p>
        </div>
        {/* Upload Section */}
        <div className="mb-12 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Upload a File</h3>
          <input type="file" ref={fileInputRef} className="mb-2" />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {uploadedUrl && (
            <div className="mt-2 text-green-600">Uploaded: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="underline">{uploadedUrl}</a></div>
          )}
          {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AC Repair & Maintenance</h3>
            <p className="text-gray-600 mb-6 line-clamp-3">
              Complete diagnostic and repair for all car AC systems. Fast, reliable, and professional service.
            </p>
            <a href="/services" className="text-blue-600 font-medium hover:text-blue-700 transition-colors mt-auto">
              Learn More →
            </a>
          </div>
          {/* Service Card 2 */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Refrigerant Recharge</h3>
            <p className="text-gray-600 mb-6 line-clamp-3">
              Fast, professional refrigerant recharge using the latest equipment and best techniques.
            </p>
            <a href="/services" className="text-blue-600 font-medium hover:text-blue-700 transition-colors mt-auto">
              Learn More →
            </a>
          </div>
          {/* Service Card 4 */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Genuine Parts Replacement</h3>
            <p className="text-gray-600 mb-6 line-clamp-3">
              Replacement of AC parts with genuine brands (DENSO, COOL GEAR, Sanden) for top performance.
            </p>
            <a href="/services" className="text-blue-600 font-medium hover:text-blue-700 transition-colors mt-auto">
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 