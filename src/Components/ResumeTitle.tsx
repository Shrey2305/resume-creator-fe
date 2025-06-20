import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Sparkles, User } from 'lucide-react';

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

const ResumeTitle: React.FC<ResumeTitleProps> = ({
  ComponentTitle,
  subtitle,
  dataObject,
  isOpen,
  isNew,
  onClose,
  onCreateResume
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [showSampleButton, setShowSampleButton] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Auto-generate slug on title change (if not manually edited)
  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setSlug(autoSlug);
    }
  }, [title, isSlugManuallyEdited]);

  // Populate fields in update mode
  useEffect(() => {
    if (!isNew && dataObject) {
      setTitle(dataObject.title || '');
      setSlug(dataObject.slug || '');
      setIsSlugManuallyEdited(true);
    }
  }, [isNew, dataObject]);

  // Clear validation error when inputs change
  useEffect(() => {
    if (validationError && (title.trim() || slug.trim())) {
      setValidationError('');
    }
  }, [title, slug, validationError]);

  const handleTitleSelect = (selectedTitle: JobTitle) => {
    setTitle(selectedTitle.title);
    setSlug(selectedTitle.slug);
    setIsSlugManuallyEdited(false);
    setIsDropdownOpen(false);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isSlugManuallyEdited) {
      const match = jobTitles.find(
        (job) => job.title.toLowerCase() === value.toLowerCase()
      );
      if (match) {
        setSlug(match.slug);
      }
    }
    setIsDropdownOpen(true); // keep dropdown open while typing
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setIsSlugManuallyEdited(true);
  };

  const handleCreate = () => {
    if (!title.trim()) {
      setValidationError('String must contain at least 1 character(s)');
      return;
    }
    if (!slug.trim()) {
      setValidationError('Slug is required');
      return;
    }

    onCreateResume(title.trim(), slug.trim());
    handleReset();
  };

  const handleCreateSample = () => {
    onCreateResume("Sample Resume", "sample-resume");
    handleReset();
  };

  const handleReset = () => {
    setTitle('');
    setSlug('');
    setIsSlugManuallyEdited(false);
    setValidationError('');
    setShowSampleButton(false);
    onClose();
  };

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowSampleButton(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowSampleButton(false);
    }, 300);
    setHoverTimeout(timeout);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+</span>
              </div>
              <h2 className="text-xl font-semibold text-white">{ComponentTitle}</h2>
            </div>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <p className="text-gray-400 text-sm">{subtitle}</p>

            {/* Title Field */}
            <div className="space-y-2 relative">
              <label htmlFor="title" className="text-white font-medium block">Title</label>
              <div className="relative">
                <input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onFocus={() => isNew && setIsDropdownOpen(true)}
                  placeholder="Enter job title..."
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded-md pr-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none"
                />
                {isNew && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <Sparkles size={16} />
                  </button>
                )}
              </div>

              {/* ComboBox Dropdown */}
              {isNew && isDropdownOpen && (
                <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg mt-1">
                  <div className="max-h-48 overflow-y-auto">
                    {jobTitles
                      .filter((job) =>
                        job.title.toLowerCase().includes(title.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((job) => (
                        <button
                          key={job.slug}
                          onClick={() => handleTitleSelect(job)}
                          className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                        >
                          {job.title}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Tip: You can name the resume referring to the position you are applying for.
              </p>
              {validationError && (
                <p className="text-red-400 text-sm">{validationError}</p>
              )}
            </div>

            {/* Slug Field */}
            <div className="space-y-2">
              <label htmlFor="slug" className="text-white font-medium block">
                Slug
              </label>
              <input
                id="slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="resume-slug"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pl-72 flex items-center gap-3 pt-4 relative">
              <div className="flex items-center relative">
                <button
                  onClick={handleCreate}
                  className="bg-white text-black hover:bg-gray-200 font-medium px-6 py-2 rounded-md transition-colors"
                >
                  {isNew ? "Create" : "Update"}
                </button>

                {isNew && (
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="ml-2 p-1 text-gray-400 hover:text-white transition-colors">
                      <ChevronDown size={16} />
                    </button>
                    {showSampleButton && (
                      <div
                        className="absolute top-full left-0 mt-1 z-10"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          onClick={handleCreateSample}
                          className="whitespace-nowrap bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-colors flex items-center gap-2 shadow-lg"
                        >
                          <User size={16} />
                          Create Sample Resume
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTitle;





// New

// <ResumeTitle
//   ComponentTitle="Create Resume"
//   subtitle="Start creating your resume now!"
//   isOpen={true}
//   isNew={true}
//   onClose={() => {}}
//   onCreateResume={(title, slug) => {
//     console.log("New Resume:", title, slug);
//   }}
// />



// Update

// <ResumeTitle
//   ComponentTitle="Update Resume"
//   subtitle="Edit your resume title or slug"
//   isOpen={true}
//   isNew={false}
//   dataObject={{ title: "Frontend Developer", slug: "frontend-developer" }}
//   onClose={() => {}}
//   onCreateResume={(title, slug) => {
//     console.log("Updated Resume:", title, slug);
//   }}
// />
