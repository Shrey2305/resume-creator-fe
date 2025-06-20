import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';

interface JobTitle {
  title: string;
  slug: string;
}

interface ResumeTitleProps {
  ComponentTitle: string;
  subtitle: string;
  dataObject?: any;
  isOpen: boolean;
  isNew?: boolean;
  onClose: () => void;
  onCreateResume: (title: string, slug: string) => void;
}

const jobTitles: JobTitle[] = [
  { title: "Frontend Developer", slug: "frontend-developer" },
  { title: "Backend Developer", slug: "backend-developer" },
  { title: "Full Stack Developer", slug: "full-stack-developer" },
  { title: "Software Engineer", slug: "software-engineer" },
  { title: "Mobile App Developer", slug: "mobile-app-developer" },
  { title: "Data Scientist", slug: "data-scientist" },
  { title: "Machine Learning Engineer", slug: "machine-learning-engineer" },
  { title: "DevOps Engineer", slug: "devops-engineer" },
  { title: "UI/UX Designer", slug: "ui-ux-designer" },
  { title: "Product Manager", slug: "product-manager" }
];

export default function ResumeTitle({
  ComponentTitle,
  subtitle,
  dataObject,
  isOpen,
  isNew,
  onClose,
  onCreateResume,
}: ResumeTitleProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [showSampleDropdown, setShowSampleDropdown] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      const autoSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
      setSlug(autoSlug);
    }
  }, [title, isSlugManuallyEdited]);

  useEffect(() => {
    if (!isNew && dataObject) {
      setTitle(dataObject.title || '');
      setSlug(dataObject.slug || '');
      setIsSlugManuallyEdited(true);
    }
  }, [isNew, dataObject]);

  useEffect(() => {
    if (validationError && (title.trim() || slug.trim())) {
      setValidationError('');
    }
  }, [title, slug, validationError]);

  const handleTitleSelect = (selected: JobTitle) => {
    setTitle(selected.title);
    setSlug(selected.slug);
    setIsSlugManuallyEdited(false);
    setIsDropdownOpen(false);
  };

  const handleCreate = () => {
    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }
    if (!slug.trim()) {
      setValidationError('Slug is required');
      return;
    }
    onCreateResume(title.trim(), slug.trim());
    handleReset();
  };

  const handleReset = () => {
    setTitle('');
    setSlug('');
    setIsSlugManuallyEdited(false);
    setValidationError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-md w-full max-w-md p-6 relative shadow border">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Plus className="w-4 h-4" />
          <h2 className="text-base font-semibold">{ComponentTitle}</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>

        {/* Title Input */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Title</label>
          <div className="relative">
            <input
              type="text"
              value={title}
              placeholder="Enter job title..."
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => isNew && setIsDropdownOpen(true)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            {isNew && (
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-black"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tip: You can name the resume referring to the position you are applying for.
          </p>

          {isNew && isDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto">
              {jobTitles
                .filter((job) => job.title.toLowerCase().includes(title.toLowerCase()))
                .slice(0, 5)
                .map((job) => (
                  <button
                    key={job.slug}
                    type="button"
                    onClick={() => handleTitleSelect(job)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {job.title}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Slug Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsSlugManuallyEdited(true);
            }}
            placeholder="resume-slug"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Validation Error */}
        {validationError && <p className="text-red-500 text-sm mb-4">{validationError}</p>}

        {/* Buttons */}
        <div className="flex justify-end">
          <div className="relative">
            <button
              onClick={handleCreate}
              className="bg-black text-white text-sm px-4 py-2 rounded-l-md hover:bg-gray-800"
            >
              {isNew ? "Create" : "Update"}
            </button>
            <button
              onClick={() => setShowSampleDropdown((prev) => !prev)}
              className="bg-black text-white text-sm px-2 py-2 rounded-r-md border-l border-gray-700 hover:bg-gray-800"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Sample Option */}
            {showSampleDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md z-10">
                <button
                  onClick={() => {
                    onCreateResume("Sample Resume", "sample-resume");
                    handleReset();
                  }}
                  className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Create Sample Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
