"use client";

import React, { useState } from "react";

interface GetAQueryFormProps {
  title?: string;
  buttonText?: string;
  successMessage?: string;
  className?: string;
  layout?: "single" | "double"; // New prop for layout control
}

const GetAQueryForm: React.FC<GetAQueryFormProps> = ({
  title = "",
  buttonText = "Send Message",
  successMessage = "Your message has been sent successfully! We'll contact you soon.",
  className = "",
  layout = "double", // Default to double column
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "query",
    details: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as { name: string; value: string; files?: FileList };
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // Send email directly to info@punjabac.com
      const emailPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        details: form.details,
      };

      const emailResponse = await fetch("https://punjabac-admin.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      setSuccess(successMessage);
      setForm({ name: "", email: "", phone: "", subject: "query", details: "", image: null });
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'error' in err.response.data &&
        typeof err.response.data.error === 'string'
      ) {
        setError(err.response.data.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Determine grid classes based on layout
  const getGridClasses = () => {
    if (layout === "single") {
      return "grid grid-cols-1 gap-6";
    }
    return "grid grid-cols-1 md:grid-cols-2 gap-6";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 bg-white rounded-xl shadow-lg p-8 ${className}`}
      encType="multipart/form-data"
    >
      {title && <h2 className="text-2xl font-bold text-punjabac-brand mb-4 text-center">{title}</h2>}
      
      <div className={getGridClasses()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          >
            <option value="query">General Query</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div className={layout === "single" ? "" : "md:col-span-2"}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Please describe your message, inquiry, or any specific needs. We'll get back to you as soon as possible..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left min-h-[120px] resize-y"
          />
        </div>
      </div>
      
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-punjabac-brand text-white py-3 px-6 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </div>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};

export default GetAQueryForm; 